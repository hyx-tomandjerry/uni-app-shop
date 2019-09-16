<template>
	<view>
		<view class="tab-nav flex justify-around borderBottom bg-white">
			<view class="tab-item font-size-big"
				  :class="{
				  		'borderBottomRed text-red':navTabCurVal==item.value
				  }"
				  v-for="(item,index) in tabList" :key="index" @click="selectNav(item)">{{item.name}}</view>
		</view>
		<view class="task-container">
			<view >
				<view class="task-charts margin-bottom-normal bg-white">
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
				</view>

				<view class="task-list">
					<view class="task-list-item bg-white position_relative" @click="checkItemDetail()">
						<view class="task-item-title margin-bottom-normal font-size-big color-normal">
							上海时尚广场zara旗舰店
						</view>
						<view class="color-regular" style="margin-bottom:5px;">任务名称：门店陈列整改</view>
						<view class="color-regular" style="margin-bottom:5px;">执行人：张晓晓 </view>
						<view class="color-regular" style="margin-bottom:5px;">开始时间：2019-03-29  </view>
						<view class="color-regular" style="margin-bottom:5px;">截止时间：2019-05-29  </view>
						<view class="item-tag">已接受</view>
					</view>
					<view class="task-list-item bg-white position_relative">
						<view class="task-item-title margin-bottom-normal font-size-big color-normal">
							上海时尚广场zara旗舰店
						</view>
						<view class="color-regular" style="margin-bottom:5px;">任务名称：门店陈列整改</view>
						<view class="color-regular" style="margin-bottom:5px;">执行人：张晓晓 </view>
						<view class="color-regular" style="margin-bottom:5px;">开始时间：2019-03-29  </view>
						<view class="color-regular" style="margin-bottom:5px;">截止时间：2019-05-29  </view>
						<view class="item-tag">已接受</view>
					</view>
					<view class="task-list-item bg-white position_relative">
						<view class="task-item-title margin-bottom-normal font-size-big color-normal">
							上海时尚广场zara旗舰店
						</view>
						<view class="color-regular" style="margin-bottom:5px;">任务名称：门店陈列整改</view>
						<view class="color-regular" style="margin-bottom:5px;">执行人：张晓晓 </view>
						<view class="color-regular" style="margin-bottom:5px;">开始时间：2019-03-29  </view>
						<view class="color-regular" style="margin-bottom:5px;">截止时间：2019-05-29  </view>
						<view class="item-tag">已接受</view>
					</view>
					<view class="task-list-item bg-white position_relative">
						<view class="task-item-title margin-bottom-normal font-size-big color-normal">
							上海时尚广场zara旗舰店
						</view>
						<view class="color-regular" style="margin-bottom:5px;">任务名称：门店陈列整改</view>
						<view class="color-regular" style="margin-bottom:5px;">执行人：张晓晓 </view>
						<view class="color-regular" style="margin-bottom:5px;">开始时间：2019-03-29  </view>
						<view class="color-regular" style="margin-bottom:5px;">截止时间：2019-05-29  </view>
						<view class="item-tag">已接受</view>
					</view>
					<view class="task-list-item bg-white position_relative">
						<view class="task-item-title margin-bottom-normal font-size-big color-normal">
							上海时尚广场zara旗舰店
						</view>
						<view class="color-regular" style="margin-bottom:5px;">任务名称：门店陈列整改</view>
						<view class="color-regular" style="margin-bottom:5px;">执行人：张晓晓 </view>
						<view class="color-regular" style="margin-bottom:5px;">开始时间：2019-03-29  </view>
						<view class="color-regular" style="margin-bottom:5px;">截止时间：2019-05-29  </view>
						<view class="item-tag">已接受</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	var canvasRing=null;
	export default {
		data() {
			return {
				tabList:[
					{id:1,name:'我的任务',value:'my'},
					{id:2,name:'全部任务',value:'all'},
				],
				navTabCurVal:'my',
				/*圆弧*/
				chartData: {
					"series": [{
						"name": "进行中",
						"data": 50
					}, {
						"name": "已超期",
						"data": 30
					}, {
						"name": "已完成",
						"data": 20
					}]
				},
				cWidth:'',
				cHeight:'',
				pixelRatio:1,

			}
		},
		methods: {
			/*查看单个任务详情*/
			checkItemDetail(){
				uni.navigateTo({
					url:"../task-item-detail/task-item-detail"
				})
			},
			/*选择nav*/
			selectNav(item){
				console.log(item);
				this.navTabCurVal=item.value;
			},
			touchRing(e){
				canvaRing.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data
					}
				});
			},
			getServerData(){
				this.showRing('canvasRing',this.chartData);
			},
			showRing(canvasId,chartData){
				canvasRing=new uCharts({
					$this:this,
					canvasId:canvasId,
					type:'ring',
					fontSize:10,
					legend:{
						position:'right',
						show:true,
						fontSize:16*this.pixelRatio,
						lineHeight:25,
						fontColor:'#898888',
					},

					extra: {
						pie: {
							offsetAngle: -45,
							// ringWidth: 40*this.pixelRatio,
							labelWidth:10
						}
					},
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					series: chartData.series,
					animation: true,
					width: this.cWidth*this.pixelRatio,
					height: this.cHeight*this.pixelRatio,
					disablePieStroke: false,
					dataLabel: false,
					dataPointShape:false
				})
			}
		},
		onLoad(){
			this.cWidth=uni.upx2px(500);
			this.cHeight=uni.upx2px(400);
			this.getServerData()
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F7F7F7;
	}
	.tab-nav{
		.tab-item{
			padding:8px 15px;
		}
	}
	.task-list{
		.task-list-item{
			margin:0 13px 14px;
			padding-top:15px;
			padding-left:19px;
			padding-bottom:14px;
			border-radius:4px;
			.item-tag{
				width:90px;height:33px;line-height:33px;text-align: center;background:rgba(180,226,254,1);
				border-radius:17px 0px 0px 17px;position:absolute;top:50%;right:0;transform:translateY(-50%);font-size:15px;color:#0A5B9D
			}
		}
	}
	.charts{width: 500upx; height:400upx;background-color: #FFFFFF;margin:0 auto;}
</style>
