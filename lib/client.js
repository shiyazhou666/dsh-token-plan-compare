// dsh-token-plan-compare client bundle
// Generated: 2026-08-19T06:06:57.982Z
window.__ModuleLoader__ && window.__ModuleLoader__.load({
  id: 'dsh-token-plan-compare',
  factory: function() {
    "use strict";
    var __dsh_tpc__ = (() => {
      var __defProp = Object.defineProperty;
      var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames = Object.getOwnPropertyNames;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name2 in all)
          __defProp(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
              __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    
      // src/client.ts
      var client_exports = {};
      __export(client_exports, {
        apply: () => apply,
        inject: () => inject,
        name: () => name
      });
    
      // src/data/plans.ts
      var USD_TO_CNY = 7.2;
      var TOKEN_PLANS = [
        // ==================== DeepSeek 深度求索 ====================
        {
          provider: "DeepSeek",
          model: "DeepSeek V4-Pro",
          planType: "api",
          inputPrice: 3,
          outputPrice: 6,
          cachePrice: 0.025,
          contextWindow: 128e3,
          region: "china",
          capabilities: ["code", "reasoning", "chat"],
          capabilityScore: 9,
          url: "https://api-docs.deepseek.com/quick_start/pricing",
          note: "\u5F53\u524D\u4EAB 2.5 \u6298\u4F18\u60E0\uFF1B\u4EE3\u7801\u80FD\u529B\u5F3A\uFF0C\u63A8\u7406\u4F18\u79C0",
          updatedAt: "2026-08-19"
        },
        {
          provider: "DeepSeek",
          model: "DeepSeek V4-Flash",
          planType: "api",
          inputPrice: 0.5,
          outputPrice: 1.5,
          cachePrice: 0.025,
          contextWindow: 128e3,
          region: "china",
          capabilities: ["chat", "code"],
          capabilityScore: 7.5,
          url: "https://api-docs.deepseek.com/quick_start/pricing",
          note: "\u9AD8\u6027\u4EF7\u6BD4\u8F7B\u91CF\u6A21\u578B",
          updatedAt: "2026-08-19"
        },
        // ==================== 通义千问 阿里云百炼 ====================
        {
          provider: "\u901A\u4E49\u5343\u95EE",
          model: "Qwen3.7-Max",
          planType: "api",
          inputPrice: 12,
          outputPrice: 36,
          contextWindow: 2e6,
          region: "china",
          capabilities: ["reasoning", "long-context", "code"],
          capabilityScore: 9.2,
          url: "https://help.aliyun.com/zh/model-studio/models",
          note: "\u65D7\u8230\u6A21\u578B\uFF0C\u652F\u6301\u4E0A\u4E0B\u6587\u7F13\u5B58\u6298\u6263",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u901A\u4E49\u5343\u95EE",
          model: "Qwen3.6-Plus",
          planType: "api",
          inputPrice: 2,
          outputPrice: 12,
          contextWindow: 1e6,
          region: "china",
          capabilities: ["writing", "chat", "long-context"],
          capabilityScore: 8.2,
          url: "https://help.aliyun.com/zh/model-studio/models",
          note: "0-256K \u8F93\u5165 \xA52\uFF0C256K-1M \u8F93\u5165 \xA58\uFF1B\u601D\u8003\u6A21\u5F0F\u8F93\u51FA \xA512",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u901A\u4E49\u5343\u95EE",
          model: "Qwen-Plus",
          planType: "api",
          inputPrice: 0.8,
          outputPrice: 2,
          contextWindow: 1e6,
          region: "china",
          capabilities: ["chat", "writing"],
          capabilityScore: 7.8,
          url: "https://help.aliyun.com/zh/model-studio/models",
          note: "0-128K \u533A\u95F4\u4EF7\uFF1B\u957F\u4E0A\u4E0B\u6587\u9636\u68AF\u6DA8\u4EF7",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u901A\u4E49\u5343\u95EE",
          model: "Qwen-Flash",
          planType: "api",
          inputPrice: 0.15,
          outputPrice: 1.5,
          contextWindow: 1e6,
          region: "china",
          capabilities: ["chat"],
          capabilityScore: 6.5,
          url: "https://help.aliyun.com/zh/model-studio/models",
          note: "\u4F4E\u6210\u672C\u5927\u541E\u5410\u91CF\u5165\u53E3\uFF1B0-128K \u533A\u95F4\u4EF7",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u901A\u4E49\u5343\u95EE",
          model: "Qwen-Turbo",
          planType: "api",
          inputPrice: 0.3,
          outputPrice: 0.6,
          contextWindow: 128e3,
          region: "china",
          capabilities: ["chat"],
          capabilityScore: 6,
          url: "https://help.aliyun.com/zh/model-studio/models",
          note: "\u5927\u89C4\u6A21\u57FA\u7840\u6587\u672C\u8BF7\u6C42\u6700\u4F4E\u4EF7",
          updatedAt: "2026-08-19"
        },
        // 通义千问节省计划（资源包）
        {
          provider: "\u901A\u4E49\u5343\u95EE",
          model: "\u767E\u70BC\u8282\u7701\u8BA1\u5212 \xA510000\u6863",
          planType: "resource-pack",
          inputPrice: 0,
          outputPrice: 0,
          packPrice: 1e4,
          packTokens: 0,
          contextWindow: 0,
          region: "china",
          capabilities: ["chat", "writing", "code"],
          capabilityScore: 0,
          url: "https://help.aliyun.com/zh/model-studio/savings-plan-and-resource-package",
          note: "\u5145\u503C \xA510000 \u4EAB 7 \u6298\uFF0C\u9002\u7528\u4E8E\u6240\u6709\u767E\u70BC\u6A21\u578B\uFF0C\u6309\u5B9E\u9645\u6A21\u578B\u5355\u4EF7\u6298\u7B97",
          updatedAt: "2026-08-19"
        },
        // ==================== Kimi 月之暗面 ====================
        {
          provider: "Kimi",
          model: "Kimi K2.6",
          planType: "api",
          inputPrice: 6.5,
          outputPrice: 27,
          cachePrice: 1.1,
          contextWindow: 256e3,
          region: "china",
          capabilities: ["long-context", "reasoning", "writing"],
          capabilityScore: 8.8,
          url: "https://platform.moonshot.cn/docs/pricing",
          note: "\u957F\u6587\u672C\u5904\u7406\u5F3A\uFF0C\u7F13\u5B58\u547D\u4E2D\u4EF7 \xA51.1",
          updatedAt: "2026-08-19"
        },
        {
          provider: "Kimi",
          model: "Kimi K2.5",
          planType: "api",
          inputPrice: 4,
          outputPrice: 21,
          cachePrice: 0.7,
          contextWindow: 256e3,
          region: "china",
          capabilities: ["long-context", "chat", "writing"],
          capabilityScore: 8.2,
          url: "https://platform.moonshot.cn/docs/pricing",
          note: "K2 \u7CFB\u5217\u6027\u4EF7\u6BD4\u5165\u53E3",
          updatedAt: "2026-08-19"
        },
        // ==================== 智谱 GLM ====================
        {
          provider: "\u667A\u8C31 GLM",
          model: "GLM-5.2",
          planType: "api",
          inputPrice: 8,
          outputPrice: 28,
          cachePrice: 2,
          contextWindow: 2e5,
          region: "china",
          capabilities: ["reasoning", "code", "writing"],
          capabilityScore: 8.8,
          url: "https://open.bigmodel.cn/pricing",
          note: "\u65D7\u8230\u6A21\u578B\uFF0C\u7F13\u5B58\u547D\u4E2D \xA52",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u667A\u8C31 GLM",
          model: "GLM-4-Plus",
          planType: "api",
          inputPrice: 5,
          outputPrice: 5,
          contextWindow: 128e3,
          region: "china",
          capabilities: ["writing", "chat"],
          capabilityScore: 7.8,
          url: "https://open.bigmodel.cn/pricing",
          note: "\u8F93\u5165\u8F93\u51FA\u5408\u5E76\u8BA1\u8D39 \xA55/\u767E\u4E07token",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u667A\u8C31 GLM",
          model: "GLM-4-Air",
          planType: "api",
          inputPrice: 0.5,
          outputPrice: 0.5,
          contextWindow: 128e3,
          region: "china",
          capabilities: ["chat"],
          capabilityScore: 6.8,
          url: "https://open.bigmodel.cn/pricing",
          note: "\u5408\u5E76\u8BA1\u8D39\uFF0C\u5747\u8861\u6210\u672C\u6863",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u667A\u8C31 GLM",
          model: "GLM-4-FlashX",
          planType: "api",
          inputPrice: 0.1,
          outputPrice: 0.1,
          contextWindow: 128e3,
          region: "china",
          capabilities: ["chat"],
          capabilityScore: 5.5,
          url: "https://open.bigmodel.cn/pricing",
          note: "\u5408\u5E76\u8BA1\u8D39\uFF0C\u8D85\u4F4E\u4EF7\u6587\u672C\u6863",
          updatedAt: "2026-08-19"
        },
        // ==================== 字节豆包 / Seed ====================
        {
          provider: "\u5B57\u8282\u8C46\u5305",
          model: "Seed 1.6",
          planType: "api",
          inputPrice: 0.8,
          outputPrice: 8,
          contextWindow: 262e3,
          region: "china",
          capabilities: ["code", "writing", "chat"],
          capabilityScore: 8.5,
          url: "https://www.volcengine.com/docs/82379/1099455",
          note: "\u5B57\u8282\u65D7\u8230\u6A21\u578B",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u5B57\u8282\u8C46\u5305",
          model: "Seed-2.0-Lite",
          planType: "api",
          inputPrice: 0.6,
          outputPrice: 3.6,
          contextWindow: 262e3,
          region: "china",
          capabilities: ["chat", "writing"],
          capabilityScore: 7.5,
          url: "https://www.volcengine.com/docs/82379/1099455",
          note: "\u8F7B\u91CF\u7248",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u5B57\u8282\u8C46\u5305",
          model: "Seed-2.0-Mini",
          planType: "api",
          inputPrice: 0.2,
          outputPrice: 2,
          contextWindow: 262e3,
          region: "china",
          capabilities: ["chat"],
          capabilityScore: 6.5,
          url: "https://www.volcengine.com/docs/82379/1099455",
          note: "\u8FF7\u4F60\u7248",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u5B57\u8282\u8C46\u5305",
          model: "Doubao 1.5 Lite",
          planType: "api",
          inputPrice: 0.3,
          outputPrice: 0.6,
          contextWindow: 32e3,
          region: "china",
          capabilities: ["chat"],
          capabilityScore: 5.8,
          url: "https://www.volcengine.com/docs/82379/1099455",
          note: "\u8D85\u4F4E\u4EF7",
          updatedAt: "2026-08-19"
        },
        // 豆包资源包
        {
          provider: "\u5B57\u8282\u8C46\u5305",
          model: "1000\u4E07Token\u8D44\u6E90\u5305",
          planType: "resource-pack",
          inputPrice: 0,
          outputPrice: 0,
          packPrice: 19.9,
          packTokens: 10,
          contextWindow: 0,
          region: "china",
          capabilities: ["chat"],
          capabilityScore: 0,
          url: "https://www.volcengine.com/docs/82379/1099455",
          note: "\u65B0\u5BA2\u4E13\u4EAB\u7EA64\u6298\uFF0C\u9002\u7528\u4E8E\u6307\u5B9A\u6A21\u578B",
          updatedAt: "2026-08-19"
        },
        // ==================== 腾讯混元 ====================
        {
          provider: "\u817E\u8BAF\u6DF7\u5143",
          model: "Hunyuan A13B",
          planType: "api",
          inputPrice: 0.95,
          outputPrice: 3.87,
          contextWindow: 131e3,
          region: "china",
          capabilities: ["chat", "writing"],
          capabilityScore: 7,
          url: "https://cloud.tencent.com/document/product/1823/130055",
          note: "\u817E\u8BAF\u4E91 TokenHub",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u817E\u8BAF\u6DF7\u5143",
          model: "Hunyuan Hy3",
          planType: "api",
          inputPrice: 1.22,
          outputPrice: 4.07,
          cachePrice: 0.06,
          contextWindow: 262e3,
          region: "china",
          capabilities: ["chat", "reasoning"],
          capabilityScore: 7.5,
          url: "https://cloud.tencent.com/document/product/1823/130055",
          note: "\u5CF0\u8C37\u5B9A\u4EF7\uFF0C\u7A7A\u95F2\u65F6\u6BB5\u534A\u4EF7",
          updatedAt: "2026-08-19"
        },
        // ==================== 百度文心 ====================
        {
          provider: "\u767E\u5EA6\u6587\u5FC3",
          model: "ERNIE 4.5",
          planType: "api",
          inputPrice: 2.85,
          outputPrice: 8.49,
          contextWindow: 128e3,
          region: "china",
          capabilities: ["writing", "chat"],
          capabilityScore: 7.5,
          url: "https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Blfmc9dlf",
          note: "\u767E\u5EA6\u65D7\u8230",
          updatedAt: "2026-08-19"
        },
        // ==================== 阶跃星辰 ====================
        {
          provider: "\u9636\u8DC3\u661F\u8FB0",
          model: "Step 3.7 Flash",
          planType: "api",
          inputPrice: 1.35,
          outputPrice: 8.1,
          cachePrice: 0.04,
          contextWindow: 262e3,
          region: "china",
          capabilities: ["long-context", "writing"],
          capabilityScore: 7.8,
          url: "https://platform.stepfun.com/docs/pricing",
          note: "\u591A\u6A21\u6001\u80FD\u529B",
          updatedAt: "2026-08-19"
        },
        {
          provider: "\u9636\u8DC3\u661F\u8FB0",
          model: "Step 3.5 Flash",
          planType: "api",
          inputPrice: 0.68,
          outputPrice: 2.04,
          contextWindow: 262e3,
          region: "china",
          capabilities: ["chat"],
          capabilityScore: 6.8,
          url: "https://platform.stepfun.com/docs/pricing",
          note: "\u9AD8\u6027\u4EF7\u6BD4",
          updatedAt: "2026-08-19"
        },
        // ==================== 小米 MiMo ====================
        {
          provider: "\u5C0F\u7C73",
          model: "MiMo 2.5 Pro",
          planType: "api",
          inputPrice: 2.95,
          outputPrice: 5.91,
          contextWindow: 105e4,
          region: "china",
          capabilities: ["long-context", "chat"],
          capabilityScore: 7.5,
          url: "https://platform.xiaomi.com/pricing",
          note: "\u767E\u4E07\u4E0A\u4E0B\u6587",
          updatedAt: "2026-08-19"
        },
        // ==================== OpenAI（海外，美元折算） ====================
        {
          provider: "OpenAI",
          model: "GPT-5.5",
          planType: "api",
          inputPrice: 5 * USD_TO_CNY,
          outputPrice: 30 * USD_TO_CNY,
          cachePrice: 0.5 * USD_TO_CNY,
          contextWindow: 2e5,
          region: "global",
          capabilities: ["reasoning", "code", "writing"],
          capabilityScore: 9.5,
          url: "https://openai.com/api/pricing/",
          note: "\u77ED\u4E0A\u4E0B\u6587\u4EF7\uFF1B\u957F\u4E0A\u4E0B\u6587\u8F93\u5165 $10/\u8F93\u51FA $45\uFF1BBatch \u534A\u4EF7",
          updatedAt: "2026-08-19"
        },
        {
          provider: "OpenAI",
          model: "GPT-5.4",
          planType: "api",
          inputPrice: 2.5 * USD_TO_CNY,
          outputPrice: 15 * USD_TO_CNY,
          cachePrice: 0.25 * USD_TO_CNY,
          contextWindow: 2e5,
          region: "global",
          capabilities: ["reasoning", "code", "writing"],
          capabilityScore: 9,
          url: "https://openai.com/api/pricing/",
          note: "\u4E2D\u9AD8\u7AEF\u5747\u8861\uFF1BBatch \u534A\u4EF7",
          updatedAt: "2026-08-19"
        },
        {
          provider: "OpenAI",
          model: "GPT-5.4 Mini",
          planType: "api",
          inputPrice: 0.75 * USD_TO_CNY,
          outputPrice: 4.5 * USD_TO_CNY,
          cachePrice: 0.075 * USD_TO_CNY,
          contextWindow: 2e5,
          region: "global",
          capabilities: ["chat", "code"],
          capabilityScore: 7.8,
          url: "https://openai.com/api/pricing/",
          note: "\u9AD8\u5E76\u53D1\u4E3B\u529B\u8F7B\u91CF\u6863",
          updatedAt: "2026-08-19"
        },
        {
          provider: "OpenAI",
          model: "GPT-5.4 Nano",
          planType: "api",
          inputPrice: 0.2 * USD_TO_CNY,
          outputPrice: 1.25 * USD_TO_CNY,
          cachePrice: 0.02 * USD_TO_CNY,
          contextWindow: 2e5,
          region: "global",
          capabilities: ["chat"],
          capabilityScore: 6,
          url: "https://openai.com/api/pricing/",
          note: "\u6781\u81F4\u6210\u672C\u63A7\u5236\uFF0C\u5206\u7C7B/\u6E05\u6D17/\u9884\u5904\u7406",
          updatedAt: "2026-08-19"
        },
        // ==================== Anthropic Claude（海外） ====================
        {
          provider: "Anthropic",
          model: "Claude Opus 4.8",
          planType: "api",
          inputPrice: 5 * USD_TO_CNY,
          outputPrice: 25 * USD_TO_CNY,
          cachePrice: 0.5 * USD_TO_CNY,
          contextWindow: 2e5,
          region: "global",
          capabilities: ["reasoning", "code", "writing"],
          capabilityScore: 9.6,
          url: "https://www.anthropic.com/pricing",
          note: "\u65D7\u8230\uFF1B\u7F13\u5B58\u5199\u5165 $6.25\uFF1BBatch 5\u6298",
          updatedAt: "2026-08-19"
        },
        {
          provider: "Anthropic",
          model: "Claude Sonnet 4.6",
          planType: "api",
          inputPrice: 3 * USD_TO_CNY,
          outputPrice: 15 * USD_TO_CNY,
          cachePrice: 0.3 * USD_TO_CNY,
          contextWindow: 2e5,
          region: "global",
          capabilities: ["code", "writing", "reasoning"],
          capabilityScore: 9,
          url: "https://www.anthropic.com/pricing",
          note: "\u4E3B\u529B\u6863\uFF0C\u8D28\u91CF\u4E0E\u6210\u672C\u5E73\u8861",
          updatedAt: "2026-08-19"
        },
        {
          provider: "Anthropic",
          model: "Claude Haiku 4.5",
          planType: "api",
          inputPrice: 1 * USD_TO_CNY,
          outputPrice: 5 * USD_TO_CNY,
          cachePrice: 0.1 * USD_TO_CNY,
          contextWindow: 2e5,
          region: "global",
          capabilities: ["chat", "code"],
          capabilityScore: 7.5,
          url: "https://www.anthropic.com/pricing",
          note: "\u4E2D\u8F7B\u91CF\u6863\uFF0C\u9AD8\u5E76\u53D1",
          updatedAt: "2026-08-19"
        },
        // ==================== Google Gemini（海外） ====================
        {
          provider: "Google",
          model: "Gemini 3.1 Pro",
          planType: "api",
          inputPrice: 2 * USD_TO_CNY,
          outputPrice: 12 * USD_TO_CNY,
          cachePrice: 0.2 * USD_TO_CNY,
          contextWindow: 105e4,
          region: "global",
          capabilities: ["reasoning", "long-context", "code"],
          capabilityScore: 9,
          url: "https://ai.google.dev/pricing",
          note: "\u2264200K \u4EF7\uFF1B>200K \u9636\u68AF\u6DA8\u4EF7\uFF1BBatch/Flex \u534A\u4EF7",
          updatedAt: "2026-08-19"
        },
        {
          provider: "Google",
          model: "Gemini 3 Flash",
          planType: "api",
          inputPrice: 0.5 * USD_TO_CNY,
          outputPrice: 3 * USD_TO_CNY,
          cachePrice: 0.05 * USD_TO_CNY,
          contextWindow: 105e4,
          region: "global",
          capabilities: ["chat", "writing"],
          capabilityScore: 7.5,
          url: "https://ai.google.dev/pricing",
          note: "\u4E3B\u529B\u901A\u7528\u591A\u6A21\u6001",
          updatedAt: "2026-08-19"
        },
        {
          provider: "Google",
          model: "Gemini 3.5 Flash",
          planType: "api",
          inputPrice: 0.5 * USD_TO_CNY,
          outputPrice: 3 * USD_TO_CNY,
          cachePrice: 0.15 * USD_TO_CNY,
          contextWindow: 105e4,
          region: "global",
          capabilities: ["chat", "writing"],
          capabilityScore: 7.8,
          url: "https://ai.google.dev/pricing",
          note: "\u65B0\u4E00\u4EE3 Flash",
          updatedAt: "2026-08-19"
        }
      ];
      var DATA_UPDATED_AT = "2026-08-19";
    
      // src/utils/compare.ts
      function calcEffectivePrice(plan, inputRatio = 0.7, cacheHitRate = 0) {
        if (plan.planType === "resource-pack" && plan.packPrice && plan.packTokens) {
          return plan.packPrice / plan.packTokens;
        }
        if (plan.planType === "subscription" && plan.monthlyPrice && plan.monthlyQuota) {
          return plan.monthlyPrice / plan.monthlyQuota;
        }
        const outputRatio = 1 - inputRatio;
        let price = plan.inputPrice * inputRatio + plan.outputPrice * outputRatio;
        if (cacheHitRate > 0 && plan.cachePrice !== void 0) {
          const cachedInput = plan.inputPrice * (1 - cacheHitRate) + plan.cachePrice * cacheHitRate;
          price = cachedInput * inputRatio + plan.outputPrice * outputRatio;
        }
        return price;
      }
      function calcValueScore(effectivePrice, capabilityScore) {
        if (effectivePrice <= 0) return 0;
        const priceScore = Math.max(0, Math.min(100, 80 - Math.log10(effectivePrice) * 20));
        const capScore = capabilityScore * 5;
        return Math.round(priceScore * 0.6 + capScore * 0.4);
      }
      function generateReason(plan, result) {
        const reasons = [];
        if (result.effectivePrice < 1) {
          reasons.push(`\u5355\u4EF7\u6781\u4F4E\uFF08\xA5${result.effectivePrice.toFixed(2)}/\u767E\u4E07token\uFF09`);
        } else if (result.effectivePrice < 5) {
          reasons.push(`\u5355\u4EF7\u5B9E\u60E0\uFF08\xA5${result.effectivePrice.toFixed(1)}/\u767E\u4E07token\uFF09`);
        }
        if (plan.capabilityScore >= 9) {
          reasons.push("\u65D7\u8230\u7EA7\u80FD\u529B");
        } else if (plan.capabilityScore >= 8) {
          reasons.push("\u80FD\u529B\u4F18\u79C0");
        }
        if (plan.cachePrice !== void 0 && plan.cachePrice < plan.inputPrice * 0.5) {
          reasons.push(`\u7F13\u5B58\u547D\u4E2D\u4EF7\u4F4E\u81F3 \xA5${plan.cachePrice}/\u767E\u4E07token`);
        }
        if (plan.contextWindow >= 1e6) {
          reasons.push(`\u767E\u4E07\u7EA7\u957F\u4E0A\u4E0B\u6587\uFF08${(plan.contextWindow / 1e6).toFixed(1)}M\uFF09`);
        } else if (plan.contextWindow >= 2e5) {
          reasons.push(`\u957F\u4E0A\u4E0B\u6587\uFF08${(plan.contextWindow / 1e3).toFixed(0)}K\uFF09`);
        }
        if (plan.note) {
          reasons.push(plan.note);
        }
        return reasons.join("\uFF1B");
      }
      function comparePlans(plans, options = {}) {
        const {
          monthlyBudget = 100,
          useCase,
          inputRatio = 0.7,
          region,
          providers,
          cacheHitRate = 0,
          minCapability = 0
        } = options;
        let filtered = plans.filter((p) => {
          if (p.planType === "resource-pack" && p.capabilityScore === 0) return false;
          if (region && p.region !== region) return false;
          if (providers && providers.length > 0 && !providers.includes(p.provider)) return false;
          if (minCapability > 0 && p.capabilityScore < minCapability) return false;
          if (useCase && !p.capabilities.includes(useCase)) return false;
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
            reason: ""
          };
          result.reason = generateReason(plan, result);
          return result;
        });
        return results.sort((a, b) => b.valueScore - a.valueScore);
      }
    
      // src/client.ts
      var name = "token-plan-compare-client";
      var inject = ["webview"];
      function apply(ctx) {
        ctx.webview.registerSidebarTab({
          id: "token-plan-compare",
          label: "Token \u6027\u4EF7\u6BD4",
          render(el) {
            renderApp(el, ctx);
          }
        });
      }
      var state = {
        monthlyBudget: 100,
        useCase: "",
        inputRatio: 0.7,
        region: "china",
        cacheHitRate: 0,
        minCapability: 0,
        sortBy: "value"
      };
      function renderApp(el, ctx) {
        el.innerHTML = `
        <div class="tpc-container" style="padding:16px;font-family:system-ui,-apple-system,sans-serif;color:var(--tpc-text,#1f2329);height:100%;overflow-y:auto;box-sizing:border-box;">
          <style>
            .tpc-container * { box-sizing: border-box; }
            .tpc-title { font-size:18px;font-weight:700;margin:0 0 4px; }
            .tpc-subtitle { font-size:12px;color:#8f959e;margin:0 0 16px; }
            .tpc-form { display:flex;flex-direction:column;gap:12px;margin-bottom:16px; }
            .tpc-field { display:flex;flex-direction:column;gap:4px; }
            .tpc-field label { font-size:12px;font-weight:600;color:#4e5969; }
            .tpc-field input, .tpc-field select {
              padding:6px 10px;border:1px solid #e5e6eb;border-radius:6px;font-size:13px;
              background:var(--tpc-bg,#fff);color:var(--tpc-text,#1f2329);
            }
            .tpc-field input:focus, .tpc-field select:focus { outline:2px solid #3370ff;outline-offset:-1px; }
            .tpc-row { display:flex;gap:12px; }
            .tpc-row .tpc-field { flex:1; }
            .tpc-btn {
              padding:8px 16px;background:#3370ff;color:#fff;border:none;border-radius:6px;
              font-size:13px;font-weight:600;cursor:pointer;margin-top:4px;
            }
            .tpc-btn:hover { background:#2860e0; }
            .tpc-result-summary {
              background:linear-gradient(135deg,#f0f5ff 0%,#e8f0ff 100%);
              border-radius:8px;padding:12px;margin-bottom:12px;font-size:13px;
            }
            .tpc-result-summary strong { color:#3370ff; }
            .tpc-table { width:100%;border-collapse:collapse;font-size:12px; }
            .tpc-table th {
              background:#f7f8fa;color:#4e5969;font-weight:600;text-align:left;
              padding:8px 6px;border-bottom:2px solid #e5e6eb;position:sticky;top:0;cursor:pointer;
            }
            .tpc-table th:hover { background:#eef0f3; }
            .tpc-table td { padding:8px 6px;border-bottom:1px solid #f2f3f5;vertical-align:top; }
            .tpc-table tr:hover td { background:#f7f8fa; }
            .tpc-rank { display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;font-size:11px;font-weight:700; }
            .tpc-rank-1 { background:#ffd700;color:#7a5c00; }
            .tpc-rank-2 { background:#c0c0c0;color:#4a4a4a; }
            .tpc-rank-3 { background:#cd7f32;color:#fff; }
            .tpc-rank-n { background:#e5e6eb;color:#86909c; }
            .tpc-score { font-weight:700;color:#3370ff; }
            .tpc-price { font-family:monospace; }
            .tpc-provider { font-weight:600; }
            .tpc-model { color:#4e5969;font-size:11px; }
            .tpc-badge { display:inline-block;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:600;margin-right:3px; }
            .tpc-badge-code { background:#e8f3ff;color:#3370ff; }
            .tpc-badge-write { background:#fff3e8;color:#ff7d00; }
            .tpc-badge-chat { background:#e8ffea;color:#00b42a; }
            .tpc-badge-long { background:#f5e8ff;color:#722ed1; }
            .tpc-badge-reason { background:#ffe8e8;color:#f53f3f; }
            .tpc-note { font-size:11px;color:#86909c;margin-top:12px;line-height:1.5; }
            .tpc-empty { text-align:center;padding:40px;color:#86909c;font-size:13px; }
          </style>
    
          <h2 class="tpc-title">Token \u5957\u9910\u6027\u4EF7\u6BD4\u5BF9\u6BD4</h2>
          <p class="tpc-subtitle">\u6570\u636E\u66F4\u65B0\u4E8E ${DATA_UPDATED_AT} \xB7 \u5171 ${TOKEN_PLANS.filter((p) => p.planType === "api").length} \u4E2A\u6A21\u578B\u5957\u9910</p>
    
          <div class="tpc-form">
            <div class="tpc-row">
              <div class="tpc-field">
                <label>\u6708\u9884\u7B97\uFF08\u5143\uFF09</label>
                <input type="number" id="tpc-budget" value="${state.monthlyBudget}" min="1" />
              </div>
              <div class="tpc-field">
                <label>\u4F7F\u7528\u573A\u666F</label>
                <select id="tpc-usecase">
                  <option value="">\u5168\u90E8\u573A\u666F</option>
                  <option value="code">\u5199\u4EE3\u7801</option>
                  <option value="writing">\u5199\u4F5C/\u6587\u6848</option>
                  <option value="chat">\u65E5\u5E38\u5BF9\u8BDD</option>
                  <option value="long-context">\u957F\u6587\u672C</option>
                  <option value="reasoning">\u6DF1\u5EA6\u63A8\u7406</option>
                </select>
              </div>
            </div>
            <div class="tpc-row">
              <div class="tpc-field">
                <label>\u8F93\u5165 Token \u5360\u6BD4\uFF1A<span id="tpc-ratio-val">${Math.round(state.inputRatio * 100)}%</span></label>
                <input type="range" id="tpc-ratio" min="0" max="100" value="${Math.round(state.inputRatio * 100)}" />
              </div>
              <div class="tpc-field">
                <label>\u5730\u533A</label>
                <select id="tpc-region">
                  <option value="china">\u4EC5\u56FD\u5185</option>
                  <option value="global">\u542B\u6D77\u5916</option>
                </select>
              </div>
            </div>
            <div class="tpc-row">
              <div class="tpc-field">
                <label>\u7F13\u5B58\u547D\u4E2D\u7387\uFF1A<span id="tpc-cache-val">${Math.round(state.cacheHitRate * 100)}%</span></label>
                <input type="range" id="tpc-cache" min="0" max="90" value="${Math.round(state.cacheHitRate * 100)}" />
              </div>
              <div class="tpc-field">
                <label>\u6700\u4F4E\u80FD\u529B\u8BC4\u5206\uFF1A<span id="tpc-cap-val">${state.minCapability}</span></label>
                <input type="range" id="tpc-cap" min="0" max="10" value="${state.minCapability}" />
              </div>
            </div>
            <button class="tpc-btn" id="tpc-compare">\u5F00\u59CB\u5BF9\u6BD4</button>
          </div>
    
          <div id="tpc-results"></div>
        </div>
      `;
        const budgetEl = el.querySelector("#tpc-budget");
        const usecaseEl = el.querySelector("#tpc-usecase");
        const ratioEl = el.querySelector("#tpc-ratio");
        const ratioVal = el.querySelector("#tpc-ratio-val");
        const regionEl = el.querySelector("#tpc-region");
        const cacheEl = el.querySelector("#tpc-cache");
        const cacheVal = el.querySelector("#tpc-cache-val");
        const capEl = el.querySelector("#tpc-cap");
        const capVal = el.querySelector("#tpc-cap-val");
        const compareBtn = el.querySelector("#tpc-compare");
        const resultsEl = el.querySelector("#tpc-results");
        ratioEl.addEventListener("input", () => {
          ratioVal.textContent = ratioEl.value + "%";
        });
        cacheEl.addEventListener("input", () => {
          cacheVal.textContent = cacheEl.value + "%";
        });
        capEl.addEventListener("input", () => {
          capVal.textContent = capEl.value;
        });
        const doCompare = () => {
          state.monthlyBudget = parseFloat(budgetEl.value) || 100;
          state.useCase = usecaseEl.value;
          state.inputRatio = parseInt(ratioEl.value) / 100;
          state.region = regionEl.value;
          state.cacheHitRate = parseInt(cacheEl.value) / 100;
          state.minCapability = parseInt(capEl.value);
          renderResults(resultsEl);
        };
        compareBtn.addEventListener("click", doCompare);
        doCompare();
      }
      function renderResults(container) {
        const options = {
          monthlyBudget: state.monthlyBudget,
          useCase: state.useCase || void 0,
          inputRatio: state.inputRatio,
          region: state.region,
          cacheHitRate: state.cacheHitRate,
          minCapability: state.minCapability
        };
        const results = comparePlans(TOKEN_PLANS, options);
        if (results.length === 0) {
          container.innerHTML = '<div class="tpc-empty">\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u5957\u9910\uFF0C\u8BF7\u8C03\u6574\u7B5B\u9009\u6761\u4EF6</div>';
          return;
        }
        const best = results[0];
        const summary = `
        <div class="tpc-result-summary">
          \u5171\u627E\u5230 <strong>${results.length}</strong> \u4E2A\u7B26\u5408\u6761\u4EF6\u7684\u5957\u9910\u3002
          \u6700\u4F73\u63A8\u8350\uFF1A<strong>${best.plan.provider} - ${best.plan.model}</strong>\uFF0C
          \u6027\u4EF7\u6BD4\u5206\u6570 <strong>${best.valueScore}/100</strong>\uFF0C
          \u6709\u6548\u5355\u4EF7 \xA5${best.effectivePrice.toFixed(2)}/\u767E\u4E07token\uFF0C
          \u6708\u9884\u7B97\u53EF\u4E70 <strong>${best.monthlyTokens.toFixed(1)}</strong> \u767E\u4E07token\u3002
        </div>
      `;
        const badgeMap = {
          code: "tpc-badge-code",
          writing: "tpc-badge-write",
          chat: "tpc-badge-chat",
          "long-context": "tpc-badge-long",
          reasoning: "tpc-badge-reason"
        };
        const badgeLabel = {
          code: "\u4EE3\u7801",
          writing: "\u5199\u4F5C",
          chat: "\u5BF9\u8BDD",
          "long-context": "\u957F\u6587",
          reasoning: "\u63A8\u7406"
        };
        const rows = results.slice(0, 50).map((r, i) => {
          const rankClass = i === 0 ? "tpc-rank-1" : i === 1 ? "tpc-rank-2" : i === 2 ? "tpc-rank-3" : "tpc-rank-n";
          const badges = r.plan.capabilities.map((c) => `<span class="tpc-badge ${badgeMap[c] || ""}">${badgeLabel[c] || c}</span>`).join("");
          return `
          <tr>
            <td><span class="tpc-rank ${rankClass}">${i + 1}</span></td>
            <td>
              <div class="tpc-provider">${r.plan.provider}</div>
              <div class="tpc-model">${r.plan.model}</div>
              <div style="margin-top:3px">${badges}</div>
            </td>
            <td class="tpc-score">${r.valueScore}</td>
            <td class="tpc-price">\xA5${r.effectivePrice.toFixed(2)}</td>
            <td class="tpc-price">${r.tokensPerYuan.toFixed(2)}M</td>
            <td class="tpc-price">${r.monthlyTokens.toFixed(1)}M</td>
            <td>${r.plan.capabilityScore}/10</td>
            <td style="font-size:11px;color:#86909c;max-width:180px">${r.reason}</td>
          </tr>
        `;
        }).join("");
        container.innerHTML = summary + `
        <div style="overflow-x:auto;">
          <table class="tpc-table">
            <thead>
              <tr>
                <th style="width:36px">#</th>
                <th>\u5382\u5546 / \u6A21\u578B</th>
                <th>\u6027\u4EF7\u6BD4</th>
                <th>\u6709\u6548\u5355\u4EF7</th>
                <th>\u6BCF\u5143\u53EF\u4E70</th>
                <th>\u6708\u53EF\u4E70</th>
                <th>\u80FD\u529B</th>
                <th>\u63A8\u8350\u7406\u7531</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="tpc-note">
          \u6709\u6548\u5355\u4EF7 = \u8F93\u5165\u4EF7\xD7\u8F93\u5165\u5360\u6BD4 + \u8F93\u51FA\u4EF7\xD7\u8F93\u51FA\u5360\u6BD4\uFF08\u542B\u7F13\u5B58\u6298\u6263\uFF09\u3002\u6027\u4EF7\u6BD4\u5206\u6570 = \u4EF7\u683C\u7EF4\u5EA6(60%) + \u80FD\u529B\u7EF4\u5EA6(40%)\u3002<br/>
          \u4EF7\u683C\u6570\u636E\u6765\u6E90\u4E8E\u5404\u5382\u5546\u5B98\u65B9\u516C\u793A\uFF0C\u53EF\u80FD\u968F\u65F6\u53D8\u52A8\uFF0C\u6700\u7EC8\u4EE5\u5B98\u65B9\u4E3A\u51C6\u3002\u6D77\u5916\u5382\u5546\u6309\u6C47\u7387 7.2 \u6298\u7B97\u3002
        </p>
      `;
      }
      return __toCommonJS(client_exports);
    })();
    
    return window.__dsh_tpc__ || (typeof __dsh_tpc__ !== 'undefined' ? __dsh_tpc__ : {});
  }
});
