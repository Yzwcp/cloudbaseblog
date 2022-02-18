<template>
	<div class="comment"  >
		<div class="title">评论</div>
		<div class="comment-sent" >
			<div class="sent-avatar"><img src="http://blog-umep.oss-cn-hangzhou.aliyuncs.com/blog/article_cover/joe1644745851853.png" alt=""></div>
			<div class="sent-input">
				<a-textarea @focus.stop="onFocus"  v-model:value="initData.value" placeholder="输入评论" :rows="2" />
				<div class="sendBtn" v-show="showSendBtn">
					<a-input placeholder="请输入邮箱" v-model:value="initData.cEmail" style="width: 200px" />
					<a-button @click="send(initData)">发送</a-button>
				</div>
			</div>
		</div>

		<div class="title">全部评论</div>
		<div class="comment-all" @click.self="onBlur" v-for="(item,index) in comment" :key="item.id">
			<div class="all-avatar"><img src="http://blog-umep.oss-cn-hangzhou.aliyuncs.com/blog/article_cover/joe1644745851853.png" alt=""></div>
			<div class="all-content">
				<div class="all-msg"><span>{{item.cEmail}}</span><span>说:</span><span>{{dayjs(item.createAt).format('YYYY/MM/DD/HH:mm:ss') }}</span> </div>
				<div class="all-txt">{{item.value}} </div>
				<div class="all-nice" @click="handleLike(item)"><LikeOutlined :style='{color:item.likeList?.indexOf(agentMd5)?"red":""}'/>点赞({{item.likeList?.split(',',item.likeList.split(',').length-1).length || 0}})</div>
			</div>

		</div>
	</div>
</template>

<script>
import {defineComponent, reactive, toRefs,ref,watchEffect,getCurrentInstance,inject,toRaw} from 'vue'
import {LikeOutlined} from '@ant-design/icons-vue';
import dayjs from 'dayjs'
export default defineComponent({
	name: 'ArticleComment',
	props: {
    articleId:[Number,String],
		comment:[Array],
	},
	inject:['sendComment','handleLike'],
	computed:{
		agentMd5(){return agentMd5},
		dayjs(){return dayjs},
	},
	setup(props,context){
		let showSendBtn = ref(false)
		const {articleId='',comment=[]} = toRefs(props)
		const {proxy} =getCurrentInstance()
		const initData = reactive({
			articleId:articleId,
			value:'',
			userId:null,
			parentId:null,
			myName:'匿名用户',
			cEmail:'',
			type:0,
		})
		watchEffect(()=>{
			initData.articleId = articleId
		})
		const onFocus = () =>{
			showSendBtn.value = true
		}
		const onBlur = () =>{
			showSendBtn.value = false
		}
		const sendComment= inject('sendComment')
		const send = () =>{
		  if (!initData.value) return proxy.$message.info('请输入评论')
			sendComment(initData)
			initData.value = ''
		}
		return {
			onFocus,onBlur,send,
			showSendBtn,initData,comment
		}
	},
	components: {
		LikeOutlined
	},
})
</script>

<style scoped lang='less'>
.comment{
	box-shadow:@box-shadow ;
	margin-top: 60px;
	padding: 30px;
	.sendBtn{
		display: flex;
		justify-content: flex-end;
		padding: 6px 0;
	}
	.title{
		margin-bottom: 20px;
		margin-top: 10px;
	}
	img{
		width: 40px;
		height: 40px;
		margin-right: 10px;
		border-radius: 20px;
	}
	.comment-sent{
		display: flex;
		.sent-input{
			flex: 2;
		}
	}
	.comment-all{
		display: flex;
		position: relative;
		margin-bottom: 20px;
		.all-msg{
			span:nth-child(1){
				margin-right: 10px;
			}
			span:nth-child(3){
				position: absolute;
				right: 0;
			}
		}
		.all-content{
			.all-nice{
				cursor:pointer;
				margin-top: 10px;
				font-size: 12px;
			}
		}
	}
}
</style>
