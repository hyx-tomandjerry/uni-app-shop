<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-color-perform">
			<block slot="left">
				<view class="cuIcon-back font-size-back font-weight-bold text-white" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold text-white">{{new Date().getMonth()+1}}.{{new Date().getDate()}}日门店绩效审核</view>
			</block>
		</cu-custom>
		<uChartModel  :todayNum="totalPerform" :aimNum="Number(salemanPerform.expect).toFixed(2)" :type="'today'">
			<block slot="canvas">
				<view class="qiun-charts3">
					 <canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
				</view>
			</block>
		</uChartModel>
		<view class="rank-container bg-white">
			<view class="nav flex justify-around borderBottom">
				<view class="flex-1 text-center">头像</view>
				<view class="flex-1 text-center">昵称</view>
				<view class="flex-1 text-center">销售额</view>
				<view class="flex-1 text-center">占比</view>
				<view class="flex-1 text-center" v-if="userInfo.id==managerID&&todayFact==0">编辑</view>
			</view>
			<view class="rank-list">
				<view class="rank-list-item flex justify-around" v-for="(item,index) in salemanList" :key="index" >
					<view class="flex-1 text-center">
						<!-- <image src="../../../../../static/img/work/statistics/first.png" class="ring-img"> </image> -->
						<image :src="item.afield?item.afield:'../../../../../static/img/cute.jpg'" class="ring-img"></image>
					</view>
					<view class="flex-1 text-center">
						
						<text style="margin-left:9px;">{{item.field || ''}}</text>
					</view>
					<view class="num flex-1 text-center">{{item.actual || 0}}</view>
					<view class="precent flex-1 text-center">{{item.pre || 0}}%</view>
					<view @click="checkItem(item)" style="color:#42B0ED;" class="flex-1 text-center" v-if="userInfo.id==managerID&&todayFact==0">编辑</view>
				</view>
			</view>

		</view>
		
		<button class="btn-container position_absolute" @click="confirmPerform" v-if="userInfo.id==managerID" :disabled="todayFact!=0">确定</button>
	</view>
</template>

<script>
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	import uChartModel from '../../../../../components/uchart-model.vue'
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				todayFact:'',//判断今日是否审核过
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
				totalPerform:'',//总的绩效之和
			}
		},
		components: {
			uChartModel
		},
		methods: {
			//确认今天绩效
			confirmPerform(){
				this.$ajax('ConfirmShopDailyPerformance',{
					shop:this.shopID,
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					day:new Date().getDate()
				},res=>{
					uni.showToast({
						title:'确认绩效成功',
						icon:'none',
						success: () => {
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},800)
						}
					})
					
				})
			},
			/*获得今日绩效信息*/
			getShopPerformByDay(id){
				this.$ajax('ShopDailyPerformance',{
					shop:id,
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					day:new Date().getDate()
				},res=>{
					this.todayFact=res['actual']
				
					this.salemanPerform=res;
					this.chartData.series=[
						{
							name:'门店日占比',
							data:res.expect?(res.actual/res.expect).toFixed(2):0,
							color: '#2fc25b'
							
						}
					]
					this.showArcbar('canvasArcbar1',this.chartData)
					this.totalPerform=0;
					if(res.salesmen){
						res.salesmen.forEach(item=>{
							this.totalPerform+=Number(item.actual)
							
							
						})
						res.salesmen.forEach(item=>{
							item.pre=this.salemanPerform.expect || this.totalPerform?Number(item.actual/(this.salemanPerform.expect || this.totalPerform)*100).toFixed(2):0
						})
						this.salemanList=res.salesmen;
						
					}
				
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			/*查看单个店员的绩效*/
			checkItem(item){
				
				uni.navigateTo({
					url:'../record-money/record-money?saleID='+item.id+'&money='+item.actual+'&id='+this.shopID
				})
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
		onLoad(param){
			this.cWidth=uni.upx2px(250);
			this.cHeight=uni.upx2px(250);
			this.arcbarWidth=uni.upx2px(24);
			if(param){
				// this.getShopSaleManList(param.id)
				this.shopID=param.id;
				this.managerID=param.managetID;
				console.log(this.managerID)
				this.getShopPerformByDay(param.id)
				
			}
		},
		onShow(){
			this.getShopPerformByDay(this.shopID)
			
		}
	}
</script>

<style lang="less">
	page{
		font-family: "DINAlternate";
	}
	.qiun-charts3{
		width: 100%;
		height: 166px;
		position:relative;
	}
	.charts3{
		position:absolute;
		width: 250px;
		height: 250px;
		top:20px;
		left:25px;
	}
	.rank-container{
		.nav{
			height:37px;
			line-height:37px;

		}
		.rank-list{
			.rank-list-item{
				height:65px;
				line-height:65px;
				.ring-img{
					width: 28px;
					height: 28px;
					border-radius: 50%;
					vertical-align: middle;
				}
				.avatar{
					width: 42px;
					height: 42px;
					vertical-align: middle;
					border-radius:50%;
				}
				.num{
					font-size:14px;
					font-family:PingFangSC-Semibold;
					font-weight:600;
					color:rgba(255,72,103,1);
				}
				.precent{
					font-size:14px;
					font-family:PingFangSC-Semibold;
					font-weight:600;
					color:rgba(161,41,255,1);
				}
			}
		}
	}
	.btn-container{
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
