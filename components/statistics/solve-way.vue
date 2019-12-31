<template>
	<view class="bg-white margin-bottom-normal resolveWay flex justify-between align-center" v-if="isShow">
		<view>分解方式</view>
		<view class="flex justify-between align-center">
			<view v-for="(item,index) in radioTabList" style="margin-left:15px;" :key="index" @tap="selectResolveWay(item)">
				<image
					:src="radio==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'"
					class="resolve-img"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				radioTabList:[
					{id:1,name:'按天平摊'},
					{id:2,name:'周末加倍'}
				]
			}
		},
		props:{
			isShow:Boolean,
			radio:Number
		},
		methods:{
			selectResolveWay(item){
				this.$emit('selectResolveWay',item)
			}
		}
	}
</script>

<style scoped>
	.resolveWay{
		height:53px;
		line-height:53px;
		align-content: sub;
		padding: 0 13px;
		font-size:15px;
		color:#2A2A2A
	}
	.resolve-img{
		width:18px;height:18px;vertical-align: middle;margin-right:5px;
	}
</style>
