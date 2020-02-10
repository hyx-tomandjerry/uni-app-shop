<template>
	<view class="borderTop charge-container bg-white" :style="{height:screenHeight+'px'}">
		<view class="seq-info">
			<view class="font-size-big color-normal " >充值序列号</view>
			<view class="font-size-back color-regular">{{seq}}</view>
		</view>
		<view class="flex justify-around flex-wrap">
			<block v-for="(item,index) in trafficList" :key="index">
				<view class="charge-item flex-litter" @tap="trafficOperate(item)" 
					:class="[trafficTab==item.id?'img_active':'img_normal']">
					<view class="font-size-bigger " :class="[trafficTab==item.id?'color-blue':'color_noActive']">{{item.name}}</view>
					<view class="font-size-litter" :class="[trafficTab==item.id?'color-blue':'color_noActive']">4元/GB</view>
				</view>
			</block>
		</view>
		<view class="traffic-bottom flex borderTop bg-white">
			<view class="flex-1  font-size-big color-normal">金额总计 : <text class="color-blue font-weight-bold">{{trafficCount * 4}}元</text></view>
			<view class="charge-btn">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seq:'',
				trafficList:[
					{name:'30GB',id:1,num:30},
					{name:'60GB',id:2,num:60},
					{name:'90GB',id:3,num:90},
					{name:'120GB',id:4,num:120},
					{name:'150GB',id:5,num:150},
					{name:'180GB',id:6,num:180},
				],
				trafficTab:1,
				trafficCount:30,
				screenHeight:400
			}
		},
		methods: {
			trafficOperate(item){
				this.trafficTab = item.id;
				this.trafficCount= item.num;
			},
			getSystem(){
				uni.getSystemInfo({
					success: (res) => {
						this.screenHeight = res.windowHeight;
					}
				})
			}
		},
		onLoad(options){
			this.seq=options.seq;
			this.getSystem()
			
		}
	}
</script>

<style scoped>
.charge-container{
	padding:48upx 40upx;
}
.seq-info{
	margin-bottom:30upx;
}
.seq-info>view:first-child{
	margin-bottom: 16upx;
}
.input-style{
	border:1px solid #EEEEED;
	background:rgba(0,0,0,0.1);
	border-radius:10upx;
	padding:0upx 20upx;
	height:80upx;
	line-height:80upx;
}
.charge-item{
	text-align: center;
	padding:6upx 0upx 40upx;
	margin:10upx;

}
.img_active{
	background:url('../../../../../static/img/shop/service/charge_active.png') no-repeat ;
		background-size:contain;
}
.img_normal{
	background:url('../../../../../static/img/shop/service/charge_normal.png') no-repeat;
	background-size:contain;
}
.traffic-bottom{
	height:120upx;
	line-height:120upx;
	position:fixed;
	bottom:0;
	right:0;
	left:0;
}
.traffic-bottom>view:first-child{
	padding-left:40upx;
}
.traffic-bottom>view:first-child strong{
	margin-left: 10upx;
}
.color_noActive{
	color:rgba(66,176,237,0.5)
}
.charge-btn{
	width:300upx;
	background:rgba(66,176,237,1);
	color:#FFFFFF;
	font-size:20px;
	text-align: center;
}
</style>
