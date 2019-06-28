<template>
	<view>
		<view class="flex text-center bg-white nav">
			<view class="cu-item flex-sub" :class="TabCur==item.id?'text-orange cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect(item)" :data-id="item.id">
				{{item.name}}
			</view>
		</view>
		<scroll-view scroll-y style="height:550px;">
			
			<view v-if="TabCur==0">
				<view class="express-content" 
				@click="checkExpressItem(item,'express')"
				v-for="(item,index) in expressList" :key="index">
					<view  class="flex justify-between express-item" >
						<view class="express-tag">
							<image :src="item.catalogImg" class="img"></image>
							<text style="font-size:13px;"
								:class="{'text-purple':item.express==1,
											'text-orange':item.express==2
										}"
							>{{item.express==1?'速递订单':'物流订单'}}</text>
						</view>
					</view>
					<view class="express-container">
						<view class="text-gray" style="margin-bottom:8px;"> 
							<text class="text-blue goods-name" >{{item.name}}</text>
						</view>
						<view class="text-gray flex justify-start" style="margin-bottom:8px;">
							<text  class="express-tag bg-blue">寄</text> 
							<text class="text-black shop-name" >{{item.fromshopName}}</text>
							<view>
								(<text>{{userInfo.name}}</text><text>|</text><text>{{userInfo.account}}</text>)
							</view>
						</view>
						<view class="text-gray flex justify-start" style="margin-bottom:8px;">
								<text class="express-tag bg-orange">收</text>
								<view v-if="item.type==1" class="flex justify-start">
									<!-- 门店 -->
									<text class="text-black shop-name">{{item.toshopName}}</text>
									<view v-if="item.receiverName && item.receiverMobile">
										(<text>{{item.receiverName}}</text><text>|</text><text>{{item.receiverMobile}}</text>)
									</view>
								</view>
								<view v-if="item.type==2">
									<!-- 消费者 -->
									<text class="text-black shop-name">{{item.contactor}}</text>
									<text style="margin:0 5px;">|</text><text class="text-black">{{item.telephone}}</text>
								</view>
						</view>
						<view class="text-gray" v-if="item.status==1">预约上门时间 : <text class="text-red" style="font-size:13px;margin-left:5px;">{{item.appointdate}}</text></view>
					</view>
					<text class="cu-tag" style="position:absolute;right:10px;top:0px;" :class="{
						'bg-green':item.status==expressStatus.sign,
						'bg-orange':item.status==expressStatus.unSign,
						'bg-blue':item.status==expressStatus.finish,
						}">{{item.status | expressStatusPipe}}</text>
				</view>
			</view>
			<view v-if="TabCur==1">
				<view v-for="(item,index) in expressList" :key="index" class="distribute-item" @click="checkExpressItem(item,'distribute')">
					<view style="padding:5px 0 10px 0;"> 
						<text class="text-blue goods-name">{{item.name}}</text>
					</view>
					
					<view class="text-gray" style="margin-bottom:10px;">
							<text class="express-tag bg-blue">出</text>
							<text class="text-black shop-name">{{item.fromshopName}}</text>
					</view>
					<view class="text-gray flex justify-start" style="margin-bottom:10px;">
						<view><text class="express-tag bg-orange">入</text></view>
						<view class="flex justify-start">
							<text class="text-black shop-name">{{item.toshopName}}</text>
							<view style="font-size:12px;">
								(<text style="margin-left:5px;">{{userInfo.name}}</text><text style="margin:0px 5px;">|</text><text style="margin-right:5px;">{{userInfo.account}}</text>)
							</view>
						</view>
					</view>
					
					<text class="cu-tag" style="position:absolute;right:10px;top:0px;" :class="{
							'bg-green':item.status==distributeStatus.finish,
							'bg-orange':item.status==distributeStatus.unDeal,
							}">{{item.status | distributeStatusPipe}}</text>
						<!-- <view style="border-top:1px solid #EEEEED;text-align: right;padding-top:10px;" v-if="item.status==distributeStatus.unDeal">
							<text class="cu-tag line-blue" @click="transForExpress(item.id)">转为速递订单</text>
							<text class="cu-tag line-blue" @click="transForLogistic(item.id)">转为物流订单</text>
						</view> -->
				</view>
			</view>
			<view v-if="TabCur==2">
				<view v-for="(item,index) in expressList" :key="index" class="distribute-item" @click="checkExpressItem(item,'distribute')">
					<view style="padding:5px 0 10px 0;"> 
						<text class="text-blue goods-name" >{{item.name}}</text>
					</view>
					
					<view class="text-gray" style="margin-bottom:10px;">
							<text class="express-tag bg-blue">出</text>
							<text class="text-black shop-name">{{item.fromshopName}}</text>
					</view>
					<view class="text-gray flex justify-start" style="margin-bottom:10px;">
						<view><text class="express-tag bg-orange">入</text></view>
						<view class="flex justify-start">
							<text class="text-black shop-name">{{item.toshopName}}</text>
							<view style="font-size:12px;">
								(<text style="margin-left:5px;">{{userInfo.name}}</text><text style="margin:0px 5px;">|</text><text style="margin-right:5px;">{{userInfo.account}}</text>)
							</view>
						</view>
					</view>
					<view class="flex justify-start" >
						<view><text class="express-tag bg-green">接</text></view>
						<view>
							<text class="text-black shop-name">{{item.contactor}}</text>
							<text style="margin:0 5px;">|</text><text class="text-black">{{item.telephone}}</text>
						</view>						
					</view>
					<text class="cu-tag" style="position:absolute;right:10px;top:0px;" :class="{
							'bg-green':item.status==distributeStatus.finish,
							'bg-orange':item.status==distributeStatus.unDeal,
							}">{{item.status | distributeStatusPipe}}</text>
						<!-- <view style="border-top:1px solid #EEEEED;text-align: right;padding-top:10px;" v-if="item.status==distributeStatus.unDeal">
							<text class="cu-tag line-blue" @click="transForExpress(item.id)">转为速递订单</text>
							<text class="cu-tag line-blue" @click="transForLogistic(item.id)">转为物流订单</text>
						</view> -->
				</view>
			</view>
			<uni-load-more :status="loadType" v-show="isLoading"></uni-load-more>
		</scroll-view>

	</view>
</template>

<script>
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	export default {
		data() {
			return {
				expressStatus:this.$store.state.expressStatusZn,
				distributeStatus:this.$store.state.distributeStatusZn,
				isLoading:false,
				loadType:'loading',
				TabCur: 0,
				page:0,
				tabList:[
					{name:'寄件记录',id:0},
					{name:'调拨记录',id:1},
					{name:'代发记录',id:2},
				],
				expressList:[],
				userInfo:'',//寄件记录寄出这者都是我
			};
		},
		onPullDownRefresh(){
			this.page++;
			this.getExpressList(this.page)
		},
		components:{
			uniLoadMore
		},
		onLoad(){
			this.getExpressList(this.page);
			this.getUserInfo()
		},
		methods: {
			getUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.userInfo=res.data;
						console.log(this.userInfo)
					}
				})
			},
			checkExpressItem(item,type){
				//查看单个详情
				//如果是快递单，status=1未签收可以修改
				//如果是调拨单，status=1未处理，可以修改
				//已揽件，查看详情
				// uni.navigateTo({
				// 	url:'../express-item/express-item?id='+item.id+'&type='+type
				// })
				if(type=='express'){
					//快递单
					if(item.status==1){
						//未签收，进行修改
						uni.navigateTo({
							url:'../create-express/create-express?checkID='+item.id+'&checkType='+item.express
						})
					}else{
						//已揽件，查看详情
						uni.navigateTo({
							url:'../express-item/express-item?id='+item.id+'&type='+type
						})
					}
				}else if(type=='distribute'){
					uni.navigateTo({
						url:''
					})
				}
				
			},
			tabSelect(item) {
				this.TabCur =item.id;
				if(this.TabCur==0){
					this.getExpressList()
				}else{
					this.getDistributeList(this.TabCur)
				}
			},
			//寄件记录
			getExpressList(page){
				this.$ajax('Expresses',{
					offset:page,
					way:1,
				},res=>{
					res.forEach(item=>{
						if(item.express==1){
							//速递订单
							this.$store.state.expressList.forEach(express=>{
								if(item.catalog==express.id){
									item.catalogImg=express.img
								}
							})
						}else if(item.express==2){
							//物流订单
							this.$store.state.logisticsList.forEach(logtid=>{
								if(item.catalog==logtid.id){
									item.catalogImg=logtid.img
								}
							})
						}
					})
					this.expressList=res;
					console.log(this.expressList)
				})
			},
			//调拨代发记录
			getDistributeList(type){
				this.$ajax('Expresses',{
					type:type,
					offset:this.page
				},res=>{
					this.expressList=res;
				})
			}
			
		}
	}
</script>

<style lang="less" >
	page{
		background:rgba(247,247,247,1);
	}
	.goods-name{
		font-size:14px;margin-left:5px;font-weight:600
	}
	.express-content{
		margin:10px 15px;border:1px solid #EEEEED;border-radius: 10px;padding:5px 9px; position:relative;
		.express-item{
			border-bottom:1px solid #EEEEED;
			.express-tag{
				padding:2px 10px 4px 5px;
				.img{
					width:20px;height:20px;vertical-align: middle;margin-right:8px;
				}
			}
			
		}
		
		.express-container{
			padding:5px 10px;font-size:12px;
			
			.express-tag{
				width:20px;height:20px;border-radius: 50%;color:#fff;text-align:center;line-height:20px;display: inline-block;
				
			}
			.shop-name{
				font-size:13px;margin-left:5px;margin-right:5px;
			}
		}
		
	}
	.distribute-item{
		border:1px solid #EEEEED;padding:10px 15px;border-radius: 10px;margin:5px 10px;margin-bottom:10px;position: relative;
		.express-tag{
				width:20px;height:20px;border-radius: 50%;color:#fff;text-align:center;line-height:20px;display: inline-block;
				
		}
		.shop-name{
				font-size:13px;margin-left:5px;margin-right:5px;
			}
	}
</style>
