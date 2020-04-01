<template>
	<view class="rank-container bg-white">
		<view class="nav flex justify-around borderBottom">
			<view class="flex-1 text-center">姓名</view>
			<view class="flex-1 text-center">销售额</view>
			<view class="flex-1 text-center">占比</view>
			<view class="flex-1 text-center" v-if="userInfo.id==managerID">编辑</view>
		</view>
		<scroll-view class="rank-list" scroll-y="true" :style="{height:contentHeight+'px'}" scroll-top="10" show-scrollbar="true">
			<block v-for="(item,index) in salemanList" :key="index">
				<sale-check-item
				:managerID="managerID"
				:item="item"
				 :index="index" @checkItem="checkItem"></sale-check-item>
			</block>
		</scroll-view>
	
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import saleCheckItem from '../../../../../../components/statistics/sale-check-item.vue'
	export default{
		props:{
			managerID:[Number,String],
			contentHeight:[Number,String],
			salemanList:{
				type:Array,
				default(){return []}
			}
		},
		components:{saleCheckItem},
		computed:mapState(['userInfo']),
		methods:{
			checkItem(item){
				this.$emit('checkItem',item)
			}
		}
	}
</script>

<style scoped lang="less">
	.rank-container{
		.nav{
			height:37px;
			line-height:37px;
	
		}	
	}
</style>
