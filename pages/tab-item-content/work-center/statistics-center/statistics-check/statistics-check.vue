<template>
	<view>
		<uChartModel  :todayNum="today.todayFact" :aimNum="today.todayAim" >
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
			<scroll-view class="rank-list" scroll-y="true" :style="{height:contentHeight+'px'}" scroll-top="10" show-scrollbar="true">
				<block v-for="(item,index) in salemanList" :key="index">
					<sale-check-item
					:managerID="managerID"
					:item="item"
					 :index="index" @checkItem="checkItem"></sale-check-item>
				</block>
			</scroll-view>

		</view>
	
		<common-btn-one
				 	content="提交当天绩效"
				 	type="primary"
				 	@operateBtn="submitSale" :isPos="true"></common-btn-one>
	</view>
</template>

<script>
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	import uChartModel from '../../../../../components/statistics/sale-check/uchart-model.vue'
	import saleCheckItem from '../../../../../components/statistics/sale-check-item.vue'
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
			commonBtnOne
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
						data:this.today.todayPre,
						color: '#2fc25b'
										
					}
				]
				this.showArcbar('canvasArcbar1',this.chartData);		

			},
			/*查看单个店员的绩效*/
			checkItem(item){
				let obj={
					saleID:item.id,
					shopID:this.shopID,
					money:item.fvalue,
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
