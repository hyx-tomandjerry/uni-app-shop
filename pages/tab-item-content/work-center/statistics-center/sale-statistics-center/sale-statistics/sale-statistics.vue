<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><view class="cuIcon-back"  @click.stop="goBack()"></view></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >{{shop.name}}绩效统计</view></block>
			<block slot="right">
				<view class="choose-year" @click="chooseYear">
					<text>{{timeObj.year}}年</text>
					<text class="cuIcon-unfold font-size-big color-regular" style="padding-left:7px;"></text>
				</view>
			</block>
		</cu-custom>
		<!-- <sale-count-year-title 
			:shopPerformPre="shopPerformPre"
			:timeObj="timeObj"
			:shopfactPerform="shopfactPerform"
			:shopAimPerform="shopAimPerform"
			type="year"
		></sale-count-year-title> -->
		<view class="sale-count-content borderTop margin-bottom-normal flex justify-center align-center">
			<view class="chart-container flex justify-center align-center position_relative">
				<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
			</view>
			<view class="sale-count-bottom flex justify-between color-regular flex-all">
				<view class="flex-1 text-center ">
					<view>{{timeObj.year}}年</view>
					<view class="margin-mini">门店销售总额(元)</view>
					<view class="font-weight-bold font-size-num color-normal">{{shopfactPerform}}</view>
				</view>
				<view class="flex-1 text-center ">
					<view>{{timeObj.year}}年</view>
					<view class="margin-mini">门店销售目标(元)</view>
					<view class="font-weight-bold font-size-num color-normal">{{shopAimPerform}}</view>
				</view>
			</view>
		</view>
	
			<view class="sale-trend-container">
				<sale-count-title-tab 
					:tabList="tabList"
					:tabCurVal="trendTab"
					 @selectTabCur="dateTabChoose"
					>
				<block slot="content">{{timeObj.year}}年销售额详情</block>
				</sale-count-title-tab>
			<view>
				<view class="month-title flex align-center">
					<view class="u-f-ajc flex-1 font-weight-bold">
						<template v-if="trendTab=='sale'">
							月份
						</template>
						<template v-else-if="trendTab=='man'">
							姓名
						</template>
					</view>
					<view class="u-f-ajc flex-1 font-weight-bold" v-if="trendTab=='sale'">销售目标<text class="font-size-mini">(元)</text></view>
					<view class="u-f-ajc flex-1 font-weight-bold">销售总额<text class="font-size-mini">(元)</text></view>
					<view class="u-f-ajc flex-1 font-weight-bold">完成比例</view>
				</view>
				<template v-if="trendTab=='sale'" class="month-list">
					<block v-for="(month,index) in monthList" :key="index">
						<sale-count-month-item :month="month" :index="index" @checkMonthItem="checkMonthItem" type="month"></sale-count-month-item>
					</block>
				</template>
				<template v-if="trendTab=='man'" >
					<block v-for="(item,index) in salemanList" :key="index">
						<sale-count-month-item :month="item" :index="index"  type="sale"></sale-count-month-item>
					</block>
				</template>

			</view>
		</view>
		<!-- 年份弹出框 -->
		<year-choose-model :isShow="modalName=='yearBottomModal'" @hideModel="hideModel" @bindChange="bindChange"></year-choose-model>
	</view>
</template>
<script>


	import saleCountMonthItem from '../../../../../../components/statistics/sale-count-month-item.vue'
	import yearChooseModel from '../../../../../../components/common/year-choose-model.vue'
	import saleCountTitleTab from '../../../../../../components/statistics/sale-count-title-tab.vue'
	import saleCountYearTitle from '../../../../../../components/statistics/sale-count/sale-count-year-title.vue'
	import uCharts from '../../../../../../components/u-charts/u-charts.js'
	var canvaArcbar1;
	export default{
		data(){
			const date = new Date()
			const years = []
			for (let i = 1990; i <= date.getFullYear()+10; i++) {
				years.push(i)
			}
			return{
				modalName:'',
				years,
				shop:{},//获得门店信息
				shopID:'',//门店id
				timeObj:{
					year:new Date().getFullYear(),
				},
				trendTab:'sale',//选择销售额还是店员
				tabList:[
					{name:'销售额',value:'sale'},
					{name:'店员',value:'man'},
				],
				
				//日历选择
				value:[],
				//实际和计划
				shopfactPerform:0,
				shopAimPerform:0,
				shopPerformPre:0,
				salemanList:[],//店员列表
				monthList:[],
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				chartData: {
					series: [{
						name: '正确率',
						data: 0.29,
						color: '#2fc25b'
					}]
				}				
			}
		},
		components:{
			saleCountMonthItem,
			yearChooseModel,
			saleCountTitleTab,
			saleCountYearTitle
		},
		methods:{
			_initChart(){
				this.cWidth3=uni.upx2px(250);//这里要与样式的宽高对应
				this.cHeight3=uni.upx2px(250);//这里要与样式的宽高对应
				this.arcbarWidth=uni.upx2px(24);
				// this.showArcbar('canvasArcbar1',this.chartData)
			},
			//查看店员每月的绩效
			checkSalemanItem(item){
				console.log(item)
			},
			//查看单月详情
			checkMonthItem(item){
				uni.navigateTo({
					url:"../sale-statistics-month/sale-statistics-month?month="+item.id+'&shopID='+this.shopID+"&year="+this.timeObj.year
				})
			},
			hideModel(){
				if(this.modalName){
					this.modalName=null;
				}
				this.getPerformByYear(this.timeObj.year)
				this.getSalemanPerform()
			},
			//选择年份
			bindChange(event){
				let value=event.detail.value;
				this.timeObj.year=this.years[value[0]];
				this.getPerformByYear(this.timeObj.year)
				this.getSalemanPerform()
			},
			//选择年份
			chooseYear(){
				this.modalName='yearBottomModal'
			},
			/*
				获得门店信息
			 */
			getShopInfo(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shop=res;

				})
			},
			/*
			返回上一级
			 */
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//选择年月日
			dateTabChoose(item){
				this.trendTab=item.value;
			},
			//获得数据根据年月日
			getPerformByYear(year){
				this.$ajax('ShopYearlySalesPlan',{
					year:year,
					shop:this.shopID,
					withActual:1
				},res=>{
					if(res){
						this.shopfactPerform=res['actual']?res['actual']:0;
						this.shopAimPerform=res['expect']?res['expect']:0;
						this.shopPerformPre=res['expect']?Number(res['actual']/res['expect']).toFixed(2):0
						let Arcbar1={series:[]};
						Arcbar1.series=[{
							name: '完成率',
							data: this.shopPerformPre,
							color: '#42B0ED'
						}]
						this.showArcbar("canvasArcbar1",Arcbar1);
						//12个月列表
						let arr=[]
						for(var index=1;index<=12;index++){
							arr.push({
								id:index,
								num:res[`amonth${index}`]?Number(res[`amonth${index}`]).toFixed(2):0,
								aim:res[`month${index}`]?Number(res[`month${index}`]).toFixed(2):0,
								pre:res[`month${index}`]?Number(res[`amonth${index}`]/res[`month${index}`]*100).toFixed(2):0
							})
						}
						this.monthList=arr;
					}
				})
			},
			//获得店员年的绩效
			getSalemanPerform(){
				this.$ajax('SalesmenSalesAmount',{
					shop:this.shopID,
					year:this.timeObj.year,
				},res=>{
					if(res.salesmen){
						let arr=[];
						res.salesmen.forEach(item=>{
							arr.push({
								name:item.name,
								num:item.value?item.value:0,
								aim:this.shopfactPerform?this.shopfactPerform:0,
								pre:this.shopfactPerform?Number(item.value/this.shopfactPerform*100).toFixed(0):0
								
							})
						})
						this.salemanList=arr;
					}
				})
			},
			showArcbar(canvasId,chartData){
				canvaArcbar1=new uCharts({
				$this:this,
				canvasId: canvasId,
				type: 'arcbar',
				fontSize:11,
				legend:{show:false},
				background:'#FFFFFF',
				pixelRatio:this.pixelRatio,
				series: chartData.series,
				animation: true,
				width: this.cWidth3*this.pixelRatio,
				height: this.cHeight3*this.pixelRatio,
				dataLabel: true,
				title: {
					name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
					color: chartData.series[0].color,
					fontSize: 25*this.pixelRatio
				},
				subtitle: {
					name: chartData.series[0].name,//这里您可以直接给任意字符串
					color: '#666666',
					fontSize: 15*this.pixelRatio
				},
				extra: {
					arcbar:{
						type:'circle',//整圆类型进度条图
						width: this.arcbarWidth*this.pixelRatio,//圆弧的宽度
						startAngle:1.8//整圆类型只需配置起始角度即可
					}
				}
				});	
			}
	},
		onLoad(options){
			this._initChart();
			if(options.id){
				this.shopID=options.id;
				this.getShopInfo(options.id)
				this.getPerformByYear(this.timeObj.year)
				this.getSalemanPerform()
			}

		},
	}
</script>
<style lang="less" scoped>
	.sale-trend-container{
		background-color: #fff;
		.sale-man-list{
			padding-top: 20px;

		}
		.month-title{
			height:80upx;
			line-height:80upx;
			background:rgba(66,176,237,1);
			color:#fff;
		}
		
	}
	
	.font-size-num{
		font-size:26px;
	}
	.choose-year{
		margin-right:15px;
		border:1px solid #EEEEED;
		border-radius:5px;
		padding:2px 5px;
	}
	.uni-picker-view-content{
		padding:50px 0px;
	}
	.sale-count-content{
		padding:40upx 60upx;
		background-color: #fff;
		flex-direction: column;
	}
	.progress-content>view:first-child{
		font-size:80upx;
	}
	.progress-content{
		margin-bottom: 20upx;
	}
	.margin-mini{
		margin:10upx 0;
	}
	.sale-count-bottom{
			margin-top: 20px;
	}
	.charts3 {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;			
		
	}
	.chart-container{
		height:250upx;
	}
</style>
