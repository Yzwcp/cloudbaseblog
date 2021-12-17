<template>
    <div class="Footer">
        <p>个人博客系统「源代码」</p>
        <p>浙ICP备2020043821号-1</p>
    </div>
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
    name: "Footer",
    props: {},
    components: {},
})
</script>

<style scoped lang='less'>
    .Footer{
        background: #2E4C6D;
        font-size: 26px;
    }
</style>