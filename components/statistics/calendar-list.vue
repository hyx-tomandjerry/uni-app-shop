<template>
	<view  class="calendar">
		<view class="week-list flex justify-around ">
			<view class="week-item font-size-big font-weight-bold color-regular" v-for="(item,index) in weekList" :key="index">{{item}}</view>
		</view>
		<view class="flex days-list">
			<view class="day lm" v-for="(item,index) in lastMonthDaysList" :key="item.day"><text>{{item.day}}</text></view>
			<block v-for="(item,index2) in currentMonthDaysList" :key="item.day" >
				<view class="day position_relative" @tap="editAim(item)" :class="{'day-active':dayTabID==item.day}">
					<view class="margin-b-m">{{item.day}}</view>
					<view 
						:class="{'noHas-active':item.num==0}"
						class="font-size-mini color-regular"
					>{{item.num | numStyle}}</view>
				</view>
			</block>
			<view class="day nm" v-for="(item,index3) in nextMonthDaysList" :key="item.day">{{item.day}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			lastMonthDaysList:Array,
			currentMonthDaysList:Array,
			nextMonthDaysList:Array,
			dayTabID:[Number,String],
			weekList:Array
		},
		methods:{
			editAim(item){
				this.$emit('editAim',item)
			}
		}
	}
</script>

<style scoped>
	.calendar{overflow-x:hidden;padding-bottom:50px;background:#fff;}
	
	.calendar .week-list{line-height: 40px;height:40px;}
	.calendar .week-list .week-itm{flex:1;text-align: center;font-size:24px;color:#fff;}
	.calendar .days-list{-webkit-flex-wrap: wrap;flex-wrap: wrap;width:99.995%;}
	.calendar .days-list .day{width: 14.285%;height:70px;font-size:15px;color:#2A2A2A;
		position: relative;text-align: center;padding-top:10px;}
	.calendar .days-list .lm,.calendar .days-list .nm{color:#b6b6b6;}
	.calendar .day .ep{color:#333;}
	.day-active{
		background:#42B0ED;
		color:#fff !important;
		border-radius:6px;
	}
	.margin-b-m{
		margin-bottom:20upx;
	}
</style>
