<template>
	<view>
		<!-- <uChartModel  :todayNum="today.todayFact" :aimNum="today.todayAim" >
			<block slot="canvas">
				<view class="qiun-charts3">
					 <canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
				</view>
			</block>
		</uChartModel> -->
		<view class="chart-container" >
			<view class="chart-content">
				<image src="../../../../../static/img/work/statistics/count-bg.png"></image>
				<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
				<view class="canvas-count">{{today.todayPre*100}}%</view>
			</view>
		
			<view class="count-number-area" style="padding:10px 40px;">
				<view class="num-area flex justify-start flex-all align-center">
					<view class="num-area-left num flex-1">{{today.todayFact || 0}}</view>
					<view class="num-area-right num flex-sm">{{today.todayAim || 0}}</view>
				</view>
				<view class="intro-container font-size-mini">
					<view class="intro-area flex justify-start flex-all align-center" >
						<view class="intro-area-left  flex-1">
							<view class="num-intro">门店销售额</view>
						</view>
						<view class="intro-area-right  flex-sm">
							<view class="num-intro" >门店销售目标</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		
		
		
		
		<sale-bottom :managerID="managerID" 
		:contentHeight="contentHeight" 
		@checkItem="checkItem"
		:salemanList="salemanList"/></sale-bottom>
	
		<common-btn-one
				 	content="提交当天绩效"
				 	type="primary"
				 	@operateBtn="submitSale" :isPos="true"></common-btn-one>
	</view>
</template>

<script>
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	import uChartModel from '../../../../../components/statistics/sale-check/uchart-model.vue'
	import saleCheckItem from '../../../../../components/statistics/sale-check-item.vue';
	import SaleBottom from './childComponent/sale-bottom.vue'
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	
	import {mapState} from 'vuex'
	import {SalesmenSalesAmountApi,ConfirmShopSalesAmountApi} from '../../../../../api/statistics_api.js'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				today:{
					todayFact:0,//判断今日是否审核过
					todayAim:0,//今天的总目标
					todayPre:0,//今天百分比
				},

				saleList:[],
				//圆弧
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				salemanPerform:'',
				chartData:{
					series:[]
				},
				
				shopID:'',
				salemanList:[],
				managerID:'',//店长的ID
				timeObj:{
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					day:new Date().getDate()
				},
				contentHeight:300
			}
		},
		components: {
			uChartModel,
			saleCheckItem,
			commonBtnOne,
			SaleBottom
		},
		methods: {
			getSystem(){
				uni.getSystemInfo({
					success: (res) => {
						this.contentHeight=res.windowHeight-uni.upx2px(660)
					}
				})
			},
			submitSale(){
				uni.showModal({
					content:'每天只能提交一次销售绩效，请确认您提交的是当天门店所有店员的全部销售金额!',
					success: (res) => {
						if(res.confirm){
							this.confirmPerform()
						}
					}
				})
			},
			//确认今天绩效
			async confirmPerform(){
				if(await ConfirmShopSalesAmountApi(this.shopID,`${this.timeObj.year}-${this.timeObj.month}-${this.timeObj.day}`)){
					
					this.$utils.showToast('确认绩效成功')
					this.$utils.goBack()
					this.$utils.hide()
				}

			},
			/*获得今日绩效信息*/
			async getShopPerformByDay(id,timeObj){
				//获得店员绩效
				let result = await SalesmenSalesAmountApi(id,timeObj);
				let num = 0;
				if(result.salesmen){
					num=result.salesmen.reduce((sum,item)=>{return sum + item.fvalue},0)
					result.salesmen.forEach(item=>{
						item.pre=this.today.todayFact>0 ? Number(item.fvalue/(this.today.todayFact)*100).toFixed(2):0;
					})
					this.salemanList=result.salesmen;
				}
				this.today={
					todayFact:result['actual']?Number(result['actual']).toFixed(2):num.toFixed(2),
					todayAim:result['expect']?Number(result['expect']).toFixed(2):0,
					todayPre:result['expect']?Number(num/result['expect']).toFixed(2):0
				}
				
				this.chartData.series=[
					{
						name:'门店日占比',
						data:this.today.todayPre>=1?1:this.today.todayPre,
						color: '#42B0ED'				
					}
				];
				this._initChart()
				this.showArcbar('canvasArcbar1',this.chartData);		

			},
			/*查看单个店员的绩效*/
			checkItem(item){
				let obj={
					saleID:item.id,
					shopID:this.shopID,
					money:item.fvalue,
					year:this.timeObj.year,
					month:Number(this.timeObj.month),
					day:Number(this.timeObj.day),
					type:'edit'
				}
				uni.navigateTo({
					url:"../record-money/record-money?obj="+JSON.stringify(obj)
				})
			},
			_initChart(){
				this.cWidth=uni.upx2px(200);
				this.cHeight=uni.upx2px(200);
				this.arcbarWidth=uni.upx2px(24);
			},

			/*显示圆弧*/
			showArcbar(canvasId,chartData){
				let canvaArcbar1=new uCharts({
					$this:this,
					canvasId:canvasId,
					type:'arcbar',
					fontSize:11,
					legend:{show:false},
					pixelRatio: this.pixelRatio,
					series:chartData.series,
					animation:true,
					width:this.cWidth*this.pixelRatio,
					height:this.cHeight*this.pixelRatio,
					dataLabel:true,
					title:{
						// name:Math.round(chartData.series[0].data*100)+'%',
						color:chartData.series[0].color,
						fontSize:14*this.pixelRatio
					},
					subTitle:{
						name: chartData.series[0].name,//这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 15*this.pixelRatio
					},
					extra:{
						arcbar:{
							type:'circle',
							width:this.arcbarWidth*this.pixelRatio,
							startAngle:0.5
						}

					}
				})
			}


		},
		onShow(){
			this.getShopPerformByDay(this.shopID,this.timeObj)
		},
		onLoad(param){
			this.getSystem();
			if(param){
				this.shopID=param.shopID;
				this.managerID=param.managerID;
				this.timeObj={
					year:param.year,
					month:Number(param.month)>9?param.month:'0'+param.month,
					day:Number(param.day)>9?param.day:'0'+param.day
				}
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
				    backgroundColor: '#383D5B',
				})
				uni.setNavigationBarTitle({
					title:`${this.timeObj.month}.${this.timeObj.day}日门店绩效审核`
				})
				this.getShopPerformByDay(param.shopID,this.timeObj)

			}
		}
	}
</script>

<style lang="less">
	page{
		font-family: "DINAlternate";
	}
	.qiun-charts3{
		width:200upx;
		height: 200upx;
		position:relative;
	}
	.charts3{
		position:absolute;
		width: 200upx;
		height: 200upx;
		top:24px;
		left:27px;
	}
	
	.btn-container{
		z-index:100;
		position:fixed;
		width:93%;
		bottom:0;
		left:15px;
		margin: 10px auto;
		height:40px;
		line-height:40px;
		background:rgba(66,176,237,1);
		border-radius:5px;
		color:#fff;
		text-align: center;
	}
	.chart-container{
		height:460upx;
		background:url(../../../../../static/img/work/statistics/bg.png) no-repeat center center;
		background-size:cover;
	}
		.chart-content{
			width: 300upx;
			height: 300upx;
			position:relative;
			margin: 0 auto;
			
		}
		.chart-content>image{
			width: 100%;
			height: 100%;
			position:absolute;
			top:0;
			left:0
		}
		.num{
			font-size:26px;
			font-family:DINAlternate-Bold;
			font-weight:bold;
			color:rgba(255,255,255,1);
		}
		.num-area-left{
			border-right:1px solid #525A85;
			background:url(../../../../../static/img/work/statistics/count-money.png) no-repeat 0 center;
			background-size: 32upx 32upx;
			padding-left:50upx;
		}
		.num-area-right{
			margin-left:24px;
			background:url(../../../../../static/img/work/statistics/aim-money.png) no-repeat 0 center;
			background-size: 32upx 32upx;
			padding-left:50upx;
		}
		.intro-container{
			color:#7C81A3;
			
		}
		.intro-area-left{
			padding-left:50upx;
		}
		.intro-area-right{
			padding-left:48upx;
		}
		.canvas-count{
			color:#42B0ED;
			font-size:16px;
			font-weight: bold;
			position: absolute;
			top: 60px;
			left: 55px;
			
		}
</style>
