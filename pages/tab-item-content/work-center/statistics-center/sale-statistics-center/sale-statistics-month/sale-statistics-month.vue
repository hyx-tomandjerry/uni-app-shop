<template>
	<view>
		<sale-count-year-title 
			:shopPerformPre="shopPerformPre"
			:timeObj="timeObj"
			type="month"
			:shopfactPerform="shopfactPerform"
			:shopAimPerform="shopAimPerform"></sale-count-year-title>
		<view class="sale-count-container  bg-white">
				<sale-count-title-tab 
				:tabList="tabList" 
				:tabCurVal="tabCurVal"
				 @selectTabCur="selectTabCur" 
				>
				<block slot="content">{{timeObj.year}}年{{timeObj.month}}月绩效统计数据</block>
				</sale-count-title-tab>
			<view class="sale-count-content">
				<view class="month-title flex align-center">
					<view class="u-f-ajc flex-1 font-weight-bold">
						<template v-if="tabCurVal=='sale'">
							日期
						</template>
						<template v-else-if="tabCurVal=='man'">
							姓名
						</template>
					</view>
					<view class="u-f-ajc flex-1 font-weight-bold" v-if="tabCurVal=='sale'">日目标<text class="font-size-mini">(元)</text></view>
					<view class="u-f-ajc flex-1 font-weight-bold">{{tabCurVal=='sale'?'日销售总额':'月销售总额'}}<text class="font-size-mini">(元)</text></view>
					<view class="u-f-ajc flex-1 font-weight-bold">{{tabCurVal=='sale'?'销售比例':'个人占比'}}</view>
				</view>
				<view  v-if="tabCurVal=='sale'">
					
					<block v-for="(day,index) in daysList" :key="index">
						<sale-count-month-item :month="day" :index="index" type="day"></sale-count-month-item>
					</block>
				</view>
				<view v-if="tabCurVal=='man'">
					<block v-for="(day,index) in salemanList" :key="index">
						<sale-count-month-item :month="day" :index="index" type="sale" @checkMonthItem="checkAloneItem"></sale-count-month-item>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import saleCountTitleTab from '../../../../../../components/statistics/sale-count-title-tab.vue'
	import saleCountYearTitle from '../../../../../../components/statistics/sale-count/sale-count-year-title.vue'
	import saleCountMonthItem from '../../../../../../components/statistics/sale-count-month-item.vue'
	
	import {ChainShopApi} from '../../../../../../api/shop_api.js'
	import {ShopMonthlySalesPlanApi,SalesmenSalesAmountApi} from '../../../../../../api/statistics_api.js'
	export default {
		components:{saleCountTitleTab,saleCountYearTitle,saleCountMonthItem},
		data() {
			return {
				shopItem:'',
				timeObj:{
					month:new Date().getMonth()+1,
					year:new Date().getFullYear()
				},
				tabList:[
					{name:'销售额',value:'sale'},
					{name:'店员',value:'man'},
				],
				tabCurVal:'sale',
				salemanList:[],
				shopfactPerform:0,//门店实际绩效
				shopAimPerform:0,//门店目标绩效
				shopPerformPre:0,
				daysList:[],
				shopID:''
			}
		},
		methods: {
			// 查看单个店员绩效
			checkAloneItem(item){
				uni.navigateTo({
					url:"../sale-count-alone/sale-count-alone?id="+this.shopID+"&manID="+item.id+"&year="+this.timeObj.year+"&month="+this.timeObj.month
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//查看门店详情
			async getShopInfo(id){
				this.shopItem = await ChainShopApi(id)

			},
			//	选择销售额还是店员
			selectTabCur(item){
				this.tabCurVal=item.value;
			},
			
			//根据月份获得相应的天数
			getDay(month){
				return new Date(new Date().getFullYear(),month,0).getDate();
			},
			
			//获得天的绩效
			async getShopDayilyPerformance(id,timeObj){
				let result =await ShopMonthlySalesPlanApi(id,`${timeObj.year}-${timeObj.month>9?timeObj.month:'0'+timeObj.month}-01`);
				this.shopfactPerform=result['actual']?result['actual']:0;
				this.shopAimPerform=result['expect']?result['expect']:0;
				this.shopPerformPre=result['expect']?Number(result['actual']/result['expect']*100).toFixed(2):0;
				let days=this.getDay(this.timeObj.month);
				let arr=[]
				for(var i=1;i<=days;i++){
					arr.push({
						num:result[`aday${i}`]?result[`aday${i}`]:0,
						aim:result[`day${i}`]?result[`day${i}`]:0,
						pre:result[`day${i}`]?Number(result[`aday${i}`]/result[`day${i}`]*100).toFixed(2):0
					})
				}
				this.daysList=arr;

			},
			async getSalemanPerform(){
				let result = await SalesmenSalesAmountApi(this.shopID,this.timeObj)
				if(result.salesmen){
					let arr=[]
					result.salesmen.forEach(item=>{
						arr.push({
							id:item.id,
							name:item.name,
							num:item.fvalue?item.fvalue:0,
							aim:this.shopfactPerform?this.shopfactPerform:0,
							pre:this.shopfactPerform?Number(item.fvalue/this.shopfactPerform*100).toFixed(2):0
						})
						
					})
					this.salemanList=arr;
				}

			}
		},
		onShow(){
			this.getShopInfo(this.shopID);
			this.getSalemanPerform()
			this.getShopDayilyPerformance(this.shopID,this.timeObj)
		},
		onLoad(options){
			if(options){
				this.shopID=options.shopID;
				this.timeObj={
					year:options.year,
					month:options.month
				}
				uni.setNavigationBarTitle({
					title:`${this.timeObj.month}月绩效统计`
				})
				this.getShopInfo(options.shopID);
				this.getSalemanPerform()
				this.getShopDayilyPerformance(options.shopID,this.timeObj)
			}
		}
	}
</script>

<style  scoped>
		.month-title{
			height:80upx;
			line-height:80upx;
			background:rgba(66,176,237,1);
			color:#fff;
		}
		.sale-count-container{padding:20upx 0 14px;}
</style>
