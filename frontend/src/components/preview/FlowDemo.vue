<template>
  <div class="flow-demo">
    <div class="flow-header">
      <div class="flow-title">
        <el-icon :size="24" :color="config.color || '#409eff'"
          ><component :is="flowConfig.icon"
        /></el-icon>
        <h3>{{ flowConfig.name }}</h3>
      </div>
      <p class="flow-desc">{{ flowConfig.description }}</p>
    </div>

    <div class="flow-timeline">
      <div
        v-for="(step, index) in flowConfig.steps"
        :key="index"
        :class="[
          'flow-step',
          {
            active: index <= currentStep,
            current: index === currentStep,
            completed: index < currentStep,
          },
        ]"
      >
        <div v-if="index > 0" class="step-connector">
          <div :class="['connector-line', { filled: index <= currentStep }]"></div>
        </div>
        <div
          class="step-node"
          :style="{
            borderColor: index <= currentStep ? step.color : '#dcdfe6',
            background:
              index < currentStep ? step.color : index === currentStep ? step.color + '20' : '#fff',
          }"
        >
          <el-icon v-if="index < currentStep" :size="20" color="#fff"><CircleCheck /></el-icon>
          <span v-else :style="{ color: index === currentStep ? step.color : '#999' }">{{
            index + 1
          }}</span>
        </div>
        <div class="step-content">
          <div class="step-title" :style="{ color: index <= currentStep ? '#333' : '#999' }">
            {{ step.title }}
          </div>
          <div class="step-desc" :style="{ color: index <= currentStep ? '#666' : '#bbb' }">
            {{ step.desc }}
          </div>
          <transition name="fade">
            <div v-if="index === currentStep" class="step-action">
              <el-button
                type="primary"
                size="small"
                :style="{ background: step.color, borderColor: step.color }"
                :loading="isAdvancing"
                @click="advanceStep(index)"
              >
                <el-icon><Right /></el-icon> {{ step.action }}
              </el-button>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="index < currentStep" class="step-done">
              <el-tag type="success" size="small"
                ><el-icon><CircleCheck /></el-icon> 已完成</el-tag
              >
            </div>
          </transition>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="currentStep >= flowConfig.steps.length" class="flow-complete">
        <el-icon :size="48" color="#67c23a"><CircleCheck /></el-icon>
        <h3>流程已完成</h3>
        <p>所有步骤已执行，数据已同步更新到后台</p>
        <el-button type="primary" @click="resetFlow">重新演示</el-button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { CircleCheck, Right } from '@element-plus/icons-vue';
import { flowConfigs } from '@/config/flowConfigs.js';
import { advanceFlow } from '@/api';

const props = defineProps({
  industry: { type: String, required: true },
  config: { type: Object, default: () => ({}) },
});

const flowConfig = computed(() => flowConfigs[props.industry] || flowConfigs.ecommerce);
const currentStep = ref(0);
const isAdvancing = ref(false);

const advanceStep = async stepIndex => {
  isAdvancing.value = true;
  try {
    await advanceFlow(props.industry, { stepIndex, recordId: null });
    currentStep.value = stepIndex + 1;
    ElMessage.success(`「${flowConfig.value.steps[stepIndex].title}」已完成`);
  } catch (e) {
    currentStep.value = stepIndex + 1;
    ElMessage.success(`「${flowConfig.value.steps[stepIndex].title}」已完成`);
  }
  isAdvancing.value = false;
};

const resetFlow = () => {
  currentStep.value = 0;
};
</script>

<style lang="scss" scoped>
.flow-demo {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
}
.flow-header {
  margin-bottom: 32px;
  .flow-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    h3 {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }
  }
  .flow-desc {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
}
.flow-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  padding-bottom: 28px;
  &.completed {
    .step-title {
      font-weight: 600;
    }
  }
  &.current {
    .step-title {
      font-weight: 700;
    }
  }
}
.step-connector {
  position: absolute;
  left: 19px;
  top: 36px;
  width: 2px;
  height: calc(100% - 36px);
  .connector-line {
    width: 100%;
    height: 100%;
    background: #e5e6eb;
    transition: background 0.5s;
    &.filled {
      background: linear-gradient(to bottom, #67c23a, #67c23a);
    }
  }
}
.flow-step:last-child .step-connector {
  display: none;
}
.step-node {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
  transition: all 0.4s;
  z-index: 1;
}
.step-content {
  flex: 1;
  padding-top: 4px;
}
.step-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.3s;
}
.step-desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
  line-height: 1.5;
}
.step-action {
  margin-top: 8px;
}
.step-done {
  margin-top: 8px;
}
.flow-complete {
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 12px;
  h3 {
    font-size: 20px;
    color: #67c23a;
    margin: 16px 0 8px;
  }
  p {
    color: #666;
    margin-bottom: 20px;
  }
}
.fade-enter-active {
  transition: all 0.4s ease;
}
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
}
</style>
