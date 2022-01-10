<template>
  <div class="TopMenu">
    <ul>
      <li><router-link :to="'/index/'+($route.params.id || 1)">首页</router-link></li>
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
    box-shadow:  0px 0px 14px -10px @99-base-color ;
    padding: 20px 150px;
    padding-bottom: 50px;
    background: white;
    border-radius: 10px;
    ul{
      display: flex;
      justify-content: flex-end;
      li{
        text-align: center;
        line-height: 60px;
        font-size: 16px;
        width: 100px;
        list-style: none;
        a{
          color: black;
        }
      }
    }
  }
</style>