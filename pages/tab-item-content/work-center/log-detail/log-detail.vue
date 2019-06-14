<template>
	<view class="position_relative">
		<cu-custom :isBack="true">
			<block slot="left">
				<text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text>
			</block>
			<block slot="content"><text class="title">汇报详情</text></block>
			<block slot="right" v-if="type=='log'">
				<image src="../../../../static/icon/garbage.png"
				@click="deleteLog()"
				style="width:15px;height:15px;"></image>
			</block>
		</cu-custom>
		<view class="log-content borderTop bg-white">
			
			<view class="log-user flex justify-start font-size-normal font-weight-normal">
				<view style="margin-right:14px;">
					<image :src="selectItem.headurl?selectItem.headurl:'../../../../static/img/avatar.jpg'"
					 style="width:45px;height:45px;border-radius: 50%;vertical-align: middle;"></image>
				</view>
				<view style="padding-top:4px;">
					<view class=" color-normal">{{selectItem.title || ''}}</view>
					<view class="color-placeholder font-size-litter font-weight-normal">{{selectItem.rptdate | formatTime('YMDHMS')}}</view>
				</view>
			</view>
			<view class="log-summary" >
				<view  style="color:rgba(45,96,151,1);margin-bottom:4px;">{{selectItem.articleTitle}}</view>
				<view class="log-detail ">
					{{selectItem.summary}}
				</view>
			</view>
			<view class="bg-white " v-if="selectItem.files">
				<view class="grid col-4 grid-square">
					<view @click="viewImg(item)" class="bg-img" v-for="(item,index) in selectItem.files" :key="index" :style="[{ backgroundImage:'url(' + item.url + ')' }]">
					</view>
				</view>
			</view>
		</view>

		<view class="article-content bg-white font-size-small font-weight-normal" v-if="type=='article'">
			<view class="article-item flex justify-between borderBottom">
				<view class="color-normal">文章标题</view>
				<view style="color:rgba(137,136,136,1); " class="font-size-mini">{{selectItem.articleTitle}}</view>
			</view>
			<view class="article-item flex justify-between">
				<view class="color-normal">文章编号</view>
				<view style="color:rgba(137,136,136,1);">{{selectItem.articleSeq}}</view>
			</view>
		</view>

		<view class="comment-content bg-white">
			<view class="color-normal font-size-big font-weight-middle">评价（{{selectItem.likers?selectItem.likers.length:0}}）</view>
			<view class="comment-item borderBottom flex justify-start" v-for="(item,index) in commentList" :key="index">
				<view style="width:10%;margin-right:12px;">
					<image :src="item.extprops"  style="width:43px;height:43px;border-radius: 50%;"></image>
				</view>
				<view style="width:89%;">
					<view class="font-weight-normal font-size-small " style="color:rgba(41,85,117,1);">{{item.posterName}}</view>
					<view class=" font-weight-normal font-size-litter color-placeholder" style="margin-bottom:7px;">{{item.podate | formatTime('YMDHMS')}}</view>
					<view class="font-size-normal font-weight-normal color-normal">
						<text v-if="item.receiverName">回复{{item.receiverName}}:</text>{{item.summary}}
					</view>
				</view>
				<view v-if="item.poster==userInfo.id">
					<image src="../../../../static/icon/garbage.png"
					@click="delCommentClick(item.id)"
					style="width:15px;height:15px;position: absolute;right:30px;"></image>
				</view>
			</view>
			<view class="comment-item borderBottom flex justify-start position_relative">
				<view style="width:10%;margin-right:12px;">
					<image src="../../../../static/img/avatar.jpg"  style="width:43px;height:43px;border-radius: 50%;"></image>
				</view>
				<view style="width:89%;">
					<view class="font-weight-normal font-size-small " style="color:rgba(41,85,117,1);">乐观的崽儿</view>
					<view class=" font-weight-normal font-size-litter color-placeholder" style="margin-bottom:7px;">2019-8-7</view>
					<view class="font-size-normal font-weight-normal color-normal">大咖，你的报告也太详细了吧！</view>
				</view>
				<view>
					<image src="../../../../static/icon/garbage.png"
					style="width:15px;height:15px;position: absolute;right:30px;"></image>
				</view>
			</view>
		</view>
		
		
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog" @tap="hideModal()">
				<view class="bg-img" :style="[{ backgroundImage:'url(' + imgItem.url + ')' }]" style="min-height:200px;">
					
				</view>
				
			</view>
		</view>
		
		
		<view class="chat-comment flex justify-start " style="position:fixed;bottom:0px;z-index:100;width:100%">
			
				<input type="text" placeholder="写评论......" style="background:rgba(238,238,237,1);
border-radius:15px;padding-left:18px;width:70%;" class="font-size-litter font-weight-normal" @click="inputMsgClick()" v-model="inputMsg">
				<view v-if="showInput">
					<image :src="selectItem.isLiker==1?'../../../../static/img/work/log/dianzan_color.png':'../../../../static/img/work/log/dianzan.png'" style="width:19px;height:19px;vertical-align: middle;margin: 0 8px 0 17px;" @click="praise()"></image>
					<text>{{selectItem.likes}}</text>
					<image src="../../../../static/img/work/log/fenxiang.png" style="width:19px;height:19px;vertical-align: middle;margin: 0 7px 0 18px;"></image>
					<text>{{selectItem.forwards}}</text>
				</view>
				<view v-else>
					<view  style="background:#3dcfff;color:#fff;padding:5px 15px;border-radius: 8px;margin-left:30px;" @click="sendMsg()"> 发表</view>
				</view>
			
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
			    selectItem:{},
				imgItem:'',
				id:'',
				type:'',//用于判断是文章还是日
				modalName:'',
				showInput:true,
				inputMsg:'',
				commentList:[]
              
			}
		},
        onLoad(params){
			
			if(params){
				this.id = params.id;
				this.type=params.type;
				this.getItem(this.id);
				this.commentListClick()
			}
		  
			
		},
		methods: {
			//删除评论
			delCommentClick(id){
				this.$ajax('RemoveCommentByShop',{
					id:id,
					workreport:this.selectItem.id,
					
				},res=>{
					uni.showToast({
						title:'删除评论成功',
						icon:'none'
					})
				})
			},
			//查看评论内容
			commentListClick(){
				this.$ajax('CommentsByShop',{
					workreport:this.selectItem.id,
					
				},res=>{
					this.commentList=res;
				})
			},
			sendMsg(){
				console.log(this.inputMsg)
				this.$ajax('LeaveCommentByShop',{
					id:this.selectItem.id,
					receiver:this.userInfo.id,
					content:this.inputMsg
				},res=>{
					uni.uni.showToast({
						title: '评论成功',
						icon:'none'
					});
				})
			},
			inputMsgClick(){
				this.showInput=false;
			},
			praise(){
				if(this.selectItem.isLiker==1){
					uni.showToast({
						title:'不能重复点赞',
						icon:'none'
					})
				}else{
					this.selectItem.likes+=1;
					this.$ajax('LikeWorkReportByShop',{
						id:this.selectItem.id
					},res=>{
						uni.showToast({
							title:'点赞成功',
							icon:'none'
						})
					})
				}
			},
			hideModal(){
				this.modalName=null;
			},
			viewImg(item){
				this.modalName='Image';
				this.imgItem=item;
				console.log(this.imgItem)
			},
			//删除日志
			deleteLog(){

			},
			//返回上一级
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getItem(id){
			    this.$ajax('WorkReportByShop',{
			        id:id
				},res=>{
			        this.selectItem = res
					
				})
			}
		},
	}
</script>

<style lang="less">
	uni-textarea{
		min-width:360px;
		overflow:hidden;
	}
	.log-content{
		padding:19px 12px 22px 17px;
		margin-bottom:13px;
		.log-user{
			margin-bottom:9px;
		}
		.log-summary{
			margin-bottom:13px;
		}
	}
	.article-content{
		margin-bottom:13px;
		.article-item{
			padding:13px 12px 12px 14px;
		}
	}
	.comment-content{
		padding-top:11px;
		padding-left:16px;
		padding-bottom:50px;
		.comment-item{
			padding:26px 0 28px;
		}
	}
	.chat-comment{
		padding:12px 14px 7px 17px;
		background:#fff;
	}
</style>
