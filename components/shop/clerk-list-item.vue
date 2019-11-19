<template>
	<view class="member-list borderBottom flex justify-start align-center position_relative animated slideInLeft fast"   @tap="checkItemInfo">
		<image :src="item.headurl?item.headurl:'../../../../static/img/default.png'"  mode="widthFix" lazy-load class="user_avatar"></image>
		<view style="width:100px;" class="text-ellipse font-size-mini">
			{{item.name}}
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
						<view v-if="shopItem.manager == userInfo.id" class="margin-l">

						 <text class="color-blue" @tap.stop="acceptMan('agree')">同意</text>
						 <text style="margin:0 5px;" class="color-regular">|</text>
						 <text class="color-red" @tap.stop="acceptMan('refuse')">拒绝</text></view>
					</view>
				</template>
			</template>

		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['userStatus','userInfo']),
		props:{
			item:Object,
			shopItem:Object,
			index:Number
		},
		methods:{
			checkItemInfo(){
				this.$emit('checkItemInfo',this.item)
			},
			acceptMan(type){
				switch(type){
					case 'agree':
					this.$ajax('AcceptSalesman',{
						shop:this.shopItem.id,
						user:this.item.id,
						reject:0
					},res=>{
						uni.showToast({
							title:'店员加入成功',
							icon:'none'
						})
						this.$emit('joinSuccess')
					})
					break;
					case 'refuse':
					this.$emit('joinrefuse',this.item)
					break;
				}
			}
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
