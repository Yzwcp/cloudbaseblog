<template>
  <div class="TopMenu">
    <ul>
      <li><a javascript=";">首页</a></li>
      <li><a javascript=";">分类</a></li>
      <li><a javascript=";">Tags</a></li>
      <li><a javascript=";">图库</a></li>
      <li><a javascript=";">音乐</a></li>
      <li><a javascript=";">登录</a></li>
    </ul>
  </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
  name: 'TopMenu',
  props: {
    
  },
  components: {
    
  },
})
</script>

<style scoped lang="less">
  .TopMenu{
    height: 60px;
    width: 100%;
    background-color:@99-base-color;
    padding: 0 200px;
    ul{
      display:grid;
      grid-template-columns: 1fr .5fr .5fr .5fr .5fr 1fr;
      grid-template-rows: 60px;
      li{
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        list-style: none;
        a{
          color: white;
        }
      }
    }
  }
</style>