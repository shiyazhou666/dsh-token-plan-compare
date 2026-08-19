/**
 * dsh-token-plan-compare - Client 侧（浏览器端）
 * 在 DSH Web UI 侧边栏注册一个 Tab，提供可视化的 token 套餐对比界面
 */
import type { Context } from '@deepseek-ai/cordis/client';
export declare const name = "token-plan-compare-client";
export declare const inject: string[];
export declare function apply(ctx: Context): void;
