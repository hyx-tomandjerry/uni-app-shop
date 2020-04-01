<template>
	<view class="borderTop">
		<view class="user-info-container margin-bottom-normal flex justify-start align-center">
			<image :src="userInfo.headurl?userInfo.headurl:'../../../../static/img/default.png'" mode="" class="user-img"></image>
			<view class="user-info">
				<view class="font-size-big color-normal" style="margin-bottom:3px;">报修人 : {{repaitItem.applierName || ''}}</view>
				<view class="font-size-small color-regular">{{repaitItem.applierMobile || ''}}</view>
			</view>
		</view>
		<normal-detail-title title="报修详情"></normal-detail-title>
		<view class="order_content">
				<view class="repair-detail">
					<view class="repair-detail-list">
						<normal-detail-item :leftPadding="true" leftIntro="门店名称"
							:marginBottom="true"
							:rightContent="repaitItem.name"></normal-detail-item>
		
						<normal-detail-item :leftPadding="true" leftIntro="品牌名称"
							:marginBottom="true"
							:rightContent="repaitItem.brandName"></normal-detail-item>
						
						<normal-detail-item 
							:marginBottom="true" :leftPadding="true"
							leftIntro="门店地址" 
							:rightContent="`${repaitItem.provinceName || ''}${repaitItem.districtName || ''}${repaitItem.cityName || ''}${repaitItem.address || ''}`"></normal-detail-item>
						
						
						<normal-detail-item :leftPadding="true" leftIntro="维修类别"
							:marginBottom="!repaitItem.categoryName"
							
							:rightContent="repaitItem.type|repairTypePipe"></normal-detail-item>
							
							<template v-if="repaitItem.categoryName && repaitItem.category">
								<uni-collapse accordion="true">
								    <uni-collapse-item title="维修子类别" :content="repaitItem.categoryName">
										<repair-catalog  :subItem="subItem" fileImg="../../../../static/img/article/ppt.png"/>
											
										</repair-catalog>
								        
								    </uni-collapse-item>
								</uni-collapse>
							</template>
						
						
						<normal-detail-item 
							:leftPadding="true"
							leftIntro="报修描述" :rightContent="repaitItem.summary || ''">
							
						</normal-detail-item>
						
						<filesContent :files="files" :borderBottom="false"></filesContent>
					</view>
				</view>

				<normal-detail-title title="服务状态"></normal-detail-title>
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

							>{{repaitItem.status | repairStatusZnPipe}}</view>
						</view>
					</view>

					<view style="padding-top:22px;">
						<normal-detail-item :leftPadding="true" leftIntro="申请时间"
							:marginBottom="true"
							:rightContent="repaitItem.applyDate | formatTime('YMDHMS')"></normal-detail-item>
						<normal-detail-item :leftPadding="true" leftIntro="预约时间"
							:marginBottom="true"
							:rightContent="repaitItem.appointTime | formatTime('YMDHMS')"></normal-detail-item>
						<normal-detail-item :leftPadding="true" leftIntro="门店编号"
							:marginBottom="true"
							:rightContent="repaitItem.shopSeq"></normal-detail-item>	
					
						<normal-detail-item :leftPadding="true" leftIntro="订单编号"
							:marginBottom="true"
							:rightContent="repaitItem.seq"></normal-detail-item>
					</view>
				</view>
				<!-- 报修进度 -->
				<!-- <filesContent :files="files"></filesContent> -->

				<!-- 审批流程 -->
				<normal-detail-title title="审批流程"></normal-detail-title>
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
			<common-btn-one
				content="删除订单"
				dataTarget="deleteModel"
				type="primary"
				v-if="( repaitItem.curnode==1 && repaitItem.approval==approvalStatus.applied)"
				@operateBtn="delOrder" :isPos="true"></common-btn-one>
			<!-- 已驳回可以修改或者删除-->
			 <BottomBtnTwo
			 refuse_btn_con="删除订单"
			 refuse_data_target="deleteModel"
			 agree_data_target="repairModel"
			 agree_btn_con="重新提交"
			 @refuseBtn="delOrder"
			 @agressBtn="createOrder"
			  v-if="repaitItem.approval==approvalStatus.rejected"
			 ></BottomBtnTwo>
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
		<!--拒绝弹出框 -->
		<showModelRefuse 
		content="拒绝理由"
		:isShow="modalName=='refuseModel'"
		 @hideModal="hideModal" @refuse="refuse"></showModelRefuse>
</view>
</template>

<script>
	import normalDetailItem from '../../../../components/common/normal-detail-item.vue'
	import normalDetailTitle from '../../../../components/common/normal-detail-title.vue'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import BottomBtnTwo from '../../../../components/common/bottom-btn-two.vue'
	import downloader from '../../../../common/img-downloader.js'
	import workflowItem from '../../../../components/common/workflow-item.vue'
	import filesContent from '../../../../components/common/files-content.vue'
	import showModelRefuse from '../../../../components/common/show-model-refuse.vue'
	import uniCollapse  from '../../../../components/uni/collapse/uni-collapse/uni-collapse.vue'
	import uniCollapseItem  from '../../../../components/uni/collapse/uni-collapse-item/uni-collapse-item.vue'
	import RepairCatalog from '../../../../components/shop/repair/repair-catalog.vue'
	import {mapState} from 'vuex';
	import {ServiceOrderApi,ServiceCatalogApi} from '../../../../api/shop_api.js'
	import {ApproveWorkflowApi} from '../../../../api/apply_api.js'
	import {getNoticeList} from '../../../../api/notice_api.js'
	import {RemoveServiceOrderApi} from '../../../../api/shop_api.js'
	export default{
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
				subItem:{},
				subItemImg:[]

			};
		},
		computed:{
			...mapState(['userInfo']),
			repairStatus(){return this.config.repairStatus},
			approvalStatus(){return this.config.approvalStatus}
		},
		components:{
			workflowItem,
			BottomBtnTwo,
			filesContent,
			commonBtnOne,uniCollapse,uniCollapseItem,RepairCatalog,
			showModelRefuse,normalDetailItem,normalDetailTitle},
		methods: {
			delOrder(){
				uni.showModal({
				    content: '确定要删除报修单?',
				    success:(res)=>{
				        if (res.confirm) {
				            this.operateOrder('delete')
				        }
				    }
				});
			},
			//重新提交保修单
			createOrder(){
				uni.showModal({
				    content: '确定要重新提交报修单?',
				    success:(res)=>{
				        if (res.confirm) {
				            this.operateOrder('edit')
				        }
				    }
				});
			},
			/*
				操作订单
			*/
		   refuse(event){
			   this.reason=event;
			   this.operateOrder('refuse')
		   },
		  async operateOrder(type){
			   switch(type){
				   case 'edit':
				   uni.navigateTo({
				   		url:"../create-order/create-order?newOrEdit=edit&id="+this.repaitItem.id,
				   			success:()=>{
				   				this.hideModal()
				   			}
				   })
				   break;
				   case 'agree':
						if(await ApproveWorkflowApi(this.workflowItem.target,this.workflowItem.formType,0,'',this.workflowItem.id)){
							this.$utils.showToast('审批通过')
							this.$utils.goBack()
						}

				   break;
				   case 'refuse':
					   if(await ApproveWorkflowApi(this.workflowItem.target,this.workflowItem.formType,1,this.reason,this.workflowItem.id)){
						   this.$utils.showToast('审批拒绝')
						   this.hideModal()
						   this.$utils.goBack()
					   }

				   break;
				   case 'delete':
						if(await RemoveServiceOrderApi(this.repaitItem.id)){
							this.$utils.showToast('删除报修单成功');
							this.$utils.goBack()
						}

				   break;
			   }

		   },
			//显示模态框
			showModal(e){
				this.modalName=e;
			},
			hideModal(){
				this.modalName=null
			},
			//获得详情
			async getRepairItem(id){
				this.repaitItem = await ServiceOrderApi(id);
				if(this.repaitItem.files && this.repaitItem.files.length){
					this.files = this.repaitItem.files.map(item=>item.url);
				}
				if(this.repaitItem.category){
					this.getSubRepairInfo(this.repaitItem.category)
				}

			},
			//获得子类别
			async getSubRepairInfo(id){
				this.subItem= await ServiceCatalogApi(id);
				if(this.subItem.files){
					this.subItemImg = this.subItem.files.map(item=>item.url)
				}
				

			},
			//获得流程
			async getWorkflowItem(target){
				let val={
					account:this.userInfo.id,
					owner:0,
					contract:0,
					status:0,
					catalog:this.config.notice.todo,
					offset:this.$utils.getOffset(this.page)
				}
				let result = await getNoticeList(val)
				this.workflowItem = result.find(item=>item.target==target)

			}
		},
		onShow(){
			this.getRepairItem(this.repairID)
		},
		onLoad(option){
			if(option.type){
				this.orderType=option.type
			}
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
	@import url('./repair-order-item.css');
	@import "../../../../common/css/check_index.css";
</style>
