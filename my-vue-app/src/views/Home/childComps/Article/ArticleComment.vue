<template>
	<div class="comment"  >
		<div class="title">评论</div>
		<div class="comment-sent" >
			<div class="sent-avatar"><img src="https://blog-umep.oss-cn-hangzhou.aliyuncs.com/blog/1642490261824_12204460de09b2db8eb1f4d3c2e724d9.jpg" alt=""></div>
			<div class="sent-input">
				<a-textarea @focus.stop="onFocus"  v-model:value="sendCommentData.value" placeholder="输入评论" :rows="2" />
				<div class="sendBtn" v-show="showSendBtn">
					<a-button @click="send(sendCommentData)">发送</a-button>
				</div>
			</div>
		</div>
		
		<div class="title">全部评论</div>
		<div class="comment-all" @click.self="onBlur" v-for="(item,index) in commentList" :key="item._id">
			<div class="all-avatar"><img src="https://blog-umep.oss-cn-hangzhou.aliyuncs.com/blog/1642490261824_12204460de09b2db8eb1f4d3c2e724d9.jpg" alt=""></div>
			<div class="all-content">
				<div class="all-msg"><span>{{item.heroInfo.split(',')[0]+'-'+item.heroInfo.split(',')[1]}}</span><span>{{item.type==1?'博主':item.heroInfo.split(',')[2]}}</span><span>{{dayjs(item.createTime).format('YYYY/MM/DD/HH:mm:ss') }}</span> </div>
				<div class="all-txt">{{item.value}} </div>
				<div class="all-nice" @click="handleLike(item)"><LikeOutlined :style='{color:item.likeList.includes(agentMd5)?"red":""}'/>点赞({{item.like || 0}})</div>
			</div>
			
		</div>
	</div>	
</template>

<script>
import {defineComponent, reactive, toRefs,ref,watchEffect,getCurrentInstance,inject} from 'vue'
import {LikeOutlined} from '@ant-design/icons-vue';
import dayjs from 'dayjs'
export default defineComponent({
	name: 'ArticleComment',
	props: {
		article:[Object],
		comment:[Array],
	},
	inject:['sendComment','handleLike'],
	computed:{
		agentMd5(){return agentMd5},
		dayjs(){return dayjs},
	},
	setup(props,context){
		let showSendBtn = ref(false)
		const {article} = toRefs(props)
		const {proxy} =getCurrentInstance()
		const	command = proxy.$api.db.command
		const sendCommentData = reactive({
			articleId:article._id,
			value:'',
			userId:null,
			parentId:null,
			myName:'匿名用户',
			type:0,
			like:0,
		})
		const commentList = ref(props.comment)
		watchEffect(()=>{
			sendCommentData.articleId = article.value
			 commentList.value = props.comment
		})
		const onFocus = () =>{
			showSendBtn.value = true
		}
		const onBlur = () =>{
			showSendBtn.value = false
		}
		const sendComment= inject('sendComment')
		const send = () =>{
			sendComment(sendCommentData)
			sendCommentData.value = ''
		}
		return {
			onFocus,onBlur,send,
			showSendBtn,sendCommentData,commentList
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