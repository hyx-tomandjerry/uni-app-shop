<template>
	<view class="borderTop">
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >门店列表</view></block>
		</cu-custom>
		<view class="flex justify-between bg-white  borderBottom align-center" style="padding:10px 15px;" @click="showModel" v-if="type=='emailReceiver'">
			<view>收件对象</view>
			<view>
				<text class="font-size-normal" style="padding-right:5px;">{{receiverType.name}}</text>
				<text class="cuIcon-right font-size-normal color-placeholder" style="font-size:17px;"></text>
			</view>

		</view>
		<view class="flex justify-between search-item" @click="showShopCatalog" v-if="type=='emailReceiver' && receiverType.value=='shop'">
			<view class="title">选择品牌类型</view>
			<view >
				{{shopBrandName}}
				<text class="cuIcon-right  font-size-big color-placeholder"  style="font-size:17px;"></text>
			</view>
		</view>
		<view v-if="receiverType.value!='customer'" class="bg-white" style="margin-top:13px;">
			<view v-for="(item,index) in shopList" :key="index"
				  class="shop-item borderBottom flex justify-start " @click="chooseItem(item,'shop')" >
				<view>
					<image :src="shopTabCur==item.id?'../../../../../static/icon/icon-xuanzhong.png':
					'../../../../../static/icon/icon-weixuanzhong.png'" class="chooseImg"></image>
				</view>
				<view>
					<view class="shop-name">
						<text class="font-size-normal font-weight-bold" style="margin-right:5px;">{{item.name || ''}}</text>
						<text class="color-blue font-weight-bold shop-tag" style="margin:0 5px;">{{item.brandName || ''}}</text>
						<text  class="cu-tag " :class="{
									'shop-business':item.status==shopStatusZn.businessing,
									'shop-execution':item.status==shopStatusZn.ready,
									'shop-prepare':item.status==shopStatusZn.processing,
									'shop-canceled':item.status==shopStatusZn.canceled,
									'shop-renovated':item.status==shopStatusZn.renovated,
									'shop-moved':item.status==shopStatusZn.moved,
								}" style="border-radius:5px;">{{item.status | shopStatus}}</text>
					</view>
					<view class="color-regular font-size-small">
						<!-- 品牌名称: <text>{{item.brandName}}</text> -->
						门店地址 :	<text style="margin-left:3px;">{{item.provinceName ||''}}</text>
						<text v-if="item.districtName">-</text>
						<text>{{item.districtName}}</text>
						<text v-if="item.cityName">-</text>
						<text>{{item.cityName}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="receiverType.value=='customer'" class="margin-top-13">
			<createAddress >	</createAddress>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>


		<view class="cu-modal bottom-modal" :class="modalName=='brandModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green"></view>
					<view class="font-size-big color-normal">选择门店品牌</view>
					<view class="action text-blue" @tap="confirmShopBrand">确定</view>
				</view>
				<view  class="text-left" >
					<view v-for="(item,index) in shopBrandList" :key="index"
						  style="padding: 14px 10px;"
						  class="position_relative"
						  @click="chooseShopBrand(item)"
						  :class="{'bg-white':index%2==0}"
					>
						{{item.val}}
						<image :src="shopBrandTabCur==item.id?'../../../../../static/icon/icon-xuanzhong.png'
						:'../../../../../static/icon/icon-weixuanzhong.png'"
							   class="position_absolute"

							   style="width:20px;height:20px;right:20px;"></image>
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
					<view v-for="(item,index ) in receiverTypeList" :key="index" @click="chooseItem(item,'receiver')" class="type-item flex justify-between align-center"
						  :class="{'bg-gray':item.id==receiverTypeTabcur}">
						{{item.name}}
						<image :src="receiverTypeTabcur==item.id?'../../../../../static/icon/nochoose.png':'../../../../../static/icon/choose.png'" style="width:20px;height:20px;"></image>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :contentText="content" :showIcon="true" :status="loading"></uni-load-more>
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

						<view class="borderBottom flex justify-between align-center" style="padding-bottom:10px;padding-top:10px;padding-right:20px;" @click.stop="chooseShopMan()">
							<view>
								<view style="margin-bottom:4px;" class="shop-intro">联系人姓名/电话</view>
								<view class="font-size-big color-normal">
									<view>
										{{selectman.name || ''}} <text v-if="selectman.name">/</text>
										{{selectman.account || selectman.mobile || ''}}</view>
								</view>
							</view>
							<view class="cuIcon-roundright color-placeholder"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import createAddress from '../create-address/create-address.vue'
	import  {mapState} from 'vuex'

	export default {
		computed:mapState(['shopStatusZn','userInfo']),
		data() {
			return {
				shopList:[],
				provinceList:[],
				type:'',
				receiverType:{
					value:'shop',
					name:'门店'
				},
				receiverTypeList:[
					{name:'门店',id:1,value:'shop'},

					{name:'仓库',id:2,value:'store'},
					{name:'公司',id:3,value:'company'},
					{name:'消费者',id:2,value:'customer'},
				],
				receiverTypeTabcur:1,
				modalName:'',
				shopBrandList:[],
				shopBrandTabCur:0,
				shopBrandName:'',
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				shopTabCur:'',
				selectedShop:'',
				selectman:'',
				sendShopID:''

			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			chooseShopMan(){

				uni.navigateTo({
					url:'../express-shop-man/express-shop-man?id='+this.selectedShop.id
				})
			},
			hideModal(){
				this.modalName=null;
			},
			getShopBrandList(){
				this.$ajax('MyBrands',{
				},res=>{
					if(res){
						this.shopBrandList=res;
					}
				})
			},
			showShopCatalog(){
				this.modalName='brandModal';
				this.getShopBrandList()
			},
			showModel(){
				this.modalName='targetModal'
			},
			chooseItem(item,type){
				if(type=='shop'){
					if(item.id==this.sendShopID){
						uni.showToast({
							title:'收件人和寄件人不能相同!',
							icon:'none'
						})
					}else{
						this.shopTabCur=item.id;
						this.selectedShop=item;
						this.modalName='shopModal';
					}
				}else if(type=='receiver'){
					this.receiverTypeTabcur=item.id;
					console.log(item.id)
					this.receiverType={
						value:item.value,
						name:item.name
					}
					this.modalName=null
					console.log(this.receiverType)
				}
			},

			chooseShopBrand(item){
				this.shopBrandTabCur=item.id;
				this.shopBrandName=item.val
			},
			confirmShopBrand(){
				this.getShopList();
				this.hideModal()
			},
			getShopList(){
				this.$ajax('ChainShops',{
					brand:this.shopBrandTabCur?this.shopBrandTabCur:0,
					zone:0,
					status:0,
					province:'',
					city:'',
					district:'',
					offset:this.$utils.getOffset(this.page)
				},res=>{
					this.shopList=res;
				})
			},
			confirmShop(){
				if(!this.selectman){
					uni.showToast({
						title:'请选择收件人信息',
						icon:'none'
					})
				}else{
					uni.navigateBack({
						delta:1,
						success:()=>{
							this.$fire.fire('supplierShop',{
								shop:this.selectedShop,
								man:this.selectman,
								target:this.receiverTypeTabcur,
							})
						}
					})
				}
			}
		},
		onLoad(options){
			if(options.type){
				this.type=options.type;
			}
			if(options.id){
				this.sendShopID=options.id;
			}
			this.$fire.on('man',result=>{
				this.selectman=result;
			})
			this.getShopList()
		},
		components:{LxEmpty,uniLoadMore,createAddress}
	}
</script>

<style lang="less">
	.shop-item{
		padding:19px 19px 16px 17px;
		.shop-name{
			margin-bottom:4px;
		}
		.chooseImg{
			width:20px;height:20px;margin-right:14px;vertical-align: middle;
			margin-top:10px;
		}

	}
	.type-item{
		padding:15px 25px;
		font-size:15px;
		border-bottom:1px solid #EEEEED;
	}
	.search-item{
		padding:11px 17px;
		background:#fff;
		border-bottom:1px solid #EEEEED;
		.title{
			font-size:13px;
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
	//营业中
	.shop-business{
		border:1px solid #16B176;color:#16B176;
	}
	//筹备中
	.shop-prepare{
		border:1px solid #42B0ED;color:#42B0ED;
	}
	//施工中
	.shop-execution{
		border:1px solid #F58123;color:#F58123;
	}
	//已撤柜
	.shop-canceled{
		border:1px solid #FFECE9;color:#FFECE9;
	}
	//已重装
	.shop-renovated{
		border:1px solid #EBFFFA;color:#3FD7B5;
	}
	//已移位
	.shop-moved{
		border:1px solid #EBF4FF;color:#EBF4FF;
	}
	.shop-tag{
		border-radius:5px;
		background:rgba(0,0,0,0.1);
		padding:3px;
		font-size:12px;
	}
</style>
