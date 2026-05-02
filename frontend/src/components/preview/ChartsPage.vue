<template>
  <div class="charts-page">
    <h2 class="page-title">图表展示</h2>
    <div class="charts-grid">
      <div class="chart-card">
        <h3>柱状图 - 月度数据对比</h3>
        <div class="chart-area">
          <svg viewBox="0 0 400 220" style="width: 100%; height: 220px">
            <line
              v-for="i in 5"
              :key="'h' + i"
              :x1="40"
              :y1="20 + (i - 1) * 40"
              :x2="390"
              :y2="20 + (i - 1) * 40"
              stroke="#f0f0f0"
              stroke-width="1"
            />
            <rect
              v-for="(bar, i) in barData"
              :key="'b' + i"
              :x="55 + i * 50"
              :y="220 - bar.value * 1.8"
              width="30"
              :height="bar.value * 1.8"
              :fill="i % 2 === 0 ? config.color : '#52c41a'"
              rx="4"
              opacity="0.85"
            >
              <animate
                attributeName="height"
                from="0"
                :to="bar.value * 1.8"
                dur="0.6s"
                fill="freeze"
              />
              <animate
                attributeName="y"
                from="220"
                :to="220 - bar.value * 1.8"
                dur="0.6s"
                fill="freeze"
              />
            </rect>
            <text
              v-for="(bar, i) in barData"
              :key="'t' + i"
              :x="70 + i * 50"
              y="215"
              text-anchor="middle"
              font-size="11"
              fill="#999"
            >
              {{ bar.label }}
            </text>
          </svg>
        </div>
      </div>
      <div class="chart-card">
        <h3>折线图 - 趋势分析</h3>
        <div class="chart-area">
          <svg viewBox="0 0 400 220" style="width: 100%; height: 220px">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" :style="`stop-color:${config.color};stop-opacity:0.3`" />
                <stop offset="100%" :style="`stop-color:${config.color};stop-opacity:0.02`" />
              </linearGradient>
            </defs>
            <line
              v-for="i in 5"
              :key="'lh' + i"
              :x1="40"
              :y1="20 + (i - 1) * 40"
              :x2="390"
              :y2="20 + (i - 1) * 40"
              stroke="#f0f0f0"
              stroke-width="1"
            />
            <path
              d="M40,160 L90,130 L140,145 L190,80 L240,100 L290,60 L340,85 L390,50 L390,200 L40,200 Z"
              fill="url(#lineGrad)"
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
              :key="'mt' + i"
              :x="40 + i * 50"
              y="215"
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
        <h3>饼图 - 数据分布</h3>
        <div class="chart-area pie-layout">
          <svg viewBox="0 0 200 200" style="width: 180px; height: 180px">
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
              stroke="#52c41a"
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
              stroke="#faad14"
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
            <span><i style="background: #52c41a"></i>类别B 30%</span>
            <span><i style="background: #faad14"></i>类别C 20%</span>
            <span><i style="background: #e5e6eb"></i>其他 10%</span>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3>雷达图 - 综合评估</h3>
        <div class="chart-area">
          <svg viewBox="0 0 240 240" style="width: 220px; height: 220px">
            <polygon
              v-for="i in [0.4, 0.6, 0.8, 1.0]"
              :key="'r' + i"
              :points="radarBackground(i)"
              fill="none"
              stroke="#e5e6eb"
              stroke-width="1"
            />
            <polygon
              :points="radarData"
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
              v-for="(label, i) in radarLabels"
              :key="'rl' + i"
              :x="radarLabelPos(i).x"
              :y="radarLabelPos(i).y"
              text-anchor="middle"
              font-size="12"
              fill="#666"
            >
              {{ label }}
            </text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
defineProps({ config: { type: Object, required: true } });

const barData = ref([
  { label: '1月', value: 65 },
  { label: '2月', value: 45 },
  { label: '3月', value: 78 },
  { label: '4月', value: 52 },
  { label: '5月', value: 88 },
  { label: '6月', value: 70 },
  { label: '7月', value: 95 },
]);

const radarLabels = ['技术能力', '沟通协作', '项目管理', '创新思维', '执行效率', '学习成长'];
const radarValues = [0.85, 0.7, 0.75, 0.9, 0.8, 0.65];

const radarPoints = computed(() => {
  const cx = 120,
    cy = 120,
    r = 80;
  return radarValues.map((v, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return { x: cx + r * v * Math.cos(angle), y: cy + r * v * Math.sin(angle) };
  });
});

const radarData = computed(() => radarPoints.value.map(p => `${p.x},${p.y}`).join(' '));

const radarBackground = scale => {
  const cx = 120,
    cy = 120,
    r = 80 * scale;
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
};

const radarLabelPos = i => {
  const cx = 120,
    cy = 120,
    r = 100;
  const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) + 4 };
};
</script>

<style lang="scss" scoped>
.charts-page {
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
  font-size: 20px;
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
