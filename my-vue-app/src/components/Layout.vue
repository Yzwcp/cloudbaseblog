<template>
 <div class="Layout">
     <div v-if="!$route.meta.admin">
         <div class="header">
             <TopMenu/>
         </div>
         <div class="container">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component
                        :is="Component"
                        v-if="$route.meta.keepAlive"
                        :key="$route.path"
                    >
                    </component>
                </keep-alive>
            </router-view>

             <router-view v-if="!$route.meta.keepAlive && !$route.meta.admin"/>
         </div>
         <div class="footer">
             <!--        <Footer/>-->
         </div>
     </div>
     <div v-else>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component
                        :is="Component"
                        v-if="$route.meta.keepAlive"
                        :key="$route.path"
                    >
                    </component>
                </keep-alive>
            </router-view>

             <router-view v-if="!$route.meta.keepAlive"/>
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
    }


</style>
