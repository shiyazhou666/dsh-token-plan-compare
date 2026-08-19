/**
 * dsh-token-plan-compare
 * DeepSeek Harness 插件：对比各家大模型 token 套餐性价比
 */
import z from '@deepseek-ai/schemastery';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { TOKEN_PLANS, DATA_UPDATED_AT } from './data/plans.js';
import { comparePlans, formatCompareResults, recommendByUseCase, } from './utils/compare.js';
export const name = 'token-plan-compare';
export const Config = z.object({
    /** 是否启用插件 */
    enabled: z.boolean().default(true),
    /** 默认月预算（元） */
    defaultBudget: z.number().default(100),
    /** 默认输入 token 占比 */
    defaultInputRatio: z.number().default(0.7),
    /** 默认地区 */
    defaultRegion: z.string().default('china'),
});
export function apply(ctx, config) {
    if (!config.enabled)
        return;
    // ========== 工具1：token_plan_compare 主对比工具 ==========
    ctx.tools.register(defineTool({
        name: 'token_plan_compare',
        description: '对比各家大模型 API 的 token 套餐性价比。当用户询问"哪个大模型便宜"、"token 价格对比"、"API 性价比"、"买哪个套餐划算"、"月预算X元用什么模型"时使用。返回按性价比排序的套餐列表，包含有效单价、每元可买token数、推荐理由。',
        parameters: {
            type: 'object',
            properties: {
                monthly_budget: {
                    type: 'number',
                    description: '月预算（元人民币），用于计算每月可购买的 token 量',
                    default: 100,
                },
                use_case: {
                    type: 'string',
                    enum: ['code', 'writing', 'chat', 'long-context', 'reasoning'],
                    description: '主要使用场景：code=写代码，writing=写作/文案，chat=日常对话，long-context=长文本处理，reasoning=深度推理',
                },
                input_ratio: {
                    type: 'number',
                    description: '输入 token 占比（0-1），例如 0.7 表示 70% 是输入、30% 是输出',
                    default: 0.7,
                    minimum: 0,
                    maximum: 1,
                },
                region: {
                    type: 'string',
                    enum: ['china', 'global'],
                    description: '地区：china=仅国内厂商，global=包含海外厂商（美元折算）',
                    default: 'china',
                },
                providers: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '指定厂商名称列表，如 ["DeepSeek","通义千问"]，不填则全部',
                },
                cache_hit_rate: {
                    type: 'number',
                    description: '缓存命中率（0-1），开启后会用缓存命中价计算输入成本',
                    default: 0,
                    minimum: 0,
                    maximum: 1,
                },
                min_capability: {
                    type: 'number',
                    description: '最低能力评分（0-10），过滤掉能力太低的模型',
                    default: 0,
                    minimum: 0,
                    maximum: 10,
                },
                top_n: {
                    type: 'number',
                    description: '返回前 N 名，默认 10',
                    default: 10,
                },
            },
        },
        async execute(args) {
            const options = {
                monthlyBudget: args.monthly_budget ?? config.defaultBudget,
                useCase: args.use_case,
                inputRatio: args.input_ratio ?? config.defaultInputRatio,
                region: (args.region ?? config.defaultRegion),
                providers: args.providers,
                cacheHitRate: args.cache_hit_rate ?? 0,
                minCapability: args.min_capability ?? 0,
            };
            const results = comparePlans(TOKEN_PLANS, options);
            const topN = args.top_n ?? 10;
            const text = formatCompareResults(results, topN);
            return {
                content: [
                    {
                        type: 'text',
                        text,
                    },
                ],
                data: {
                    total_matched: results.length,
                    top_results: results.slice(0, topN).map((r) => ({
                        provider: r.plan.provider,
                        model: r.plan.model,
                        value_score: r.valueScore,
                        effective_price: Number(r.effectivePrice.toFixed(2)),
                        tokens_per_yuan: Number(r.tokensPerYuan.toFixed(2)),
                        monthly_tokens_million: Number(r.monthlyTokens.toFixed(1)),
                        capability_score: r.plan.capabilityScore,
                        reason: r.reason,
                        url: r.plan.url,
                    })),
                    data_updated_at: DATA_UPDATED_AT,
                },
            };
        },
    }));
    // ========== 工具2：token_plan_recommend 场景推荐 ==========
    ctx.tools.register(defineTool({
        name: 'token_plan_recommend',
        description: '根据使用场景和预算直接推荐最划算的大模型套餐。当用户说"我写代码用什么模型好"、"长文本处理选哪个"、"预算X元推荐一个API"时使用。返回最佳推荐和备选方案。',
        parameters: {
            type: 'object',
            properties: {
                use_case: {
                    type: 'string',
                    enum: ['code', 'writing', 'chat', 'long-context', 'reasoning'],
                    description: '使用场景',
                    default: 'chat',
                },
                monthly_budget: {
                    type: 'number',
                    description: '月预算（元）',
                    default: 100,
                },
                region: {
                    type: 'string',
                    enum: ['china', 'global'],
                    description: '地区',
                    default: 'china',
                },
            },
            required: ['use_case'],
        },
        async execute(args) {
            const useCase = args.use_case;
            const budget = args.monthly_budget ?? config.defaultBudget;
            const region = args.region ?? config.defaultRegion;
            const filtered = TOKEN_PLANS.filter((p) => p.region === region || region === 'global');
            const { best, alternatives } = recommendByUseCase(filtered, useCase, budget);
            const lines = [];
            lines.push(`=== 场景推荐：${useCase}（月预算 ¥${budget}）===`);
            lines.push('');
            lines.push('【最佳推荐】');
            lines.push(`  ${best.plan.provider} - ${best.plan.model}`);
            lines.push(`  性价比分数: ${best.valueScore}/100`);
            lines.push(`  有效单价: ¥${best.effectivePrice.toFixed(2)}/百万token`);
            lines.push(`  月可买: ${best.monthlyTokens.toFixed(1)} 百万token`);
            lines.push(`  推荐理由: ${best.reason}`);
            lines.push(`  链接: ${best.plan.url}`);
            lines.push('');
            lines.push('【备选方案】');
            alternatives.forEach((a, i) => {
                lines.push(`  ${i + 1}. ${a.plan.provider} - ${a.plan.model}（分数 ${a.valueScore}，¥${a.effectivePrice.toFixed(2)}/百万token）`);
            });
            lines.push('');
            lines.push(`数据更新于 ${DATA_UPDATED_AT}，以官方价格为准。`);
            return {
                content: [{ type: 'text', text: lines.join('\n') }],
                data: {
                    best: {
                        provider: best.plan.provider,
                        model: best.plan.model,
                        value_score: best.valueScore,
                        effective_price: Number(best.effectivePrice.toFixed(2)),
                        url: best.plan.url,
                    },
                    alternatives: alternatives.map((a) => ({
                        provider: a.plan.provider,
                        model: a.plan.model,
                        value_score: a.valueScore,
                        effective_price: Number(a.effectivePrice.toFixed(2)),
                    })),
                },
            };
        },
    }));
    // ========== 工具3：token_plan_list 列出所有套餐 ==========
    ctx.tools.register(defineTool({
        name: 'token_plan_list',
        description: '列出数据库中所有大模型 token 套餐的基本信息（厂商、模型、输入输出价格、上下文窗口）。当用户想了解"有哪些大模型API"、"支持哪些厂商"时使用。',
        parameters: {
            type: 'object',
            properties: {
                region: {
                    type: 'string',
                    enum: ['china', 'global', 'all'],
                    description: '地区过滤',
                    default: 'all',
                },
                provider: {
                    type: 'string',
                    description: '指定厂商名称，如 "DeepSeek"',
                },
            },
        },
        async execute(args) {
            const region = args.region;
            const provider = args.provider;
            let plans = TOKEN_PLANS.filter((p) => p.planType === 'api');
            if (region && region !== 'all') {
                plans = plans.filter((p) => p.region === region);
            }
            if (provider) {
                plans = plans.filter((p) => p.provider.includes(provider));
            }
            const lines = [];
            lines.push(`=== 大模型 API 套餐列表（共 ${plans.length} 个）===`);
            lines.push('');
            // 按厂商分组
            const byProvider = new Map();
            plans.forEach((p) => {
                if (!byProvider.has(p.provider))
                    byProvider.set(p.provider, []);
                byProvider.get(p.provider).push(p);
            });
            for (const [prov, ps] of byProvider) {
                lines.push(`【${prov}】`);
                ps.forEach((p) => {
                    lines.push(`  - ${p.model}: 输入 ¥${p.inputPrice}/百万, 输出 ¥${p.outputPrice}/百万, 上下文 ${(p.contextWindow / 1000).toFixed(0)}K${p.cachePrice ? `, 缓存 ¥${p.cachePrice}` : ''}`);
                });
                lines.push('');
            }
            lines.push(`数据更新于 ${DATA_UPDATED_AT}，以官方价格为准。`);
            return {
                content: [{ type: 'text', text: lines.join('\n') }],
                data: {
                    total: plans.length,
                    providers: Array.from(byProvider.keys()),
                    plans: plans.map((p) => ({
                        provider: p.provider,
                        model: p.model,
                        input_price: p.inputPrice,
                        output_price: p.outputPrice,
                        cache_price: p.cachePrice,
                        context_window: p.contextWindow,
                        url: p.url,
                    })),
                },
            };
        },
    }));
    ctx.logger.info(`token-plan-compare: 已注册 3 个工具，共 ${TOKEN_PLANS.length} 个套餐数据（更新于 ${DATA_UPDATED_AT}）`);
}
