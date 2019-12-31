<template>
	<view>
		<!--任务详情 start-->
		<view class="task-detail borderTop margin-bottom-normal">
			<view class="task-title  flex justify-between">
				<view class="font-size-big color-blue font-weight-bold flex-1">{{taskItem.name || ''}}</view>
				<view class="flex-xs">
					<view
						class="item-tag"
						:class="{
							'created':taskItem.status==taskStatus.created,
							'assigned':taskItem.status==taskStatus.assigned,
							'refused':taskItem.status==taskStatus.refused,
							'accepted':taskItem.status==taskStatus.accepted,
							'delayed':taskItem.status==taskStatus.delayed,
							'finished':taskItem.status==taskStatus.finished,
							'rejected':taskItem.status==taskStatus.rejected,
							'receipted':taskItem.status==taskStatus.receipted,
							'aborted':taskItem.status==taskStatus.aborted,
							'canceled':taskItem.status==taskStatus.canceled,
							}"
					
					>{{taskItem.status | taskStatusZnPipe}}</view>
				</view>
			</view>
			<normal-detail-item 
				leftIntro="任务名称"  :leftPadding="true"
				:rightContent=" taskItem.name || ''" :marginBottom="true"></normal-detail-item>
			<normal-detail-item
					leftIntro="执行人"  :leftPadding="true"
					:rightContent="taskItem.executorName || ''" :marginBottom="true"></normal-detail-item>
					
			<normal-detail-item
					leftIntro="派发人"  :leftPadding="true"
					:rightContent="taskItem.assignerName || ''" :marginBottom="true"></normal-detail-item>
			
			<normal-detail-item
					leftIntro="开工时间"  :leftPadding="true"
					:rightContent="taskItem.bgndate | formatTime('YMD')" :marginBottom="true"></normal-detail-item>
			
			<normal-detail-item
					leftIntro="竣工时间"  :leftPadding="true"
					:rightContent="taskItem.duedate | formatTime('YMD')" :marginBottom="true"></normal-detail-item>
			
			<normal-detail-item
					leftIntro="任务备注"  :leftPadding="true"
					:rightContent="taskItem.summary || ''" :marginBottom="true"></normal-detail-item>
			
		</view>
		<!--任务详情 end-->
		<!--任务附件 start-->
		<files-content :files="filesObj.files" ></files-content>
		<!-- 验收附件 -->
		<files-content :files="filesObj.xFiles" v-if="taskItem.status==taskStatus.finished" title="验收附件" ></files-content>
		<!--任务附件 end-->
		<!--任务动态 start-->
	<!-- 	<normal-title content="任务动态" :isTag="true"></normal-title> -->
		<normal-detail-title title="任务动态" :isTag="false"></normal-detail-title>
		<view class="task-trend bg-white margin-bottom-normal">
			<view class="task-trend-list">
				<block v-for="(item,index) in progressList" :key="index">
					<view class="margin-bottom-normal">
						<view class="flex align-center">
							<view class="flex-com"><view class="index-tag"></view></view>
							<view>{{item.content || ''}}</view>
						</view>
						<view style="font-size:9px;margin-top:8upx;" class="color-regular text-right">{{item.occtime | formatTime('YMD')}}</view>
					</view>
				</block>
			</view>
		</view>
		<!--任务动态 end-->

		<!--按钮 start-->
		<template v-if="(fromType=='notice' && (taskItem.status==taskStatus.assigned)  ) || (taskItem.status==taskStatus.created && fromType=='list')">
			<bottom-btn-two
			 refuse_btn_con="拒绝任务"
			refuse_data_target="refuseModel"
			agree_btn_con="接受任务"
			@refuseBtn="refuseTask"
			@agressBtn="operateOrder('agree')"></bottom-btn-two>
		</template>
		<template v-if="(taskItem.status==taskStatus.accepted || taskItem.status== taskStatus.delayed || taskItem.status==taskStatus.rejected) && fromType=='list'">
			<common-btn-one
				type="primary"
				content="申请验收"
				@operateBtn="checkApply"></common-btn-one>
		</template>
		<!--按钮 end-->
		
		<!-- 拒绝理由 -->
		<show-model-refuse :isShow="isShowRefuse"
		 @hideModal="hideModel" content='拒绝理由'
		 @refuse="refuseOrder"></show-model-refuse>
	</view>
</template>

<script>
	import filesContent from '../../../../../components/common/files-content.vue'
	import BottomBtnTwo from '../../../../../components/common/bottom-btn-two.vue'
	import showModelRefuse from '../../../../../components/common/show-model-refuse.vue'
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import normalDetailItem from '../../../../../components/common/normal-detail-item.vue'
	import normalDetailTitle from '../../../../../components/common/normal-detail-title.vue'
	
	import {TaskEventFlowsApi,ProcessTaskApi,RefuseTaskApi,AcceptTaskApi} from '../../../../../api/task.js'
	export default {
		computed:{
			taskStatus(){return this.config.taskStatus}
		},
		components:{normalDetailItem,normalDetailTitle,filesContent,BottomBtnTwo,showModelRefuse,commonBtnOne},
		data() {
			return {
				fromType:'list',//判断从通知还是从列表（从通知要同意和拒绝)
				taskID:'',//任务详情ID
				taskItem:{},
				progressList:[],
				isShowRefuse:false,
				filesObj:{
					files:[],
					xFiles:[]
				}
			}
		},
		methods: {
			refuseTask(){
				uni.showModal({
					content:'确定要拒绝该任务?',
					success: (res) => {
						if(res.confirm){
							this.operateOrder('refuse')
						}
					}
				})
			},
			//拒绝任务
			async refuseOrder(item){
				if(await RefuseTaskApi(this.taskID,item)){
					this.$utils.showToast('拒绝任务')
					this.isShowRefuse=false;
					this.$utils.goBack()
					this.$utils.hide()
					
					
				}

			},
			hideModel(){
				if(this.isShowRefuse){this.isShowRefuse=false}
				
			},
			async operateOrder(type){
				switch(type){
					case 'agree':
					if(await AcceptTaskApi(this.taskID)){
						this.$utils.showToast('接受任务')
						this.$utils.goBack()
						this.$utils.hide()
					}

					break;
					case 'refuse':
					this.isShowRefuse=true;
					break;
				}
			},
			//获得任务详情和流程详情
			async getTaskInfo(id){
				this.progressList = await TaskEventFlowsApi(id)
			   let result = await ProcessTaskApi(id);
			   if(result.files && result.files.length){
					this.filesObj.files=result.files.map(item=>item.url)
			   }
			   if(result.xfiles && result.xfiles.length){
					this.filesObj.xFiles= result.xfiles.map(item=>item.url)
			   }
			   this.taskItem=result;

			},
			//申请验收
			checkApply(){
				uni.navigateTo({
					url: '../check-apply/check-apply?id='+this.taskID
				});
			}
	},
	onLoad(options){
		if(options){
			this.fromType=options.type;
			this.taskID=options.id;
			this.getTaskInfo(options.id)
		}
	},
	onShow(){
		this.getTaskInfo(this.taskID)
	}
}
</script>

<style lang="less">
@import "../../../../../common/css/task.css";
	.index-tag{
		width:15px;height:15px;border-radius:100%;background:rgba(66,176,237,1);margin-right:30upx;
	}
	.task-detail{
		padding:28upx 26upx 44upx;
		background-color: #fff;
		
	}
	.task-title{
		margin-bottom: 28upx
	}
	.item-tag{
		height: 50upx;
		color:#fff;
		text-align: center;
		line-height:50upx;
		border-radius:30upx;
		padding:0 10upx;
	}
	.item-detail{
		margin-bottom: 16upx;
	}
	.task-trend{
		margin-bottom:200upx;
	}
	.task-files,.task-trend{
		padding:34upx 32upx 38upx 28upx ;
	}
</style>
