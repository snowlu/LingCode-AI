<template>
  <div class="chart-page">
    <h2 class="page-title">{{ pageData?.title || '数据统计' }}</h2>
    <div class="charts-grid">
      <div class="chart-card">
        <h3>趋势分析</h3>
        <div class="chart-area">
          <svg viewBox="0 0 400 200" style="width: 100%; height: 200px">
            <defs>
              <linearGradient id="cGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" :style="`stop-color:${config.color};stop-opacity:0.3`" />
                <stop offset="100%" :style="`stop-color:${config.color};stop-opacity:0.02`" />
              </linearGradient>
            </defs>
            <line
              v-for="i in 5"
              :key="'h' + i"
              x1="40"
              :y1="20 + (i - 1) * 36"
              x2="390"
              :y2="20 + (i - 1) * 36"
              stroke="#f0f0f0"
              stroke-width="1"
            />
            <path
              d="M40,160 L90,130 L140,145 L190,80 L240,100 L290,60 L340,85 L390,50 L390,200 L40,200 Z"
              fill="url(#cGrad)"
            />
            <polyline
              points="40,160 90,130 140,145 190,80 240,100 290,60 340,85 390,50"
              fill="none"
              :stroke="config.color"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              v-for="(p, i) in [
                { x: 40, y: 160 },
                { x: 90, y: 130 },
                { x: 140, y: 145 },
                { x: 190, y: 80 },
                { x: 240, y: 100 },
                { x: 290, y: 60 },
                { x: 340, y: 85 },
                { x: 390, y: 50 },
              ]"
              :key="'p' + i"
              :cx="p.x"
              :cy="p.y"
              r="4"
              :fill="config.color"
              stroke="white"
              stroke-width="2"
            />
            <text
              v-for="(m, i) in ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']"
              :key="'t' + i"
              :x="40 + i * 50"
              y="195"
              text-anchor="middle"
              font-size="11"
              fill="#999"
            >
              {{ m }}
            </text>
          </svg>
        </div>
      </div>
      <div class="chart-card">
        <h3>数据分布</h3>
        <div class="chart-area pie-layout">
          <svg viewBox="0 0 200 200" style="width: 160px; height: 160px">
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              :stroke="config.color"
              stroke-width="30"
              stroke-dasharray="110 330"
              stroke-dashoffset="0"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#67c23a"
              stroke-width="30"
              stroke-dasharray="88 352"
              stroke-dashoffset="-110"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#e6a23c"
              stroke-width="30"
              stroke-dasharray="66 374"
              stroke-dashoffset="-198"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#e5e6eb"
              stroke-width="30"
              stroke-dasharray="44 396"
              stroke-dashoffset="-264"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div class="pie-legend">
            <span><i :style="{ background: config.color }"></i>类别A 40%</span>
            <span><i style="background: #67c23a"></i>类别B 30%</span>
            <span><i style="background: #e6a23c"></i>类别C 20%</span>
            <span><i style="background: #e5e6eb"></i>其他 10%</span>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3>月度对比</h3>
        <div class="chart-area">
          <svg viewBox="0 0 400 200" style="width: 100%; height: 200px">
            <line
              v-for="i in 5"
              :key="'bh' + i"
              x1="40"
              :y1="20 + (i - 1) * 36"
              x2="390"
              :y2="20 + (i - 1) * 36"
              stroke="#f0f0f0"
              stroke-width="1"
            />
            <rect
              v-for="(v, i) in [65, 45, 78, 52, 88, 70, 95]"
              :key="'br' + i"
              :x="55 + i * 50"
              :y="200 - v * 1.7"
              width="30"
              :height="v * 1.7"
              :fill="i % 2 === 0 ? config.color : '#67c23a'"
              rx="3"
              opacity="0.85"
            >
              <animate attributeName="height" from="0" :to="v * 1.7" dur="0.6s" fill="freeze" />
              <animate attributeName="y" from="200" :to="200 - v * 1.7" dur="0.6s" fill="freeze" />
            </rect>
            <text
              v-for="(m, i) in ['1月', '2月', '3月', '4月', '5月', '6月', '7月']"
              :key="'bt' + i"
              :x="70 + i * 50"
              y="195"
              text-anchor="middle"
              font-size="11"
              fill="#999"
            >
              {{ m }}
            </text>
          </svg>
        </div>
      </div>
      <div class="chart-card">
        <h3>综合评估</h3>
        <div class="chart-area">
          <svg viewBox="0 0 240 240" style="width: 200px; height: 200px">
            <polygon
              v-for="s in [0.4, 0.6, 0.8, 1.0]"
              :key="'rg' + s"
              :points="radarBg(s)"
              fill="none"
              stroke="#e5e6eb"
              stroke-width="1"
            />
            <polygon
              :points="radarPts"
              :fill="config.color"
              fill-opacity="0.2"
              :stroke="config.color"
              stroke-width="2"
            />
            <circle
              v-for="(p, i) in radarPoints"
              :key="'rp' + i"
              :cx="p.x"
              :cy="p.y"
              r="4"
              :fill="config.color"
            />
            <text
              v-for="(l, i) in ['能力A', '能力B', '能力C', '能力D', '能力E', '能力F']"
              :key="'rl' + i"
              :x="radarLabel(i).x"
              :y="radarLabel(i).y"
              text-anchor="middle"
              font-size="12"
              fill="#666"
            >
              {{ l }}
            </text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
defineProps({
  config: { type: Object, default: () => ({}) },
  pageKey: { type: String, default: '' },
  pageData: { type: Object, default: () => ({}) },
});
const radarValues = [0.85, 0.7, 0.75, 0.9, 0.8, 0.65];
const radarPoints = computed(() =>
  radarValues.map((v, i) => {
    const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return { x: 120 + 80 * v * Math.cos(a), y: 120 + 80 * v * Math.sin(a) };
  })
);
const radarPts = computed(() => radarPoints.value.map(p => `${p.x},${p.y}`).join(' '));
const radarBg = s =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return `${120 + 80 * s * Math.cos(a)},${120 + 80 * s * Math.sin(a)}`;
  }).join(' ');
const radarLabel = i => {
  const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
  return { x: 120 + 100 * Math.cos(a), y: 120 + 100 * Math.sin(a) + 4 };
};
</script>

<style lang="scss" scoped>
.chart-page {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.chart-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
  }
}
.chart-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pie-layout {
  flex-direction: row;
  gap: 20px;
}
.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #666;
    i {
      width: 12px;
      height: 12px;
      border-radius: 3px;
      display: inline-block;
    }
  }
}
@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
