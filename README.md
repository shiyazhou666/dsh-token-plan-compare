# dsh-token-plan-compare

> DeepSeek Harness (DSH) 插件：对比各家大模型 API / 订阅套餐的 token 性价比，帮你找到最划算的选择。

## 功能

### 可视化侧边栏 UI（Web 端）

安装后在 DSH Web UI 侧边栏会出现「**Token 性价比**」标签页，可直接交互：
- 调节月预算、使用场景、输入/输出占比、缓存命中率等参数
- 实时展示性价比排名表格（前50名）
- 显示最佳推荐、有效单价、每元可买 token 数、能力评分等

### Agent 工具

注册 3 个 Agent 可调用的工具：

| 工具名 | 用途 |
|--------|------|
| `token_plan_compare` | 按预算、场景、地区等条件对比所有套餐性价比，返回排名 |
| `token_plan_recommend` | 根据使用场景直接推荐最佳套餐和备选 |
| `token_plan_list` | 列出数据库中所有厂商和模型的价格信息 |

## 支持的厂商（2026-08-19 数据）

**国内：** DeepSeek、通义千问、Kimi、智谱 GLM、字节豆包/Seed、腾讯混元、百度文心、阶跃星辰、小米 MiMo

**海外：** OpenAI (GPT-5.x)、Anthropic (Claude)、Google (Gemini)

共 30+ 个模型套餐，价格单位统一为「元 / 百万 Tokens」（海外厂商按汇率 7.2 折算）。

## 安装

### 从本地文件安装（开发/测试）

```bash
# 克隆或下载本仓库到本地后
dsh plugin --profile web add file:/path/to/dsh-token-plan-compare

# 重启 dsh
dsh web
```

### 从 GitHub 安装

```bash
dsh plugin --profile web add github:YOUR_USERNAME/dsh-token-plan-compare
```

### 验证安装

```bash
dsh --profile web --dump-config | grep token-plan-compare
```

## 使用示例

在 DSH 对话中直接问：

- "帮我对比一下各家大模型 API 的 token 性价比，月预算 200 元"
- "我主要写代码，用哪个模型最划算？"
- "需要处理长文本（100万token上下文），推荐一个便宜的 API"
- "列出所有国内大模型的价格"
- "DeepSeek 和通义千问哪个更便宜？"

## 配置项

在 `cordis.patch.yml` 或 profile 配置中可覆盖：

```yaml
- id: token-plan-compare
  config:
    enabled: true           # 总开关
    defaultBudget: 100      # 默认月预算（元）
    defaultInputRatio: 0.7  # 默认输入token占比
    defaultRegion: china    # 默认地区 china/global
```

## 性价比算法

1. **有效单价** = 输入价 × 输入占比 + 输出价 × 输出占比（考虑缓存命中时用缓存价替换部分输入价）
2. **每元可买 token** = 1 / 有效单价
3. **性价比分数**（0-100）= 价格维度（对数缩放，占60%）+ 能力维度（线性，占40%）
4. 按性价比分数降序排列

> 注意：能力评分为主观综合评估，仅供参考。实际选择请结合你的具体业务需求和模型实测效果。

## 项目结构

```
dsh-token-plan-compare/
├── package.json          # 包声明 + dsh.bundle/dsh.bundles 配置
├── cordis.patch.yml      # Cordis 配置补丁
├── build.mjs             # 客户端 UI 构建脚本（esbuild）
├── tsconfig.json         # TypeScript 配置
├── src/
│   ├── index.ts          # Host 侧入口：注册 3 个 Agent 工具
│   ├── client.ts         # Client 侧入口：侧边栏可视化 UI
│   ├── shims.d.ts        # DSH 运行时类型声明
│   ├── data/
│   │   └── plans.ts      # 各家套餐数据
│   └── utils/
│       └── compare.ts    # 性价比计算逻辑
├── lib/                  # 构建产物（host: index.js, client: client.js）
├── scripts/
│   └── verify.mjs        # 21 项验证测试
└── README.md
```

## 构建

```bash
npm install
npm run build          # 同时构建 host (tsc) 和 client (esbuild)
npm run build:host     # 仅构建 host 侧
npm run build:client   # 仅构建 client 侧
npm test               # 运行 21 项验证测试
```

构建产物在 `lib/` 目录（`index.js` + `client.js`），需随包一起发布。

## 更新数据

编辑 `src/data/plans.ts` 中的 `TOKEN_PLANS` 数组，添加或修改套餐信息，然后重新构建。

数据字段说明见 `src/data/plans.ts` 中的 `TokenPlan` 接口。

## 免责声明

- 价格数据来源于各厂商官方公示，可能随时变动，最终价格以官方为准
- 能力评分为主观评估，不构成购买建议
- 海外厂商价格按固定汇率折算，实际支付可能因汇率波动而不同

## License

MIT
