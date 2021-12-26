<template>
    <div class="Categorize">
        Categorize
    </div>
</template>

<script>
    import {defineComponent, reactive, toRefs} from 'vue'

    export default defineComponent({
        name: "Categorize",
        props: {},
        components: {},
        created() {
            this.$api.getList('categorize').then(res=>{
                console.log(res)
            })
        }
    })
</script>

<style scoped lang='less'>
</style>