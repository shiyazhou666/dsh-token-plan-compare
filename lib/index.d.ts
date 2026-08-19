/**
 * dsh-token-plan-compare
 * DeepSeek Harness 插件：对比各家大模型 token 套餐性价比
 */
import type { Context } from '@deepseek-ai/cordis';
export declare const name = "token-plan-compare";
export declare const inject: string[];
export declare const Config: any;
export type TokenPlanCompareConfig = {
    enabled: boolean;
    defaultBudget: number;
    defaultInputRatio: number;
    defaultRegion: string;
};
export declare function apply(ctx: Context, config: TokenPlanCompareConfig): void;
