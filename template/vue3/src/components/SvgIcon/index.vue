<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :class="className"
    :width="width"
    :height="height"
  >
    <use
      :xlink:href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
/** 属性**/
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  },
  className: {
    type: String,
    default: ''
  }
})

/** 计算属性 */
const symbolId = computed(() => `#${props.prefix}-${props.name}`)

</script>
