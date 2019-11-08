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
		<view class="sale-count-container borderTop margin-bottom-normal">
			<view class="sale-count-chart">
				<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
			</view>
			<view class="sale-count-bottom flex justify-between color-regular">
				<view class="flex-1 text-center ">
					<view>{{timeObj.year}}年</view>
					<view>门店销售总额(元)</view>
					<view class="font-weight-bold font-size-num color-normal">{{shopfactPerform}}</view>
				</view>
				<view class="flex-1 text-center ">
					<view>{{timeObj.year}}年</view>
					<view>门店销售目标(元)</view>
					<view class="font-weight-bold font-size-num color-normal">{{shopAimPerform}}</view>
				</view>
			</view>
		</view>
		<!--趋势图-->
		<view class="sale-trend-container">
			<view class="sale-trend-top flex justify-between">
				<view class="text-center flex-1">
					<view class="font-size-big font-weight-bold">{{timeObj.year}}年{{shop.name}}销售额详情</view>
					<text class="font-size-mini color-regular">(点击可查看单月详情)</text>
				</view>
				<view class="flex justify-start trend-tab" style="width:100px">
					<view v-for="(item,index) in trendTabList" :key="index" class="trend-tab-item"  @click="dateTabChoose(item)"
						  :class="{'tab-active':trendTab==item.value}">{{item.title}}</view>
				</view>
			</view>
			<view>
				<view v-if="trendTab=='sale'" class="month-list">
					<view class="month-list-item flex justify-between align-center" v-for="(month,index) in monthList" :key="index" @click="checkMonthItem(month)">
						<view class="month-tag">{{index+1}}月</view>
						<view class="month-info flex-1">
							<view class="flex justify-between">
								<view>目标:{{month.aim}}元</view>
								<view>销售额:{{month.num}}元</view>
								<view style="color:#D84411">完成度:{{month.pre}}%</view>
							</view>
							<view class="cu-progress round sm striped active" >
								<view class="bg-yellow"
										:class="{

											'bg-color-blue':(index+1)%2==0,
											'bg-color-orange':(index+1)%3==0,
											'bg-color-red':(index+1)%5==0,
											'bg-color-purple':(index+1)%7==0
										}"
										:style="[{'width':month.pre+'%'}]"></view>
								 <!--<view class="bg-color-purple" style="width:60%"></view>-->
							</view>
						</view>
					</view>
				</view>
				<view v-if="trendTab=='man'" class="sale-man-list">
					<view  style="padding-top:20px;">
						<view class="sale-man-item flex justify-between align-center" v-for="(item,index) in salemanList" :key="index">
							<image :src="item.headurl?item.headurl:'../../../../../../static/img/default.png'" mode="" class="sale-avatar"></image>
							<view class="flex-1">
								<view class="sale-info flex justify-between">
									<view style="margin-bottom:7px;">
										<text>{{item.name || ''}}</text>
										<text style="margin-left:20px;">{{item.pre}}%</text>
									</view>
									<view class="font-weight-bold font-size-big text-yellow"
										  :class="{
											'text-blue':(index+1)%2==0,
											'text-orange':(index+1)%3==0,
											'text-red':(index+1)%5==0,
											'text-purple':(index+1)%7==0
											}"
									>￥{{item.value || 0}}</view>
								</view>
								<view class="cu-progress round sm striped active" >
									<view
											:class="{
											'bg-yellow':(index+1)%1==0,
											'bg-blue':(index+1)%2==0,
											'bg-orange':(index+1)%3==0,
											'bg-red':(index+1)%5==0,
											'bg-purple':(index+1)%7==0
										}"
											:style="[{'width':item.pre+'%'}]"></view>
									<!-- <view class="bg-color-purple" style="width:60%"></view> -->
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 年份弹出框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='yearBottomModal'?'show':''">
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
	</view>
</template>
<script>
	import MxDatePicker from '../../../../../../components/uni/mx-datepicker/mx-datepicker.vue'
	import uCharts from '../../../../../../components/u-charts/u-charts.js'
	var canvaArcbar1;
	var canvaMix=null;
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
				trendTabList:[
					{value:'sale',title:'销售额'},
					{value:'man',title:'店员'},
				],
				//	圆弧
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				chartData: {
					series: [{
						name:'销售占比',
						data:0,
						color: '#43B0ED'
					}]
				},
				//日历选择
				value:[],
				//实际和计划
				shopfactPerform:0,
				shopAimPerform:0,
				salemanList:[],//店员列表
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				monthList:[
					{id:1,pre:0,num:0,aim:0},
					{id:2,pre:0,num:0,aim:0},
					{id:3,pre:0,num:0,aim:0},
					{id:4,pre:0,num:0,aim:0},
					{id:5,pre:0,num:0,aim:0},
					{id:6,pre:0,num:0,aim:0},
					{id:7,pre:0,num:0,aim:0},
					{id:8,pre:0,num:0,aim:0},
					{id:9,pre:0,num:0,aim:0},
					{id:10,pre:0,num:0,aim:0},
					{id:11,pre:0,num:0,aim:0},
					{id:12,pre:0,num:0,aim:0},
				]
			}
		},
		components:{
			MxDatePicker
		},
		methods:{

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
			},
			//选择年份
			bindChange(event){
				let value=event.detail.value;
				this.timeObj.year=this.years[value[0]]
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
				// this.getPerformByYear(this.timeObj.year)
			},
			//显示圆弧
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
						name:chartData.series[0]? Math.round(chartData.series[0].data*100)+'%':0,//这里我自动计算了，您可以直接给任意字符串
						color: chartData.series[0]?chartData.series[0].color:'#43B0ED',
						fontSize: 25*this.pixelRatio
					},
					subtitle: {
						name:chartData.series[0]? chartData.series[0].name:'',//这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 15*this.pixelRatio
					},
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: this.arcbarWidth*this.pixelRatio,//圆弧的宽度
							startAngle:0.2//整圆类型只需配置起始角度即可
						}
					}
				});

			},


			//获得数据根据年月日
			getPerformByYear(year){
				this.$ajax('ShopYearlyPerformance',{
					year:year,
					shop:this.shopID,
				},res=>{
					if(res){
						this.shopfactPerform=res['actual']?res['actual']:0;
						this.shopAimPerform=res['expect']?res['expect']:0;
						this.chartData.series=[
							{
								name:'销售占比',
								data:res['expect']?Number(res['actual']/res['expect']).toFixed(2):0,
								color: '#43B0ED'
							}
						];
						this.showArcbar("canvasArcbar1",this.chartData);

						//12个月列表
						this.monthList.forEach((month,index)=>{
							month.num=res[`amonth${index+1}`]?Number(res[`amonth${index+1}`]).toFixed(2):0;

							month.aim=res[`month${index+1}`]?Number(res[`month${index+1}`]).toFixed(2):0;
							month.pre=res[`month${index+1}`]?Number(month.num/res[`month${index+1}`]*100).toFixed(2):0;
						})
						//店员
						if(res.salesmen && res.salesmen.length){
							res.salesmen.forEach(item=>{
								item.pre=this.shopfactPerform?Number((item.value/this.shopfactPerform)*100).toFixed(2):0
							})
						}

						this.salemanList=res.salesmen?res.salesmen:[];
					}
				})
				/**
				 switch(this.dateTab){
					case 'year':

						//如果是年
						this.$ajax('ShopYearlyPerformance',{
							shop:this.shopID,
							year:this.timeObj.year
						},res=>{
							if(res){
								this.shopfactPerform=res['actual']?res['actual']:0;
								this.shopAimPerform=res['expect']?res['expect']:0;
								//销售占比
								this.chartData.series=[
									{
										name:'销售占比',
										data:res['expect']?Number(res['actual']/res['expect']).toFixed(2):0,
										color: '#43B0ED'
									}
								];

								this.showArcbar("canvasArcbar1",this.chartData);



								//店员
								if(res.salesmen && res.salesmen.length){
									res.salesmen.forEach(item=>{
										item.pre=this.shopfactPerform?Number((item.actual/this.shopfactPerform)*100).toFixed(2):0
									})
								}

								this.salemanList=res.salesmen?res.salesmen:[];

							}
						})
						break;
					case 'month':
						this.$ajax('ShopMonthlyPerformance',{
							shop:this.shopID,
							date:`${this.timeObj.year}-${this.timeObj.month}-${this.timeObj.day}`
							// year:this.timeObj.year,
							// month:Number(this.timeObj.month)
						},res=>{
							if(res){
								this.shopfactPerform=res['actual']?res['actual']:0;
								this.shopAimPerform=res['expect']?res['expect']:0;
								this.chartData.series=[
									{
										name:'销售占比',
										data:res['expect']?Number(res['actual']/res['expect']).toFixed(2):0,
										color: '#43B0ED'
									}
								];
								this.showArcbar("canvasArcbar1",this.chartData);


								//店员
								if(res.salesmen.length){
									res.salesmen.forEach(item=>{
										item.pre=this.shopfactPerform?Number(item.actual/this.shopfactPerform*100).toFixed(2):0
									})
								}
								this.salemanList=res.salesmen?res.salesmen:[]
							}
						})
						break;
					case 'day':
						this.trendTab='man';
						this.$ajax('ShopDailyPerformance',{
							shop:this.shopID,
							date:`${this.timeObj.year}-${this.timeObj.month}-${this.timeObj.day}`
						},res=>{
							if(res){
								this.shopfactPerform=res['actual']?res['actual']:0;
								this.shopAimPerform=res['expect']?res['expect']:0;
								this.chartData.series=[
									{
										name: '销售占比',
										data: res['expect']?Number(res['actual']/res['expect']).toFixed(2):0,
										color: '#43B0ED'
									}
								];
								this.showArcbar("canvasArcbar1",this.chartData);
								//店员
								if(res.salesmen.length){
									res.salesmen.forEach(item=>{
										item.pre=this.shopfactPerform?Number(item.actual/this.shopfactPerform*100).toFixed(2):0
									})
								}
								this.salemanList=res.salesmen?res.salesmen:[]
							}
						})
						break;
				}
				 */

			},


		},
		onLoad(options){
			if(options.id){
				this.shopID=options.id;
				this.getShopInfo(options.id)
				this.getPerformByYear(this.timeObj.year)
			}

			this.cWidth3=uni.upx2px(250);
			this.cHeight3=uni.upx2px(250);
			this.arcbarWidth=uni.upx2px(24);
			this.showArcbar("canvasArcbar1",this.chartData);


		},
	}
</script>
<style lang="less">
	.sale-count-container{
		background-color: #fff;
		padding:15px 12px 13px 15px;
		.sale-count-top{
			margin-bottom: 21px;
			.sale-count-top-r{
				border:1px solid #43B0ED;
				border-radius:5px;
				.sale-tab-item{
					height:20px;
					line-height:20px;
					text-align:center;
					width:33px;
					color:#43B0ED;
					font-size:12px;

				}
				.sale-tab-item:nth-child(2){
					border-right:1px solid #43B0ED;
					border-left:1px solid #43B0ED;
				}
			}
		}
		.sale-count-chart{
			width: 750upx;
			height: 250upx;
			background-color: #FFFFFF;
			position: relative;
		}
		.charts3 {
			position: absolute;
			left:50%;
			transform:translateX(-50%);
			width: 250upx;
			height: 250upx;
			background-color: #FFFFFF;
		}
		.sale-count-bottom{
			margin-top: 20px;
		}
	}
	.sale-trend-container{
		padding:21px 15px 32px ;
		background-color: #fff;
		.sale-trend-top{
			padding-bottom:10px;
			border-bottom:1px solid #E3E3E3;
			.trend-tab{
				border:1px solid #42B0ED;
				border-radius:6px;
				font-size:12px;
				height:21px;
				line-height:21px;
				text-align: center;
				color:#42B0ED;

			}
			.trend-tab-item{
				padding:0 8px;
			}
			.trend-tab-item:first-child{
				border-right:1px solid #42B0ED;
			}
		}
		.sale-trend-chart{
			padding-top:20px;
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;

		}
		.sale-man-list{
			padding-top: 20px;

		}
		.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}
		.month-list{
			padding-top: 27px;
			.month-list-item{
				margin-bottom: 27px;
				.month-tag{
					font-size:16px;
					width: 38px;
					height: 38px;
					line-height:38px;
					text-align: center;
					color:#fff;
					background:rgba(61,66,97,1);
					border-radius:50%;
					margin-right:12px;
				}

			}
		}

	}
	.margin-right-litter{
		margin-right: 7px;
	}
	.tab-active{
		background:#43B0ED;
		color:white !important;
	}
	.font-size-num{
		font-size:26px;
	}
	.sale-man-item{
		margin-bottom: 18px;
		.sale-avatar{
			width: 50px;
			height: 50px;
			border-radius:50%;
			margin-right:8px;
			vertical-align: middle;
		}
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
</style>
