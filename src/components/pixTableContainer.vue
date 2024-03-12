<template>
  <div class="pixtable-container" ref="containerRef">
    <div class="pix-control-view"></div>
    <div class="pix-sheet-view">
      <SheetStage :width="containerWidth" :height="containerHeight" />
    </div>
    <div class="pix-scroll-view" :style="{ width: containerWidth + 'px' }">
      <el-scrollbar always ref="scrollRef" :height="containerHeight" @scroll="listerScroll">
        <div
          class="scroll-placeholder"
          :style="{ height: totalRowHeight + 'px', width: totalColWidth + 'px' }"
        ></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import SheetStage from '@/components/sheetStage.vue';
import sheetCore from '@/hooks/generateTableWork';
import { ElScrollbar } from 'element-plus';
import { defineProps, ref, onMounted, onUnmounted } from 'vue';

// 用户传入配置
const props = defineProps<{ config: SheetSettings }>();

// 容器对象
const containerRef = ref<HTMLElement | null>(null);
const scrollRef = ref<typeof ElScrollbar | null>(null);

// 容器宽高
const containerWidth = ref(0);
const containerHeight = ref(0);

// 绘制canvas
const { totalRowHeight, totalColWidth, listerScroll, getCurrentRenderCols, getCurrentRenderRows } =
  sheetCore({ ...props.config }, scrollRef, containerWidth, containerHeight);

onMounted(() => {
  if (containerRef.value) {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        containerWidth.value = entry.contentRect.width;
        containerHeight.value = entry.contentRect.height - 50;

        getCurrentRenderCols(containerWidth.value);
        getCurrentRenderRows(containerHeight.value);
      }
    });
    observer.observe(containerRef.value);

    // 清理函数
    onUnmounted(() => {
      observer.disconnect();
    });
  }
});
</script>

<style scoped lang="less">
.pixtable-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .pix-control-view {
    height: 50px;
  }
  .pix-sheet-view {
    position: absolute;
    left: 0;
    top: 50px;
    z-index: 1;
  }
  .pix-scroll-view {
    position: absolute;
    left: 0;
    top: 50px;
    z-index: 2;
  }
}
</style>
