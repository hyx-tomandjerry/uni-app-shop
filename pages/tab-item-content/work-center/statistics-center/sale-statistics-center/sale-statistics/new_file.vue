<template>
	<view>
		<!-- 销售统计 -->
		<cu-custom :isBack="true" @clickEvent="showBrand">
			<block slot="left">
				<view class="cuIcon-back font-size-back " @click.stop="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold down-content" >
					<text >{{title}}</text>
					<image src="../../../../../../static/icon/icon-down-black.png" class="downimg"></image>
				</view>
			</block>

		</cu-custom>

		<view class="brand" v-show="isShowBrand">
			<view class="brand-alone" @click="selectBrand('shop')" :class="{'brandActive':brandType=='shop'}">门店销售额统计</view>
			<view class="brand-shop" @click="selectBrand('alone')" :class="{'brandActive':brandType=='alone'}">个人销售额统计</view>
		</view>

		<view class="countNumber-container margin-bottom-normal bg-white">
			<view class="calendar-container flex justify-between">
				<view class="calendar-day "><text>{{timeObj.year}}.{{timeObj.month}}.{{timeObj.day}}</text></view>
				<view class="calendar-img">
					<image src="../../../../../../static/icon/icon-calendar.png"></image>
				</view>
			</view>
			<view class="time-tab flex justify-start">
				<view class="time-tab-item" v-for="(item,index) in timeTab"
					  :key="index" @click="selectTimeTab(item)" :class="{'time-tab-active':timeTabCur==item.id}">
					{{item.name}}
				</view>
			</view>
			<div class="chart-container">
				<view class="qiun-columns">
					<view class="qiun-charts3">
						<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
					</view>
				</view>
			</div>
			<view class="aim-number justify-around flex" v-if="brandType=='alone'" style="padding:0 23px 24px 27px;">
				<view class="shop-count text-center " >
					<view class="color-regular font-size-mini " style="margin-bottom:3px;">门店销售额(元)</view>
					<view class="font-size-middle font-weight-bold font-family-num">62,025,00</view>

				</view>
				<view class="shop-aim text-center">
					<view class="color-regular font-size-mini " style="margin-bottom:3px;">门店目标(元)</view>
					<view class="font-size-middle font-weight-bold font-family-num">62,025,00</view>
				</view>
				<view class="alone-aim text-center">
					<view class="color-regular font-size-mini " style="margin-bottom:3px;">我完成的(元)</view>
					<view class="font-size-middle font-weight-bold font-family-num">62,025,00</view>
				</view>
			</view>
			<view class="aim-number justify-between flex" v-if="brandType=='shop'" style="padding:0 50px  24px 47px;">
				<view class="shop-count text-center">
					<view class="color-regular font-size-mini " style="margin-bottom:3px;width:70px;text-index:2em;">2019年门店销售额(元)</view>
					<view class="font-size-middle font-weight-bold font-family-num">62,025,00</view>

				</view>
				<view class="alone-aim text-center">
					<view class="color-regular font-size-mini " style="margin-bottom:3px;width:70px;text-index:2em;">2019年门店目标(元)</view>
					<view class="font-size-middle font-weight-bold font-family-num">62,025,00</view>
				</view>
			</view>
		</view>

		<!--年销售额趋势开始-->
		<view class="sale-trend-container margin-bottom-normal" v-if="brandType=='alone'">
			<view class="sale-trend-title font-weight-bold font-size-big">
				年销售额趋势
			</view>
			<scroll-view scroll-x="true">
				<view class="qiun-line-charts" >
					<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix" @touchend="touchEndMix"></canvas>
				</view>
			</scroll-view>

		</view>
		<view class="sale-trend-container margin-bottom-normal" v-if="brandType=='shop'" style="height:300px;overflow: hidden;">
			<view class="sale-trend-title font-weight-bold font-size-big">
				门店销售额
			</view>
			<view>
				<canvas canvas-id="canvasRing" id="canvasRing"
						style="left:-32px;"
						class="chartsRing" @touchstart="touchRing"></canvas>
			</view>

		</view>
		<!--年销售额趋势结束-->
		<!--年销售额趋势详情开始-->
		<view class="year-sale-detail-container bg-white" v-if="brandType=='alone'&&timeTabCur==3">
			<view class="sale-trend-title font-weight-bold font-size-big color-normal">
				年销售额趋势详情
			</view>
			<view class="year-sale-detail-item align-center" v-for="(item,index) in saleDetailYearList" :key="index">
				<view class="month">{{item.month}}</view>
				<view style="width:100% ;padding-left:15px;"  >
					<view class="detail-num flex justify-between">
						<view class="font-weight-bold" style="margin-top:6px;">年占比{{item.year}}</view>
						<view class="font-family-num  font-size-middle font-weight-bold number-color">{{item.num}}</view>
					</view>
					<view class="progress">
						<view >
							<view class="cu-progress round sm striped active" >
								<view class="bg-color-red" :style="[{'width':item.year}]"></view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="year-sale-detail-container bg-white" v-if="brandType=='alone'&&timeTabCur==2">
			<view class="sale-trend-title font-weight-bold font-size-big color-normal">
				2019.07销售总额
			</view>
			<view class="year-sale-detail-item align-center" v-for="(item,index) in saleDetailMonthList" :key="index">
				<image :src="item.img" style="width:42px;height:42px;border-radius:50%; vertical-align: middle;" ></image>
				<view class="detail" style="width:100% ;padding-left:15px;"  >
					<view class="font-size-normal">{{item.name}}</view>
					<view class="font-size-big number-color font-weight-bold">{{item.num}}</view>
				</view>
			</view>
			
		</view>
		<view class="year-sale-detail-container bg-white" v-if="brandType=='alone'&&timeTabCur==1">
			<view class="sale-trend-title font-weight-bold font-size-big color-normal">
				2019.07.31销售总额
			</view>
			<view class="year-sale-detail-item align-center" >
				<image src="../../../../../../static/img/work/statistics/record.png" style="width:42px;height:42px;border-radius:50%; vertical-align: middle;" ></image>
				<view class="detail" style="width:100% ;padding-left:15px;"  >
					<view class="font-size-normal">07-31</view>
					<view class="font-size-big number-color font-weight-bold">¥6,1123.18</view>
				</view>
			</view>

		</view>
		<!--年销售额趋势详情结束-->
		<!--门店年销售额详情-->
		<view class="year-sale-detail-container bg-white" v-if="brandType=='shop'">
			<view class="sale-trend-title font-weight-bold font-size-big color-normal">
				年销售额趋势详情
			</view>
			<view class="year-sale-detail-item align-center" v-for="(item,index) in salemenList" :key="index">
				<img :src="item.img" style="width:42px;height:42px;border-radius:50%; vertical-align: middle;">
				<view style="width:100% ;padding-left:15px;"  >
					<view class="detail-num flex justify-between">
						<view class="font-weight-bold" style="margin-top:6px;">{{item.name}}</view>
						<view class="font-family-num  font-size-middle font-weight-bold number-color">{{item.num}}</view>
					</view>
					<view class="progress">
						<view >
							<view class="cu-progress round sm striped active" >
								<view class="bg-color-yellow" :style="[{'width':item.pre}]"></view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@dcloudio/uni-ui/lib/uni-collapse-item/uni-collapse-item.vue'
	import uCharts from '../../../../../../components/u-charts/u-charts.js'
	var canvaArcbar1=null;
	var canvaMix=null;
	var canvaRing=null;
	export default {
		data() {
			return {
				title:'个人销售统计',
				isShowBrand:false,
				brandType:'alone',
				timeObj:{
					year:'',
					month:'',
					day:''
				},
				timeTab:[
					{name:'日',id:1},
					{name:'月',id:2},
					{name:'年',id:3},
				],
				timeTabCur:3,
				saleDetailYearList:[
					{month:1,year:'32%',num:'￥2,1001.00'},
					{month:2,year:'25%',num:'￥3,1001.00'},
					{month:3,year:'40%',num:'￥4,1001.00'},
					{month:4,year:'25%',num:'￥1,1001.00'},
					{month:5,year:'40%',num:'￥2,1001.00'},
					{month:6,year:'25%',num:'￥1,1001.00'},
					{month:7,year:'40%',num:'￥5,1001.00'},
					{month:8,year:'25%',num:'￥1,1001.00'},
					{month:9,year:'40%',num:'￥5,1001.00'},
					{month:10,year:'49%',num:'￥6,1001.00'},
					{month:11,year:'40%',num:'￥5,1001.00'},
					{month:12,year:'49%',num:'￥6,1001.00'},
				],
				saleDetailMonthList:[
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-31',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-30',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-29',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-28',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-27',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-26',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-25',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-24',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-23',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-22',num:'¥6,1123.18'},
					{img:'../../../../../../static/img/work/statistics/record.png',name:'7-21',num:'¥6,1123.18'},
				],
				salemenList:[
					{img:'../../../../../../static/img/cute.jpg',name:'小一',num:'¥2,1001.00',pre:'30%'},
					{img:'../../../../../../static/img/cute.jpg',name:'小二',num:'¥2,1001.00',pre:'40%'},
					{img:'../../../../../../static/img/cute.jpg',name:'小三',num:'¥2,1001.00',pre:'45%'},
					{img:'../../../../../../static/img/cute.jpg',name:'小四',num:'¥2,1001.00',pre:'50%'},
					{img:'../../../../../../static/img/cute.jpg',name:'小五',num:'¥2,1001.00',pre:'70%'},
				],
				/*圆弧*/
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				chartData: {
					series: [{
						name: '门店销售情况',
						data: 0.29,
						color: '#2fc25b'
					}]
				},
				/*曲线图*/
				cWidth:'',
				cHeight:'',
				chartMixData: {
					"categories": ["2012", "2013", "2014", "2015", "2016", "2017"],
					"series": [{
						"name": "曲面",
						"data": [70, 50, 85, 130, 64, 88],
						"type": "area",
						"style": "curve"
					}, {
						"name": "柱1",
						"data": [40, 30, 55, 110, 24, 58],
						"type": "column"
					}, {
						"name": "柱2",
						"data": [50, 20, 75, 60, 34, 38],
						"type": "column"
					}, {
						"name": "曲线",
						"data": [70, 50, 85, 130, 64, 88],
						"type": "line",
						"style": "curve",
						"color": "#1890ff"
					}, {
						"name": "折线",
						"data": [120, 140, 105, 170, 95, 160],
						"type": "line",
						"color": "#2fc25b"
					}, {
						"name": "点",
						"data": [100, 80, 125, 150, 112, 132],
						"type": "point",
						"color": "#f04864"
					}]
				},
				/*圆环图*/
				cRingWidth:'',
				cRingHeight:'',
				serverData:'',
				serverRingData: {
					"series": [
							{"name": "小一", "data": 50},
						    {"name": "小二", "data": 30},
							{"name": "小三","data": 20},
						    {"name": "小四","data": 18},
						    {"name": "小五","data": 8}]
				}

			}
		},
		components:{uniCollapse,uniCollapseItem},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			/*
			* 点击头部，显示brand内容
			*/
			showBrand(){
				this.isShowBrand=!this.isShowBrand;
			},
			/*选择门店和个人*/
			selectBrand(type){
				this.brandType=type;
				switch(type){
					case 'shop':
						this.isShowBrand=false;
						this.title='门店销售额统计'
						break;
					case 'alone':
						this.isShowBrand=false;
						this.title='个人销售额统计'
						break;
				}
			},
			/*获得当前时间*/
			getCurrentTime(){
				let time=new Date();
				this.timeObj={
					year:time.getFullYear(),
					month:(time.getMonth() + 1)>10?time.getMonth() + 1:'0'+(time.getMonth() + 1),
					day:time.getDate()>10?time.getDate():'0'+time.getDate()
				}
			},
			/*选择年月日*/
			selectTimeTab(item){
				this.timeTabCur=item.id;
			},
			/*圆弧*/
			getServerData(){
				this.showArcbar("canvasArcbar1",this.chartData);
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
						color: '#2A2A2A',
						fontSize: 36*this.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,//这里您可以直接给任意字符串
						color: '#2A2A2A',
						fontSize: 14*this.pixelRatio
					},
					extra: {
						arcbar:{
							type:'default',
							width: this.arcbarWidth*this.pixelRatio,//圆弧的宽度
						}
					}
				});

			},
			/*曲线*/
			getServerLineData(){
				this.showMix("canvasMix",this.chartMixData);
			},
			showMix(canvasId,chartData){
				canvaMix=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'mix',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid:false,
						type:'grid',
						gridType:'dash',
						itemCount:4,
						scrollShow:true,
						scrollAlign:'left',
					},
					yAxis: {
						gridType:'dash',
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)}
					},
					width: this.cWidth*this.pixelRatio,
					height: this.cHeight*this.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						tooltip:{
							bgColor:'#000000',
							bgOpacity:0.7,
							gridType:'dash',
							dashLength:8,
							gridColor:'#1890ff',
							fontColor:'#FFFFFF',
							horizentalLine:true,
							xAxisLabel:true,
							yAxisLabel:true,
							labelBgColor:'#DFE8FF',
							labelBgOpacity:0.95,
							labelAlign:'left',
							labelFontColor:'#666666'
						}
					},
				});
			},
			touchMix(e){
				canvaMix.scrollStart(e);
			},
			moveMix(e) {
				canvaMix.scroll(e);
			},
			touchEndMix(e) {
				canvaMix.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaMix.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			/*圆环*/
			getServeRingData(){
				this.showRing("canvasRing",this.serverRingData)
			},
			showRing(canvasId,chartData){
				canvaRing=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					legend:true,
					title: {
						name: '门店销售额',
						color: '#aaaaaa',
						fontSize: 14,
						offsetY:-10,
						offsetX:-4
					},
					subtitle: {
						name: '￥123,224',
						color: '#2A2A2A',
						fontSize: 22,
						offsetY:0,
						offsetX:4
					},
					extra: {
						pie: {
							labelWidth:11,
							offsetAngle: -45,
							ringWidth:17
						}
					},
					background:'#FFFFFF',
					pixelRatio:1,
					series: chartData.series,
					animation: true,
					width: this.cRingWidth,
					height: this.cRingHeight,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing(e){
				canvaRing.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data
					}
				});
			},
		},
		onLoad(){
			this.cWidth3=uni.upx2px(250);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(250);//这里要与样式的宽高对应
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(300);
			this.cRingWidth=uni.upx2px(750);
			this.cRingHeight=uni.upx2px(400);
			this.getServerLineData();
			this.arcbarWidth=uni.upx2px(20);
			this.getServerData();
			this.getServeRingData();
		},
		onShow(){
			this.getCurrentTime();
			this.cWidth3=uni.upx2px(250);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(250);//这里要与样式的宽高对应
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(300);
			this.cRingWidth=uni.upx2px(750);
			this.cRingHeight=uni.upx2px(400);
			this.getServerLineData();
			this.arcbarWidth=uni.upx2px(20);
			this.getServerData();
			this.getServeRingData();
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgba(247,247,247,247,0.2);
	}
	.cu-custom .cu-bar .content .downimg{
		width: 16px !important;
		height: 12px !important;
		vertical-align: baseline !important;
		margin-left:6px !important;
	}
	.brand{
		transition:all 5s;
		position:fixed;
		top:70px;
		width:100%;
		background-color: #fff;
		z-index:1;

	}
	.brand-alone,.brand-shop{
		border:1px solid #EEEEED;
		width:100%;
		height:53px;
		line-height:53px;
		font-size:15px;
		text-align: center;

	}
	.brandActive{
		background:rgba(0,0,0,0.1)
	}
	.brand-shop{
		margin-top:-1px;
	}
	/*数据统计start*/
	.countNumber-container{
		padding-top:13px;
		margin-top:13px;
		.calendar-container{

			border-radius:6px;
			border:1px solid rgba(224,224,224,1);
			width: 123px;
			padding:7px 7px;
			margin:0px auto 12px;
			.calendar-img>image{
				width:16px;
				height: 16px;
				vertical-align: middle
			}
			.calendar-day{
				border-right:1px solid #E0E0E0;
				padding-right:12px;
			}
		}
		.time-tab{
			margin:0 12px 15px 15px;

			height:34px;
			line-height:34px;
			border:1px solid #43B0ED;
			border-radius:6px;
			.time-tab-item{
				flex:1;
				height:34px;
				line-height:34px;
				text-align: center;

			}
			.time-tab-item:first-child,.time-tab-item:nth-child(2){
				border-right:1px solid #43B0ED;
			}
		}
		.chart-container{
			width: 100%;
			height: 150px;

		}

	}
	.time-tab-active{
		background:rgba(67,176,237,1);
		color:#fff;
	}
	/*数据统计end*/

	/*年销售额趋势start*/
	.sale-trend-container{
		background-color: #fff;
		padding:0 12px 32px 15px;


	}
	.sale-trend-title{
		padding:17px 0 14px;
		border-bottom:1px solid #E3E3E3;
		margin-bottom:10px;

	}
	/*年销售额趋势end*/
	.year-sale-detail-container{
		background-color: #fff;
		padding:0 12px 32px 15px;
		.year-sale-detail-item{
			padding:0 15px;
			display:flex;
			justify-content: space-between;
			margin-bottom:32px;
			.month{
				width: 38px;
				height: 38px;
				border-radius:50%;
				background:rgba(66,176,237,1);
				color:#fff;
				text-align: center;
				line-height:38px;
			}
			.detail{
				display:flex;
				justify-content: space-between;
			}
		}
	}


	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts3 {
		width: 250px;
		height: 250px;
		position: relative;
		margin:0 auto;
		padding-left:40px;
	}
	.charts3 {
		position: absolute;
		width: 250px;
		height: 150px;
		background-color: #FFFFFF;
	}
	.qiun-line-charts{
		width: 100%;
		height: 150px;
		background-color: #FFFFFF;
	}
	.charts {
		width: 100%;
		height: 150px;
		background-color: #FFFFFF;
	}
	.qiun-charts{width: 750px; height:400px;background-color: #FFFFFF;}
	.chartsRing{width: 750px; height:400px;background-color: #FFFFFF;}
</style>
