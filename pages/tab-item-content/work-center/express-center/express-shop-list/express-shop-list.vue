<template>
	<view>

		<view class="flex justify-between bg-white borderTop borderBottom align-center" style="padding:10px 15px;" @click="showModel" v-if="type=='receiver'">
			<view>收件对象</view>
			<view>
				<text class="font-size-normal">{{receiverType.name}}</text>
				<text class="cuIcon-right font-size-normal color-placeholder"></text>
			</view>
		</view>
		<view   class="bg-white margin-bottom-normal" v-if="receiverType.value=='shop'">
			<view v-for="(item,index) in shopList" :key="index" class="shop-item borderBottom flex justify-start" @click="chooseItem(item,'shop')" >
				<view style="width:15%;">
					<image :src="shopTabCur==item.id?'../../../../../static/icon/nochoose.png':'../../../../../static/icon/choose.png'" style="width:20px;height:20px;"></image>
				</view>
				<view style="width:75%;">{{item.name}}<text class="text-blue shop-tag"  v-if="item.brandName" style="margin-left:20px;">({{item.brandName}})</text></view>
				<view>
					<text  class="cu-tag" :class="{
								'shop-business':item.status==shopStatusZn.businessing,
								'shop-execution':item.status==shopStatusZn.ready,
								'shop-prepare':item.status==shopStatusZn.processing,
								'shop-canceled':item.status==shopStatusZn.canceled,
								'shop-renovated':item.status==shopStatusZn.renovated,
								'shop-moved':item.status==shopStatusZn.moved,
							}">{{item.status | shopStatus}}</text>
				</view>
			</view>

		</view>

		<view v-if="receiverType.value=='customer'">
			<createAddress>	</createAddress>
		</view>

		<view class="cu-modal bottom-modal " :class="modalName=='shopModal'?'show':''" >
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="hideModal">取消</view>
					<view class="action text-blue font-size-normal" @tap="confirmShop()">确定</view>
				</view>
				<view >
					<view class="shop-info bg-white borderTop text-left" v-if="selectedShop">
						<view class="borderBottom" style="padding-bottom:15px;">
							<view style="margin-bottom:4px;" class="shop-intro">省/市/区</view>
							<view class="font-size-big color-normal">{{selectedShop.provinceName || ''}} {{selectedShop.cityName || ''}} {{selectedShop.districtName || ''}}</view>
						</view>
						<view class="borderBottom" style="padding-bottom:15px;padding-top:10px;">
							<view style="margin-bottom:4px;" class="shop-intro">详细地址</view>
							<view class="font-size-big color-normal">{{selectedShop.address || ''}}</view>
						</view>
						<view class="borderBottom" style="padding-bottom:15px;padding-top:10px;">
							<view style="margin-bottom:4px;" class="shop-intro">门店名称</view>
							<view class="font-size-big color-normal">{{selectedShop.name || ''}}</view>
						</view>

						<view class="borderBottom position_relative" style="padding-bottom:15px;padding-top:10px;" @click.stop="chooseShopMan()">
							<view style="margin-bottom:4px;" class="shop-intro">联系人姓名/电话</view>
							<view class="font-size-big color-normal">{{selectman.name || userInfo.name}}/{{selectman.account||userInfo.mobile}}</view>
							<view class="cuIcon-roundright color-placeholder position_absolute" style="right:20px;top:30px;font-size:18px;" v-if="type=='receiver'"></view>
						</view>
						<!--<view class="borderBottom flex justify-start" style="padding-bottom:15px;padding-top:11px;" v-if="type=='send' || selectman">-->
							<!--<view style="width:50%;border-right:1px solid #EEEEED">-->
								<!--<view style="margin-bottom:4px;" class="shop-intro">姓名</view>-->
								<!--<view class="font-size-big color-normal">{{selectman.name || userInfo.name}}</view>-->
							<!--</view>-->
							<!--<view style="padding-left:20px;">-->
								<!--<view style="margin-bottom:4px;" class="shop-intro">电话</view>-->
								<!--<view class="font-size-big color-normal">{{selectman.account||userInfo.mobile}}</view>-->
							<!--</view>-->
						<!--</view>-->
						<!--<view class="borderBottom flex justify-between align-center"-->
							  <!--@click.stop="chooseShopMan()"-->
							  <!--style="padding-bottom:15px;padding-top:11px;padding-right:20px;" v-if="type=='receiver' && !selectman">-->
							<!--<view>选择收件人</view>-->
							<!--<view><text class="cuIcon-right color-placeholder" style="font-size:20px;"></text></view>-->
						<!--</view>-->
					</view>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='targetModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content">选择收件对象</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white text-left">
					<view v-for="(item,index ) in receiverTypeList" :key="index" @click="chooseItem(item,'receiver')" class="type-item flex justify-between align-center">
						{{item.name}}
						<image :src="receiverTypeTabcur==item.id?'../../../../../static/icon/nochoose.png':'../../../../../static/icon/choose.png'" style="width:20px;height:20px;"></image>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import  {mapState} from 'vuex'
	import createAddress from '../create-address/create-address.vue'
	export default {
		computed:mapState(['shopStatusZn','userInfo']),
		data() {
			return {
				shopList:[],
				shopTabCur:0,
				selectedShop:'',
				modalName:'',
				type:'',//收件人需要选择，寄件人不要选择
				selectman:'',
				receiverTypeList:[
					{name:'门店',id:1,value:'shop'},
					{name:'消费者',id:2,value:'customer'},
					{name:'仓库',id:3,value:'store'},

				],
				receiverTypeTabcur:0,
				receiverType:{
					value:'shop',
					name:'门店'
				},



			}
		},
		methods: {
			chooseItem(item,type){
				if(type=='shop'){
					this.shopTabCur=item.id;
					this.selectedShop=item;
					this.modalName='shopModal'
				}else if(type=='receiver'){
					this.receiverTypeTabcur=item.id;
					this.receiverType={
						value:item.value,
						name:item.name
					}
				}
			},
			showModel(){
				this.modalName='targetModal'
			},
			chooseShopMan(){

				uni.navigateTo({
					url:'../express-shop-man/express-shop-man?id='+this.selectedShop.id
				})
			},
			confirmShop(){
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						if(this.type=='send'){
							this.$fire.fire('sendShop',this.selectedShop)
						}else if(this.type=='receiver'){
							this.$fire.fire('receiverShop',{
								shop:this.selectedShop,
								man:this.selectman
							})

						}
					}
				})
				this.hideModal()



			},
			hideModal(){
				this.modalName=null;
			},
			chooseShop(item){


			},
			getMyShopsList(){
				if(this.type=='send'){
					this.$ajax('MyShops',{
						address:''
					},res=>{
						this.shopList=res

					})
				}else if(this.type=='receiver'){
					this.$ajax('ChainShops',{
						brand:0,
						offset:0,
						zone:-1,
						status:0,
						province:'',
						city:'',
						district:''
					},res=>{
						this.shopList=res;
					})
				}

			}
		},
		onLoad(options){
			console.log(options)
			if(options){
				this.type=options.type;
				this.getMyShopsList()
			}
			this.$fire.on('man',result=>{

				this.selectman=result;
			})

		},
		components:{
			createAddress
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1)
	}
	.shop-item{
		padding:19px 19px 16px 17px;
		.shop-tag{
			border-radius: 5px;font-size:12px;margin-right:6px;
			background:#EBF4FF;color:#2786F5;margin-bottom:6px;
		}
	}
	.shop-info{
		padding-top:18px;
		padding-left:29px;
		padding-bottom:15px;
		.shop-intro{
			font-size:13px;
			color:#898888;
			margin-bottom:4px;
		}


	}
	.type-item{
		padding:15px 25px;
		font-size:15px;
		border-bottom:1px solid #EEEEED;
	}
	//营业中
	.shop-business{
		background:#E5FFF5;color:#16B176;
	}
	//筹备中
	.shop-prepare{
		background:#F6ECFF;color:#9013FE;
	}
	//施工中
	.shop-execution{
		background:#FFF3DE;color:#F58123;
	}
	//已撤柜
	.shop-canceled{
		background:#FFECE9;color:#E2391A;
	}
	//已重装
	.shop-renovated{
		background:#EBFFFA;color:#3FD7B5;
	}
	//已移位
	.shop-moved{
		background:#EBF4FF;color:#2786F5;
	}

</style>
