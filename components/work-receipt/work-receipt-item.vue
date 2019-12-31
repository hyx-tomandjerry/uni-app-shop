<template>
	<view  @tap="itemDetail" hover-class="bg-color-normal">
		<view class="work-item margin-bottom-normal" >
			<receipt-head :item="item"></receipt-head>
			<view class="work-content">
				<view>
					<view style="font-size:15px;color:#2D6097">#{{item.name || ''}}#</view>
					<view class="user-name ellipsis-2 font-size-normal font-weight-normal color-normal">{{item.summary || ''}}</view>
				</view>
				<files-content :files="item.files" v-if="item.files" :isShowTitle="false"></files-content>
			</view>
			
		</view>
	</view>
</template>

<script>
	import receiptHead from './receipt-head.vue'
	import filesContent  from '../common/files-content.vue'
	export default{
		components:{receiptHead,filesContent},
		props:{
			item:Object,
			index:Number
		},
		methods:{
			itemDetail(){
				this.$emit('itemDetail',this.item)
			}
		}
		
	}
</script>

<style scoped>
	.ellipsis-2{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.work-content>view:first-child{
		padding:15upx 20upx 0;
		margin-bottom:20upx;
	}
	.work-item{
		padding:36upx 24upx 26upx 30upx;
		background: #fff;
	}
	
	.work-content{
		margin-bottom:30upx;
	}
</style>
