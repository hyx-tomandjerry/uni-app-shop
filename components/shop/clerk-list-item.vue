<template>
	<view class="member-list borderBottom flex justify-start align-center position_relative animated slideInLeft fast"   @tap="checkItemInfo">
		<!-- #ifdef MP-WEIXIN -->
			<image :src="item.headurl?item.headurl:'/static/img/default.png'"  mode="widthFix" lazy-load class="user_avatar"></image>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
			<image :src="item.headurl?item.headurl:'../../../../static/img/default.png'"  mode="widthFix" lazy-load class="user_avatar"></image>
		<!-- #endif -->
		<template v-if="TabCur==1">
			<view>
				<text>{{item.name}}</text><text class="color-regular font-size-litter">({{item.account}})</text>
			</view>
			<view>
				<template v-if="shopItem.manager==item.id && item.status==userStatus.normal">
					<view class="cu-tag round shoper" >店长</view>
				</template>
				<template v-else-if="shopItem.manager!=item.id && item.motto=='manager'">
					<view class="cu-tag round manager">{{shopItem.zoneName || ''}}负责人</view>
				</template>
				<template v-else-if="shopItem.manager!=item.id ">
					<template v-if="item.status==userStatus.normal">
						<view class="cu-tag bg-green round normal">在职</view>
					</template>
					<template v-else-if="item.status==userStatus.applying ">
						<view class="flex justify-start align-center">
							<view class="cu-tag bg-purple round normal">申请中</view>
						</view>
					</template>
				</template>
			
			</view>
		</template>
		<template v-else-if="TabCur==2">
			<text style="margin-left:20upx;">{{item.name}}</text><text class="color-regular font-size-litter">({{item.mobile}})</text>
			<view class="cu-tag round manager" v-if="item.departmentName">{{item.departmentName || ''}}{{item.job || ''}}</view>
		</template>
		
		
	</view>
</template>

<script>
	export default{
		computed:{
			userStatus(){return this.config.userStatus}
		},
		props:{
			item:Object,
			shopItem:Object,
			index:Number,
			TabCur:Number
		},
		methods:{
			checkItemInfo(){
				this.$emit('checkItemInfo',this.item)
			},
			
		}
	}
</script>

<style scoped>
	.member-list{
		padding:18px 0 15px;
	}
	.member-list>view:nth-of-type(1){
		margin-left:10px;margin-right:15px;
	}
	.user_avatar{
		width:80upx;height:80upx !important;border-radius: 50%;vertical-align: middle;flex-shrink: 0;
	}
	.shoper{
		font-size:12px;padding:0 10px;height:22px;background:#42B0ED;color:#fff;
	}
	.manager{
		font-size:12px;padding:0 10px;height:22px;background:#FE933E;color:#fff;
	}
	.normal{
		font-size:12px;padding:0 10px;height:22px;
	}
	.margin-l{
		margin-left:10upx;
	}
</style>
