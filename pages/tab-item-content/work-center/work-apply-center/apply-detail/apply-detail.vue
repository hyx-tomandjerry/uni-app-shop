<template>
	<view >
			<view class="basic-info bg-white margin-bottom-normal borderTop">
				<view class="flex justify-between align-center">
					<view style="padding-left:24upx;">
						<view class="font-size-big color-normal font-weight-bold">基本信息</view>
					</view>

					<template v-if="detailInfo.approval==applyStatus.wait">
						<image src="../../../../../static/img/work/apply/my-apply/waiting_tag.png"
						mode="widthFix" lazy-load></image>
					</template>
					<template v-else-if="detailInfo.approval==applyStatus.applied">
						<image src="../../../../../static/img/work/apply/my-apply/pending_tag.png"
						mode="widthFix" lazy-load></image>
					</template>
					<template v-else-if="detailInfo.approval==applyStatus.accepted">
						<image src="../../../../../static/img/work/apply/my-apply/pass_tag.png"
						mode="widthFix" lazy-load></image>
					</template>
					<template v-else-if="detailInfo.approval==applyStatus.rejected">
						<image src="../../../../../static/img/work/apply/my-apply/refuse_tag.png"
						mode="widthFix" lazy-load></image>
					</template>

				</view>
				<normal-detail-item leftIntro="门店名称" :rightContent="detailInfo.shopName" ></normal-detail-item>
				<normal-detail-item leftIntro="申请类型" :rightContent="type | approvalModeZnPipe" ></normal-detail-item>
				<normal-detail-item leftIntro="请假类型" :rightContent="detailInfo.xtype | absenceTypeZnPipe" 
					v-if="type==approvalMode.absence"
					></normal-detail-item>
				<normal-detail-item leftIntro="申请名称" :rightContent="detailInfo.name || ''"  v-if="type==approvalMode.common"></normal-detail-item>
				<normal-detail-item leftIntro="申请人" :rightContent="detailInfo.applierName || ''" ></normal-detail-item>
				<normal-detail-item leftIntro="申请时间" :rightContent="detailInfo.applyDate | formatTime('YMDHMS')" v-if="type!=approvalMode.absence"></normal-detail-item>
				<normal-detail-item leftIntro="开始时间" :rightContent="detailInfo.bgndate | formatTime('YMDHMS')" v-if="type==approvalMode.absence"></normal-detail-item>
				<normal-detail-item leftIntro="结束时间" :rightContent="detailInfo.duedate | formatTime('YMDHMS')" v-if="type==approvalMode.absence"></normal-detail-item>
				<view class=" flex align-center justify-start margin-b font-size-normal" v-if="type==approvalMode.absence">
					<view class=" color-regular flex-litter" style="padding-left:10px;">请假时长</view>
					<view class="color-normal ">
						<text v-if="time.days">{{time.days}}天</text>
						<text v-if="time.hours">{{time.hours}}小时</text>
						<text v-if="time.minutes">{{time.minutes}}分钟</text>
					</view>
				</view>
				<normal-detail-item leftIntro="总计金额" :rightContent="detailInfo.amount || ''" v-if="type==approvalMode.expense"></normal-detail-item>
				
				<normal-detail-item leftIntro="申请事由" :rightContent="detailInfo.summary || detailInfo.detail"  v-if="type!=approvalMode.expense"></normal-detail-item>
			</view>
			<!-- 附件 -->
			<filesContent :files="detailInfo.files" :isTag="false"></filesContent>
			<!-- 报销明细 -->
			<view class="apply-detail bg-white margin-bottom-normal" v-if="type==approvalMode.expense">
				<view class="borderBottom">报销明细</view>
				<block v-for="(item,index) in detailInfo.details" :key="index" v-if="detailInfo.details && detailInfo.details.length">
					<applyDetailItem :item="item" :index="index"></applyDetailItem>
				</block>
			</view>
			<!-- 审核流程 -->
			<normal-detail-title title="审批流程" :isTag="false"></normal-detail-title>
			<view class=" bg-white">
				<view class="workflow-list" v-if="detailInfo.steps">
					<block v-for="(workflow,index) in detailInfo.steps" :key="index">
						<workflowItem :workflow="workflow" :index="index"></workflowItem>
					</block>
				</view>
			</view>
		<view style="height:200upx;"></view>
		<!-- 按钮 是申请人是本人，approve是1，curnode=1-->		
		<common-btn-one v-if="detailInfo.applier==userInfo.id && detailInfo.approval==applyStatus.applied && detailInfo.curnode==1"
			type="primary"
			content="撤销申请"
			dataTarget="delModel"
			@operateBtn="cancelApply" :isPos="true"></common-btn-one>

		<!-- 如果被驳回可以重新编辑 -->
		<template v-if="cat=='notice'">
			<BottomBtnTwo
			refuse_btn_con="拒绝"
			@hideModal="hideModel"
			refuse_data_target="refuseModel"
			agree_btn_con="同意"
			@refuseBtn="showModal"
			@agressBtn="agreeApply"
			></BottomBtnTwo>
		</template>
		<template v-else>

			<common-btn-one v-if="detailInfo.applier==userInfo.id && detailInfo.approval==applyStatus.rejected"
				type="primary"
				content="编辑"
				dataTarget="editModel"
				@operateBtn="editApply" :isPos="true"></common-btn-one>
		</template>
		<!-- 编辑弹出框 -->

		<!--拒绝弹出框 -->
		<showModelRefuse :isShow="modelName=='refuseModel'" @hideModal="hideModel" @refuse="refuseApply"></showModelRefuse>
	</view>
</template>

<script>

	import applyDetailItem from '../../../../../components/work-apply/apply-detail-item.vue'
	import workflowItem from '../../../../../components/common/workflow-item.vue'
	import filesContent  from '../../../../../components/common/files-content.vue'
	import BottomBtnTwo from '../../../../../components/common/bottom-btn-two.vue'
	import showModelRefuse from '../../../../../components/common/show-model-refuse.vue'
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import normalDetailItem from '../../../../../components/common/normal-detail-item.vue'
	import normalDetailTitle from '../../../../../components/common/normal-detail-title.vue'
	
	import {mapState} from 'vuex';
	import {RoutineAppApi,CancelRoutineAppApi,ExpenseApi,CancelExpenseApi,CommonFormApi,CancelCommonFormApi,ApproveWorkflowApi} from '../../../../../api/apply_api.js'
	export default {
		computed:{
			...mapState(['userInfo']),
			applyStatus(){return this.config.applyStatus},
			approvalMode(){return this.config.approvalMode},
		},
		components:{applyDetailItem,workflowItem,filesContent,normalDetailItem,normalDetailTitle,BottomBtnTwo,showModelRefuse,commonBtnOne},
		data() {
			return {
				detailInfo:{},
				type:'',
				time:'',
				modelName:'',
				cat:'',//notice是从消息过来的，用于同意和拒绝
				noticeID:'',//通知的id
				applyID:''
			}
		},
		methods: {
			//撤销申请
			cancelApply(){
				uni.showModal({
					content:'确定要撤销?',
					success: (res) => {
						if(res.confirm){
							this.cancelOrder()
						}
					}
				})
			},
			//编辑申请
			editApply(){
				uni.showModal({
					content:'确定要重新编辑申请?',
					success: (res) => {
						if(res.confirm){
							this.editOrder()
						}
					}
				})
			},
			//同意申请
			async agreeApply(){
				if(await ApproveWorkflowApi(this.detailInfo.id,this.type,0,'',this.noticeID)){
					this.$utils.showToast('审批通过')
					this.$utils.goBack()
					this.$utils.hide()
				}

			},
			//拒绝申请
			async refuseApply(event){
				if(await ApproveWorkflowApi(this.detailInfo.id,this.type,1,event,this.noticeID)){
					this.$utils.showToast('审批拒绝')
					this.hideModel()
					this.$utils.goBack()
				}

			},
			hideModel(){
				this.modelName=null;
			},
			showModal(event){
				this.modelName=event;
			},
			//编辑
			editOrder(){
				uni.navigateTo({
					url:"../apply-item-form/apply-item-form?id="+this.detailInfo.id+'&type='+this.type+"&cat=edit"
				})
				
				this.hideModel()
			},
			//撤销订单
			async cancelOrder(){
				switch(Number(this.type)){
					//报销
					case this.approvalMode.expense:
						if(await CancelExpenseApi(this.detailInfo.id)){
							this.$utils.showToast('撤销申请成功')
							this.$utils.goBack()
						}

					break;
					//请假
					case this.approvalMode.absence:
						if(await CancelRoutineAppApi(this.detailInfo.id)){
							this.$utils.showToast('撤销申请成功')
							this.$utils.goBack()
						}

					break;
					//通用
					case this.approvalMode.common:
						if(await CancelCommonFormApi(this.detailInfo.id)){
							this.$utils.showToast('撤销申请成功')
							this.$utils.goBack()
						}

					break;
				}
			},
			async getDetailInfo(id,type){
				let result ={}
				switch(Number(type)){
					//报销
					case this.approvalMode.expense:
						 result = await ExpenseApi(id);
						if(result.files && result.files.length){
							result.files=result.files.map(item=>item.url)
						}
						this.detailInfo=result;

					break;
					//通用
					case this.approvalMode.common:
						let result = await CommonFormApi(id)
						if(result.files && result.files.length){
							result.files = result.files.map(item=>item.url)
						}
						this.detailInfo=result;

					break;
					//请假
					case this.approvalMode.absence:
						result = await RoutineAppApi(id);
						if(result.files && result.files.length){
							result.files= result.files.map(item => item.url)
						}
						this.time=this.$timer.getTimeInfo(result.bgndate,result.duedate)
						this.detailInfo=result;

					break;
				}
			},
		},
		onShow(){
			this.getDetailInfo(this.applyID,this.type)
		},
		onLoad(options){
			if(options){
				this.type=options.formType;
				this.applyID=options.id?options.id:'';
				this.cat=options.cat?options.cat:"";
				this.noticeID=options.noticeID?options.noticeID:'';
				this.getDetailInfo(options.id,options.formType)
			}
		}
	}
</script>

<style scoped>
.basic-info{
	padding:34upx 30upx 20upx 24upx;
}
.basic-info>view:first-child>image{
	width:104upx !important;
	height:40upx !important;
	flex-shrink: 0;
}
.basic-info>view:first-child>view{
	margin-bottom: 24upx;
}
.margin-b{
	margin-bottom: 20upx;
}

.apply-detail>view:first-child{
	height:106upx;
	line-height:106upx;
	padding-left:20upx;
	font-size:32upx;
	font-weight: bold;
	color:#2A2A2A
}
.detial-item{
	padding:20upx 30upx;
}

.workflow-list{
			padding:25px 14px 25px;
}

</style>
