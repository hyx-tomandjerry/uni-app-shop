<template>
	<view >
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><view class="cuIcon-back"  @click="goBack()"></view></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >申请详情</view></block>
		</cu-custom>
			<view class="basic-info bg-white margin-bottom-normal borderTop">
				<view class="flex justify-between align-center">
					<view class="flex justify-start">
						<view class="border-tag"></view>
						<view class="font-size-big color-normal font-weight-bold">基本信息</view>
					</view>

					<template v-if="detailInfo.approval==applyStatusZn.wait">
						<image src="../../../../../static/img/work/apply/my-apply/waiting_tag.png"
						mode="widthFix" lazy-load></image>
					</template>
					<template v-else-if="detailInfo.approval==applyStatusZn.applied">
						<image src="../../../../../static/img/work/apply/my-apply/pending_tag.png"
						mode="widthFix" lazy-load></image>
					</template>
					<template v-else-if="detailInfo.approval==applyStatusZn.accepted">
						<image src="../../../../../static/img/work/apply/my-apply/pass_tag.png"
						mode="widthFix" lazy-load></image>
					</template>
					<template v-else-if="detailInfo.approval==applyStatusZn.rejected">
						<image src="../../../../../static/img/work/apply/my-apply/refuse_tag.png"
						mode="widthFix" lazy-load></image>
					</template>

				</view>
				<common-item :content="detailInfo.shopName" intro="门店名称"></common-item>
				<common-item :content="type | approvalModeZnPipe" intro="申请类型"></common-item>
				<common-item :content="detailInfo.xtype | absenceTypeZnPipe" intro="请假类型" v-if="type==approvalMode.absence"></common-item>
				<common-item :content="detailInfo.name || ''" intro="申请名称" v-if="type==approvalMode.common"></common-item>
				<common-item :content="detailInfo.applierName || ''" intro="申请人"></common-item>
				<common-item :content="detailInfo.applyDate | formatTime('YMDHMS')" intro="申请时间"  v-if="type!=approvalMode.absence"></common-item>
				<common-item :content="detailInfo.bgndate | formatTime('YMDHMS')" intro="开始时间" v-if="type==approvalMode.absence"></common-item>
				<common-item :content="detailInfo.applyDate | formatTime('YMDHMS')" intro="结束时间" v-if="type==approvalMode.absence"></common-item>
				<view class=" flex align-center justify-start margin-b font-size-normal" v-if="type==approvalMode.absence">
					<view class=" color-normal flex-litter" style="padding-left:10px;">请假时长</view>
					<view class="color-regular ">
						<text v-if="time.days">{{time.days}}天</text>
						<text v-if="time.hours">{{time.hours}}时</text>
						<text v-if="time.minutes">{{time.minutes}}分</text>
					</view>
				</view>
				<common-item :content="detailInfo.amount || ''" intro="总计金额" v-if="type==approvalMode.expense"></common-item>
				<common-item :content="detailInfo.summary || detailInfo.detail" intro="申请事由" v-if="type!=approvalMode.expense"></common-item>
			</view>
			<!-- 附件 -->
			<filesContent :files="files"></filesContent>
			<!-- 报销明细 -->
			<view class="apply-detail bg-white margin-bottom-normal" v-if="type==approvalMode.expense">
				<view class="borderBottom">报销明细</view>
				<block v-for="(item,index) in detailInfo.details" :key="index" v-if="detailInfo.details && detailInfo.details.length">
					<applyDetailItem :item="item" :index="index"></applyDetailItem>
				</block>
			</view>
			<!-- 审核流程 -->
			<normalTitle content="审批流程" :isTag="true"></normalTitle>
			<view class=" bg-white">
				<view class="workflow-list" v-if="detailInfo.steps">
					<block v-for="(workflow,index) in detailInfo.steps" :key="index">
						<workflowItem :workflow="workflow" :index="index"></workflowItem>
					</block>
				</view>
			</view>
		<view style="height:200upx;"></view>
		<!-- 按钮 是申请人是本人，approve是1，curnode=1-->
		<bottomBtnOne
		content="撤销"
		dataTarget="delModel"
		 @showModal="showModal"
		v-if="detailInfo.applier==userInfo.id && detailInfo.approval==applyStatusZn.applied && detailInfo.curnode==1"
		></bottomBtnOne>

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
			<bottomBtnOne
			content="编辑"
			dataTarget="editModel"
			 @showModal="showModal"
			v-if="detailInfo.applier==userInfo.id && detailInfo.approval==applyStatusZn.rejected"
			></bottomBtnOne>
		</template>
		<!-- 确认弹出框 -->
		<showModal :isShow="modelName=='delModel'"
		v-if="modelName=='delModel'"
		@hideModel="hideModel" @confirmDel="cancelOrder">
			<block slot="content">
				确定要删除该申请?
			</block>
		</showModal>
		<!-- 编辑弹出框 -->

		<!-- 确认弹出框 -->
		<showModal :isShow="modelName=='editModel'"
		v-if="modelName=='editModel'"
		@hideModel="hideModel" @confirmDel="editOrder">
			<block slot="content">
				确定要重新编辑申请?
			</block>
		</showModal>
		<!--拒绝弹出框 -->
		<showModelRefuse :isShow="modelName=='refuseModel'" @hideModal="hideModel" @refuse="refuseApply"></showModelRefuse>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import applyDetailItem from '../../../../../components/apply-detail-item.vue'
	import workflowItem from '../../../../../components/workflow-item.vue'
	import filesContent  from '../../../../../components/files-content.vue'
	import showModal from '../../../../../components/show-model.vue'
	import bottomBtnOne from '../../../../../components/common/bottom-btn-one.vue'
	import commonItem from '../../../../../components/common-item.vue'
	import normalTitle from '../../../../../components/common/normal-title.vue'
	import BottomBtnTwo from '../../../../../components/common/bottom-btn-two.vue'
	import showModelRefuse from '../../../../../components/common/show-model-refuse.vue'
	export default {
		computed:mapState(['approvalMode','applyStatusZn','userInfo']),
		components:{applyDetailItem,workflowItem,filesContent,showModal,bottomBtnOne,commonItem,normalTitle,BottomBtnTwo,showModelRefuse},
		data() {
			return {
				detailInfo:'',
				files:[],
				type:'',
				time:'',
				modelName:'',
				one:2,
				cat:'',//notice是从消息过来的，用于同意和拒绝
				noticeID:'',//通知的id
			}
		},
		methods: {
			//同意申请
			agreeApply(){
				this.$ajax('ApproveWorkflow',{
					form:this.detailInfo.id,
					type:this.type,
					reject:0,
					comment:'',
					event:this.noticeID,//消息的id
				},res=>{
					uni.showToast({
						title:'同意请假申请成功',
						icon:'none'
					})
					this.hideModel()
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},900)
				})
			},
			//拒绝申请
			refuseApply(event){
				this.$ajax('ApproveWorkflow',{
					form:this.detailInfo.id,
					type:this.type,
					reject:1,
					comment:event,
					event:this.noticeID,//消息的id
				},res=>{
					uni.showToast({
						title:'拒绝请假申请成功',
						icon:'none'
					})
					this.hideModel();
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},900)
				})
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
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
			cancelOrder(){
				switch(Number(this.type)){
					//报销
					case this.approvalMode.expense:
					this.$ajax('CancelExpense',{id:this.detailInfo.id},res=>{
						uni.showToast({
							title: '删除申请成功',
							icon:'none'
						});
						this.hideModel()
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							});
						},900)
					})
					break;
					//请假
					case this.approvalMode.absence:
					this.$ajax('CancelRoutineApp',{id:this.detailInfo.id},res=>{
						uni.showToast({
							title: '删除申请成功',
							icon:'none'
						});
						this.hideModel()
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							});
						},900)
					})
					break;
					//通用
					case this.approvalMode.common:
					this.$ajax('CancelCommonForm',{id:this.detailInfo.id},res=>{
						uni.showToast({
							title: '删除申请成功',
							icon:'none'
						});
						this.hideModel()
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							});
						},900)
					})
					break;
				}
			},
			getDetailInfo(id,type){
				switch(Number(type)){
					//报销
					case this.approvalMode.expense:
					this.$ajax('Expense',{
						id:id,
						step:1
					},res=>{
						if(res.files && res.files.length){
							res.files.forEach(item=>{
								this.files.push(item.url)
							})
						}
						this.detailInfo=res;
					})
					break;
					//通用
					case this.approvalMode.common:
					this.$ajax('CommonForm',{
						id:id,
						step:1
					},res=>{
						if(res.files && res.files.length){
							res.files.forEach(item=>{
								this.files.push(item.url)
							})
						}
						this.detailInfo=res;
					})
					break;
					//请假
					case this.approvalMode.absence:
					this.$ajax('RoutineApp',{id:id,step:1},res=>{
						if(res.files && res.files.length){
							res.files.forEach(item=>{
								this.files.push(item.url)
							})
						}
						this.getTimeInfo(res.bgndate,res.duedate)
						this.detailInfo=res;
					})
					break;
				}
			},
			//获得时间差
			getTimeInfo(start,end){
				//计算相差的天数
				let date=new Date(end).getTime()-new Date(start).getTime()
				let days=Math.floor(date/(24*3600*1000));
				// 计算小时
				let leave1=date%(24*3600*1000);//计算天数后的毫秒数
				var hours=Math.floor(leave1/(3600*1000))
				//计算分钟数
				let leave2=leave1%(3600*1000);
				let minutes=Math.floor(leave2/(60*1000));

				//计算秒数
				let leave3=leave2%(60*1000);
				let second=Math.floor(leave3/1000);
				this.time={
					days:days,
					hours:hours,
					minutes:minutes
				}
			},
		},
		onLoad(options){
			if(options){
				this.type=options.formType;
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
.border-tag{
		width:18upx;
		height:36upx;
		background:#42b0ed;
		margin-right:20upx;
	}
</style>
