<template>
    <div id="vditor">
        {{contentEditor}}
    </div>
</template>

<script>
    import {defineComponent, reactive, toRefs,onMounted} from 'vue'
    import Vditor from "vditor";
    export default defineComponent({
        name: "vditor",
        props: {},
        data(){
            return{
                contentEditor:""
            }
        },
        setup(){
            onMounted(()=>{
                let that = this
                this.contentEditor = new Vditor('vditor', {
                    height: 360,
                    toolbarConfig: {
                        pin: true,
                    },
                    cache: {
                        enable: false,
                    },
                    after: () => {
                        that.contentEditor.setValue('hello, Vditor + Vue!')
                    },
                })
            })
        },

        components: {},
    })
</script>

<style scoped lang='less'>

</style>