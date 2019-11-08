<template>
	<view class="list-item animated fadeInLeft fast" hover-class="bg-color-normal">
			<view class=" flex justify-between align-center">
				<view class="list-item-title">{{repairTypeZn[item.type]}}-{{item.categoryName || ''}}维修</view>
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
					{{item.status|repairStatus}}
				</view>
			</view>
			<view class="list-content">
				<view @tap="orderDetail">
					<common-item  type="img" intro="门店名称" 
					:content="item.name" src="../../../static/icon/icon-mengdian@2x.png"></common-item>
					<common-item  
					type="img" intro="报修人" :content="`${item.applierName}/${item.applierMobile}`" src="../../../static/icon/icon-dneglu-zhanghu@2x.png"></common-item>

				</view>
			</view>
		</view>
</template>

<script>
	import {mapState} from 'vuex'
	import commonItem from './common-item.vue'
	export default{
		computed:mapState(['userInfo','shoperObj','repairTypeZn','approvalStatus','repairStatus']),
		props:{
			item:Object,
			index:Number
		},
		components:{commonItem},
		methods:{
			// 查看报修记录详情
			orderDetail(){
				this.$emit('orderDetail',this.item.id)
			},
		}
	}
</script>

<style scoped lang="less">
	@import "../static/css/check_index.css";
	.list-item{
		padding:18px 16px 4px 20px;
		background: #fff;
		margin-bottom:13px;
		.list-item-title{
			font-size:16px;
			font-weight:400;
			color:rgba(42,42,42,1);
			margin-bottom:10px;
	
		}
	}
	.list-content-item{
		font-size:14px;
		font-weight:400;
		color:rgba(137,136,136,1);
		margin-bottom:15px;
	}
	
</style>
