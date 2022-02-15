<template>
  <div class="TopMenu">
    <ul>
      <li><router-link :to="'/index/'">首页</router-link></li>
      <li><router-link :to="'/thirdParty'">资源</router-link></li>
      <li><a javascript=";">音乐</a></li>
      <li><router-link :to="'/admin'">登录</router-link></li>
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
    box-shadow:@box-shadow ;
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
