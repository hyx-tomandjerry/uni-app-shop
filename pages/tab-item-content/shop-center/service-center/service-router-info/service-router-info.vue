<template>
	<view class="borderTop position_relative" :style="{height:screenHeight+'px'}">
		<view class="cpe-container-top">
			<view class="flex align-center bg-white">
				<view class="service-tag"></view>
				<view class="color-normal">{{serviceItem.status | serviceStatusZnPipe}}</view>
			</view>
			<view class="qiun-charts" >
				<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
			</view>
			<view class="cpe-container bg-white margin-bottom-normal">
				<view class="container-top">
				
					<view class="font-size-big font-weight-bold">
						<view class="flex align-center justify-between trafic-first">
							<view><text class="margin-right-mini">套餐总量</text>{{trafficCount.Quota }}GB</view>
							<view><text class="margin-right-mini">剩余流量</text>{{trafficCount.Alert }}GB</view>
						</view>
						<view class="flex align-center justify-between trafic-first">
							<view><text class="margin-right-mini">本月使用</text>{{trafficCount.Month}}GB</view>
							<view><text class="margin-right-mini">今日使用</text>{{trafficCount.Today}}GB</view>
						</view>
					</view>
					<view class="flex align-center" style="flex-direction: column;">
						<view class="bg-blue flex align-center charge-button" @tap="trafficChange">
							<image src="../../../../../static/img/shop/service/charge.png" mode="widthFix" class="charge-img"></image>
							<text>流量充值</text>
							<text class="cuIcon-right"></text>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		<router-info-cpe :serviceItem="serviceItem"/>
		
			
		<view class="cu-modal drawer-modal justify-end" :class="isShowModel?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg"  :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in topRightList" :key="index" @tap.stop="operateItem(item.value)">
						<view class="content flex">
							<image :src="item.img" mode="widthFix" class="operate-img "></image>
							<view>{{item.name}}</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		
	
	</view>
</template>

<script>
	import topRightPupop from '../../../../../components/shop/top-right-pupop.vue'
	import commonFlex from '../../../../../components/common/common-flex.vue'
	import normalDetailItem from '../../../../../components/common/normal-detail-item.vue'
	import CommonTitleIntro from '../../../../../components/common/common-title-intro.vue'
	import RouterInfoCpe from './childComponent/router-info-cpe.vue'
	import {mapState} from 'vuex'
	import uCharts from '../../../../../components/u-charts/u-charts.js'
	let canvaGauge = null;
	import {RouterApi,
			PauseRouterApi,
			ChainShopApi,
			SimTrafficApi,
			CertifyUrlApi,
			ResetRouterApi,
			RebootRoutersApi,ServiceSubscriptionApi} from '../../../../../api/shop_api.js'
	
	export default {
		components:{commonFlex,topRightPupop,normalDetailItem,CommonTitleIntro,RouterInfoCpe},
		data() {
			return {
				topRightList:[
					// {name:'停机',value:'stop',img:'../../../../../static/img/shop/clerk/icon_stop.png'},
					{name:'解绑',value:'unbind',img:'../../../../../static/img/shop/clerk/icon_unbind.png'},
					{name:'重启',value:'restart',img:'../../../../../static/img/shop/service/restart.png'},
					{name:'设置预警',value:'warn',img:'../../../../../static/img/shop/service/warn.png'},
					{name:'恢复出厂设置',value:'return',img:'../../../../../static/img/shop/service/return.png'},
					{name:'设置WIFI',value:'set',img:'../../../../../static/img/shop/service/set.png'},
					{name:'实名认证',value:'authority',img:'../../../../../static/img/shop/clerk/icon_author.png'},
					// {name:'更换设备',icon:'cuIcon-repair',value:'change',color:'color-purple'},
				],
				url:'http://iotapp.iot.189.cn:9090/uapp/certifhtml/certif_entry.html',
				isShowModel:false,
				statusHeight:44,
				screenHeight:500,
				serviceItem:{},
				shopItem:{},
				trafficCount:{},
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				gaugeWidth:12,
				time:null,
				warnCount:0,
				chartData: {
					categories: [{
						value: 0.2,
						color: '#2fc25b'
					}, {
						value: 0.8,
						color: '#42B0ED'
					}, {
						value: 1,
						color: '#ED2323'
					}],
					series: [{
						
					}]
				}
			}
		},
		computed:{
			...mapState(['userInfo']),
			getTime(){
				let arr=[]
				if(this.time){
					if(this.time.min){
						arr.push(`${this.time.min}秒`) 
					}
					if(this.time.sec){
						arr.unshift(`${this.time.sec}分钟`)
					
					}
					if(this.time.hour){
						arr.unshift(`${this.time.hour}小时`)
					}
					if(this.time.days){
						arr.unshift(`${this.time.days}天`)
							
					}
					if(this.time.months){
						arr.unshift(`${this.time.months}月`)
							
					}
					if(this.time.years){
						arr.unshift(`${this.time.years}年`)
							
					}
					let str=arr.join('')
					return str;
				}
				
			}
		},
		onNavigationBarButtonTap(event){
			if(event.index==0 && this.shopItem.manager==this.userInfo.id){
				this.isShowModel = !this.isShowModel
			}else{
				return;
			}
		},
		methods: {
			//获得公司流量的单价
			async getPriceInfo(){
				
			},
			async trafficChange(){
				let result =await ServiceSubscriptionApi();
				if(result.uprice!=0){
					uni.navigateTo({
						url:"../traffic-charge/traffic-charge?seq="+this.serviceItem.seq+'&shop='+this.shopItem.id+'&price='+result.uprice
					})
				}else{
					uni.showToast({
						title:'您还未开通数据服务，不能进行充值操作!',
						icon:'none'
					})
				}
				
			},
			hideModal(){
				this.isShowModel=false;
			},
			async operateItem(item){
				this.hideModal();
				switch(item){
					case 'authority':
					let result = await CertifyUrlApi()
					plus.runtime.openURL(result,(res)=>{
				
					})
					break;
					case 'restart':
					//重启
					uni.showModal({
						title:'重启',
						content:'点击确定后设备将重新启动，是否确认重启设备？',
						cancelColor:'#42B0ED',
						confirmText:"确定重启",
						success: (res) => {
							if(res.confirm){
								this.RebootRoutersFun(this.serviceItem.seq)
							}
						}
					})
					break;
					case 'unbind':
					uni.showModal({
						title:'CPE解绑',
						content:'设备将与该门店解除绑定，是否确认解绑?',
						cancelColor:'#42B0ED',
						success: (res) => {
							if(res.confirm){
								this.unbindService(0)
							}
						}
					})
					
					break;
					// case 'stop':
					// uni.showModal({
					// 	title:'SIM卡停机保号提示',
					// 	content:'点击确定后，该CPE将从门店中移除至已停机列表中，同时SIM也将停机,SIM卡流量清零',
					// 	confirmText:'确定停机',
					// 	cancelColor:'#42B0ED',
					// 	success: (res) => {
					// 		if(res.confirm){
					// 			this.unbindService(1)
					// 		}
					// 	}
					// })
					// break;
					case 'change':
					uni.navigateTo({
						url:"../../service-bind/service-bind?type="+item+"&seq="+this.serviceItem.seq
					})
					break;
					case 'warn':
					//设置预警
					uni.navigateTo({
						url:"../cpe-set-warning/cpe-set-warning?shop="+this.shopItem.id+'&seq='+this.serviceItem.seq
					});
					break;
					case 'return':
					//回复出厂设置
					uni.showModal({
						title:'恢复出厂设置',
						content:'点击确定后设备将重启且恢复出厂设置，此操作无法撤销，是否确认恢复出厂设置？?',
						cancelColor:'#42B0ED',
						success: (res) => {
							if(res.confirm){
								this.ResetRouterFun(this.serviceItem.seq)
							}
						}
					});
					break;
					case 'set':
					//设置ssid
					uni.navigateTo({
						url:'../set-SSID/set-SSID?shop='+this.shopItem.id+"&seq="+this.serviceItem.seq
					})
				}
			},
			async unbindService(skp){
				if(await PauseRouterApi(this.serviceItem.id,skp)){
					this.$utils.showToast(skp==1?'设备停机':'设备解绑成功');
					this.$utils.goBack();
					this.$utils.hide()
				}
			},
			// 重启路由器
			async RebootRoutersFun(seq){
				if(await RebootRoutersApi(seq)){
					this.$utils.showToast('CPE已重启');
					setTimeout(()=>{
						this.$utils.hide()
					},1000)
				}
			},
			// 回复出厂设置
			async ResetRouterFun(seq){
				if(await ResetRouterApi(seq)){
					this.$utils.showToast('CPE已恢复出厂设置');
					setTimeout(()=>{
						this.$utils.hide()
					},1000)
				}
			},
			getSystem(){
				uni.getSystemInfo({
					success:(res)=>{
						this.statusHeight=res.statusBarHeight + uni.upx2px(50);
						this.screenHeight=res.windowHeight;
					}
				})
			},
			async getShopInfo(id){
				this.shopItem= await ChainShopApi(id)
			},
			async getServiceInfo(seq){
				/*
					Quota: 套餐内流量
					Month: 本月流量
					Today: 当天流量
					Alert: 流量预警值
				*/
				this.serviceItem = await RouterApi(seq)
				this.time= this.$timer.timeDiffer(this.formatTime(this.serviceItem.buyDate,'YMDHMS'),this.formatTime(new Date(),'YMDHMS'))
				this.trafficCount = await SimTrafficApi(this.serviceItem.sim);
				this.warnCount=this.trafficCount ? Number(this.trafficCount.Alert).toFixed(2):0
				// let used = this.trafficCount  ?Number((this.trafficCount.Quota - this.trafficCount.Alert)/1024).toFixed(2):0;
				// let precent =this.trafficCount ? used / (this.trafficCount.Quota/1024 || 1):0;
				let precent = this.trafficCount.Quota ? (this.trafficCount.Alert / this.trafficCount.Quota):0;
				this.chartData.series=[{
					name: '剩余',
					data: precent
				}]
				this.showGauge("canvasGauge",this.chartData);
			},
			showGauge(canvasId,chartData){
				canvaGauge = new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'gauge',
					fontSize:11,
					legend:false,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: chartData.categories[1].color,
						fontSize: 25*this.pixelRatio,
						offsetY:50*this.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15*this.pixelRatio,
						offsetY:-50*this.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					extra: {
						gauge:{
							type:'default',
							width: this.gaugeWidth*this.pixelRatio,//仪表盘背景的宽度
							startAngle:0.75,
							endAngle:0.25,
							startNumber:0,
							endNumber:30,
							splitLine:{
								fixRadius:0,
								splitNumber:6,
								width: this.gaugeWidth*this.pixelRatio,//仪表盘背景的宽度
								color:'#FFFFFF',
								childNumber:5,
								childWidth:this.gaugeWidth*0.4*this.pixelRatio,//仪表盘背景的宽度
							},
							pointer:{
								width: this.gaugeWidth*0.8*this.pixelRatio,//指针宽度
								color:'auto'
							}
						}
					},
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: this.cWidth*this.pixelRatio,
					height: this.cHeight*this.pixelRatio,
					dataLabel: true,
				});
			}
		},
		onLoad(options){
			this.getSystem();
			this.getShopInfo(options.shopID)
			this.getServiceInfo(options.seq)
			
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(350);
			
		}
	}
</script>

<style scoped>
	.mask{
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		height:100%;
		width:100%;
		background:rgba(0,0,0,0.2)
	}
	.model-content{
		color:#FFFFFF;
		width:360upx;
		border-radius: 10upx;
		position:fixed;
		right:40upx;
		z-index:100000000;
		background:url('../../../../../static/img/shop/topRight_bg.png') no-repeat;
		background-size:cover;
	}
	.model-content view{
		height:100upx;
		line-height:100upx;
		padding:0upx 16upx;
		background:#707070;
		border-bottom:1upx solid #FFFFFF;
	}
	.model-content>view>text{
		margin-right:20upx;
		font-size:18px;
	}
	.symbol-img{
		width:40upx;
		height:40upx;
		flex-shrink: 0;
		margin-right:10upx;
		vertical-align: middle;
	}
	/* .top-right-container{
		background:red;
		width:180px;
		position:absolute;
		height:100px;
		z-index:10;
		top:10px;
		right:10px;
	} */
	.operate-img{
		margin-right:20upx !important;
	}
	.qiun-charts {
		width: 750upx;
		height: 350upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 350upx;
		background-color: #FFFFFF;
	}
	.container-top{
		padding:20upx 50upx;
	}
	.cpe-container{
		padding-top: 16upx;
	}
	.trafic-first{
		margin-bottom: 20upx;
	}
	.charge-img{
		width:40upx;
		height:40upx;
		margin-right: 10upx;
		flex-shrink: 0;
	}
	.charge-button{
		padding:12upx 20upx;
		border-radius: 36upx;
	}
	.service-tag{
		width:15upx;
		height:15upx;
		background:#2BDB9F;
		margin-right:20upx;
		border-radius: 100%;
	}
	.traffic-bottom-content{
		padding:0 20upx;
	}
	.cu-content{
		padding-top:20upx;
		padding-left:40upx;
	}
	.choose-img{
		width:40upx;
		height:40upx !important;
		flex-shrink: 0;
		margin-right: 20upx;
		vertical-align: middle;
	}
	.cu-content-item{
		padding:20upx 0;
	}
	.cpe-container-top>view:first-child{
		padding:10upx 20upx;
	}
	
</style>
