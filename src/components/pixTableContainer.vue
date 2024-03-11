<template>
  <div class="pixtable-container" ref="containerRef">
    <SheetStage :width="containerWidth" :height="containerHeight" />
  </div>
</template>

<script setup lang="ts">
import SheetStage from '@/components/sheetStage.vue';
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import setupProvides from '@/hooks/provides';
const props = defineProps<{ config: SheetSettings }>();
const containerRef = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const containerHeight = ref(0);

//将数据进行共享
setupProvides({ sheetSettings: props.config });

onMounted(() => {
  if (containerRef.value) {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        containerWidth.value = entry.contentRect.width;
        containerHeight.value = entry.contentRect.height;
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
}
</style>
