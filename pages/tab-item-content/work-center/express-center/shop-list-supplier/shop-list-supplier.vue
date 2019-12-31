<template>
	<view class="borderTop">
		<view class="flex justify-between bg-white   align-center target-item borderBottom"  v-if="type=='emailReceiver'">
			<view>收件对象</view>
			<view class="flex justify-around">
				<block v-for="(item,index) in receiverTypeList" :key="index" >
					<view @tap="chooseItem(item,'receiver')">
						<image 
							:src="receiverTypeTabcur==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" 
							mode="widthFix"  
							class="choose-img"></image>
						<text>{{item.name}}</text>
					</view>
				</block>
			</view>
		</view>
		<view class="flex justify-between search-item " @click="showShopCatalog" v-if="(type=='emailReceiver' && receiverType.value=='shop') || type=='distribute'&& fromCat==expressItem.shop">
			<view class="title">选择品牌类型</view>
			<view >
				{{shopBrandName}}
				<text class="cuIcon-right  font-size-big color-placeholder"  style="font-size:17px;"></text>
			</view>
		</view>
		<template v-if="(type=='emailReceiver' && receiverType.value=='shop') || (type=='distribute'&& fromCat==expressItem.shop)">
			<view class="bg-white" v-if="shopList.length">
				<block v-for="(item,index) in shopList" :key="index">
					<receive-shop-item 
						:item="item" 
						:index="index" 
						:shopTabCur="shopTabCur"
						@chooseItem="chooseShopItem"
						></receive-shop-item>
				</block>
				<uni-load-more :contentText="content" :showIcon="true" :status="loading" v-if="shopList.length>5"></uni-load-more>
			</view>
			<view v-else>
				<LxEmpty></LxEmpty>
			</view>
		</template>
		<template v-if="(type=='emailReceiver' && receiverType.value=='store') || (type=='distribute' && fromCat == expressItem.store)">
			<view class="bg-white" :class="{'margin-top':type=='emailReceiver'}">
				<block v-for="(item,index) in shopList" :key="index">
					<view class="company-item flex align-center borderBottom" @tap="chooseItem(item,'company')">
						<view style="width:120upx;">
							<image 
							:src="shopTabCur==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'"
							 mode="widthFix" lazy-load class="xuanze-img"></image>
						</view>
						<view class="flex-1 text-ellipse">
							<view class="flex align-center justify-between">
								<view class="font-weight-bold">{{item.name}}</view>
								<view class="font-size-litter color-blue cuIcon-edit" @tap.stop="editCompany(item)">编辑</view>
							</view>
							<view class="font-size-litter color-regular">{{item.managerName || ''}}/{{item.telephone || ''}}</view>
							<view class="color-regular font-size-litter">
								{{item.provinceName || ''}}{{item.cityName ||''}}{{item.districtName || ''}}{{item.address || ''}}
							</view>
						</view>
					</view>
				</block>
			</view>
			
		</template>
		<template v-if="receiverType.value=='company'">
			<view class="bg-white margin-top">
				<block v-for="(item,index) in shopList" :key="index">
					<view class="company-item flex align-center" @tap="chooseItem(item,'company')">
						<view style="width:120upx;">
							<image 
							:src="shopTabCur==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'"
							 mode="widthFix" lazy-load class="xuanze-img"></image>
						</view>
						<view class="flex-1 text-ellipse">
							<view class="flex align-center justify-between">
								<view class="font-weight-bold">{{item.name}}</view>
								<view class="font-size-litter color-blue cuIcon-edit" @tap.stop="editCompany(item)">编辑</view>
							</view>
							<view class="font-size-litter color-regular">{{item.contactor || ''}}/{{item.mobile || ''}}</view>
							<view class="color-regular font-size-litter">
								{{item.provinceName || ''}}{{item.cityName ||''}}{{item.districtName || ''}}{{item.address || ''}}
							</view>
						</view>
					</view>
				</block>
				
			</view>
		</template>
		
		<view v-else-if="receiverType.value=='customer'">
			<create-address />
		</view>
		

		<!-- 品牌类别 -->
		<bottom-show-model 
					:isShow="modalName=='brandModal'"
					:list="shopBrandList"
					chooseImg="../../../../../static/icon/icon-xuanzhong.png"
					noChooseImg="../../../../../static/icon/icon-weixuanzhong.png"
					@hideModel="hideModal"
					@chooseItem="chooseShopBrand"
				 ></bottom-show-model>
		<receive-shop-saleman 
			:isShow="modalName=='shopModal'"
			:selectman="selectman"
			:selectedShop="selectedShop"
			@chooseShopMan="chooseShopMan"
			@confirmShop="confirmShop"
			@hideModal="hideModal"
		></receive-shop-saleman>
	</view>
</template>

<script>
	import bottomShowModel from "../../../../../components/common/bottom-show-model.vue"
	import uniLoadMore from '../../../../../components/common/uni-load-more.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import createAddress from '../create-address/create-address.vue'
	import receiveShopItem from '../../../../../components/express/receive-shop-item.vue'
	import receiveShopSaleman from '../../../../../components/express/receive-shop-saleman.vue'
	
	import {ChainShopsApi,MyBrandsApi} from '../../../../../api/common_api.js'
	import {ExpressAddressesApi,WarehousesApi} from '../../../../../api/express_api.js'
	export default {
		components:{LxEmpty,uniLoadMore,createAddress,bottomShowModel,receiveShopItem,receiveShopSaleman},
		data() {
			return {
				shopList:[],
				provinceList:[],
				type:'',//速递还是调拨
				fromCat:'',//调拨对象是门店还是仓库
				receiverType:{
					value:'shop',
					name:'门店'
				},
				receiverTypeList:[
					{name:'门店',id:1,value:'shop'},
					{name:'仓库',id:2,value:'store'},
					{name:'公司',id:3,value:'company'},
					{name:'消费者',id:4,value:'customer'},
				],
				receiverTypeTabcur:1,
				modalName:'',
				shopBrandList:[],
				shopBrandTabCur:0,
				shopBrandName:'',
				page:1,
				content:{
					contentdown: "下拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				shopTabCur:'',
				selectedShop:{},
				selectman:{},
				sendShopID:''

			}
		},
		computed:{
			expressItem(){return this.config.expressItem}
		},
		onPullDownRefresh(){
			this.page=1;
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},900)
			this.getShopList()
		},
		onReachBottom(){
			this.page++;
			this.loading='loading';
			setTimeout(()=>{
				switch(this.receiverType){
					case 1:
					let obj={
						brand:this.shopBrandTabCur?this.shopBrandTabCur:0,
						zone:0,
						status:0,
						province:'',
						city:'',
						district:'',
						offset:this.$utils.getOffset(this.page)
					}
					let result  =  ChainShopsApi(val);
					if(result==''){
						setTimeout(()=>{
							this.loading='noMore'
						},900)
					}else{
						result.forEach(item=>{
							this.shopList=this.shopList.concat(item)
						})
						this.loading='loading';
						setTimeout(()=>{
							this.loading='noMore'
						},900)
					}
					break;
					case 2:
					console.log('2');
					break;
					case 3:
					console.log(3);
					break
					
				}

			},1000)
		
		},
		methods: {
			editCompany(item){
				switch(this.type){
					case 'emailReceiver':
					uni.navigateTo({
						url:"../edit-company-info/edit-company-info?id="+item.id+"&type="+this.receiverType.value
					})
					break;
					case 'distribute':
					uni.navigateTo({
						url:"../edit-company-info/edit-company-info?id="+item.id+"&type=store"
					})
					break;
				}
				
			},
			chooseShopMan(){
				uni.navigateTo({
					url:'../express-shop-man/express-shop-man?id='+this.selectedShop.id
				})
			},
			hideModal(){
				this.modalName=null;
			},
			async getShopBrandList(){

				this.shopBrandList = await MyBrandsApi()
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
						this.$utils.showToast('收件门店和寄件门店不能相同')
					}else{
						this.shopTabCur=item.id;
						this.selectedShop=item;
						this.modalName='shopModal';
					}
				}else if(type=='receiver'){
					console.log(item)
					switch(item.value){
						case 'shop':
						break;
						case 'store':
						this.getStoreList()
						break;
						case 'company':
						this.getCompanyList()
						break;
						case 'customer':
						break;
					}
					this.receiverTypeTabcur=item.id;
					this.receiverType={
						value:item.value,
						name:item.name
					}
					this.modalName=null
					
				}else if(type=='company'){
					
					let man={};
					let target='';
					this.shopTabCur=item.id;
					let shop={
							name:item.name,
							id:item.id,
							provinceName:item.provinceName,
							cityName:item.cityName,
							districtName:item.districtName
						};
					switch(this.type){
						case 'emailReceiver'://快递
						man={
							name:this.receiverTypeTabcur==this.config.expressItem.store? item.managerName:item.contactor,
							mobile:this.receiverTypeTabcur==this.config.expressItem.store?item.telephone:item.mobile
						}
						target= this.receiverTypeTabcur
						break;
						case 'distribute'://调拨
						man={
							name:item.managerName,
							mobile:item.telephone
						}
						target=this.config.expressItem.store;
						break
					}
					uni.navigateBack({
						delta:1,
						success:()=>{
							this.$fire.fire('supplierShop',{
								shop,
								man,
								target
							})
						}
					})
				}
			},
			async getStoreList(){
				this.shopList= await WarehousesApi()
			},
			async getCompanyList(){
				
				this.shopList= await ExpressAddressesApi();

				
			},
			chooseShopBrand(item){
				this.shopBrandTabCur=item.id;
				this.shopBrandName=item.val;
				this.getShopList();
			},
			chooseShopItem(item){
				if(item.id==this.sendShopID){
					this.$utils.showToast('收件门店和寄件门店不能相同')
				}else{
					this.shopTabCur=item.id;
					this.selectedShop=item;
					this.modalName='shopModal';
				}
			},
			async getShopList(){
				let val={
					brand:this.shopBrandTabCur?this.shopBrandTabCur:0,
					zone:0,
					status:0,
					province:'',
					city:'',
					district:'',
					offset:this.$utils.getOffset(this.page)
				}
				this.shopList = await ChainShopsApi(val)
			},
			confirmShop(){
				if(!this.selectman.id){
					
					this.$utils.showToast('请选择收件人信息')
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
			if(options.cat){
				this.fromCat=options.cat;
			}
			switch(this.type){
				case 'emailReceiver':
				this.getShopList()
				break
				case 'distribute':
				if(this.fromCat==this.expressItem.shop){
					this.getShopList()
				}else if(this.fromCat == this.expressItem.store){
					this.getStoreList()
				}
			}
			
		},
		onShow(){
			this.$fire.on('man',result=>{
				this.selectman=result;
			})
		}

	}
</script>

<style lang="less">
	.company-item{
		padding:20upx 30upx;
	}
	.company-item>view:nth-child(2)>view:first-child{
		margin-bottom:10upx;
	}
	.target-item{
		height:106upx;
		line-height:106upx;
		padding:0 30upx;
	}
	.target-item>view:nth-child(2)>view{
		margin-right:10upx;
	}
	.choose-img{
		width:40upx;
		height:40upx !important;
		margin-right:10upx;
		vertical-align: middle;
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
	
	
</style>
