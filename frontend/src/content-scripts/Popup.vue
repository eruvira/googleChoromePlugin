<script>
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const visible = ref(false);
    const state = reactive({
      currentTab: null
    });
    onMounted(() => {
      chrome.runtime.sendMessage({ type: "POPUP_INIT" }, async tab => {
        state.currentTab = await tab;
        console.log(state.currentTab);
      });
    });
    return {
      visible,
      ...toRefs(state)
    };
  }
});
</script>
<template>
    <div class="absolute top-4 right-4 bg-white shadow-lg p-4 rounded-md w-72 z-50"  v-show="visible">
    <div>test suka</div>
      <router-view></router-view>
    </div>
</template>

<style>

</style>