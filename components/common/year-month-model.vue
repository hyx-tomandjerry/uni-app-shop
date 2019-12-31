<template>
	<view class="cu-modal bottom-modal" :class="isShow?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-blue" @tap="hideModel">取消</view>
				<view class="action text-green" @tap="hideModel">确定</view>
			</view>
			<view >
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="height:400upx;">
					<picker-view-column style="line-height:55px;">
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column style="line-height:55px;">
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			const date = new Date()
			const years = []
			const months = []
			for (let i = date.getFullYear()-10; i <= date.getFullYear()+10; i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			return{
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				years,
				months,
			}
		},
		props:{
			isShow:Boolean,
			value:Array
		},
		methods:{
			hideModel(){
				this.$emit('hideModel')
			},
			bindChange(event){
				let obj={
					year:this.years[event.detail.value[0]],
					month:this.months[event.detail.value[1]]
				}
				this.$emit('bindChange',obj)
			}
		}
	}
</script>

<style>
</style>
