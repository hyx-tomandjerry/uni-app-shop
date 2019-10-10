<template>
	<view class="borderTop">

		<view class="info-item flex justify-between  align-center  bg-white borderBottom" @click="showModal($event)" data-target="assignTypeModal">
			<view class="font-size-normal color-normal"><text class="text-red">*</text>调拨类型</view>
			<view><text class="font-size-normal color-normal">{{assign.name}}</text><text class="cuIcon-right font-size-big color-placeholder"></text></view>
		</view>
		<view class="flex justify-between bg-white info-item align-center " @click="showModal($event)" data-target="sendObjModal">
			<view class="color-normal"><text class="text-red">*</text>发件对象</view>
			<view>
				<text class="font-size-normal">{{sendTarget.name}}</text>
				<text class="cuIcon-right font-size-normal color-placeholder"></text>
			</view>
		</view>
		<view class="express-container   bg-white margin-top-13">
			<view class="user-info ">
				<view class="flex justify-start position_relative send-info  align-center" >
					<view class="send-tag" >需</view>
					<view class="font-size-normal font-weight-normal shopInfo" >
						<view v-if="applierShop">
							<view class="font-size-normal color-normal font-weight-bold">{{applierShop.name || ''}}</view>
							<view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">{{userInfo.name}}</text>{{userInfo.mobile}}</view>
							<view style="font-size:12px;" class="color-placeholder">
								{{applierShop.provinceName || ''}}
								{{applierShop.cityName || ''}}
								{{applierShop.districtName || ''}}
								{{applierShop.address || ''}}</view>
						</view>
						<view v-else>请填写/添加收件人信息</view>
					</view>
					<text class=" position_absolute " style="right:21px;top:35px;color:#42B0ED" @click="chooseShop('applier')">选择</text>
				</view>

			</view>
		</view>
		<view class="margin-bottom-normal ">
			

			<view class="user-info  bg-white borderTop" >
				<view class="flex justify-start position_relative send-info  align-center" >
					<view class="receive-tag" style="background:rgba(66,176,237,1);">发</view>
					<view class="font-size-normal font-weight-normal shopInfo" >
						<view v-if="supplierShop ">
							<view class="font-size-normal color-normal font-weight-bold">{{supplierShop.shop.name || ''}}</view>
							<view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">
								{{supplierShop.man.name || ''}}</text>{{supplierShop.man.mobile || supplierShop.man.account}}</view>
							<view style="font-size:12px;" class="color-placeholder">
								{{supplierShop.shop.provinceName || ''}}
								{{supplierShop.shop.cityName || ''}}
								{{supplierShop.shop.districtName || ''}}
								{{supplierShop.shop.address || ''}}</view>
						</view>
						<view v-else>请填写/添加发件人信息</view>
					</view>
					<text class=" position_absolute  " @click="chooseShop('supplier')" style="right:21px;top:35px;color:#42B0ED">选择</text>
				</view>
			</view>
			<view class="user-info  bg-white borderTop" v-if="assignTypeValue=='replace'">
				<view class="flex justify-start position_relative send-info  align-center" >
					<view class="receive-tag" style="background:#8dc63f;">收</view>
					<view class="font-size-normal font-weight-normal shopInfo" >
						<view v-if="thirder.name">
							<view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">{{thirder.name}}</text>{{thirder.telephone}}</view>
							<view style="font-size:12px;" class="color-placeholder">{{thirder.address}}</view>
						</view>
						<view v-else>请填写/添加需求方信息</view>
					</view>
					<text class=" position_absolute  " @click="chooseShopItem()" style="right:21px;top:35px;color:#42B0ED">选择</text>
				</view>
			</view>
		</view>


		<view class="bg-white margin-bottom-normal">
			<view class="goods-item flex justify-between borderBottom position_relative" >
				<view class=" font-size-normal color-normal"><text class="text-red">*</text>商品名称</view>
				<input type="text" v-model="goods.name" placeholder="请输入商品名称" style="text-align: right;padding-right:15px;">
				<text class="cuIcon-right position_absolute color-placeholder font-size-bigger" style="right:10px;top:50%;transform:translateY(-50%)"></text>
			</view>
			<view class="goods-item flex justify-between borderBottom" >
				<view class="color-normal font-size-normal "><text class="text-red">*</text>数量</view>

				<view class="flex justify-start align-center">
					<view class="cuIcon-move font-size-normal font-weight-bold" @click="operateGoods('minus')"></view>
					<view class="cu-tag" style="padding:2px 20px;background:rgba(245,245,245,1);margin:0 11px;">{{goods.number}}</view>
					<view class="cuIcon-add font-size-normal font-weight-bold" @click="operateGoods('add')"></view>
				</view>
			</view>
			<view class="goods-item flex justify-between borderBottom align-center" v-if="assignTypeValue=='replace'">
				<view class="color-normal font-size-normal "><text class="text-red">*</text>是否到付</view>
				<view>
					<view>
						<image :src="ispay==1?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"
							   @click="changePayment(1)"></image>
						<text style="margin-right:25px;">是</text>

						<image :src="ispay==0?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"
							   @click="changePayment(0)"></image>
						<text>否</text>
					</view>

				</view>
			</view>
			<view class="goods-summary position_relative">
				<view style="margin-bottom:10px;" class="font-size-normal color-normal">备注</view>
				<textarea v-model="goods.summary"
						  maxlength="100" cols="30" rows="10" placeholder="请输入"
						  class="summary-container"
						  ></textarea>
				<view class="position_absolute" style="bottom:20px;right:24px;"><text class="text-blue">{{goods.summary.length}}</text>/100</view>
			</view>
		</view>

		<view class="submit-area bg-white">
			<view class="submit-btn" @click="NewRequisitionHandle">确定</view>
		</view>
		<view class="cu-modal" :class="modalName=='assignTypeModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content">选择调拨类型</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white text-left">
					<view v-for="(item,index ) in assignTypeList" :key="index" @click="chooseItem(item,'assignType')" class="type-item flex justify-between align-center">
						{{item.name}}
						<image :src="assignTypeTabcur==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:20px;height:20px;"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='sendObjModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content">选择调拨类型</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white text-left">
					<view v-for="(item,index ) in sendTargetList" :key="index" @click="chooseItem(item,'sendTarget')" class="type-item flex justify-between align-center">
						{{item.name}}
						<image :src="sendTargetTabcur==item.value?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong .png'" style="width:20px;height:20px;"></image>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['userInfo']),
		data(){
			return{
				//调拨类型
				assign:{
					name:'到店'
				},
				receiverShop:'',//收件
				sendShop:{
					shop:'',
					man:''
				},//发件
				sendTarget:{
					name:'门店'
				},
				//寄件类型
				emailType:{
					name:'',
					value:''
				},
				modalName:'',
				assignTypeTabcur:1,//调拨类型
				assignTypeValue:'toShop',//调拨类型

				sendTargetTabcur:1,//调拨类型
				emailTypeTabcur:0,//寄件类型
				emailTypeValue:'',//寄件类型
				assignTypeList:[
					{name:'到店',value:'toShop',id:1},
					{name:'代发',value:'replace',id:2}
				],
				sendTargetList:[
					{name:'门店',value:1},
					{name:'仓库',value:2}
				],
				goods:{
					name:'',
					number:1,//数量
					summary:'',//备注
				},
				thirder:{
					name:'',
					telephone:'',
					address:''
				},

			//	----------------
				applierShop:'',//需求方门店信息
				supplierShop:'',//供应方门店信息
				ispay:0,//货到付款
			}
		},
		components:{
			
		},
		onLoad(){
			this.$fire.on('address',result=>{
				this.thirder={
					name:result.shoper.name,
					telephone:result.shoper.telephone,
					address:`${result.shoper.provinceName}${result.shoper.cityName}${result.shoper.cityName}${result.shoper.address}`
				}
			})
			this.$fire.on('applierShop',result=>{
				this.applierShop=result;
			})
			this.$fire.on('supplierShop',result=>{
				this.supplierShop=result;
			})
		},
		methods:{

			/*是否到付*/
			changePayment(type){
				this.ispay=type;
			},
			/**
			 新建调拨单
			 */
			NewRequisitionHandle(){
				if(!this.applierShop || !this.supplierShop){
					uni.showToast({
						title:'请填写完整信息',
						icon:'none'
					})
				}else{
					this.$ajax('NewRequisition',{
						applyShop:this.applierShop.id?this.applierShop.id:'',//需求方的门店id(如果是到店，则为我的门店的id,如果是代发，则为别的门店的id)
						supplier:this.supplierShop.man.id?this.supplierShop.man.id:"",//供应方(如果是到店，则为别的门店店员的ID，如果是代发，则为我的id
						supplyShop:this.supplierShop.shop.id?this.supplierShop.shop.id:"",//供应方门店的id(如果是到店，则为别的门店ID，如果是代发，则为我的门店id)
						summary:this.goods.summary || '',//备注
						recverName:this.thirder.name,//第三方的姓名
						recverMobile:this.thirder.telephone,//第三方的电话
						qty:this.goods.number,//数量
						name:this.goods.name,//商品名称
						address:this.thirder.address || '',
						destpay:this.ispay,//是否到付
					},res=>{
						if(res==-75){
							uni.showToast({
								title:'收件人和寄件人不能相同!',
								icon:'none'
							})
						}else{
							uni.showToast({
								title:'新建调拨单成功',
								icon:'none',
								success:()=>{
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},600)
								}
							})
						}

					})
				}

			},
			chooseShop(type){
				switch(type){
					case 'applier':
						uni.navigateTo({
							url:"../shop-list-applier/shop-list-applier"
						})
						break;
					case 'supplier':
						uni.navigateTo({
							url:"../shop-list-supplier/shop-list-supplier?id="+this.applierShop.id
						})
						break;
				}
			},

			operateGoods(type){
				switch(type){
					case 'minus':
						if(this.goods.number>1){
							this.goods.number--;
						}
						break;
					case 'add':
						this.goods.number++;
				}
			},

			showModal(event){
				this.modalName = event.currentTarget.dataset.target
			},
			chooseItem(item,type){
				switch (type) {
					case 'assignType':
						this.assignTypeTabcur=item.id;
						this.assignTypeValue=item.value;
						this.assign.name=item.name;
						this.applierShop="";
						this.hideModal()
						break;
					case 'sendTarget':
						this.sendTargetTabcur=item.value;
						this.sendTarget.name=item.name;
						break;
					case 'emailType':
						this.emailTypeTabcur=item.id;
						this.emailType.name=item.name;
						this.emailType.value=item.value;
						break;

				}
			},
			chooseShopItem(){
				uni.navigateTo({
					url:'../create-address/create-address'
				})

			},
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
			}
		}
	}
</script>
<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.info-item{
		padding:17px 12px 13px 15px;
	}
	.user-info{
		.send-info{
			padding:23px 9px 22px 18px;

		}
		.send-tag{
			width:13%;
			height:45px;
			border-radius: 50%;
			color:#fff;
			margin-right:14px;
			text-align:center;
			line-height:45px;
			font-size:20px;
			background:rgba(32,32,32,1);
		}
		.receive-tag{
			width:13%;
			height:45px;
			border-radius: 50%;
			color:#fff;
			text-align:center;
			line-height:45px;
			font-size:20px;
			margin-right:14px;

		}
		.shopInfo{
			width:60%;
			border-right:1px solid #EEEEED;
		}

	}
	.type-item{
		padding:15px 25px;
		font-size:15px;
		border-bottom:1px solid #EEEEED;
	}
	.goods-item{
		padding:15px 11px 13px 15px;
	}
	.goods-summary{
		padding:17px 11px 13px 14px;
		background:#fff;
		.summary-container{
			padding-top:18px;padding-left:12px;min-height:100px;background:rgba(247,247,247,1);width:100%;border-radius:8px;
		}
	}
	.submit-area{
		padding:12px 13px 11px 14px;
		text-align: center;
		color:#fff;
		font-size:17px;
		.submit-btn{
			background:rgba(66,176,237,1);
			border-radius:5px;
			padding-top:10px;
			padding-bottom:8px;
			width:100%;
		}

	}
</style>