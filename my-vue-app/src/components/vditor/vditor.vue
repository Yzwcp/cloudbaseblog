<template>
    <div>
        <div id="vditor" ></div>
    </div>
</template>

<script>
    import {defineComponent, reactive, toRefs,onMounted} from 'vue'
    import Vditor from "vditor";
// import { log } from '@/util/aliyun-oss-sdk';
    export default defineComponent({
        name: "vditor",
        props: {
            initeValue:{
                type:String,
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
						height: 630,
						toolbarConfig: {
								pin: true,
						},
						preview:{
							hljs:{
								lineNumber:true
							}
						},
            counter:{
                enable:true
            },
            outline:{
                enable:true
            },
            toolbar:["emoji",'upload','fullscreen','edit-mode'],
            upload: {
              // accept: 'image/*,.mp3, .wav, .rar',
              // token: 'test',
              url: 'http://localhost:3000/upload',
              // linkToImgUrl: '/api/upload/fetch',
              // filename (name) {
              //   return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
              //     replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
              //     replace('/\\s/g', '')
              // },
              fieldName:'file',
              success:(_,msg)=>{
                console.log(msg);
                console.log(JSON.parse(msg));
                this.insertValue(`![${JSON.parse(msg).result.name}](${JSON.parse(msg).result.url})`)
              },
            },
						comment:{
							enable:true
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
            insertValue(v){
              this.contentEditor.insertValue(v)
            },
        },
        components: {},
    })
</script>

<style scoped lang='less'>

</style>
