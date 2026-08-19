/**
 * 各家大模型 API / 订阅套餐数据
 * 数据更新时间：2026-08-19
 * 价格单位：元 / 百万 Tokens（国内厂商）或 美元 / 百万 Tokens（海外厂商，汇率按 7.2 折算）
 * 最终价格请以各厂商官方公示为准
 */
export type PlanType = 'api' | 'subscription' | 'resource-pack';
export type Region = 'china' | 'global';
export type UseCase = 'code' | 'writing' | 'chat' | 'long-context' | 'reasoning';
export interface TokenPlan {
    /** 厂商名称 */
    provider: string;
    /** 模型名称 */
    model: string;
    /** 套餐类型 */
    planType: PlanType;
    /** 输入价格（元/百万token），合并计费时与 output 相同 */
    inputPrice: number;
    /** 输出价格（元/百万token） */
    outputPrice: number;
    /** 缓存命中价格（元/百万token），无则 undefined */
    cachePrice?: number;
    /** 订阅制月费（元），仅 subscription 类型 */
    monthlyPrice?: number;
    /** 订阅制月额度（百万token），仅 subscription 类型 */
    monthlyQuota?: number;
    /** 资源包价格（元），仅 resource-pack 类型 */
    packPrice?: number;
    /** 资源包 token 量（百万），仅 resource-pack 类型 */
    packTokens?: number;
    /** 上下文窗口（token） */
    contextWindow: number;
    /** 适用地区 */
    region: Region;
    /** 能力标签 */
    capabilities: UseCase[];
    /** 模型能力评分（0-10，主观综合评估） */
    capabilityScore: number;
    /** 官方价格页链接 */
    url: string;
    /** 备注 */
    note?: string;
    /** 数据更新日期 */
    updatedAt: string;
}
export declare const TOKEN_PLANS: TokenPlan[];
/** 数据更新时间 */
export declare const DATA_UPDATED_AT = "2026-08-19";
/** 美元兑人民币汇率 */
export declare const USD_CNY_RATE = 7.2;
