<template>
	<view  @click="checkDistributeItem">
		<view class="list-item position_relative">
			<view class="list-card flex justify-between align-center ">
				<view class="flex justify-start align-center">
					<image src="../../static/img/work/express/other/tag-replace.png" class="img-tag" v-if="item.recverMobile && item.recverName"></image>
					<image src="../../static/img/work/express/other/tag-shop.png" class="img-tag" v-else></image>
					<view>调拨单号 : {{item.seq}}</view>
				</view>
				<view>
					<view class="status-tag"
						:class="{
							'unpick':item.status==distributeStatus.unHandle,
							'arrive':item.status==distributeStatus.finish
						}"
					>
						{{item.status | distributeStatusZnPipe}}
					</view>
				</view>
		</view>
		<view class="list-content ">
		
			<view class="list-shop flex justify-between ">
		
				<view class="flex-1 text-ellipse ">
					<view class=" color-normal marginBottomMini text-ellipse" style="width:240upx;">
						{{item.supplyShopName || ''}}
					</view>
					<view class="font-size-mini color-regular">
						({{item.supplierName || ''}}/{{item.supplierMobile || ''}})
						
					</view>
				</view>
				<view><image src="../../static/img/work/express/other/express-arrow.png" class="arrowimg" mode="widthFix" lazy-load></image></view>
				<view class="flex-1 text-ellipse " style="padding-left:10px;">
					<view class=" color-normal text-ellipse marginBottomMini" style="width:100px;">
						
						<template v-if="item.recverMobile && item.recverName">
							<!-- 代发 -->
							{{item.recverName || ''}}
						</template>
						<template v-else>
							<!-- 到店 -->
							{{item.applyShopName || ''}}
						</template>
					</view>
					<view class="font-size-mini color-regular " >
						<template v-if="item.recverMobile && item.recverName">
							<!-- 代发 -->
							({{item.recverMobile || ''}})
						</template>
						<template v-else>
							<!-- 到店 -->
							({{item.applierName || ''}}/{{item.applierMobile || ''}})
						</template>
						
					</view>
				</view>
			</view>
		
		</view>
		<view class="list-time color-regular">下单时间：{{item.applyDate |  formatTime('YMDHMS')}}</view>
	</view>
	</view>
</template>

<script>
	export default{
		computed:{
			distributeStatus(){return this.config.distributeStatus}
		},
		props:{
			item:Object,
			index:Number
		},
		methods:{
			checkDistributeItem(){
				this.$emit('checkDistributeItem',this.item)
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/css/express.css");
	.arrowimg{
		width:88upx;
		height:88upx;
		margin:0 30upx;
	}
	.list-item{
		padding:26upx 32upx 0 28upx;
		background-color: #fff;
		margin-bottom: 26upx;
		border-radius:8upx;
	
	}
	.list-card{
		height:86upx;
		line-height:86upx;
		border-bottom:1px solid #EEEEED;
		
	}
	.img-tag{
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
		margin-right: 10upx;
	}
	.sign-img{
		width:69upx;
		height:84upx;
		position: absolute;
		right:0;
		top:0
	}
	.list-time{
		padding-bottom: 22upx;
		padding-top: 26upx;
	}
	.list-content{
		padding-top:26upx;
		padding-bottom: 20upx;
		border-bottom:1px solid #EEEEED;
		
	}
	.travel-container{
		padding-top: 12upx;
		
	}
	.travel-tag{
		width:126upx;
		height:46upx;
		line-height: 46upx;
		border-radius:24upx;
		border:1px solid rgba(66,176,237,1);
		font-size:12px;
		color:#42B0ED;
		
	}
	.marginBottomMini{
		margin-bottom: 10upx;
	}
</style>
