<template>
	<view class="list-item animated fadeInLeft fast" hover-class="bg-color-normal" @tap="orderDetail">
			<view class=" flex justify-between align-center">
				<view class="list-item-title">{{repairTypeZn[item.type]}}-{{item.categoryName || ''}}报修</view>
				<view v-if="item.status==repairStatus.submit" class="common-tag"
				:class="{
					'wait':item.approval==approvalStatus.wait,
					'executing':item.approval==approvalStatus.applied,
					'accepted':item.approval==approvalStatus.accepted,
					'rejected':item.approval==approvalStatus.rejected,
				}"
				>{{item.approval | approvalStatusPipe }}</view>
				<view v-else class="common-tag"
					:class="{
						'executing':item.status==repairStatus.executing,
						'accepted':item.status==repairStatus.finished
					}"
				>
					{{item.status|repairStatusZnPipe}}
				</view>
			</view>
			<view class="list-content">
				<view >
					<normal-detail-item 
						:marginBMini="true"
						:alignCenter="true"
						leftIntro="门店名称"
						:rightContent="item.name"
						fromType="image" 
						src="../../../static/icon/icon-mengdian@2x.png"></normal-detail-item>
						
						<normal-detail-item
							width="25%"
							:marginBMini="true"
							:alignCenter="true"
							leftIntro="报修人"
							:rightContent="`${item.applierName}/${item.applierMobile}`"
							fromType="image" 
							src="../../../static/icon/icon-dneglu-zhanghu@2x.png"></normal-detail-item>


				</view>
			</view>
		</view>
</template>

<script>
	import normalDetailItem from '../../common/normal-detail-item.vue'
	export default{
		props:{
			item:Object,
			index:Number
		},
		computed:{
			repairTypeZn(){return this.config.repairTypeZn},
			approvalStatus(){return this.config.approvalStatus},
			repairStatus(){return this.config.repairStatus}
		},
		components:{normalDetailItem},
		methods:{
			// 查看报修记录详情
			orderDetail(){
				this.$emit('orderDetail',this.item.id)
			},
		}
	}
</script>

<style scoped>
	@import "../../../common/css/check_index.css";
	.list-item{
		padding:18px 16px 4px 20px;
		background: #fff;
		margin-bottom:13px;
		
	}
	.list-item-title{
		font-size:16px;
		font-weight:400;
		color:rgba(42,42,42,1);
		margin-bottom:10px;
	
	}
	.list-content-item{
		font-size:14px;
		font-weight:400;
		color:rgba(137,136,136,1);
		margin-bottom:15px;
	}

</style>
