<template>
	<view class="bg-white" style="margin-top:13px;padding-right:14px;padding-left:18px;padding-bottom:50px;">
		<view class="cu-bar bg-white " >
			<view class="action">
				<text class="card-title">店铺公告</text>
			</view>
			<view class="action" @click="showMoreInfo">
				<text  >更多<text class="cuIcon-right" ></text></text>
			</view>
		</view>
		<template v-if="list.length">
			<block v-for="(item,index) in list " :key="index">
				<article-example :item="item" :index="index" @checkItemInfo="detailContent"></article-example>
			</block>
		</template>
		<template v-else>
			<view  style="text-align: center;padding:42px 0 68px;">
				<image :src="srcimg" style="width:125px;height:92px;"></image>
				<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">暂无数据哦~</view>
			</view>
		</template>
	</view>
</template>

<script>
	import articleExample from '../../../../components/article/article-example.vue'
	export default{
		props:{
			list:{
				type:Array,
				default(){return []}
			},
			srcimg:String
		},
		components:{articleExample},
		methods:{
			showMoreInfo(){
				this.$emit('showMoreInfo','example')
			},
			detailContent(event){
				this.$emit('detailContent',event)
			}
		}
	}
</script>

<style scoped>
	.card-title{
		font-size:18px;
		font-weight:800;
		color:rgba(42,42,42,1);
	}
</style>
