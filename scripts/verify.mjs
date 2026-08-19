/**
 * 快速验证脚本：测试性价比计算逻辑
 * 运行：node scripts/verify.mjs
 */

import { TOKEN_PLANS, DATA_UPDATED_AT } from '../lib/data/plans.js';
import { comparePlans, formatCompareResults, recommendByUseCase, calcEffectivePrice } from '../lib/utils/compare.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ ${message}`);
  }
}

console.log('=== dsh-token-plan-compare 验证测试 ===\n');

// 测试1：数据完整性
console.log('1. 数据完整性');
assert(TOKEN_PLANS.length > 0, `套餐数量 > 0（实际 ${TOKEN_PLANS.length}）`);
assert(TOKEN_PLANS.every(p => p.provider && p.model && p.inputPrice >= 0 && p.outputPrice >= 0), '所有套餐有必填字段');
assert(TOKEN_PLANS.some(p => p.provider === 'DeepSeek'), '包含 DeepSeek');
assert(TOKEN_PLANS.some(p => p.provider === 'OpenAI'), '包含 OpenAI');
assert(TOKEN_PLANS.some(p => p.region === 'china'), '有国内厂商');
assert(TOKEN_PLANS.some(p => p.region === 'global'), '有海外厂商');

// 测试2：有效单价计算
console.log('\n2. 有效单价计算');
const testPlan = TOKEN_PLANS.find(p => p.model === 'DeepSeek V4-Pro');
assert(testPlan, '找到 DeepSeek V4-Pro');
if (testPlan) {
  const price = calcEffectivePrice(testPlan, 0.7, 0);
  const expected = 3 * 0.7 + 6 * 0.3;
  assert(Math.abs(price - expected) < 0.01, `V4-Pro 有效单价计算正确（${price.toFixed(2)} ≈ ${expected}）`);
}

// 测试3：性价比排序
console.log('\n3. 性价比排序');
const results = comparePlans(TOKEN_PLANS, { region: 'china' });
assert(results.length > 0, '国内套餐对比有结果');
assert(results.every((r, i, arr) => i === 0 || arr[i - 1].valueScore >= r.valueScore), '按性价比分数降序排列');
assert(results[0].effectivePrice > 0, '第一名有效单价 > 0');
assert(results[0].tokensPerYuan > 0, '第一名每元可买token > 0');

// 测试4：场景推荐
console.log('\n4. 场景推荐');
const codeRec = recommendByUseCase(TOKEN_PLANS.filter(p => p.region === 'china'), 'code', 100);
assert(codeRec.best, '代码场景有推荐');
assert(codeRec.best.plan.capabilities.includes('code'), '推荐模型支持代码场景');
assert(codeRec.alternatives.length > 0, '有备选方案');

// 测试5：格式化输出
console.log('\n5. 格式化输出');
const text = formatCompareResults(results, 3);
assert(text.includes('性价比分数'), '输出包含性价比分数');
assert(text.includes('有效单价'), '输出包含有效单价');
assert(text.includes('官方链接'), '输出包含官方链接');
assert(text.includes(DATA_UPDATED_AT), '输出包含数据更新日期');

// 测试6：过滤功能
console.log('\n6. 过滤功能');
const deepseekOnly = comparePlans(TOKEN_PLANS, { providers: ['DeepSeek'] });
assert(deepseekOnly.every(r => r.plan.provider === 'DeepSeek'), '按厂商过滤正确');
const highCap = comparePlans(TOKEN_PLANS, { minCapability: 9 });
assert(highCap.every(r => r.plan.capabilityScore >= 9), '按能力评分过滤正确');

console.log(`\n=== 结果：${passed} 通过，${failed} 失败 ===`);
process.exit(failed > 0 ? 1 : 0);
