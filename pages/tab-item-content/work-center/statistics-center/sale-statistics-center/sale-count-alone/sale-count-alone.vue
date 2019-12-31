<template>
	<view>
		<view class="num-container">
			<view class=" font-size-back text-white  margin-bottom-mini">
				{{timeObj.year}}年{{timeObj.month>9?timeObj.month:'0'+timeObj.month}}月
			</view>
			<view  class=" font-size-back text-white " style="margin:22upx 0;">{{manItem.name}}销售额</view>
			<view class=" font-weight-bold count-num">¥ {{manItem.fvalue | numStyle}}</view>
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
	
	import {mapState} from 'vuex'
	import {ChainShopApi} from '../../../../../../api/shop_api.js'
	import {SalesmenSalesAmountApi,SalesmanDailyAmountApi} from '../../../../../../api/statistics_api.js'
	export default {
		components:{calendarList},
		computed:mapState(['userInfo']),
		data() {
			return {
				shopID:'',
				manItem:{},//单个店员的信息
				timeObj:{},
				lastMonthDaysList:[],//上个月的总天数
				currentMonthDaysList:[],//当前月总天数
				nextMonthDaysList:[],//下个月总天
				weekList:['日','一','二','三','四','五','六'],
				dayTabID:'',
				shopItem:{},
			}
		},
		methods: {
			//查看门店详情
			async getShopInfo(id){
				this.shopItem = await ChainShopApi(id)
				this.getMonthPerformance()
			},
			async getMonthPerformance(){
				let result = await SalesmenSalesAmountApi(this.shopID,this.timeObj);
				if(result && result.salesmen){
					this.manItem=result.salesmen.find(item=>item.id==this.manID)
				}
				this.getSaleFromAlone()

			},
			//选择日
			chooseItem(item){
				// 如果不是店长或者不是本人
				if(this.shopItem.manager == this.userInfo.id || this.manItem.id == this.userInfo.id){
					this.dayTabID=item.day;
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
				}
				
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
			async getSaleFromAlone(){
				let result = await SalesmanDailyAmountApi(this.shopID,this.manID,this.timeObj);
				Object.keys(result).forEach(key=>{
					this.currentMonthDaysList.forEach(item=>{
						if(item.id==key){
							item.num=result[key]
						}
					})
				})

			},
		},
		onShow(){
			this.getCalendar(this.timeObj.year,this.timeObj.month)
			this.getShopInfo(this.shopID)
		},
		onLoad(options){
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: '#383D5B'
			})
			if(options){
				this.shopID=options.id;
				this.manID=options.manID;
				this.timeObj.year=options.year;
				this.timeObj.month=options.month;
			}
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
		vertical-align: bottom;
	}
	.count-num{
		font-size:26px;font-weight: bold;
	}
</style>
