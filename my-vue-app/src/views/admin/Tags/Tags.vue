<template>
    <div class="tags">
    </div>
</template>

<script>
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
  import {defineComponent,ref, reactive, toRefs,getCurrentInstance} from 'vue'
  import dayjs from "dayjs";
  import {useRouter} from 'vue-router'
  export default defineComponent({
    name: "tags",
    data(){
      return{
        clazz:'tags',
        title:'所有文章',
      }
    },
    props: {},

    setup(props,{emit}){
      
    },
    methods:{
      handleAdd(){
        this.$router.push('/admin/publish')
      },
    },
    components: {
      SmileOutlined,
      DownOutlined,
    },
  })
</script>

<style scoped lang='less'>

</style>