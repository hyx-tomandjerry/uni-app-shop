<template>
	<view>
		<cu-custom :is-back="true" bg-color="bg-color-perform">
			<block slot="left"><view class="cuIcon-back text-white"  @click="goBack()"></view></block>
			<block slot="content"><view class="font-size-big text-white "><text class="color-blue" style="margin-right:10upx;">{{manItem.name || ''}}</text>绩效统计</view></block>
		</cu-custom>
		<view class="num-container">
			<view class=" font-size-back text-white  margin-bottom-mini">{{timeObj.year}}.{{timeObj.month>9?timeObj.month:'0'+timeObj.month}}</view>
			<view class=" font-weight-bold count-num">¥ {{saleYear[`amonth${timeObj.month}`] | numStyle}}</view>
			<view class="flex justify-between align-center text-white count-pre">
				<view class="flex-1">
					<view>
						<image src="../../../../../../static/img/work/statistics/aim-money.png" mode="widthFix" lazy-load class="icon-money"></image> <text class="font-size-bigger text-white">¥ {{saleManItem.actual | numStyle}}</text>
					</view>
					<view class="color-regular">本月门店销售额</view>
				</view>
				<view class="flex-1">
					<view >
						<image src="../../../../../../static/img/work/statistics/count-money.png" mode="widthFix" lazy-load class="icon-money"></image>
						<text class=" font-size-bigger text-white">{{saleManItem.alonePre}}%</text>
					</view>
					<view class="color-regular">店员绩效占比</view>
				</view>
			</view>
		</view>
		<!-- 日历 -->
		<calendar-list 
			:currentMonthDaysList="currentMonthDaysList"
			:nextMonthDaysList="nextMonthDaysList"
			:dayTabID="dayTabID"
			:weekList="weekList"
			@editAim="chooseItem"
			:lastMonthDaysList="lastMonthDaysList"
		></calendar-list>
	</view>
</template>

<script>
	import calendarList from '../../../../../../components/statistics/calendar-list.vue'
	export default {
		components:{calendarList},
		data() {
			return {
				shopID:'',
				manItem:{},//单个店员的信息
				timeObj:{},
				saleYear:{},
				lastMonthDaysList:[],//上个月的总天数
				currentMonthDaysList:[],//当前月总天数
				nextMonthDaysList:[],//下个月总天
				weekList:['日','一','二','三','四','五','六'],
				dayTabID:'',
				shopItem:{},
				saleManItem:{},//单个店员绩效的信息
			}
		},
		methods: {
			//查看门店详情
			getShopInfo(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shopItem=res;
				})
			},
			goBack(){uni.navigateBack({delta:1})},
			//选择日
			chooseItem(item){
				this.dayTabID=item.day;
				console.log(item)
				let obj={
					shopID:this.shopID,
					shopName:this.shopItem.name,
					manID:this.manItem.id,
					manName:this.manItem.name,
					money:item.num,
					year:this.timeObj.year,
					month:this.timeObj.month,
					day:item.day
				}
				setTimeout(()=>{
					uni.navigateTo({
						url:"../../sale-return-center/sale-return-form/sale-return-form?type=count&obj="+JSON.stringify(obj)
					})
				},600)
			},
			getCalendar(year,month){
				//获得该月份总天数
				let fullDay=parseInt(new Date(year,month,0).getDate());
				this.monthDay=fullDay;
			
				//获得该月第一天是周几
				let startWeek=parseInt(new Date(year,month-1,1).getDay());
			
				//获得上个月的天数
				let lastMonthDay=parseInt(new Date(year,month,0).getDate());
			
				let totalDay = (fullDay + startWeek) % 7 == 0 ?
							(fullDay + startWeek) :
							fullDay + startWeek + (7 - (fullDay + startWeek) % 7);//元素总个数
			
				//年份范围
				let curYear=new Date().getFullYear();
				//年份范围2009-2029
				this.monthList=[];
				this.yearList=[];
				for(var i=1990;i<=curYear+10;i++){
					this.yearList.push(i)
				}
				//月份范围1-12
				for(var i=1;i<=12;i++){
					this.monthList.push(i);
				}
			
				//遍历日历
				this.currentMonthDaysList=[];
				this.lastMonthDaysList=[];
				this.nextMonthDaysList=[];
				for(let i=0;i<totalDay;i++){
					if(i<startWeek){
						//如果第一天不是周日的情况下，就渲染上个月的数据
						this.lastMonthDaysList.push({
							id:`aday${lastMonthDay-startWeek+1+i}`,
							day:lastMonthDay-startWeek+1+i,
							num:0
						});
					}else if(i<(startWeek+fullDay)){
						//当月天数
						this.currentMonthDaysList.push({
							id:`aday${i + 1 - startWeek}`,
							day:i + 1 - startWeek,
							num:0
						});
					}else {
						this.nextMonthDaysList.push({
							id:`aday${(i + 1 - (startWeek + fullDay))}`,
							day:(i + 1 - (startWeek + fullDay)),
							num:0
						});
					}
				}
				let tmonth=month+1;
			},
			getSaleFromAlone(){
				this.$ajax('ShopYearlySalesPlan',{
					year:this.timeObj.year,
					shop:this.shopID,
					withActual:1
				},res=>{
					if(res){this.saleYear=res;}
				})
				this.$ajax('SalesmanDailyAmount',{
					shop:this.shopID,
					salesman:this.manItem.id, 
					year:this.timeObj.year,
					month:this.timeObj.month
				},res=>{
					if(res){
							let monthAim=this.saleYear[`amonth${this.timeObj.month}`] ;
							res.alonePre=monthAim?Number(res.actual/monthAim*100).toFixed(2):0;
							for(var key in res){
								this.currentMonthDaysList.forEach(item=>{
									if(item.id==key){
										item.num=res[key]
									}
								})
							}
							this.saleManItem=res;
					}
				})
			}
		},
		onLoad(options){
			if(options.id){this.shopID=options.id}
			if(JSON.parse(options.item)){
				this.manItem=JSON.parse(options.item)
				console.log(this.manItem.name)
			}
			if(JSON.parse(options.timeObj)){
				this.timeObj=JSON.parse(options.timeObj)
		
			}
			this.getSaleFromAlone();
			this.getCalendar(this.timeObj.year,this.timeObj.month)
			this.getShopInfo(options.id)
			
		}
	}
</script>

<style scoped>
	.count-pre>view:first-child>view:first-child{
		border-right:1px solid #525A85;
	}
	.count-pre>view:first-child>view:last-child{
		padding-left:40upx;
	}
	.count-pre>view:last-child>view:first-child{
		margin-left:20upx;
	}
	.count-pre>view:last-child>view:last-child{
		padding-left:60upx;
	}
	.num-container{
		min-height:300upx;
		background:url(../../../../../../static/img/work/statistics/bg.png) no-repeat center center;
		background-size: 100% 100%;
		padding:40upx;
	}
	
	.count-num{
		font-size:36px;
		font-weight: bold;
		color:#78F6B2;
		margin:20upx 0 26upx;
	}
	.num-container>view:nth-child(3){
		
	}
	.icon-money{
		width:30upx;
		height:30upx;
		flex-shrink: 0;
		margin-right:10upx;
	}
	.count-num{
		font-size:26px;font-weight: bold;
	}
</style>
