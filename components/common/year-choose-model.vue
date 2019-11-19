<template>
	<view class="cu-modal bottom-modal" :class="isShow?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-blue" @tap="hideModel">取消</view>
				<view class="action text-green" @click="hideModel">确定</view>
			</view>
			<view >
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="height:200px;">
					<picker-view-column style="line-height:55px;">
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	 export default{
		 props:{
			 isShow:Boolean
		 },
		 data(){
			 const date = new Date()
			 const years = []
			 for (let i = 1990; i <= date.getFullYear()+10; i++) {
			 	years.push(i)
			 }
			 return{
				 	indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
					//日历选择
					value:[],
					years
			 }
		 },
		 methods:{
			 hideModel(){
				 this.$emit('hideModel')
			 },
			 bindChange(event){
				 this.$emit('bindChange',event)
			 }
		 }
	 }
</script>

<style>
</style>
