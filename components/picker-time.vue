<template>
	<view>
		<view class="cu-modal bottom-modal" :class="isShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="hideModel">确定</view>
					<view class="action text-blue" @tap="hideModel">确定</view>
				</view>
				<view class="padding-xl bg-white">
					<picker-view  :indicator-style="indicatorStyle" :value="value" @change="bindChange"  class="flex justify-start">
						<picker-view-column style="width:110px;height:276px;">
							<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
						</picker-view-column>
						<picker-view-column style="width:110px;height:276px;">
							<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
						</picker-view-column>
						<picker-view-column style="width:110px;height:276px;">
							<view class="item" v-for="(item,index) in days" :key="index">{{item}}月</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			const date = new Date();
			const years=[];
			const year=date.getFullYear();
			const months=[];
			const month=date.getMonth();
			const days=[];
			const day=date.getDate();
			for(let i=1940;i<=date.getFullYear();i++){
				years.push(i)
			}
			for(let i=1;i<=12;i++){
				months.push(i)
			}
			for(let i=1;i<=31;i++){
				days.push(i)
			}
			return{
				years,
				months,
				days,
				year,
				month,
				day,
				value:[9999,month-1,day-1],
				indicatorStyle:`height:${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px`
			}
		},
		props:{
			isShow:{
				type:Boolean,
				default:false,
			}
		},
		components:{
			
		},
		onLoad(){
			
		},
		methods:{
			/*
				日期选择
			*/
			bindChange(event){
				const val=event.detail.value;
				this.year=this.years[val[0]];
				this.month = this.months[val[1]];
				this.day = this.days[val[2]];
				
			},
			hideModel(){
				this.$emit('bindChange',{
					year:this.year,
					month:this.month,
					day:this.day
				})
			}
		}
	}
</script>
<style>
		
</style>