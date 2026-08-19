/**
 * Token 套餐性价比计算工具
 */
/**
 * 计算单个套餐的有效单价
 */
export function calcEffectivePrice(plan, inputRatio = 0.7, cacheHitRate = 0) {
    // 资源包类型：按包价/包量算
    if (plan.planType === 'resource-pack' && plan.packPrice && plan.packTokens) {
        return plan.packPrice / plan.packTokens;
    }
    // 订阅制类型：按月费/月额度算
    if (plan.planType === 'subscription' && plan.monthlyPrice && plan.monthlyQuota) {
        return plan.monthlyPrice / plan.monthlyQuota;
    }
    // API 按量付费
    const outputRatio = 1 - inputRatio;
    let price = plan.inputPrice * inputRatio + plan.outputPrice * outputRatio;
    // 考虑缓存命中（缓存只影响输入部分）
    if (cacheHitRate > 0 && plan.cachePrice !== undefined) {
        const cachedInput = plan.inputPrice * (1 - cacheHitRate) + plan.cachePrice * cacheHitRate;
        price = cachedInput * inputRatio + plan.outputPrice * outputRatio;
    }
    return price;
}
/**
 * 计算性价比分数（0-100）
 * 综合考虑：单价越低分越高，能力越强分越高
 */
export function calcValueScore(effectivePrice, capabilityScore) {
    if (effectivePrice <= 0)
        return 0;
    // 单价维度：对数缩放，1元/百万token=60分，0.1元=80分，10元=40分
    const priceScore = Math.max(0, Math.min(100, 80 - Math.log10(effectivePrice) * 20));
    // 能力维度：线性
    const capScore = capabilityScore * 5; // 0-50
    // 加权：价格占 60%，能力占 40%
    return Math.round(priceScore * 0.6 + capScore * 0.4);
}
/**
 * 生成推荐理由
 */
function generateReason(plan, result) {
    const reasons = [];
    if (result.effectivePrice < 1) {
        reasons.push(`单价极低（¥${result.effectivePrice.toFixed(2)}/百万token）`);
    }
    else if (result.effectivePrice < 5) {
        reasons.push(`单价实惠（¥${result.effectivePrice.toFixed(1)}/百万token）`);
    }
    if (plan.capabilityScore >= 9) {
        reasons.push('旗舰级能力');
    }
    else if (plan.capabilityScore >= 8) {
        reasons.push('能力优秀');
    }
    if (plan.cachePrice !== undefined && plan.cachePrice < plan.inputPrice * 0.5) {
        reasons.push(`缓存命中价低至 ¥${plan.cachePrice}/百万token`);
    }
    if (plan.contextWindow >= 1000000) {
        reasons.push(`百万级长上下文（${(plan.contextWindow / 1000000).toFixed(1)}M）`);
    }
    else if (plan.contextWindow >= 200000) {
        reasons.push(`长上下文（${(plan.contextWindow / 1000).toFixed(0)}K）`);
    }
    if (plan.note) {
        reasons.push(plan.note);
    }
    return reasons.join('；');
}
/**
 * 对比所有套餐，按性价比排序
 */
export function comparePlans(plans, options = {}) {
    const { monthlyBudget = 100, useCase, inputRatio = 0.7, region, providers, cacheHitRate = 0, minCapability = 0, } = options;
    let filtered = plans.filter((p) => {
        // 过滤掉资源包中 capabilityScore=0 的（那些是通用折扣，不参与模型对比）
        if (p.planType === 'resource-pack' && p.capabilityScore === 0)
            return false;
        if (region && p.region !== region)
            return false;
        if (providers && providers.length > 0 && !providers.includes(p.provider))
            return false;
        if (minCapability > 0 && p.capabilityScore < minCapability)
            return false;
        if (useCase && !p.capabilities.includes(useCase))
            return false;
        return true;
    });
    const results = filtered.map((plan) => {
        const effectivePrice = calcEffectivePrice(plan, inputRatio, cacheHitRate);
        const tokensPerYuan = effectivePrice > 0 ? 1 / effectivePrice : 0;
        const monthlyTokens = tokensPerYuan * monthlyBudget;
        const valueScore = calcValueScore(effectivePrice, plan.capabilityScore);
        const capabilityPerPrice = plan.capabilityScore / Math.max(effectivePrice, 0.01);
        const result = {
            plan,
            effectivePrice,
            tokensPerYuan,
            monthlyTokens,
            valueScore,
            capabilityPerPrice,
            reason: '',
        };
        result.reason = generateReason(plan, result);
        return result;
    });
    // 按性价比分数降序
    return results.sort((a, b) => b.valueScore - a.valueScore);
}
/**
 * 格式化对比结果为可读文本
 */
export function formatCompareResults(results, topN = 10) {
    if (results.length === 0) {
        return '没有找到符合条件的套餐。';
    }
    const lines = [];
    lines.push('=== Token 套餐性价比对比 ===');
    lines.push('');
    const top = results.slice(0, topN);
    top.forEach((r, i) => {
        const p = r.plan;
        lines.push(`【第 ${i + 1}名】${p.provider} - ${p.model}`);
        lines.push(`  性价比分数: ${r.valueScore}/100`);
        lines.push(`  有效单价: ¥${r.effectivePrice.toFixed(2)}/百万token`);
        lines.push(`  每元可买: ${r.tokensPerYuan.toFixed(2)} 百万token`);
        lines.push(`  月预算可买: ${r.monthlyTokens.toFixed(1)} 百万token`);
        lines.push(`  能力评分: ${p.capabilityScore}/10`);
        lines.push(`  上下文: ${(p.contextWindow / 1000).toFixed(0)}K`);
        lines.push(`  推荐理由: ${r.reason}`);
        lines.push(`  官方链接: ${p.url}`);
        lines.push('');
    });
    lines.push(`--- 数据更新于 ${results[0]?.plan.updatedAt ?? '未知'}，最终价格以官方为准 ---`);
    return lines.join('\n');
}
/**
 * 按使用场景给出推荐
 */
export function recommendByUseCase(plans, useCase, budget) {
    const results = comparePlans(plans, { useCase, monthlyBudget: budget });
    return {
        best: results[0],
        alternatives: results.slice(1, 4),
    };
}
