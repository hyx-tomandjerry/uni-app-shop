<template>
	<view>
		<template>
			<view class="complaint-list-container">
				<block v-for="(item,index) in complaintList" :key="index">
					<view class="complaint-list-item" @tap="checkIten(item)">
						<view class="flex justify-between borderBottom">
							<view class="color-normal">运单号：{{item.seq}}</view>
							<view class="color-red">{{item.status | complaintStatusZnPipe}}</view>
						</view>
						<view class="borderBottom">
							<view class="flex align-center">
								<view class="color-regular flex-1">申诉人</view>
								<view class="color-normal flex-1">{{item.creatorName || ''}}</view>
							</view>
							<view class="flex align-center">
								<view class="color-regular flex-1 ">联系方式</view>
								<view class="color-normal flex-1">{{item.creatorMobile || ''}}</view>
							</view>
						</view>
						<view class="flex justify-end">
							<view class="color-regular font-size-mini">申诉时间：{{item.applydate |formatTime('YMDHMS')}}</view>
						</view>
					</view>
				</block>
				
			</view>
		</template>
		<!-- <template v-else>
			<LxEmpty></LxEmpty>
		</template> -->
	</view>
	
</template>

<script>
	import LxEmpty from '../../../../../../lx_components/lx-empty.vue'
	import {WaybillComplaintsApi} from '../../../../../../api/express_api.js'
	export default {
		components:{LxEmpty},
		computed:{
			complaintStatus(){return this.config.complaintStatus}
		},
		data() {
			return {
				complaintList:[]
			}
		},
		methods: {
			//查看投诉详情
			checkIten(item){
				uni.navigateTo({
					url:"../complaint-list-item/complaint-list-item?id="+item.id
				})
			},
			async init_list(){
				this.complaintList = await WaybillComplaintsApi()
			}
		},
		onLoad(){
			this.init_list()
		}
	}
</script>

<style scoped>
	
	page{
		background:rgba(247,247,247,1);
	}
	.complaint-list-container{
		padding:26upx 30upx;
	}
	.complaint-list-item{
		background:rgba(255,255,255,1);
		border-radius:4px;
		padding:0 30upx;
	}
	.complaint-list-item>view:first-child,.complaint-list-item>view:nth-child(3){
		padding:30upx 0 20upx;
	}
	.complaint-list-item>view:nth-child(2){
		padding:16upx 0 15upx;
	}
	.complaint-list-item>view:nth-child(2)>view:first-child{
		margin-bottom:16upx;
	}
	
</style>
