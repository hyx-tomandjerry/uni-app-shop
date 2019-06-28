<template>
	<view>

		<view style="padding-bottom:46px">
			<view class="express-container" style="position: relative;border:1px solid #EEEEED;box-shadow: 10px;">
				<text style="border:0.4px solid gray;position:absolute;left:25px;top:50px;height:35px"></text>
				<view class="flex justify-start user-info" style="position: relative;">
					<view class="express-tab" style="margin-top:10px;">出</view>
					<view style="width:78%;">
						<view v-if="outShopObj" style="padding-top:6px;">
							<view style="font-size:12px;" class="flex justify-start">
								<view>
									<text style="font-size:16px;" class="text-blue">{{outShopObj.name}}</text>
								</view>
								<view v-if="outShopObj.managerName && outShopObj.managerMobile">
										<text style="margin-left:8px;">(   {{outShopObj.managerName}}</text>
										 <text class="text-green" style="margin:0 4px;" >|</text> 
										 {{ outShopObj.managerMobile  ||''}}  )
								</view>
							
								
							 </view>
							<view style="font-size:12px;margin-top:10px;border-bottom:1px solid #EEEEED;padding-bottom:5px;" class="text-gray">{{outShopObj.provinceName||''}}/{{outShopObj.cityName ||''}}/{{outShopObj.districtName ||''}}/{{outShopObj.address||''}}</view>
						</view>
						<view v-else style="padding-top:15px;min-height:55px;border-bottom: 1px solid #EEEEED;color:#aaa">请选择调出方信息</view>
					</view>
					<text class="cuIcon-addressbook" 
					@click="choseSender()"
					style="font-size: 30px;color:gray;position:absolute;right:10px;top:20px;" ></text>
				</view>
				<view class="flex justify-start user-info" style="position: relative;">
					<view class="express-tab" style="margin-top:10px;background:orange">入</view>
						<view style="width:78%;">
							<view v-if="inShopObj" style="padding-top:6px;">
								<view style="font-size:12px;">
									<text style="font-size:16px;" class="text-blue">{{inShopObj.name}}</text>
									<text style="margin-left:8px;">(   {{userInfo.name || ''}}</text>
									 <text class="text-green" style="margin:0 4px;" >|</text> 
									 {{ userInfo.account ||''}}  )</view>
								<view style="font-size:12px;margin-top:10px;border-bottom:1px solid #EEEEED;padding-bottom:5px;" class="text-gray">{{inShopObj.provinceName||''}}/{{inShopObj.cityName ||''}}/{{inShopObj.districtName ||''}}/{{inShopObj.address||''}}</view>
							</view>
							<view  v-else style="padding-top:15px;min-height:55px;border-bottom: 1px solid #EEEEED;color:#aaa">请选择调入方信息</view>
						</view>
					<text class="cuIcon-addressbook" 
					@click="choseReceive()"
					style="font-size: 30px;color:gray;position:absolute;right:10px;top:20px;" ></text>
					
				</view>
			</view>
			
			<view class="express-info" style="padding:10px ;border:1px solid #EEEEED;border-radius: 10px;">
				<view class="flex justify-between" style="border-bottom:1px solid #EEEEED;padding:10px;margin-top:6px">
					<view style="font-size: 13px;color:gray">
						<text style="color:red;margin-right:5px;">*</text>
						<text >调拨方式</text>
					</view>
					<view>
						<text>{{distributeObj.name ||''}}</text>
						<text class="cuIcon-right" style="font-size:15px;" @click="chooseDisWay($event)" data-target="RadioModal"></text>
					</view>
				</view>
				
				<view v-if="radio==1"> 
					<!-- <view class="flex justify-between" style="border-bottom:1px solid #EEEEED;padding:10px;margin-top:6px">
						<view style="font-size: 13px;color:gray" class="flex justify-start">
							<text style="color:red;margin-right:5px;margin-top:6px;">*</text>
							<input type="text" v-model="customer.name" placeholder="请输入消费者姓名">
						</view>
					</view> -->
					<view class="flex justify-between " style="padding:5px 10px;border-bottom:1px solid #EEEEED">
						<view style="border-right:1px solid #EEEEED;" >
							<input type="text" placeholder="姓名名称(必填)" style="font-size:13px;" v-model="customer.name">
						</view>
						<view>
							<input type="text" placeholder="手机号电话(必填)" style="font-size:13px;"
							 :class="{'text-red':!isTel}"
							 v-model="customer.telephone" @blur="checkTelEvent($event)">
						</view>
					</view>
					<view class="flex justify-between" style="padding: 8px 10px;border-bottom:1px solid #EEEEED;color:gray">
						<view class="title" style="font-size: 12px;" >选择所在城市</view>
						<addressed @changes="childClick($event)"></addressed>
					</view>
					<view style="padding: 8px 10px;border-bottom:1px solid #EEEEED;color:gray">
						<input type="text" placeholder="详细地址(详细到门牌,街道)" style="font-size:13px;" v-model="customer.address">
					</view>
					
					<view class="flex justify-between">	
						<view style="padding-top:5px;padding-left:10px;line-height:32px" @click="choosePayMent()">
							<text class="cuIcon-roundcheck" style="margin-right:6px;color:#0081FF" v-if="customer.isPay" ></text>
							<text class="cuIcon-round" style="margin-right:6px;color:#0081FF" v-else></text>
							<text style="font-size:12px;">是否货到付款</text>
						</view>
						<!-- <view style="font-size:12px;padding: 8px 10px;color:lightgray;">
							<text class="cuIcon-delete" style="font-size:13px;color:orange;margin-right:10px;"></text>清空当前信息
						</view> -->
					</view>
				</view>
				
				
			</view>
			<view class="goods-content" style="padding:10px 15px;color:gray;font-size:12px;border:1px solid #EEEEED;border-radius: 10px;margin: 10px 8px" >
				<view class="flex justify-between" style="border-bottom:1px solid #EEEEED;padding:10px;">
					<view style="font-size: 13px;color:gray"><text style="color:red;margin-right:5px;">*</text>商品名称</view>
					<view>
						<input type="text" placeholder="请输入商品名称" v-model="goods.name" style="font-size:13px;text-align:right;">
					</view>
				</view>
				
				<view style="margin-top:20px;" >
					<view style="color:black;font-size:13px;margin-bottom:20px;">
						<text style="color:red;margin-right:5px;">*</text><text class="text-gray">货物数量</text>
					</view>
					<view class="flex justify-between" style="padding:0px 20px;">
						<text style="font-size:23px;background:lightgray;width:20%;text-align:center;" @click="numberMinus()">-</text>
						<input type="number" placeholder="输入数量" v-model="goods.number" 
						style="text-align:right;width:52%;border-top:1px solid #EEEEED;border-bottom:1px solid #EEEEED;padding-left:10px;">
						<text style="width:8%;text-align:center;border-top:1px solid #EEEEED;border-bottom:1px solid #EEEEED;line-height:28px;height:28px;">kg</text>
						<text  style="font-size:23px;background:lightgray;width:20%;text-align:center;" @click="numberAdd()">+</text>
					</view>
				</view>
				
				<view style="margin-top:20px;">
					<view style="font-size:13px;margin-bottom:16px;">调拨备注</view>
					<view>
						<textarea value="" placeholder="请输入调拨备注信息" v-model="customer.summary"/>
					</view>
				</view>
				
			</view>
			
		</view>
		
		
		
		
		
		
		
		
		
		<view style="bottom:0px;left:0px;width:100%;position:fixed;" class="cu-btn bg-orange">
			<text @click="createDistribute()">进行调拨</text>
		</view>

		
		

	
		
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal()">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange($event)">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in distributeList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.name}}</view>
								<radio class="round" 
								:class="radio=='radio' + index?'checked':''" 
								:checked="radio=='radio' + index?true:false"
								 :value="'radio' + index"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	
	import addressed from '../../../../../components/jm-address/jm-address.vue'
	export default {
		data() {
			return {
				radio:'',
				sender:{
					name:''
				},//寄件人
				modalName: null,
				shopItem:'',//寄件门店详情
				receiveShopItem:'',//收件门店详情
				goods:{
					name:'',
					number:1,
					summary:''
				},
				showChoose:true,//显示选择
				userInfo:'',//调拨中间人是自己
				shopMaleInfo:'',
				distributeList:[
					{name:'到店',id:1},
					{name:'代发',id:2}
				],
				distributeObj:{},
				outShopObj:'',//调出方（门店或者仓库)
				inShopObj:'',//调入方(自己所在的门店)
				
				isTel:true,
				customer:{
					name:'',
					telephone:'',
					address:'',
					isPay:false,
					province:'',
					provinceName:'',
					city:'',
					cityName:'',
					district:'',
					districtName:'',
					customer:''
				}
			};
		},
		components:{addressed},
		methods: {
			createDistribute(){
				if(this.radio==1){
					if(!this.customer.name || !this.customer.telephone || !this.customer.province || !this.customer.address){
						uni.showToast({
							title:'请填写消费者信息',
							icon:'none'
						})
					}
				}
				if(!this.inShopObj){
					uni.showToast({
						title:'请填写调入方信息',
						icon:'none'
					})
				
				}else if(!this.radio){
					uni.showToast({
						title:'请选择调拨类型',
						icon:'none'
					})
				}else if(!this.goods.name){
					uni.showToast({
						title:'请填写调拨物件信息',
						icon:'none'
					})
				}else{
					uni.getStorage({
						key:'userInfo',
						success: (res) => {
							this.$ajax('NewExpress',{
								//way不填是调拨，way=1是快递
								fromshop:this.outShopObj.id,
								toshop:this.inShopObj.id,
								faddr:`${this.outShopObj.provinceName || ''}${this.outShopObj.cityName || ''}${this.outShopObj.districtName || ''}${this.outShopObj.address || ''}`,
								taddr:this.radio==1?`${this.customer.provinceName || ''}${this.customer.cityName || ''}${this.customer.districtName || ''}${this.customer.address || ''}`:`${this.inShopObj.provinceName || ''}${this.inShopObj.cityName || ''}${this.inShopObj.districtName || ''}${this.inShopObj.address || ''}`,
								type:Number(this.radio)+1,
								name:this.goods.name?this.goods.name:'',
								quantity:this.goods.number,
								receiver:res.data.id,
								contactor:this.radio==1?this.customer.name:'',
								telephone:this.radio==1?this.customer.telephone:''
							},res=>{
								uni.showToast({
									title:'新建调拨成功',
									icon:'none'
								})
								setTimeout(()=>{
									uni.navigateTo({
										url:'../express-list/express-list'
									})
								},600)
							})
						}
					})
					
					
				}
				
			},
			hideModal(){
				this.modalName=''
			},
			childClick(e) {
					this.customer.province=e.provinceID;
					this.customer.city=e.cityID;
					this.customer.district=e.districtID;
					this.customer.provinceName=e.province;
					this.customer.cityName=e.city;
					this.customer.districtName=e.district
			    },
			choosePayMent(){
				this.customer.isPay=!this.customer.isPay
			},
			//选择调拨方式
			chooseDisWay(event){
				this.modalName=event.currentTarget.dataset.target
			},
			numberMinus(){
				if(this.goods.number>1){
					this.goods.number--;
				}
			},
			numberAdd(){
				this.goods.number++;
				
			},
			checkTelEvent(event){
				if(!this.isTel){
					this.isTel=true;
				}
				if(event){
					if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(event.detail.value))){
							uni.showToast({
								title:'电话号码不存在',
								icon:'none'
							})
							this.isTel=false;
							return
					}
						
				}
			},
	
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//选择调出方(门店或者仓库)
			choseSender(){
				uni.navigateTo({
					url:'../../../shop-center/near-shop-list/near-shop-list?type=express&&cat=distribute'
				})
			},
			choseReceive(){
				if(!this.outShopObj){
					uni.showToast({
						title:'请选择调出方信息',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'../../../shop-center/near-shop-list/near-shop-list?type=express&&cat=distribute_send'
					})
				}
				
			},
			RadioChange(e) {
				this.radio = e.detail.value.substr(5)
				console.log(this.radio)
				this.distributeObj={
					id:this.radio,
					name:this.radio==0?'到店':'代发'
				}
			},
			//获得门店信息
			getShopInfo(id,type){
				this.$ajax('ProprietorShop',{id:id},res=>{
					if(type=='out'){
						console.log(res)
						this.outShopObj=res
					}else if(type=='in'){
						this.inShopObj=res;
					}
				})
				
				
			},
			getUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.userInfo=res.data
						
					}
				})
			},
			
			
		},
		
		//获得时间
		
		onLoad(){
			this.$fire.on('shopID',res=>{
				this.getShopInfo(res,'out')
			})
			this.$fire.on('sendShop',res=>{
				this.getShopInfo(res.shopID,'in')
			})
			this.getUserInfo();
		}
	}
</script>

<style lang="less" >
	
	uni-textarea{
		width:100%;
		border-radius: 10px;
		padding:10px 20px;
		padding:10px 20px;
		height:84px;
		background:rgba(247,247,247,1)
	}
	.chooseTimeActive{
		border:1px solid orange;
		color:orange;
	}
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
		background:rgba(247,247,247,1);
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
		.goods-info{
			.goods-num{
				border-top:1px solid #EEEEED;
				padding:10px 15px;
			}
		}
		
		
	}
	.cu-bar{
		min-height:44px;
	}
	.time-tab{
		border:1px solid #EEEEED;
		border-radius: 9px;
		padding:10px 15px;
	}
</style>
