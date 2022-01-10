<template>
    <div>
        <div id="vditor" ></div>
    </div>
</template>

<script>
    import {defineComponent, reactive, toRefs,onMounted} from 'vue'
    import Vditor from "vditor";
    export default defineComponent({
        name: "vditor",
        props: {
            initeValue:{
                type:String,
                default:'hello, Vditor  Vue!'
            }
        },
        data(){
            return{ contentEditor:{},body:''}
        },
        setup(){

        },
        computed:{

        },
        mounted() {
            this.contentEditor = new Vditor('vditor', {
                height: 360,
                toolbarConfig: {
                    pin: true,
                },
                preview:{

                },
                cache: {
                    enable: false,
                },
                after: () => {
                    this.contentEditor.setValue(this.initeValue)
                },
            })
        },
        methods:{
            getValue(){
                let value = this.contentEditor.getValue()
                this.body =value
            },
            setValue(v){
                this.contentEditor.setValue(v)
            },
        },
        components: {},
    })
</script>

<style scoped lang='less'>

</style>