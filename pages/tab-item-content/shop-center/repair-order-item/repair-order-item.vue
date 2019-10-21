<template>
	<view class="borderTop">
		<view class="user-info-container margin-bottom-normal flex justify-start align-center">
			<image :src="userInfo.headurl?userInfo.headurl:'../../../../static/img/default.png'" mode="" class="user-img"></image>
			<view class="user-info">
				<view class="font-size-big color-normal" style="margin-bottom:3px;">报修人:{{repaitItem.applierName || ''}}</view>
				<view class="font-size-small color-regular">{{repaitItem.applierMobile || ''}}</view>
			</view>
		</view>
		<view class="order_content">
				<view class="repair-detail" style="position: relative;">
					<!-- 报修详情 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>报修详情</text>
					</view>
					<view class="repair-detail-list">
						<!-- <view class="repair-detail-list-item flex justify-between">
							<view style="width:40%;text-align: left;padding-left:10px;">报修人</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.creatorName}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view style="width:40%;text-align: left;padding-left:10px;"> 联系电话</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.creatorMobile}}</view>
						</view> -->
						
						<view class="repair-detail-list-item flex justify-between">
							<view class="flex-sm text-left repair-intro">门店名称</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.name}}</view>
						</view>
						<view class="repair-detail-list-item flex justify-between">
							<view class="flex-sm text-left repair-intro">品牌名称</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.brandName}}</view>
						</view>
						
						
						<view class="repair-detail-list-item flex justify-between ">
							<view class="flex-sm text-left repair-intro">门店地址</view>
							<view class="color-regular text-right " style="flex:1">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{repaitItem.provinceName}}{{repaitItem.cityName}}{{repaitItem.districtName}}{{repaitItem.address}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view class="flex-sm text-left repair-intro">维修类别</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.type|repairTypePipe}}</view>
						</view>
						
						<!--<view class="repair-detail-list-item flex justify-between">-->
							<!--<view style="width:40%;text-align: left;padding-left:10px;">维修详情</view>-->
							<!--<view class="text-grey flex-1 text-right">{{repaitItem.categoryName || ''}}</view>-->
						<!--</view>-->
						
						<view class="repair-detail-list-item flex justify-between">
							<view  class="flex-sm text-left repair-intro">维修日期</view>
							<view class="color-regular  flex-1 text-right">{{repaitItem.appointdate | formatTime('YMD')}}</view>
						</view>
						
						<view class="repair-detail-list-item">
							<view style="margin-bottom:6px;" class="flex-sm text-left repair-intro">报修描述</view>
							<view class="color-regular repair-summary" >{{repaitItem.summary}}</view>
						</view>
						
					</view>
				</view>
				
				
				<view class="repair-detail" style="position: relative;">
					<!-- 报修进度 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>服务状态</text>
					</view>
					<view class="repair-detail-item flex justify-between borderBottom font-size-big" style="padding:24px 0;">
						<view class="flex justify-start">
							<view style="margin-right:40px;" class="font-size-normal color-normal">
								{{repaitItem.status==repairStatus.submit?'审核进度:':'维修进度:'}}
							</view>
							
							
							<view v-if="repaitItem.status==repairStatus.submit" 
								:class="{
									'wait':repaitItem.approval==approvalStatus.wait,
									'executing':repaitItem.approval==approvalStatus.applied,
									'accepted':repaitItem.approval==approvalStatus.accepted,
									'rejected':repaitItem.approval==approvalStatus.rejected,
								}"
							>
								{{repaitItem.approval | approvalStatusPipe }}
							</view>
							<view v-else
							:class="{
								'text-orange':repaitItem.status==repairStatus.submit,
								'text-green':repaitItem.status==repairStatus.executing,
								'color-red':repaitItem.status==repairStatus.finished,
								'text-purple':repaitItem.status==repairStatus.commented}"
							
							>{{repaitItem.status | repairStatus}}</view>
						</view>
						<!--<view class="cu-tag line-blue" @click="showModal($event)" data-target="bottomModal" -->
							<!--v-if="repaitItem.status==repairStatus.treating || repaitItem.status==repairStatus.finish">-->
							<!--查看进度-->
						<!--</view>-->
					</view>
					
					<view style="padding-top:22px;">
						<view style="margin-bottom:14px;" class="font-size-big">
							<text style="margin-right:20px;" class=" color-normal">申请时间:</text>
							<text class="color-regular">{{repaitItem.createdate | formatTime('YMDHMS')}}</text>
						</view>
						<view class="font-size-big">
							<text style="margin-right:20px;" class=" color-normal">订单编号:</text>
							<text class="color-regular">{{repaitItem.shopSeq}}</text>
						</view>
					</view>
				</view>
				
				
				<view class="repair-detail" style="position: relative;" v-if="repaitItem.status==4">
					<!-- 报修进度 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>评价结果</text>
					</view>
					<view class="text-grey" style="padding-top:13px;padding-bottom:12px;">
						感谢维修师傅，来的很及时，各方面都挺好的
					</view>
				</view>
				
				<view class="repair-detail" style="position: relative;">
					<!-- 报修进度 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>报修附件</text>
					</view>
					<view  style="padding-top:13px;padding-bottom:12px;" v-if="repaitItem.files">
						<view class="bg-white padding">
							<view class="grid col-4 grid-square">
								<view class="bg-img" v-for="(item,index) in repaitItem.files" :key="index" :style="[{ backgroundImage:'url(' + item.url + ')' }]"
									@click="viewImg(index)"
								></view>
							</view>
						</view>
							<!-- <view class=" flex justify-start">
								<image v-for="(item,index) in repaitItem.files" :key="index" :src="item.url" style="width:78px;height:78px;margin-right:12px;" @click="viewImg(item)"></image> -->
								<!-- <view class="bg-img" v-for="(item,index) in repaitItem.files" :key="index"
								 :style="[{ backgroundImage:'url(' + item.url + ')' }]"></view> -->
							<!-- </view> -->
						
			
					</view>
				</view>
				<view class="margin-top-13 workflow-container bg-white">
					<view class="font-size-big font-weight-bold color-normal">审批流程</view>
					<view class="workflow-list" v-if="repaitItem.steps">
						<view class=" flex justify-start align-center margin-bottom-normal" v-for="(workflow,index) in repaitItem.steps" :key="index">
							<view class="tag">{{workflow.id}}</view>
							<view class=" flex-1 work-flow-item" >
								<view class="flex  justify-between">
									<view class="flex-1">
											{{workflow.acceptorName || ''}}
											<text v-show="workflow.acceptRoleName">({{workflow.acceptRoleName}})</text>
									</view>
									<view v-if="workflow.reviewDate " class="flex-sm " style="font-size:22upx;">{{workflow.reviewDate | formatTime('YMDHMS')}}</view>
								</view>
								<view style="margin-top:5px;margin-bottom:5px;"><text class="color-blue">{{workflow.status | approvalStatusPipe}}</text></view>
								<view class="color-regular" v-if="workflow.comment">备注：{{workflow.comment|| ''}}</view>
							</view>
						</view>
					</view>
				</view>
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view></view>
					<view class="action text-blue" @tap="hideModal()">
						<image src="../../../../static/icon/icon-repair-guanbi.png" style="width:24px;height:24px;"></image>
					</view>
				</view>
				<view class="progress-content">
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/icon-repair-wancheng.png' style="width:18px;height:18px;margin-right:19px;"></image>
							<text class="status-title">已完成</text>
						</view>
						<view style="padding-left:37px;">
							<view class="progress-desc">
								维修已经完成，请对本次服务进行评价。
							</view>
							<view class="progress-time">
								2019-03-22 09:15:30
							</view>
						</view>
					</view>
					
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/icon-repair-during.png' style="width:16px;height:16px;margin-right:16px;"></image>
							<text class="status-title">维修中</text>
						</view>
						<view style="padding-left:37px;">
							<view class="progress-desc">
								正在维修中
							</view>
							<view class="progress-time">
								2019-03-22 09:15:30
							</view>
						</view>
					</view>
					
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/icon-repair-guocheng.png' style="width:18px;height:16px;margin-right:16px;"></image>
							<text class="status-title">上门中</text>
						</view>
						<view style="padding-left:37px;">
							<view class="progress-desc">
								已分派维修师傅，正在生门中;
								登跃 联系电话：13241468904
							</view>
							<view class="progress-time">
								2019-03-22 09:15:30
							</view>
						</view>
					</view>
					
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/icon-repair-guocheng.png' style="width:18px;height:16px;margin-right:16px;"></image>
							<text class="status-title">派单中</text>
						</view>
						<view style="padding-left:37px;">
							<view class="progress-desc">
								正在为您分配维修员。
							</view>
							<view class="progress-time">
								2019-03-22 09:15:30
							</view>
						</view>
					</view>
				</view>
			</view>
			</view>
	</view>
		<view class="btn-container" v-if="orderType=='repair' && repaitItem.applier == userInfo.id">
		
			<!-- 待审批可以删除 -->
			<view class="refuse-btn " @click="showModal($event)" data-target="deleteModel" v-if="repaitItem.approval==approvalStatus.applied">删除订单</view>
			<!-- 已驳回可以修改 -->
			<view class="refuse-btn " @click="showModal($event)" data-target="repairModel" v-if="repaitItem.approval==approvalStatus.rejected">修改订单</view>
			<!-- <view class="btn-area" v-else-if=" (repaitItem.status==repairStatus.waitManager || repaitItem.status==repairStatus.waitArea)" @click="showModal($event)" data-target="repairModel">修改订单</view> -->
		</view>
		<view class="btn-container flex justify-start" v-if="orderType=='notice'">
			<view class="refuse-btn flex-sm" @click="operateOrder('agree')">同意</view>
			<view class="agree-btn flex-1" @click="showModal($event)" data-target="refuseModel">拒绝</view>
		</view>
		<showModel :isShow="modalName=='repairModel'" @hideModel="hideModal"
					 @confirmDel="operateOrder('edit')" v-if="modalName=='repairModel'">
			<block slot="content">确定要修改保修单?</block>
		</showModel>
		<showModel :isShow="modalName=='deleteModel'" @hideModel="hideModal"
					 @confirmDel="operateOrder('delete')" v-if="modalName=='deleteModel'">
			<block slot="content">确定要删除报修单?</block>
		</showModel>
		<view class="cu-modal" :class="modalName=='refuseModel'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content ">说明事由</view>
				</view>
				<view class="padding-xl ">
					<textarea value="" placeholder="请输入拒绝理由" v-model="reason"/>
				</view>
				<view class="borderTop cu-dialog-b bg-white" >
					<view class="cu-dialog-btn" @click="operateOrder('refuse')">确定</view>
				</view>		
			</view>
			
		</view>
</view>
</template>

<script>
	import {mapState} from 'vuex';
	import showModel from '../../../../components/show-model.vue'
	import downloader from '../../../../common/img-downloader.js'
	export default{
		computed:mapState(['repairStatus','userInfo','approvalStatus']),
		data(){
			return{
				avatar:[],
				modalName:null,
				repaitItem:'',
				orderType:'notice',//repair从门店报修，notice从动态通知中来
				reason:'',
				workflowItem:"",
				repairID:''
				
			};
		},
		components:{showModel},
		methods: {
			
			//删除订单
			deleteOrder(){
				this.modalName='deleteModel';
			},
			/*
				操作订单
			*/
		   operateOrder(type){
			   console.log('317',this.workflowItem)
			   switch(type){
				   case 'edit':
				   uni.navigateTo({
				   		url:"../create-order/create-order?id="+this.repaitItem.id,
				   			success:()=>{
				   				this.hideModal()
				   			}
				   })
				   break;
				   case 'agree':
				   console.log('kkk',this.workflowItem)
				   this.$ajax('ApproveWorkflow',{
					   form:this.workflowItem.target,
					   type:this.workflowItem.formType,
					   event:this.workflowItem.id,
				   	reject:0,//reject = 1,表示拒绝，审批不通过； = 0表示审批通过
				   	comment:'',//审批意见，字符串
				   },res=>{
				    	uni.navigateBack({
				   		 delta:1
				   	  })
				   })
				   break;
				   case 'refuse':
				    console.log('kkk',this.workflowItem)
					this.$ajax('ApproveWorkflow',{
						
						form:this.workflowItem.target,
						type:this.workflowItem.formType,
						event:this.workflowItem.id,
						reject:1,//reject = 1,表示拒绝，审批不通过； = 0表示审批通过
						comment:this.reason,//审批意见，字符串
					},res=>{
						uni.showToast({
							title: '拒绝审批成功',
							icon:'none',
							success: () => {
								this.hideModal();
								uni.navigateBack({
									delta:1
								})
							}
						});
						
					})
					// this.$ajax('SubmitServiceOrder',{id:this.repaitItem.id,refused:1},res=>{
					// 	uni.showToast({
					// 		title:'拒绝保修单成功!',
					// 		icon:'none',
					// 		success:()=>{
					// 			uni.navigateBack({
					// 				delta:1
					// 			})
					// 		}
					// 	})
					// })
				   break;
				   case 'delete':
				   this.$ajax('RemoveServiceOrder',{
					   id:this.repaitItem.id
				   },res=>{
					   uni.showToast({
					   	title:'删除报修单成功!',
					   	icon:'none',
					   	success:()=>{
					   		uni.navigateBack({
					   			delta:1
					   		})
					   	}
					   })
				   })
				   break;
			   }
			   
		   },
		   
		
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//显示模态框
			showModal(e){
				console.log(e)
				this.modalName=e.currentTarget.dataset.target;
			},
			hideModal(){
				this.modalName=null
			},
			viewImg(index){
				let imgList=[];
				this.repaitItem.files.forEach(item=>{
					if(item.postfix){
						imgList.push(item.url)
					}
				})
				
				uni.previewImage({
					urls: imgList,
					current:index,
					indicator:'number',
					longPressActions: {
						itemList: [ '保存图片'],
						success: function(data) {
							if(data.tapIndex + 1==1){
								uni.getImageInfo({
									src:imgList[data.tapIndex + 1],
									success:(res)=>{
										let promise=downloader.load(res.path,res.path);
										promise.then(([err, res])=>{ 
											if(res){
												uni.showToast({
													title:'保存图片到相册',
													icon:'none'
												})			
											} 
										});
								 }
							})
						}
					},
					fail: function(err) {
							console.log(err.errMsg);
					}
            }
				})
				
			},
			//获得详情
			getRepairItem(id){
				this.$ajax('ServiceOrder',{
					id:id,
					step:1
				},res=>{
					this.repaitItem=res;
					if(res.files){
						res.files.forEach(item=>{
							this.avatar.push({
								image:item.url,
								text:''
							})
						})
					}
					
					
				})
			},
			//获得流程
			getWorkflowItem(target){
				this.$ajax('EventFlows',{
					account:this.userInfo.id,
					owner:0,
					contract:0,
					status:0,
					catalog:this.$store.state.notice.todo,
					offset:this.$utils.getOffset(this.page)
				},res=>{
					if(res){
						this.workflowItem=res.find(item=>item.target==target)
						console.log('477',this.workflowItem)
					}
				})
			}
		},
		onShow(){
			this.getRepairItem(this.repairID)
		},
		onLoad(option){
			if(option.type){
				this.orderType=option.type
			}
			// this.$fire.on('notice',result=>{
			// 	this.workflowItem=result;
			// })
			if(option.id){
				this.repairID=option.id;
				this.getRepairItem(option.id)
				if(this.orderType=='notice'){
					this.getWorkflowItem(option.id)
				}
				
			}
			
			
		}
	}
</script>


	


<style lang="less" scoped>
	.user-info-container{
		height:97px;
		box-sizing: border-box;
		padding-top:20px;
		padding-left:22px;
		padding-bottom:19px;
		background:#fff;
		.user-img{
			height: 58px;
			width: 58px;
			border-radius: 50%;
			vertical-align: middle;
		}
		.user-info{
			margin-left: 12px;
		}
		
	}
	.smile-img{
		width: 15px;
		height: 15px;
		vertical-align: middle;
		margin-right: 8px;
	}
	.cu-timeline>.cu-item>.content{
		padding:0;
	}
	.cu-timeline>.cu-item{
		padding:12px 15px 5px 60px;
	}
	
	.operaterInfo{
		padding:21px 19px 21px 20px;
		background: #fff;
		margin-bottom:13px;
	}
	.repair-detail{
		padding:15px 13px 23px 18px;
		background: #fff;
		margin-bottom:13px;
		.repair-detail-title{
			font-size:16px;
			padding-bottom:11px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
			margin-left:12px;
			border-bottom:1px solid rgba(238, 238, 237, 1);
		}
		.repair-detail-list{
			padding-top:15px;
			
			.repair-detail-list-item{
				margin-bottom:15px;
				font-size:15px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(42,42,42,1);
				.repair-intro{
					padding-left:10px;
				}
				.repair-summary{
					font-size:15px;
					padding:10px 15px;
				
					word-wrap: break-word;
					word-break: break-all
				}
			}
		}
	}
	
	.progress-content{
		padding:17px 41px 29px 45px;
		.progress-item{
			margin-bottom:8px;
			.status-title{
				font-size:15px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(42,42,42,1);
			}
			.progress-desc{
				font-size:14px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(137,136,136,1);
				margin-bottom:1px;
			}
			.progress-time{
				font-size:12px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(137,136,136,1);
			}
		}
		
	}
	.btn-container{
		background-color: #fff;
		width:100%;
		padding:11px 12px 10px 14px;
		.btn-area{
			width:100%;
			text-align: center;
			background:rgba(66,176,237,1);
			border-radius:5px;
			height:40px;
			line-height:40px;
			color:#fff;
			font-size:17px;
			
		}
		.agree-btn{
			height:40px;
			line-height:40px;
			color:rgba(66,176,237,1);
			font-size:16px;
			border-radius:5px;
			text-align: center;
			margin-left: 12px;
			border:1px solid rgba(66,176,237,1);
		}
		.refuse-btn{
			height:40px;
			line-height:40px;
			color:#fff;
			font-size:16px;
			text-align: center;
			background:rgba(66,176,237,1);
			border-radius:5px;
		}
	}
	.workflow-container{
		padding-top: 17px;
		padding-left: 15px;
		.workflow-list{
			padding:25px 14px 25px;
			.tag{
				width:30px;height:30px;background:orange;margin-right:15px;border-radius:50%;line-height:30px;color:#fff;text-align: center;font-weight: bold;
			}
			.work-flow-item{
				background-color: #EEEEED;
				padding:5px 7px;
				border-radius:8px;
				margin-right:15px;
				
			}
		}
		
	}
	// 审批状态颜色-待审批
	.wait{
		color:#00474f
	}
	// 审批状态颜色-审批中
	.executing{
		color:#096dd9
	}
	//已通过
	.accepted{
		color:#52c41a
	}
	//被驳回
	.rejected{
		color:#f5222d
	}
	.cu-dialog-b{
		padding:20upx;
		.cu-dialog-btn{
			height:40px;
			line-height:40px;
			border-radius: 10upx;
			color:#fff;
			font-size:15px;
			text-align: center;
			background-color: #42B0ED;
		}
	}
	uni-textarea{
		height:200upx;
		text-align: left;
	}
</style>
