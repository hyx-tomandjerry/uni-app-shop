<template>
	<view class="rank-list-item flex justify-around"  :class="{'bg-color-normal' :index%2==0}">
		<view class="flex-1 text-center text-ellipse">
			<text >{{item.name || ''}}</text>
		</view>
		<view class="num flex-1 text-center">{{item.value || 0}}</view>
		<view class="precent flex-1 text-center">{{item.pre || 0}}%</view>
		<view @tap="checkItem" style="color:#42B0ED;" class="flex-1 text-center" v-if="userInfo.id==managerID">编辑</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['userInfo']),
		props:{
			item:Object,
			index:Number,
			managerID:[Number,String]
		},
		methods:{
			checkItem(){
				this.$emit('checkItem',this.item)
			}
		}
	}
</script>

<style scoped >
	.rank-list-item{
		height:65px;
		line-height:65px;	
	}
	.ring-img{
		width: 28px;
		height: 28px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.avatar{
		width: 42px;
		height: 42px;
		vertical-align: middle;
		border-radius:50%;
	}
	.num{
		font-size:14px;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(255,72,103,1);
	}
	.precent{
		font-size:14px;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(161,41,255,1);
	}
</style>
