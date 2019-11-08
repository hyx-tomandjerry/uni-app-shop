<template>
	<view class="borderTop">
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back font-size-back font-weight-bold"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >报修详情</view></block>
		</cu-custom>
		<view class="user-info-container margin-bottom-normal flex justify-start align-center">
			<image :src="userInfo.headurl?userInfo.headurl:'../../../../static/img/default.png'" mode="" class="user-img"></image>
			<view class="user-info">
				<view class="font-size-big color-normal" style="margin-bottom:3px;">报修人 : {{repaitItem.applierName || ''}}</view>
				<view class="font-size-small color-regular">{{repaitItem.applierMobile || ''}}</view>
			</view>
		</view>
		<normal-title content="报修详情" :isTag="true"></normal-title>
		<view class="order_content">
				<view class="repair-detail">
					<view class="repair-detail-list">
						<common-item :content="repaitItem.name" intro="门店名称"></common-item>
						<common-item :content="repaitItem.brandName" intro="品牌名称"></common-item>
						<common-item 
						:content="`${repaitItem.provinceName || ''}${repaitItem.districtName || ''}${repaitItem.cityName || ''}${repaitItem.address || ''}`" 
						intro="门店地址"></common-item>
						<common-item :content="repaitItem.type|repairTypePipe" intro="维修类别"></common-item>
						<common-item :content="repaitItem.appointdate | formatTime('YMD')" intro="维修日期"></common-item>
						<common-item :content="repaitItem.summary" intro="报修描述"></common-item>
					</view>
				</view>
				
				<normal-title content="服务状态" :isTag="true"></normal-title>
				<view class="repair-detail">
					
					<view class="repair-detail-item flex justify-between borderBottom font-size-big" style="padding:24px 18upx;">
						<view class="flex justify-start">
							<view style="margin-right:40px;" class="font-size-normal color-normal">
								{{repaitItem.status==repairStatus.submit?'审核进度:':'维修进度:'}}
							</view>
							<view v-if="repaitItem.status==repairStatus.submit"  class="common-tag"
								:class="{
									'wait':repaitItem.approval==approvalStatus.wait,
									'executing':repaitItem.approval==approvalStatus.applied,
									'accepted':repaitItem.approval==approvalStatus.accepted,
									'rejected':repaitItem.approval==approvalStatus.rejected,
								}"
							>
								{{repaitItem.approval | approvalStatusPipe }}
							</view>
							<view v-else class="common-tag"
							:class="{
								'wait':repaitItem.status==repairStatus.submit,
								'executing':repaitItem.status==repairStatus.executing,
								'rejected':repaitItem.status==repairStatus.finished,
								'bg-color-purple':repaitItem.status==repairStatus.commented}"
							
							>{{repaitItem.status | repairStatus}}</view>
						</view>
					</view>
					
					<view style="padding-top:22px;">
						<common-item :content="repaitItem.createdate | formatTime('YMDHMS')" intro="申请时间"></common-item>
						<common-item :content="repaitItem.shopSeq" intro="门店编号"></common-item>
						<common-item :content="repaitItem.seq" intro="订单编号"></common-item>
					</view>
				</view>
				<!-- 报修进度 -->
				<filesContent :files="files"></filesContent>
				
				<!-- 审批流程 -->
				<normal-title content="审批流程" :isTag="true"></normal-title>
				<view class=" workflow-container bg-white">
					<view class="workflow-list" v-if="repaitItem.steps">
						<block v-for="(workflow,index) in repaitItem.steps" :key="index">
							<workflowItem :workflow="workflow" :index="index"></workflowItem>
						</block>
						
					</view>
				</view>
	</view>
		
		<view style="height:100px;"></view>
		<template v-if="orderType=='repair' && repaitItem.applier == userInfo.id">
			<!-- 删除订单 -->
			<bottomBtnOne dataTarget="deleteModel" content='删除订单' @showModal="showModal" v-if="repaitItem.approval==approvalStatus.applied"></bottomBtnOne>
			<!-- 已驳回可以修改-->
			<bottomBtnOne dataTarget="repairModel" content='修改订单' @showModal="showModal" 
			 
			 v-if="repaitItem.approval==approvalStatus.rejected"></bottomBtnOne>
		</template>
		<template v-if="orderType=='notice'">
			<BottomBtnTwo
			refuse_btn_con="拒绝" 
			refuse_data_target="refuseModel"
			agree_btn_con="同意"
			@refuseBtn="showModal"
			@agressBtn="operateOrder('agree')"
			></BottomBtnTwo>
		</template>
		
		<showModel :isShow="modalName=='repairModel'" @hideModel="hideModal"
					 @confirmDel="operateOrder('edit')" v-if="modalName=='repairModel'">
			<block slot="content">确定要修改保修单?</block>
		</showModel>
		<showModel :isShow="modalName=='deleteModel'" @hideModel="hideModal"
					 @confirmDel="operateOrder('delete')" v-if="modalName=='deleteModel'">
			<block slot="content">确定要删除报修单?</block>
		</showModel>
		
		<!--拒绝弹出框 -->
		<showModelRefuse :isShow="modalName=='refuseModel'" @hideModal="hideModal" @refuse="refuse"></showModelRefuse>
</view>
</template>

<script>
	import bottomBtnOne from '../../../../components/common/bottom-btn-one.vue'
	import BottomBtnTwo from '../../../../components/common/bottom-btn-two.vue'
	import {mapState} from 'vuex';
	import showModel from '../../../../components/show-model.vue'
	import downloader from '../../../../common/img-downloader.js'
	import workflowItem from '../../../../components/workflow-item.vue'
	import filesContent from '../../../../components/files-content.vue'
	import commonItem from '../../../../components/common-item.vue'
	import showModelRefuse from '../../../../components/common/show-model-refuse.vue'
	import normalTitle from '../../../../components/common/normal-title.vue'
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
				repairID:'',
				files:[],
				address:'',//拼接的地址
				
			};
		},
		components:{
			showModel,
			workflowItem,
			bottomBtnOne,
			BottomBtnTwo,
			filesContent,
			commonItem,
			showModelRefuse,normalTitle},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			//删除订单
			deleteOrder(){
				this.modalName='deleteModel';
			},
			/*
				操作订单
			*/
		   refuse(event){
			   this.reason=event;
			   this.operateOrder('refuse')
		   },
		   operateOrder(type){
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
				   this.$ajax('ApproveWorkflow',{
					   form:this.workflowItem.target,
					   type:this.workflowItem.formType,
					   event:this.workflowItem.id,
				   	reject:0,//reject = 1,表示拒绝，审批不通过； = 0表示审批通过
				   	comment:'',//审批意见，字符串
				   },res=>{
				    	uni.showToast({
				    		title:'同意报修成功',
							icon:'none'
				    	})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},900)
				   })
				   break;
				   case 'refuse':
				   this.$ajax('ApproveWorkflow',{
				   	form:this.workflowItem.target,
				   	type:this.workflowItem.formType,
				   	event:this.workflowItem.id,
				   	reject:1,//reject = 1,表示拒绝，审批不通过； = 0表示审批通过
				   	comment:this.reason,//审批意见，字符串
				   },res=>{
				   	uni.showToast({
				   		title: '拒绝审批成功',
				   		icon:'none'
				   	});
				   	setTimeout(()=>{
				   		this.hideModal();
				   		uni.navigateBack({
				   			delta:1
				   		})
				   		},900)
				   })
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
				this.modalName=e;
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
					
					
					this.files=[]
					if(res.files && res.files.length){
						res.files.forEach(item=>{
							this.files.push(item.url)
						})
					}
					this.address=`${res.provinceName}${res.cityName}${res.districtName}${res.address}`;
					console.log(this.address)
					this.repaitItem=res;
					
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
	@import "../../../../static/css/check_index.css";
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
	
	.repair-detail{
		padding:22upx 26px 22upx 20px;
		background: #fff;
		margin-bottom:13px;
		.repair-detail-title{
			font-size:16px;
			padding-bottom:11px;
			color:rgba(42,42,42,1);
			margin-left:12px;
			border-bottom:1px solid rgba(238, 238, 237, 1);
		}
		.repair-detail-list{
			padding-top:15px;	
		}
	}

	.workflow-list{
		padding:25px 14px 25px;
	}
	
</style>
