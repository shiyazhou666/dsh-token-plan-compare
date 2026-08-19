/**
 * dsh-token-plan-compare - Client 侧（浏览器端）
 * 在 DSH Web UI 侧边栏注册一个 Tab，提供可视化的 token 套餐对比界面
 */

import type { Context } from '@deepseek-ai/cordis/client';
import { TOKEN_PLANS, DATA_UPDATED_AT } from './data/plans.js';
import {
  comparePlans,
  formatCompareResults,
  type CompareOptions,
} from './utils/compare.js';

export const name = 'token-plan-compare-client';
export const inject = ['webview'];

export function apply(ctx: Context) {
  ctx.webview.registerSidebarTab({
    id: 'token-plan-compare',
    label: 'Token 性价比',
    render(el: HTMLElement) {
      renderApp(el, ctx);
    },
  });
}

// ========== UI 渲染逻辑 ==========

interface UIState {
  monthlyBudget: number;
  useCase: string;
  inputRatio: number;
  region: string;
  cacheHitRate: number;
  minCapability: number;
  sortBy: 'value' | 'price' | 'capability';
}

const state: UIState = {
  monthlyBudget: 100,
  useCase: '',
  inputRatio: 0.7,
  region: 'china',
  cacheHitRate: 0,
  minCapability: 0,
  sortBy: 'value',
};

function renderApp(el: HTMLElement, ctx: Context) {
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

      <h2 class="tpc-title">Token 套餐性价比对比</h2>
      <p class="tpc-subtitle">数据更新于 ${DATA_UPDATED_AT} · 共 ${TOKEN_PLANS.filter(p => p.planType === 'api').length} 个模型套餐</p>

      <div class="tpc-form">
        <div class="tpc-row">
          <div class="tpc-field">
            <label>月预算（元）</label>
            <input type="number" id="tpc-budget" value="${state.monthlyBudget}" min="1" />
          </div>
          <div class="tpc-field">
            <label>使用场景</label>
            <select id="tpc-usecase">
              <option value="">全部场景</option>
              <option value="code">写代码</option>
              <option value="writing">写作/文案</option>
              <option value="chat">日常对话</option>
              <option value="long-context">长文本</option>
              <option value="reasoning">深度推理</option>
            </select>
          </div>
        </div>
        <div class="tpc-row">
          <div class="tpc-field">
            <label>输入 Token 占比：<span id="tpc-ratio-val">${Math.round(state.inputRatio * 100)}%</span></label>
            <input type="range" id="tpc-ratio" min="0" max="100" value="${Math.round(state.inputRatio * 100)}" />
          </div>
          <div class="tpc-field">
            <label>地区</label>
            <select id="tpc-region">
              <option value="china">仅国内</option>
              <option value="global">含海外</option>
            </select>
          </div>
        </div>
        <div class="tpc-row">
          <div class="tpc-field">
            <label>缓存命中率：<span id="tpc-cache-val">${Math.round(state.cacheHitRate * 100)}%</span></label>
            <input type="range" id="tpc-cache" min="0" max="90" value="${Math.round(state.cacheHitRate * 100)}" />
          </div>
          <div class="tpc-field">
            <label>最低能力评分：<span id="tpc-cap-val">${state.minCapability}</span></label>
            <input type="range" id="tpc-cap" min="0" max="10" value="${state.minCapability}" />
          </div>
        </div>
        <button class="tpc-btn" id="tpc-compare">开始对比</button>
      </div>

      <div id="tpc-results"></div>
    </div>
  `;

  // 绑定事件
  const budgetEl = el.querySelector('#tpc-budget') as HTMLInputElement;
  const usecaseEl = el.querySelector('#tpc-usecase') as HTMLSelectElement;
  const ratioEl = el.querySelector('#tpc-ratio') as HTMLInputElement;
  const ratioVal = el.querySelector('#tpc-ratio-val') as HTMLElement;
  const regionEl = el.querySelector('#tpc-region') as HTMLSelectElement;
  const cacheEl = el.querySelector('#tpc-cache') as HTMLInputElement;
  const cacheVal = el.querySelector('#tpc-cache-val') as HTMLElement;
  const capEl = el.querySelector('#tpc-cap') as HTMLInputElement;
  const capVal = el.querySelector('#tpc-cap-val') as HTMLElement;
  const compareBtn = el.querySelector('#tpc-compare') as HTMLButtonElement;
  const resultsEl = el.querySelector('#tpc-results') as HTMLElement;

  ratioEl.addEventListener('input', () => {
    ratioVal.textContent = ratioEl.value + '%';
  });
  cacheEl.addEventListener('input', () => {
    cacheVal.textContent = cacheEl.value + '%';
  });
  capEl.addEventListener('input', () => {
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

  compareBtn.addEventListener('click', doCompare);

  // 初始渲染
  doCompare();
}

function renderResults(container: HTMLElement) {
  const options: CompareOptions = {
    monthlyBudget: state.monthlyBudget,
    useCase: (state.useCase || undefined) as CompareOptions['useCase'],
    inputRatio: state.inputRatio,
    region: state.region as 'china' | 'global',
    cacheHitRate: state.cacheHitRate,
    minCapability: state.minCapability,
  };

  const results = comparePlans(TOKEN_PLANS, options);

  if (results.length === 0) {
    container.innerHTML = '<div class="tpc-empty">没有符合条件的套餐，请调整筛选条件</div>';
    return;
  }

  const best = results[0];
  const summary = `
    <div class="tpc-result-summary">
      共找到 <strong>${results.length}</strong> 个符合条件的套餐。
      最佳推荐：<strong>${best.plan.provider} - ${best.plan.model}</strong>，
      性价比分数 <strong>${best.valueScore}/100</strong>，
      有效单价 ¥${best.effectivePrice.toFixed(2)}/百万token，
      月预算可买 <strong>${best.monthlyTokens.toFixed(1)}</strong> 百万token。
    </div>
  `;

  const badgeMap: Record<string, string> = {
    code: 'tpc-badge-code',
    writing: 'tpc-badge-write',
    chat: 'tpc-badge-chat',
    'long-context': 'tpc-badge-long',
    reasoning: 'tpc-badge-reason',
  };
  const badgeLabel: Record<string, string> = {
    code: '代码',
    writing: '写作',
    chat: '对话',
    'long-context': '长文',
    reasoning: '推理',
  };

  const rows = results.slice(0, 50).map((r, i) => {
    const rankClass = i === 0 ? 'tpc-rank-1' : i === 1 ? 'tpc-rank-2' : i === 2 ? 'tpc-rank-3' : 'tpc-rank-n';
    const badges = r.plan.capabilities.map(c => `<span class="tpc-badge ${badgeMap[c] || ''}">${badgeLabel[c] || c}</span>`).join('');
    return `
      <tr>
        <td><span class="tpc-rank ${rankClass}">${i + 1}</span></td>
        <td>
          <div class="tpc-provider">${r.plan.provider}</div>
          <div class="tpc-model">${r.plan.model}</div>
          <div style="margin-top:3px">${badges}</div>
        </td>
        <td class="tpc-score">${r.valueScore}</td>
        <td class="tpc-price">¥${r.effectivePrice.toFixed(2)}</td>
        <td class="tpc-price">${r.tokensPerYuan.toFixed(2)}M</td>
        <td class="tpc-price">${r.monthlyTokens.toFixed(1)}M</td>
        <td>${r.plan.capabilityScore}/10</td>
        <td style="font-size:11px;color:#86909c;max-width:180px">${r.reason}</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = summary + `
    <div style="overflow-x:auto;">
      <table class="tpc-table">
        <thead>
          <tr>
            <th style="width:36px">#</th>
            <th>厂商 / 模型</th>
            <th>性价比</th>
            <th>有效单价</th>
            <th>每元可买</th>
            <th>月可买</th>
            <th>能力</th>
            <th>推荐理由</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="tpc-note">
      有效单价 = 输入价×输入占比 + 输出价×输出占比（含缓存折扣）。性价比分数 = 价格维度(60%) + 能力维度(40%)。<br/>
      价格数据来源于各厂商官方公示，可能随时变动，最终以官方为准。海外厂商按汇率 7.2 折算。
    </p>
  `;
}
