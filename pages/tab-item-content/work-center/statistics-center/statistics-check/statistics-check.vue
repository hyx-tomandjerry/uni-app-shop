<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-color-perform">
			<block slot="left">
				<view class="cuIcon-back   text-white" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold text-white">{{new Date().getMonth()+1}}.{{new Date().getDate()}}日门店绩效审核</view>
			</block>
		</cu-custom>
		<uChartModel  :todayNum="today.todayFact" :aimNum="today.todayAim" :type="'today'">
			<block slot="canvas">
				<view class="qiun-charts3">
					 <canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
				</view>
			</block>
		</uChartModel>
		<view class="rank-container bg-white">
			<view class="nav flex justify-around borderBottom">
				<view class="flex-1 text-center">姓名</view>
				<view class="flex-1 text-center">销售额</view>
				<view class="flex-1 text-center">占比</view>
				<view class="flex-1 text-center" v-if="userInfo.id==managerID">编辑</view>
			</view>
			<scroll-view class="rank-list" scroll-y="true" style="max-height: 250px;">
				<block v-for="(item,index) in salemanList" :key="index">
					<sale-check-item
					:managerID="managerID"
					:item="item"
					 :index="index" @checkItem="checkItem"></sale-check-item>
				</block>
			</scroll-view>

		</view>

		<button class="btn-container" @tap="showModel($event)" 
			data-target="noticeModel" :loading="loading" :disabled="disabled"
			 >提交当天绩效</button>
		
		<showModel :isShow="modelName=='noticeModel'" @hideModel="hideModel" v-if="modelName=='noticeModel'" @confirmDel="confirmPerform">
			<block slot="content">
				每天只能提交一次销售绩效，请确认您提交的是当天门店所有店员的全部销售金额!
			</block>
		</showModel>
	</view>
</template>

<script>
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	import uChartModel from '../../../../../components/uchart-model.vue'
	import {mapState} from 'vuex'
	import showModel from '../../../../../components/show-model.vue'
	import saleCheckItem from '../../../../../components/statistics/sale-check-item.vue'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				disabled:false,
				loading:false,
				today:{
					todayFact:0,//判断今日是否审核过
					todayAim:0,//今天的总目标
					todayPre:0,//今天百分比
				},

				saleList:[],
				//圆弧
				cWidth: '',//圆弧进度图
				cHeight: '',//圆弧进度图
				arcbarWidth:'',//进度条宽度
				pixelRatio:1,
				salemanPerform:'',
				chartData:{
					series:[]
				},
				shopID:'',
				salemanList:[],
				managerID:'',//店长的ID
				modelName:'',
				timeObj:{
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					day:new Date().getDate()
				}
			}
		},
		components: {
			uChartModel,
			showModel,
			saleCheckItem
		},
		methods: {
			hideModel(){
				this.modelName=null;
			},
			showModel(event){
				this.modelName=event.currentTarget.dataset.target
			},
			//确认今天绩效
			confirmPerform(){
				this.$ajax('ConfirmShopSalesAmount',{
					shop:this.shopID,
					date:`${this.timeObj.year}-${this.timeObj.month}-${this.timeObj.day}`
				},res=>{
					uni.showToast({
						title:'确认绩效成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},900)

				})
			},
			/*获得今日绩效信息*/
			getShopPerformByDay(id,timeObj){
				//获得店员绩效
				
				this.$ajax('SalesmenSalesAmount',{
					shop:id,
					year:timeObj.year,
					month:timeObj.month,
					date:timeObj.day
				},res=>{
					if(res){
						this.today={
							todayFact:res['actual']?Number(res['actual']).toFixed(2):0,
							todayAim:res['expect']?Number(res['expect']).toFixed(2):0,
							todayPre:res['expect']?Number(res['actual']/res['expect']).toFixed(2):0
						}
						console.log(this.today.todayPre)
						this.chartData.series=[
							{
								name:'门店日占比',
								data:this.today.todayPre,
								color: '#2fc25b'
												
							}
						]
						this.showArcbar('canvasArcbar1',this.chartData);	
						if(res.salesmen){
							res.salesmen.forEach(item=>{
								item.pre=this.today.todayFact>0 ? Number(item.value/(this.today.todayFact)*100).toFixed(2):0;
							})
							this.salemanList=res.salesmen;
						}	
					}
					
				})
				// this.$ajax('ShopMonthlyPerformance',{
				// 	shop:id,
				// 	date:`${new Date().getFullYear()}-${new Date().getMonth()+1>=10?new Date().getMonth()+1:'0'+new Date().getMonth()+1}-${new Date().getDate()>=10?new Date().getDate():'0'+new Date().getDate()}`
				// },res=>{
				// 	let day=new Date().getDate();
				// 	let pre=0;
				// 	this.today={
				// 		todayFact:res[`aday${day}`]?Number(res[`aday${day}`]).toFixed(2):0,
				// 		todayAim:res[`day${day}`]?Number(res[`day${day}`]).toFixed(2):0,
				// 		todayPre:res[`day${day}`]?Number(res[`aday${day}`]/res[`day${day}`]).toFixed(2):0
				// 	}
				// 	pre=res[`day${day}`]?(this.today.todayFact/res[`day${day}`]).toFixed(2):0
				// 	this.chartData.series=[
				// 		{
				// 			name:'门店日占比',
				// 			data:pre,
				// 			color: '#2fc25b'

				// 		}
				// 	]
				// 	this.showArcbar('canvasArcbar1',this.chartData);
					

				// })
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			/*查看单个店员的绩效*/
			checkItem(item){
				let obj={
					saleID:item.id,
					shopID:this.shopID,
					money:item.value,
					year:this.timeObj.year,
					month:this.timeObj.month,
					day:this.timeObj.day,
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
						name:Math.round(chartData.series[0].data*100)+'%',
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
							type:'default',
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
			this._initChart()
			if(param){
				this.shopID=param.shopID;
				this.managerID=param.managerID;
				this.timeObj={
					year:param.year,
					month:Number(param.month)>9?param.month:'0'+param.month,
					day:Number(param.day)>9?param.day:'0'+param.day
				}
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
	.rank-container{
		.nav{
			height:37px;
			line-height:37px;

		}	
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
</style>
