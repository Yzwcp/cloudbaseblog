<template>
    <div>
        <div id="vditor"></div>
    </div>
</template>

<script>
    import {defineComponent, reactive, toRefs,onMounted} from 'vue'
    import Vditor from "vditor";
    export default defineComponent({
        name: "vditor",
        props: {},
        data(){
            return{ contentEditor:{}}
        },
        mounted() {
            this.contentEditor = new Vditor('vditor', {
                height: 360,
                toolbarConfig: {
                    pin: true,
                },
                cache: {
                    enable: false,
                },
                after: () => {
                    this.contentEditor.setValue('hello, Vditor + Vue!')
                },
            })
        },
        methods:{
            btn(){
                console.log(this.contentEditor.getHTML())

            },
        },
        components: {},
    })
</script>

<style scoped lang='less'>

</style>