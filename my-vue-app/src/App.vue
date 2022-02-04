<template>
 <div class="App">
   <Layout/>
 </div>
</template>

          <script>
import {defineComponent, reactive, toRefs} from 'vue'
import Layout from '@/components/Layout.vue'
export default defineComponent({
  name: '',
  props: {

  },
  components: {
        Layout
  },
})
</script>

<style >
.app{
  position: relative;
}
</style>