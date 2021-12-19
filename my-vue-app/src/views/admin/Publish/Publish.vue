<template>
    <div class="Publish">
        <vditor></vditor>
    </div>
</template>

<script>
    import {defineComponent, reactive, toRefs} from 'vue'
    import vditor from "@/components/vditor/vditor.vue";
    export default defineComponent({
        name: "Publish",
        props: {},
        components: {vditor},
    })
</script>

<style scoped lang='less'>
</style>