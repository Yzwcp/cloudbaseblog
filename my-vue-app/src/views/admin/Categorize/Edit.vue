<template>
    <div class="Edit">
        <a-button type="primary" @click="showModal">Open Modal</a-button>
        <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-modal>
    </div>
</template>

<script>
  import { defineComponent, reactive, toRefs } from 'vue'

  export default defineComponent({
    name: 'Edit',
    props: {},
    components: {},
    setup() {
      const visible = ref(false);

      const showModal = () => {
        visible.value = true;
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        visible.value = false;
      };
      return {
        visible,
        showModal,
        handleOk,
      };
    }
  })
</script>

<style scoped lang='less'>

</style>