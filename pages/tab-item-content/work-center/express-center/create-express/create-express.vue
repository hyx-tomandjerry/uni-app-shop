<template>
	<view>
		<!-- <view class="cu-bar bg-white">
			<view class="action">
				<text style="font-size:13px;">选择快递公司</text>
			</view>
			<view class="action" v-if="express.name"  @tap="showModal($event)" data-target="expressModal">
				<text  style="font-size:14px;">{{express.name}}</text>
				<text class="cuIcon-right" style="font-size:15px;"></text>
			</view>
			<view class="action" v-else>
				<text @tap="showModal($event)" data-target="expressModal" class="cuIcon-right" style="font-size:15px;"></text>
			</view>
		</view>
	 -->
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back" style="font-size:20px" @click="goBack()"></text></block>
			<block slot="content">{{expressObj.name}}</block>
		</cu-custom>
		
		<view class="express-container" style="position: relative;border:1px solid #EEEEED;box-shadow: 10px;">
			<text style="border:0.4px solid gray;position:absolute;left:25px;top:50px;height:35px"></text>
			<view class="flex justify-start user-info" style="position: relative;">
				<view class="express-tab" style="margin-top:10px;">寄</view>
				<view style="width:78%;">
					<view v-if="shopItem" style="padding-top:6px;">
						<view style="font-size:12px;">
							<text style="font-size:16px;" class="text-blue">{{shopItem.name}}</text>
							<text style="margin-left:8px;">(   {{shopItem.managerName || shopItem.contactor}}</text>
							 <text class="text-green" style="margin:0 4px;" v-if="shopItem.managerMobile || shopItem.telephone">|</text> {{shopItem.managerMobile || shopItem.telephone ||''}}  )</view>
						<view style="font-size:12px;margin-top:10px;border-bottom:1px solid #EEEEED;padding-bottom:5px;" class="text-gray">{{shopItem.provinceName||''}}/{{shopItem.cityName||''}}/{{shopItem.districtName||''}}/{{shopItem.address||''}}</view>
					</view>
					<view v-else style="padding-top:15px;min-height:55px;border-bottom: 1px solid #EEEEED;color:#aaa">请选择寄件信息</view>
				</view>
				<text class="cuIcon-addressbook" 
				@click="choseSender()"
				style="font-size: 30px;color:gray;position:absolute;right:10px;top:20px;" ></text>
			</view>
			<view class="flex justify-start user-info" style="position: relative;">
				<view class="express-tab" style="margin-top:10px;background:orange">收</view>
					<view style="width:78%;">
						<view  style="padding-top:15px;min-height:55px;border-bottom: 1px solid #EEEEED;color:#aaa">请选择收件信息</view>
					</view>
				<text class="cuIcon-addressbook" 
				@click="choseReceive()"
				style="font-size: 30px;color:gray;position:absolute;right:10px;top:20px;" ></text>
				
			</view>
		</view>
		
		<view class="express-info" style="padding:10px ;">
			<view class="flex justify-between" style="border-bottom:1px solid #EEEEED;padding:10px 0;">
				<view style="font-size: 13px;color:gray">商品名称</view>
				<view>
					<input type="text" placeholder="请输入商品名称" v-model="goods.name" style="font-size:13px;text-align:right;">
				</view>
			</view>
		</view>
		<view class="good-content" style="padding:0 15px;color:gray;font-size:12px;">
			<view class="flex justify-between" >
				<view style="color:black;font-size:13px;margin-bottom:20px;">
					<text>货物重量估计</text>
				</view>
				<view>
					<text class="cuIcon-order"></text>
					<text @click="changeInput()" v-if="showChoose">重量预估</text>
					<text @click="changeChoose()" v-else>重量填写</text>
				</view>
			</view>
			<view class="good-info">
				<view v-if="showChoose">
					<!-- 显示选择 -->
					<view class="flex justify-around">
						<view v-for="(item,index ) in goodChooseList" :key="index" style="text-align: center;" @click="chooseQuantity(item)">
							<view>
								<image :src="item.image"
								:class="{
									'img25':item.id==0,
									'img35':item.id==1,
									'img55':item.id==2,
									'img75':item.id==3,
								}"
								></image>
							</view>
							<view :class="{'text-orange':goodID==item.id}">
								<view style="margin:5px">{{item.text}}</view>
								<view style="margin-left:4px;">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view v-else 	>
					<view class="flex justify-between" style="padding:10px 20px;">
						<text style="font-size:23px;background:lightgray;width:20%;text-align:center;">-</text>
						<input type="number" placeholder="输入重量" v-model="goods.quantity" 
						style="text-align:right;width:52%;border-top:1px solid #EEEEED;border-bottom:1px solid #EEEEED;padding-left:10px;">
						<text style="width:8%;text-align:center;border-top:1px solid #EEEEED;border-bottom:1px solid #EEEEED;line-height:28px;height:28px;">kg</text>
						<text  style="font-size:23px;background:lightgray;width:20%;text-align:center;">+</text>
					</view>
					<view class="flex justify-between" style="padding:10px 20px;">
							<view>
								总重量 : <text style="font-size:14px;color:red;margin:0 5px;">{{goods.quantity}}</text>kg
							</view>
							<view>注；实际重量以收派员确定为准</view>
					</view>
				</view>
			</view>
		</view>
		
		

		
		

		
		

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodID:-1,
				goodChooseList:[
					{name:'<3kg',text:'小件',id:0,image:'../../../../../static/img/work/goods/box1.jpg'},
					{name:'3-10kg',id:1,text:'标准大件',image:'../../../../../static/img/work/goods/box2.jpg'},
					{name:'31-60kg',text:'超重大件',id:2,image:'../../../../../static/img/work/goods/box3.jpg'},
					{name:'>60kg',text:'物流',id:3,image:'../../../../../static/img/work/goods/box4.jpg'},
				],
				//快递信息
				expressObj:{
					id:'',
					name:''
				},
				sender:{
					name:''
				},//寄件人
				modalName: null,
				shopItem:'',//门店详情
				goods:{
					name:'',
					quantity:1,
					number:''
				},
				showInput:false,//显示输入框
				showChoose:true,//显示选择
			};
		},
		methods: {
			chooseQuantity(item){
				this.goodID=item.id
			},
			changeChoose(){
				this.showChoose=true;
			},
			changeInput(){
				this.showChoose=false;
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//选择寄件人
			choseSender(){
				uni.navigateTo({
					url:'../../../shop-center/near-shop-list/near-shop-list?type=express&&cat=send'
				})
			},
			choseReceive(){
				if(!this.shopItem){
					uni.showToast({
						title:'请选择寄件信息',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'../../../shop-center/near-shop-list/near-shop-list?type=express&&cat=receive&&shop='+this.shopItem.id
					})
				}
				
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				console.log(this.modalName)
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
				
			},
			//获得门店信息
			getShopInfo(id){
				this.$ajax('ProprietorShop',{id:id},res=>{
					this.shopItem=res;
					console.log(this.shopItem)
				})
			}
			
		},
		onLoad(options){
			console.log(options)
			if(options){
				if(options.express==0){
					this.expressObj={id:0,name:'速递订单'}
				}else if(options.express==1){
					this.expressObj={id:1,name:'物流订单'}
				}else if(options.express==2){
					this.expressObj={id:1,name:'调拨订单'}
				}
			}
			this.$fire.on('shop',res=>{
				console.log(res)
				if(res.id){
					this.getShopInfo(res.id)
				}
			})
		}
	}
</script>

<style lang="less">
	uni-input{
		height:30px;
	}
	.img25{
		width:25px;
		height:35px;
	}
	.img35{width:35px;height:35px}
	.img55{width:55px;height:35px;}
	.img75{width:75px;height:35px;}
	page{
		background:#fff;
	}
	button .cu-tag {
		position: absolute;
		top: 8upx;
		right: 8upx;
	}
	.cu-list.menu>.cu-item{
		min-height:45px;
	}
	uni-radio .uni-radio-input{
		width:24px;
		height:21px;
	}
	.cu-card>.cu-item{
		margin:5px;
	}
	.express-info{
		background:#fff;
		margin:6px;
		border-radius: 8px;
	}
	.express-container{
		background:#fff;
		margin:6px;
		border-radius: 8px;
		padding-bottom:10px;
		.user-info{
			padding:8px 10px;
			.express-tab{
				margin-right:10px;
				width: 30px;
				height: 30px;
				font-size: 16px;
				text-align: center;
				line-height: 30px;
				background: rgb(0, 122, 255);
				color: white;
				border-radius: 50%;
			}
		}
		
		
	}
</style>
