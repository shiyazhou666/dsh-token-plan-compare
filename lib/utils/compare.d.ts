/**
 * Token 套餐性价比计算工具
 */
import type { TokenPlan, UseCase, Region } from '../data/plans.js';
export interface CompareOptions {
    /** 月预算（元），默认 100 */
    monthlyBudget?: number;
    /** 使用场景 */
    useCase?: UseCase;
    /** 输入 token 占比（0-1），默认 0.7 */
    inputRatio?: number;
    /** 地区过滤 */
    region?: Region;
    /** 指定厂商过滤 */
    providers?: string[];
    /** 是否考虑缓存命中（假设缓存命中率），默认 0（不考虑） */
    cacheHitRate?: number;
    /** 最低能力评分过滤（0-10），默认 0 */
    minCapability?: number;
}
export interface CompareResult {
    plan: TokenPlan;
    /** 综合有效单价（元/百万token） */
    effectivePrice: number;
    /** 每元可买 token 数（百万） */
    tokensPerYuan: number;
    /** 月预算可买 token 数（百万） */
    monthlyTokens: number;
    /** 性价比分数（0-100，越高越划算） */
    valueScore: number;
    /** 能力性价比（能力评分/有效单价） */
    capabilityPerPrice: number;
    /** 推荐理由 */
    reason: string;
}
/**
 * 计算单个套餐的有效单价
 */
export declare function calcEffectivePrice(plan: TokenPlan, inputRatio?: number, cacheHitRate?: number): number;
/**
 * 计算性价比分数（0-100）
 * 综合考虑：单价越低分越高，能力越强分越高
 */
export declare function calcValueScore(effectivePrice: number, capabilityScore: number): number;
/**
 * 对比所有套餐，按性价比排序
 */
export declare function comparePlans(plans: TokenPlan[], options?: CompareOptions): CompareResult[];
/**
 * 格式化对比结果为可读文本
 */
export declare function formatCompareResults(results: CompareResult[], topN?: number): string;
/**
 * 按使用场景给出推荐
 */
export declare function recommendByUseCase(plans: TokenPlan[], useCase: UseCase, budget: number): {
    best: CompareResult;
    alternatives: CompareResult[];
};
