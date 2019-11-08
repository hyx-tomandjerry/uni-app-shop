<template>
	<view class="member-list borderBottom flex justify-start align-center position_relative animated slideInLeft fast"   @tap="checkItemInfo">
		<image :src="item.headurl?item.headurl:'../../../../static/img/default.png'"  mode="widthFix" lazy-load class="user_avatar"></image>
		<view>
			{{item.name}}/{{item.account || item.mobile}}
		</view>
		<view>
			<template v-if="shopItem.manager==item.id && item.status==userStatus.normal">
				<text class="cu-tag round shoper" >店长</text>
			</template>
			<template v-else-if="shopItem.manager!=item.id && item.nickname">
				<text class="cu-tag round manager">{{item.nickname}}负责人</text>
			</template>
			<template v-else-if="shopItem.manager!=item.id && item.status==userStatus.normal">
				<text class="cu-tag bg-green round normal">在职</text>
			</template>
			
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['userStatus']),
		props:{
			item:Object,
			shopItem:Object,
			index:Number
		},
		methods:{
			checkItemInfo(){
				this.$emit('checkItemInfo',this.item)
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
		width:40px;height:40px;border-radius: 50%;vertical-align: middle;flex-shrink: 0;
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
</style>
