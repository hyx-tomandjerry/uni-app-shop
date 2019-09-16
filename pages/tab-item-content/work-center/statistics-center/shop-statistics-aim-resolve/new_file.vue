<template>
	<view>
		<!-- 门店目标分解 -->
		<cu-custom :isBack="true" bg-image="'../../../../../static/img/work/statistics/bg.png'">
			<block slot="left">
				<view class="font-size-back font-weight-bold cuIcon-back text-white" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold text-white">{{shopSaleResolve.name || ''}}绩效分解</view>
			</block>
			<block slot="right">
				<view class="switch-btn flex justify-around">
					<view class="text-white switch-btn-item" :class="{'switch-active':switchTab=='month'}" @click="switchSelect('month')">月</view>
					<view class="text-white switch-btn-item" :class="{'switch-active':switchTab=='day'}" @click="switchSelect('day')">日</view>
				</view>
			</block>
		</cu-custom>
		<!--门店目标 start-->
		<view class="shop-aim-container">
			<view v-if="switchTab=='month'">
				<view class="text-center text-white">{{shopSaleResolve.year}}年门店年目标</view>
				<view class="shop-aim">¥{{shopSaleResolve.amount || 0}}</view>
				<view class="shop-intro flex justify-between">
					<view class="intro-l flex justify-start">
						<image src="../../../../../static/icon/icon-time@2x.png" class="intro-i"></image>
						<view>
							<view class="shop-date" v-if="shopSaleResolve.shopBgndate">{{shopSaleResolve.shopBgndate | formatTime('YMD')}}</view>
							<view class="shop-date" v-else>时间未知</view>
							<view class="font-size-mini" style="color:#7C81A3">开业日期</view>
						</view>
					</view>
					<view class="intro-r flex justify-start">
						<image src="../../../../../static/icon/icon-time@2x.png" class="intro-i"></image>
						<view>
							<view class="shop-date">{{shopSaleResolve.bgndate|formatTime('YMD')}}~{{shopSaleResolve.duedate|formatTime('MD')}}</view>
							<view class="font-size-mini" style="color:#7C81A3">目标起止日期</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="switchTab=='day'">
				<view class="text-center text-white"><text class="cuIcon-back"></text>2019年1月目标<text class="cuIcon-right"></text></view>
				<view class="shop-aim">¥ 62,025,00</view>
				<view class="shop-intro flex justify-between align-center">
					<view class="text-white" style="width:20%;">1月占比</view>
					<view class="cu-progress round sm striped active" style="margin:0 5px;">

						<view class="bg-color-purple" style="width:60%"></view>
					</view>
					<view class="font-family-num font-size-middle  font-weight-bold color-purple">60%</view>
				</view>
			</view>
		</view>
		<!--门店目标 end-->
		<!--月销售额趋势 start-->
		<scroll-view scroll-x="true" class="trend-container margin-bottom-normal">
			<view v-if="switchTab=='month'">
				<view class="font-size-big font-weight-bold color-normal" style="margin-bottom:15px;">月销售额趋势</view>
				<text class="color-regular font-size-mini" style="margin-left:8px;">(单位:元)</text>
				<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix" @touchend="touchEndMix"></canvas>
			</view>
			<view v-if="switchTab=='day'">
				<view class="font-size-big font-weight-bold color-normal flex justify-start" style="margin-bottom:15px;">
					<view v-for="(item,index) in weekList" :key="index" style="margin-right:39px;"
						@click="selectWeek(item)" :class="{'week-active':weekTabCur==item.id}"
					>{{item.name}}</view>
				</view>
				<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll=true @touchstart="touchMix" @touchmove="moveMix" @touchend="touchEndMix"></canvas>
			</view>
		</scroll-view>
		<!--月销售额趋势 end-->
		<!--月份列表 start-->
		<view class="month-list-container">
			<view v-if="switchTab=='month'">
				<view class="month-list-item flex justify-between"
					  :class="{'edit-active':item.id==monthTabID}"
					  v-for="(item,index) in numList" :key="index" @click="editAim(item)">
					<view class="mon-t" >{{item.name}}</view>
					<view class="mon-n">
						<view class="flex justify-between">
							<view>月占比{{item.pre}}%</view>
							<view class="font-size-number number-color font-weight-bold">
								<text style="margin-right:8px;">¥{{item.mon}}</text>
								<text class="cuIcon-write" style="color:#7C81A3;" ></text>
								<!-- <text class="cuIcon-right" style="color:#7C81A3;" v-if="item.mon>1"></text> -->
							</view>
						</view>
						<view class="cu-progress round sm striped active" >
							<view class="bg-color-red" :style="[{'width':`${item.pre}%`}]"></view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="switchTab=='day'">
				<view class="month-list-item flex justify-between"
					  :class="{'edit-active':item.id==monthTabID}"
					  v-for="(item,index) in dayList" :key="index" @click="editAim(item)">
					<view>
						<image :src="item.img" style="width:37px;height:37px;border-radius: 50%;"></image>
					</view>
					<view class="mon-n">
						<view class="flex justify-between">
							<view>{{item.name}}</view>
							<view class="font-size-number number-color font-weight-bold">
								<text style="margin-right:8px;">¥{{item.mon}}</text>
								<text class="cuIcon-right" style="color:#7C81A3;"></text>
							</view>
						</view>
						<view class="cu-progress round sm striped active" >
							<!-- <view class="bg-color-red" :style="[{'width':item.pre}]"></view> -->
							<view class="bg-color-purple" style="width:60%"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--月份列表 end-->
		<!--弹出框-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class=" bg-white justify-end" >
					<view class="content" style="padding:25px 23px 19px 23px;text-align:left;">{{monthTabCur.name}}目标金额</view>
				</view>

				<view class=" bg-white borderBottom " >
					<view class="flex justify-between" style="padding: 3px 23px 14px 24px;">
						<view class="flex justify-start align-center">
							<view style="width:30%;font-size:15px;color:#2A2A2A">金额 <text class="number-color font-weight-bold">￥</text></view>
							<input type="number" placeholder="请输入金额" style="text-align:left;"
								   :class="{
								   	'number-color':num,
								   	'color-regular':!num,
								   	'font-size-normal':!num,
								   	'font-size-big':num,
								   	'font-weight-bold':num
								   	}" v-model="num">
						</view>
						<image src="../../../../../static/icon/icon-bianji.png" style="width:16px;height:19px;"></image>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="flex:1" @click="hideModal()">取消</view>
						<view style="flex:1" @click="setShopAim" class="color-blue">确定</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-container">
			<view class="submit-btn" @click="confirmShopAim">确定</view>
		</view>
	</view>
</template>
<script>
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	var canvaMix=null;
	export default{
		data(){
			return{
				switchTab:'month',//判断年/日
				//曲线图
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				chartData: {
					"categories": ["1月", "2月", "3月", "4月", "5月", "6月","7月","8月","9月", "10月","11月","12月"],
					"series": []
				},
				numList:[
					{name:'1月',mon:0,id:1,value:"month1",pre:0},
					{name:'2月',mon:0,id:2,value:"month2",pre:0},
					{name:'3月',mon:0,id:3,value:"month3",pre:0},
					{name:'4月',mon:0,id:4,value:"month4",pre:0},
					{name:'5月',mon:0,id:5,value:"month5",pre:0},
					{name:'6月',mon:0,id:6,value:"month6",pre:0},
					{name:'7月',mon:0,id:7,value:"month7",pre:0},
					{name:'8月',mon:0,id:8,value:"month8",pre:0},
					{name:'9月',mon:0,id:9,value:"month9",pre:0},
					{name:'10月',mon:0,id:10,value:"month10",pre:0},
					{name:'11月',mon:0,id:11,value:"month11",pre:0},
					{name:'12月',mon:0,id:12,value:"month12",pre:0},
				],
				modalName:'',
				monthTabCur:'',
				monthTabID:'',
				num:'',
				weekList:[
					{id:1,name:'第一周'},
					{id:2,name:'第二周'},
					{id:3,name:'第三周'},
					{id:4,name:'第四周'},
				],
				weekTabCur:1,
				dayList:[
					{img:'../../../../../static/img/work/statistics/day.png',name:'周一(08-01) 32%',mon:'¥2,1001.00'},
					{img:'../../../../../static/img/work/statistics/day.png',name:'周一(08-01) 32%',mon:'¥2,1001.00'},
					{img:'../../../../../static/img/work/statistics/day.png',name:'周一(08-01) 32%',mon:'¥2,1001.00'},
					{img:'../../../../../static/img/work/statistics/day.png',name:'周一(08-01) 32%',mon:'¥2,1001.00'},
					{img:'../../../../../static/img/work/statistics/day.png',name:'周一(08-01) 32%',mon:'¥2,1001.00'},
					{img:'../../../../../static/img/work/statistics/day.png',name:'周一(08-01) 32%',mon:'¥2,1001.00'},
					{img:'../../../../../static/img/work/statistics/day.png',name:'周一(08-01) 32%',mon:'¥2,1001.00'},
					{img:'../../../../../static/img/work/statistics/day.png',name:'周一(08-01) 32%',mon:'¥2,1001.00'},

				],
				shopID:'',//门店id
				shopSaleResolve:'',
				maxNum:'',//最大值
			}
		},
		components:{

		},
		methods:{
			/*确认门店绩效*/
			confirmShopAim(){
				let current=new Date();
				this.$ajax('NewMonthlyPerformance',{
					year:current.getFullYear(),
					shop:this.shopID,
					month1:this.numList[0].mon,
					month2:this.numList[1].mon,
					month3:this.numList[2].mon,
					month4:this.numList[3].mon,
					month5:this.numList[4].mon,
					month6:this.numList[5].mon,
					month7:this.numList[6].mon,
					month8:this.numList[7].mon,
					month9:this.numList[8].mon,
					month10:this.numList[9].mon,
					month11:this.numList[10].mon,
					month12:this.numList[11].mon,
					id:this.shopSaleResolve.id
				},res=>{
					uni.showToast({
						title:'设置门店绩效成功!',
						icon:'none'
					})
					this.getShopAim(this.shopID)
				})
			},
			/*获得门店绩效数据*/
			getShopAim(id){
				switch(this.switchTab){
					case 'month':
						this.$ajax('MonthlyPerformances',{
							shop:id
						},res=>{
							if(res){
							let array=[],max=-65535;
							this.shopSaleResolve=res[0];
							this.numList.forEach((item,index)=>{
								item.mon=this.shopSaleResolve[`month${index+1}`];
								array.push(item.mon);
								item.pre=(item.mon/this.shopSaleResolve.amount).toFixed(2);

							})
							this.chartData.series=[
								{
									"name": "曲面",
									"data": array,
									"type": "area",
									"style": "curve"
								}, {
									"name": "曲线",
									"data": array,
									"type": "line",
									"style": "curve",
									"color": "#1890ff"
								}
							]
							this.getServerData()
						}
						})
					break;
					case 'day':
					this.getShopAimByMonth(id,new Date().getFullYear(),new Date().getMonth()+1);
					break;
				}

			},
			/*根据月份获得绩效*/
			getShopAimByMonth(shopID,year,month){
				this.$ajax('DailyPerformances',{
					shop:shopID,
					year:year,
					month:month
				},res=>{
					console.log(res)
				})
			},
			/*设置或者修改金额*/
			setShopAim(){
				let min=(this.monthTabCur.mon-this.num).toFixed(2);
				this.numList[this.numList.length-1].mon=Number(this.numList[this.numList.length-1].mon)+Number(min);
				this.numList.forEach(item=>{
					if(item.id==this.monthTabCur.id){
						item.mon=this.num;
					}
					this.hideModal()
				})
			},
			/*
				选择周
			*/
		   selectWeek(item){
			   this.weekTabCur=item.id;
		   },
			/*关闭弹出框*/
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
				this.monthTabID=null;
			},
			/*编辑门店目标*/
			editAim(item){
				this.monthTabCur=item;
				this.monthTabID=item.id;
				this.num=this.monthTabCur.mon
				setTimeout(()=>{
					this.modalName='Modal';

				},600)
			},
			/*返回上一页*/
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			/*选择年日*/
			switchSelect(type){
				this.switchTab=type;
				this.getShopAim(this.shopID)

			},
			/*获得曲线的数据*/
			getServerData(){
				this.showMix('canvasMix',this.chartData)
			},
			showMix(canvasId,chartData){
				canvaMix = new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'mix',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:1,
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
					width: this.cWidth,
					height: this.cHeight,
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
				})
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
					format:(item, category)=> {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		},
		onLoad(params){
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
			if(params.id){
				this.shopID=params.id;
				this.getShopAim(params.id)
			}
		},
		onShow(){
			this.getShopAim(this.shopID)
		}
	}
</script>
<style lang="less" scoped>
	.switch-btn{
		width:60px;
		height: 24px;
		line-height:13px;
		background:rgba(66,74,119,1);
		border-radius:12px;
		padding:2px 4px;
		/*background-color: pink;*/
		.switch-btn-item{
			padding: 3px 6px;
			transition:all 1s;
			color: #2a2a2a;
		}
	}
	.switch-active{
		background:rgba(58,66,107,1);
		border-radius:11px;
		color:white !important;
		font-weight:600;

	}

	/*门店目标 start*/
	.shop-aim-container{
		height: 200px;
		background:url("../../../../../static/img/work/statistics/bg.png") no-repeat;
		padding:30px  15px 23px 36px;
		.shop-aim{
			text-align:center;
			font-size:36px;
			font-weight: bold;
			font-family:DINAlternate-Bold;
			color:rgba(120,246,178,1);
			margin:3px 0 24px;
		}
		.shop-intro{

			.intro-l{
				border-right:1px solid #525A85;
				padding-right:20px;
			}
			.intro-r{
				padding-left:10px;
			}
			.intro-i{
				width: 16px;
				height: 16px;
				vertical-align: middle;
				margin-right:6px;
				margin-top:4px;
			}
			.shop-date{
				font-size:16px;
				font-family:DINAlternate-Bold;
				font-weight:bold;
				color:rgba(255,255,255,1);
			}
		}
	}
	/*门店目标 end*/

	/*销售额趋势 start*/
	.trend-container{
		padding:23px 15px 27px;
		background:#fff;
	}
	/*销售额趋势 end*/
	/*月份列表 start*/
	.month-list-container{
		padding:29px 0;
		background-color: #fff;
		.month-list-item{
			padding: 4px 17px 4px 15px;
			margin-bottom:32px;

			.mon-t{
				width: 38px;
				height: 38px;
				border-radius:50%;
				line-height:38px;
				text-align: center;
				color:#fff;
				background:rgba(66,176,237,1);
			}
			.mon-n{
				flex:1;
				margin-left:15px;
			}
		}
	}
	/*月份列表 end*/
	.edit-active{
		/*transform:translateY(-20px);*/
		box-shadow:0 15px 30px rgba(0,0,0,0.5)
	}
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.cu-dialog{
		width: 263px;
	}
	.week-active{
		border-bottom:3px solid rgba(66,176,237,1);
	}
	.btn-container{
		width:100%;
		padding:0 15px;
		.submit-btn{
			text-align: center;
			height:40px;
			line-height:40px;
			color:#fff;
			background:rgba(66,176,237,1);
			border-radius:5px;
			font-size:17px;
		}
	}
</style>