<template>
    <div class="Tags">
        Tags
    </div>
</template>
<script>
    import {defineComponent, reactive, toRefs,getCurrentInstance} from 'vue'
    export default defineComponent({
        name: "Tags",
        props: {},
        components: {},
        created() {
            this.$api.getList('classify').then(res=>{
                console.log(res)
            })
        }

    })
</script>

<style scoped lang='less'>
</style>