<script setup lang="ts">
import { useMouse } from "@vueuse/core";
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    spin?: boolean;
  }>(),
  {
    spin: true,
  }
);

const { x, y } = useMouse();
const el = ref<HTMLSpanElement | null>();

const rotation = computed(() => {
  if (!el.value || !props.spin) return 0;
  const rect = el.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = x.value - centerX;
  const deltaY = y.value - centerY;

  const rad = Math.atan2(deltaY, deltaX);
  const deg = rad * (180 / Math.PI) + 90;
  return `rotate(${deg}deg)`;
});
</script>
<template>
  <span ref="el" class="interactive-astronaut">🧑‍🚀</span>
</template>
<style scoped>
.interactive-astronaut {
  transform: v-bind(rotation);
  display: inline-block;
}
</style>
