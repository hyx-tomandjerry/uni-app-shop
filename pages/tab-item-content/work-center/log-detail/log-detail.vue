<template>
	<view class="position_relative">
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left">
				<view class="cuIcon-back" style="font-size:20px;" @click.stop="goBack()"></view>
			</block>
			<block slot="content"><view class="title font-size-big font-weight-bold color-normal">汇报详情</view></block>
			<block slot="right" >
				<image src="../../../../static/icon/icon-shanchu@2x.png"
						@click="deleteLog()"
				style="width:16px;height:16px;" v-if="type=='log' && selectItem.reporter==userInfo.id"></image>
			</block>
		</cu-custom>
		<view class="log-content borderTop bg-white">
			
			<view class="log-user flex justify-start font-size-normal font-weight-normal">
				<view style="margin-right:14px;">
					<image :src="selectItem.headurl?selectItem.headurl:'../../../../static/img/default.png'"
					 style="width:45px;height:45px;border-radius: 50%;vertical-align: middle;"></image>
				</view>
				<view style="padding-top:4px;">
					<view class=" color-normal">{{selectItem.reporterName || ''}}</view>
					<view class="color-placeholder font-size-litter font-weight-normal flex justify-between">
						<view>
							{{selectItem.rptdate | formatTime('YMDHMS')}}
						</view>
						<view style="margin-left:20px;">
							<text v-if="type=='article'">来自</text>
							<text v-else-if="type=='log'">发送</text>
							<text style="margin-left:10px;">{{selectItem.shopName}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="log-summary" >
				<view  style="margin-bottom:4px;font-size:17px;font-weight: bold;" class="color-normal">{{selectItem.name || ''}}</view>
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

		<view class="article-content bg-white font-size-small font-weight-normal" >
			<view class="article-item flex justify-between borderBottom">
				<view class="color-normal flex-sm" >文章标题</view>
				<view style="color:rgba(137,136,136,1); " class="font-size-mini text-ellipse flex-1">{{selectItem.articleTitle || ''}}</view>
			</view>
			<view v-if="type=='article'">

				<view class="article-item flex justify-between">
					<view class="color-normal">文章编号</view>
					<view style="color:rgba(137,136,136,1);">{{selectItem.articleSeq}}</view>
				</view>
			</view>
			<view v-if="type=='log'">
				<view class="article-item flex justify-between borderBottom">
					<view class="color-normal">门店名称</view>
					<view style="color:rgba(137,136,136,1); " class="font-size-mini">{{selectItem.shopName}}</view>
				</view>
			</view>
		</view>

		<!-- <view class="comment-content bg-white">
			<view class="color-normal font-size-big font-weight-middle">评价（{{selectItem.likers?selectItem.likers.length:0}}）</view>
			
			
			
			
			<view class="comment-item borderBottom flex justify-start" v-for="(item,index) in commentList" :key="index" @click="chatClick(item)">
				<view style="width:10%;margin-right:12px;">
					<image :src="item.extprops?item.extprops:'../../../../static/img/default.png'"  style="width:45px;height:43px;border-radius: 50%;"></image>
				</view>
				<view style="width:89%;">
					<view class="font-weight-normal font-size-small " style="color:rgba(41,85,117,1);">{{item.posterName}}</view>
					<view class=" font-weight-normal font-size-litter color-placeholder" style="margin-bottom:7px;">{{item.podate | formatTime('YMDHMS')}}</view>
					<view class="font-size-normal font-weight-normal color-normal">
						<text v-if="item.receiverName">回复{{item.receiverName}}:</text>{{item.summary}}
					</view>
				</view>
				<view v-if="item.poster==userInfo.id">
					<image src="../../../../static/icon/icon-shanchu@2x.png"
					@click="delCommentClick(item.id)"
					style="width:16px;height:16px;position: absolute;right:30px;"></image>
				</view>
			</view>
			
			
			
			
			
		</view> -->
		
		
		<!-- <view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog" @tap="hideModal()">
				<view class="bg-img" :style="[{ backgroundImage:'url(' + imgItem.url + ')' }]" style="min-height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				
			</view>
		</view> -->
		
		<!-- <view class="cu-modal" :class="modalName=='Image'?'show':''" @click="hideModal()">
			<view class="cu-dialog">
				<view class="bg-img" :style="[{ backgroundImage:'url(' + imgItem.url+ ')' }]" style="min-height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="downImg()">
							<text class="cuIcon-down " style="font-size:20px;"></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view> -->
		<imageModel :isShow="modalName=='Image'" @hideModal="hideModal" @downImg="downImg" :url="imgItem.url"></imageModel>
	<!-- 	<view class="chat-comment flex justify-start " style="position:fixed;bottom:0px;z-index:100;width:100%">
			
				<input type="text" :placeholder="placeMsg" style="background:rgba(238,238,237,1);
border-radius:15px;padding-left:18px;width:60%;" class="font-size-litter font-weight-normal" @click="inputMsgClick()" v-model="inputMsg">
				<view v-if="showInput">
					<image :src="selectItem.isLiker==1?'../../../../static/img/work/log/dianzan_color.png':'../../../../static/img/work/log/dianzan.png'" style="width:19px;height:19px;vertical-align: middle;margin: 0 8px 0 17px;" @click="praise()"></image>
					<text>{{selectItem.likes}}</text>
					<image src="../../../../static/img/work/log/fenxiang.png" style="width:19px;height:19px;vertical-align: middle;margin: 0 7px 0 18px;"></image>
					<text>{{selectItem.forwards}}</text>
				</view>
				<view v-else>
					<view  style="background:#3dcfff;color:#fff;padding:5px 15px;border-radius: 8px;margin-left:50px;" @click="sendMsg()"> 发表</view>
				</view>
			
		</view> -->
		
		
		<!-- <view class="cu-modal" :class="modalName=='deleteModal'?'show':''">
			<view class="cu-dialog ">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content font-size-big font-weight-normal color-normal">提示</view>
				</view>
				<view class="padding-xl font-size-big font-weight-normal color-normal bg-white borderBottom" style="padding:25px 0 27px;">
					确定要删除该评论吗?
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;"  @tap="hideModal()">取消</view>
						<view style="width:50%;padding:12px;"  @tap="confirmDel('comment')" class="text-blue">确定</view>
					</view>
				</view>
			</view>
		</view> -->
		
		<!-- <view class="cu-modal" :class="modalName=='deleteLogModel'?'show':''">
			<view class="cu-dialog ">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content font-size-big font-weight-normal color-normal">提示</view>
				</view>
				<view class="padding-xl font-size-big font-weight-normal color-normal bg-white borderBottom" style="padding:25px 0 27px;">
					确定要删除该日志吗?
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;"  @tap="hideModal()">取消</view>
						<view style="width:50%;padding:12px;"  @tap="confirmDel('log')" class="text-blue">确定</view>
					</view>
				</view>
			</view>
		</view> -->
		<showModel :isShow="modalName=='deleteLogModel'" @hideModel="hideModal" @confirmDel="confirmDelModel('log')" v-if="modalName=='deleteLogModel'">
			
			<block slot="content">确定要删除该日志吗?</block>
		</showModel>
		<showModel :isShow="modalName=='deleteModal'" @hideModel="hideModal" @confirmDel="confirmDelModel('comment')" v-if="modalName=='deleteModal'">
			
			<block slot="content">确定要删除该评论吗?</block>
		</showModel>
		
		<!-- <view class="cu-modal" :class="modalName=='download'?'show':''"  @click="hideModal()()">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class=" content" style="font-size:12px;">下载成功</view>
				</view>
			</view>
		</view> -->
		<simpleModel :isShow="modalName=='download'" @hideSimpleModel="hideModal()" v-if="modalName=='download'">
			<block slot="content">下载成功</block>
		</simpleModel>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import showModel from '../../../../components/show-model.vue'
	import simpleModel from '../../../../components/simple-model.vue'
	import downloader from '../../../../common/img-downloader.js'
	import imageModel from '../../../../components/image-model.vue'
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
				commentList:[],
				placeMsg:'',
				deleteID:'',
				shopID:''
              
			}
		},
		components:{showModel,simpleModel,imageModel},
        onLoad(params){
		
			if(params){
				this.id = params.id;
				this.shopID=params.shop;
				this.type=params.type;
				this.getItem(this.id);
				// this.commentListClick()
			}
		  
			
		},
		methods: {
			downImg(){
				 uni.getImageInfo({
					 src:this.imgItem.url,
					 success:(res)=>{
						let promise=downloader.load(res.path,res.path);
						promise.then(([err, res])=>{ 
							if(res){
								this.modalName='download';
								
							} 
						});
					 }
				 })
			},
			confirmDelModel(type){
				switch(type){
					case 'comment':
					this.$ajax('RemoveCommentByShop',{
						id:this.deleteID,
						workreport:this.id,
						
					},res=>{
						this.commentListClick()
						uni.showToast({
							title:'删除评论成功',
							icon:'none'
						})
						this.modalName=null;
					})
					break;
					case 'log':
					this.$ajax('RemoveShopWorkReport',{
						id:this.selectItem.id
					},res=>{
						uni.showToast({
							title:'删除工作日志成功',
							icon:'none'
						})
						uni.navigateBack({
							delta:1
						})
					})
					break;
				}
				
			},
			chatClick(item){
				if(item.poster!=this.userInfo.id){
					this.showInput=false;
					this.placeMsg=`回复${item.posterName}`
					this.$ajax('LeaveCommentByShop',{
						id:this.id,
						receiver:item.poster,
						content:this.inputMsg
					},res=>{
						this.commentListClick();
						uni.showToast({
							title: '回复成功',
							icon:'none'
						});
						this.inputMsg=''
					})
				}
				
			},
			//删除评论
			delCommentClick(id){
				this.modalName='deleteModal';
				this.deleteID=id;
			},
			//查看评论内容
			commentListClick(){
				this.$ajax('CommentsByShop',{
					workreport:this.id,
					
				},res=>{
					this.commentList=res;
				})
			},
			sendMsg(){
				console.log(this.inputMsg)
				this.$ajax('LeaveCommentByShop',{
					id:this.id,
					receiver:0,
					content:this.inputMsg
				},res=>{
					this.commentListClick();
					uni.showToast({
						title: '评论成功',
						icon:'none'
					});
					this.inputMsg=''
				})
			},
			inputMsgClick(){
				this.showInput=false;
				this.placeMsg=`写评论`
			},
			praise(){
				if(this.selectItem.isLiker==1){
					uni.showToast({
						title:'不能重复点赞',
						icon:'none'
					})

				}else{
					this.$ajax('LikeWorkReportByShop',{
						id:this.id
					},res=>{
						
						uni.showToast({
							title:'点赞成功',
							icon:'none'
						})
						this.getItem(this.selectItem.id)
						
					})
				}
			},
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
				
			},
			viewImg(item){
				this.modalName='Image';
				this.imgItem=item;
				console.log(this.imgItem)
			},
			//删除日志
			deleteLog(){
				this.modalName='deleteLogModel'
			},
			//返回上一级
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getItem(id){
			    this.$ajax('WorkReportByShop',{
			        article:id,
					shop:this.shopID
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
