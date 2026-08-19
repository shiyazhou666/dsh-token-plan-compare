/**
 * dsh-token-plan-compare
 * DeepSeek Harness 插件：对比各家大模型 token 套餐性价比
 */

import z from '@deepseek-ai/schemastery';
import type { Context } from '@deepseek-ai/cordis';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { TOKEN_PLANS, DATA_UPDATED_AT } from './data/plans.js';
import {
  comparePlans,
  formatCompareResults,
  recommendByUseCase,
  type CompareOptions,
} from './utils/compare.js';

export const name = 'token-plan-compare';
export const inject = ['tools'];

export const Config = z.object({
  enabled: z.boolean().default(true),
  defaultBudget: z.number().default(100),
  defaultInputRatio: z.number().default(0.7),
  defaultRegion: z.string().default('china'),
});

export type TokenPlanCompareConfig = {
  enabled: boolean;
  defaultBudget: number;
  defaultInputRatio: number;
  defaultRegion: string;
};

/** 通用 output.render：把字符串返回值渲染为文本内容块 */
const textOutput = {
  schema: { type: 'string' },
  render: (_args: unknown, value: string) => [{ type: 'text', text: value }],
};

export function apply(ctx: Context, config: TokenPlanCompareConfig) {
  if (!config.enabled) return;

  // ========== 工具1：token_plan_compare 主对比工具 ==========
  ctx.tools.register(
    defineTool({
      name: 'token_plan_compare',
      description:
        '对比各家大模型 API 的 token 套餐性价比。当用户询问"哪个大模型便宜"、"token 价格对比"、"API 性价比"、"买哪个套餐划算"、"月预算X元用什么模型"时使用。返回按性价比排序的套餐列表。',
      parameters: {
        monthly_budget: {
          type: 'number',
          description: '月预算（元人民币），默认100',
        },
        use_case: {
          type: 'string',
          description: '使用场景：code/writing/chat/long-context/reasoning',
        },
        input_ratio: {
          type: 'number',
          description: '输入token占比0-1，默认0.7',
        },
        region: {
          type: 'string',
          description: '地区：china/global，默认china',
        },
        providers: {
          type: 'array',
          description: '指定厂商列表，不填则全部',
        },
        cache_hit_rate: {
          type: 'number',
          description: '缓存命中率0-1，默认0',
        },
        min_capability: {
          type: 'number',
          description: '最低能力评分0-10，默认0',
        },
        top_n: {
          type: 'number',
          description: '返回前N名，默认10',
        },
      },
      output: textOutput,
      async execute(args: any) {
        const options: CompareOptions = {
          monthlyBudget: args.monthly_budget ?? config.defaultBudget,
          useCase: args.use_case,
          inputRatio: args.input_ratio ?? config.defaultInputRatio,
          region: (args.region ?? config.defaultRegion) as 'china' | 'global',
          providers: args.providers,
          cacheHitRate: args.cache_hit_rate ?? 0,
          minCapability: args.min_capability ?? 0,
        };
        const results = comparePlans(TOKEN_PLANS, options);
        const topN = args.top_n ?? 10;
        return formatCompareResults(results, topN);
      },
    }),
  );

  // ========== 工具2：token_plan_recommend 场景推荐 ==========
  ctx.tools.register(
    defineTool({
      name: 'token_plan_recommend',
      description:
        '根据使用场景和预算直接推荐最划算的大模型套餐。当用户说"写代码用什么模型"、"长文本选哪个"、"预算X元推荐API"时使用。',
      parameters: {
        use_case: {
          type: 'string',
          description: '使用场景：code/writing/chat/long-context/reasoning',
        },
        monthly_budget: {
          type: 'number',
          description: '月预算（元），默认100',
        },
        region: {
          type: 'string',
          description: '地区：china/global，默认china',
        },
      },
      output: textOutput,
      async execute(args: any) {
        const useCase = args.use_case as 'code' | 'writing' | 'chat' | 'long-context' | 'reasoning';
        const budget = args.monthly_budget ?? config.defaultBudget;
        const region = (args.region ?? config.defaultRegion) as 'china' | 'global';

        const filtered = TOKEN_PLANS.filter((p) => p.region === region || region === 'global');
        const { best, alternatives } = recommendByUseCase(filtered, useCase, budget);

        const lines: string[] = [];
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
        return lines.join('\n');
      },
    }),
  );

  // ========== 工具3：token_plan_list 列出所有套餐 ==========
  ctx.tools.register(
    defineTool({
      name: 'token_plan_list',
      description:
        '列出数据库中所有大模型 token 套餐的基本信息。当用户想了解"有哪些大模型API"、"支持哪些厂商"时使用。',
      parameters: {
        region: {
          type: 'string',
          description: '地区过滤：china/global/all，默认all',
        },
        provider: {
          type: 'string',
          description: '指定厂商名称，如 "DeepSeek"',
        },
      },
      output: textOutput,
      async execute(args: any) {
        const region = args.region as string;
        const provider = args.provider as string | undefined;

        let plans = TOKEN_PLANS.filter((p) => p.planType === 'api');
        if (region && region !== 'all') {
          plans = plans.filter((p) => p.region === region);
        }
        if (provider) {
          plans = plans.filter((p) => p.provider.includes(provider));
        }

        const lines: string[] = [];
        lines.push(`=== 大模型 API 套餐列表（共 ${plans.length} 个）===`);
        lines.push('');

        const byProvider = new Map<string, typeof plans>();
        plans.forEach((p) => {
          if (!byProvider.has(p.provider)) byProvider.set(p.provider, []);
          byProvider.get(p.provider)!.push(p);
        });

        for (const [prov, ps] of byProvider) {
          lines.push(`【${prov}】`);
          ps.forEach((p) => {
            lines.push(
              `  - ${p.model}: 输入 ¥${p.inputPrice}/百万, 输出 ¥${p.outputPrice}/百万, 上下文 ${(p.contextWindow / 1000).toFixed(0)}K${p.cachePrice ? `, 缓存 ¥${p.cachePrice}` : ''}`,
            );
          });
          lines.push('');
        }

        lines.push(`数据更新于 ${DATA_UPDATED_AT}，以官方价格为准。`);
        return lines.join('\n');
      },
    }),
  );

  ctx.logger.info(`token-plan-compare: 已注册 3 个工具，共 ${TOKEN_PLANS.length} 个套餐数据（更新于 ${DATA_UPDATED_AT}）`);
}
