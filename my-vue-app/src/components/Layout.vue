<template>
 <div class="Layout">
     <div v-if="!$route.meta.admin">
         <div class="header">
             <TopMenu/>
         </div>
         <div class="container">
             <keep-alive><router-view ></router-view></keep-alive>
         </div>
         <div class="footer">
             <!--        <Footer/>-->
         </div>
     </div>
     <div v-else>
        <router-view ></router-view>
         
     </div>

 </div>
</template>

<script>
import {defineComponent, reactive, toRefs,} from 'vue'
import TopMenu from '@/components/TopMenu.vue'
import Footer from "@/components/Footer.vue";
export default defineComponent({
    name: 'Layout',
    props: {

    },
    setup(props) {
    },
    components: {
      TopMenu,Footer
    },
})
</script>

<style scoped lang='less'>
    .Layout{
    }
    .header{
    }
    .container{
      width: 1400px;
      margin: 0 auto;
    }


</style>