<template>
	<view>
		<view class="search-container">
			<view class="flex justify-between search-item">
				<view class="title">选择城市</view>
				<addressed @changes="childClick($event)" :isShow="true"></addressed>
			</view>
			<view class="flex justify-between search-item">
				<view class="title">选择品牌类型</view>
				<view @click="showShopCatalog()">
					{{category.name}}
					<text class="cuIcon-right" ></text>
				</view>
			</view>
		</view>
		<view class="shop-list">
			<scroll-view scroll-y style="height:600px;">
				<view v-for="(item,index) in shopList" :key="index" class="shop-item"
					:class="{'bg-gray':shopIndex==item.id}"
				 @click="chooseShop(item)">
					<view class="shop-name flex justify-between">
						<view>
							<text class="text-blue"  style="margin-right:10px;font-size:16px;">
								{{item.name}} 
							</text>
							<text class="cuIcon-brand text-green" v-if="item.brandName" style="margin-right:3px;"></text>
							<text class="text-green" v-if="item.brandName">{{item.brandName}}</text>
						</view>
						
						<!-- <text class="cu-tag round" style="font-size:12px;height:20px;"
						:class="{
							'bg-pink':item.status==shopStatus.ready,
							'bg-blue':item.status==shopStatus.processing,
							'bg-green':item.status==shopStatus.businessing,
							'bg-red':item.status==shopStatus.canceled,
							'bg-orange':item.status==shopStatus.renovated,
							'bg-purple':item.status==shopStatus.moved,
						}"
						>{{item.status | shopStatus}}</text> -->
					</view>
					<view v-if="item.contactor || item.managerName" style="margin-bottom:10px;">
						<text class="cuIcon-people" style="font-size:15px;margin-right:10px;color:orange"></text>
						<text>{{item.contactor || item.managerName}}</text> <text style="color:purple;margin:5px;">|</text><text>{{item.managerMobile || item.telephone}} </text>
					</view>
					<view class="shop-address text-gray">
						<text class="cuIcon-location" style="font-size:14px;margin-right:8px;"></text><text>{{item.provinceName || ''}}{{item.cityName ||''}}{{item.districtName || ''}}{{item.address ||''}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="cu-modal" :class="isShow?'show':''" @tap="hideModal()">
			
			<view class="cu-dialog" @tap.stop="">
				<view style="padding:10px 0;">选择收件人</view>
				<radio-group class="block" @change="RadioChange($event)">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in shopMaleList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.name}} <text style="margin:0px 10px;color:blue;font-size:14px">|</text>{{item.account}}</view>
								<radio class="round" 
								:class="radio=='radio' + item.id?'checked':''" 
								:checked="radio=='radio' + item.id?true:false"
								 :value="'radio' + item.id"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		
	</view>
</template>
<script>
	import addressed from '../../../../components/jm-address/jm-address.vue'
	export default{
		data(){
			return{
				isShow:false,
				shop:{},
				category:{
					name:'',
					id:''
				},
				shopList:[],
				isChoseCity:false,
				shopStatus:this.$store.state.shopStatusZn,
				shopIndex:-1,
				shopMaleList:[],
				radio:'',
				shopMaleID:'',
				cat:'',//用于区分调拨还是快递（调拨不显示弹出框）
				
			}
		},
		components:{
			addressed
		},
		methods:{
			RadioChange(event){
				this.shopMaleID=event.detail.value.substr(5,)
				this.isShow=false;
				setTimeout(()=>{
					uni.navigateBack({
						delta:2,
						success:(res)=>{
							this.$fire.fire('shop',{
								shopID:this.shopIndex,
								shopMaleID:this.shopMaleID,
								type:'receive'
							})
						}
					})
				},500)
			},
			hideModal(){
				this.isShow=false;
			},
			chooseShop(item){
				this.shopIndex=item.id;
				if(this.cat=='distribute'){
					setTimeout(()=>{
						uni.navigateBack({
							delta:2,
							success:(res)=>{
								this.$fire.fire('shopID',item.id)
							}
						})
					},500)
				}else if(this.cat=='distribute_send'){
					setTimeout(()=>{
						uni.navigateBack({
							delta:2,
							success:(res)=>{
								this.$fire.fire('sendShop',{
									shopID:item.id
								})
							}
						})
					},500)
				}else if(this.cat=='log'){
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,
							success:(res)=>{
								this.$fire.fire('shop',{
									shopID:item.id
								})
							}
						})
					},500)
				}else if(this.cat=='chooseShop'){
					this.$ajax('ChooseShop',{shop:item.id},res=>{
						setTimeout(()=>{
							uni.navigateBack({
								delta:2,
								// success:(res)=>{
								// 	this.$fire.fire('chooseShop',{
								// 		shopID:item.id
								// 	})
								// }
							})
						},500)
					})
					
				}else{
					this.isShow=true;
					this.$ajax('ShopSalesmen',{shop:item.id},res=>{
						this.shopMaleList=res
					})
				}
				
				
			},
			showShopCatalog(){
				uni.navigateTo({
					url:'../category-item/category-item'
				})
			},
			chooseBrand(id){
				this.$ajax('ProprietorShops',{
					brand:id,
					offset:0,
					zone:-1,
					status:this.cat=='chooseShop'?3:'',
					province:this.shop.provinceID,
					city:this.shop.cityID,
					district:this.shop.districtID
				},res=>{
					this.shopList=res;
				})
			},
			childClick(event){
				this.shop={
					provinceID:event.provinceID,
					provinceName:event.province,
					cityID:event.cityID,
					cityName:event.city,
					districtID:event.districtID,
					districtName:event.district
				}
				this.isChoseCity=true;
				this.$ajax('ProprietorShops',{
					brand:this.category?this.category.id:0,
					offset:0,
					zone:-1,
					status:this.cat=='chooseShop'?3:'',
					province:this.shop.provinceID,
					city:this.shop.cityID,
					district:this.shop.districtID
				},res=>{
					this.shopList=res;
				})
			}
		},
		onLoad(options){
			console.log(options)
			if(options.cat){
				this.cat=options.cat;
			}
			this.$fire.on('category',result=>{
				this.category.name=result.name;
				this.category.id=result.id;
				this.chooseBrand(this.category.id);
			})
		},
	}
</script>
<style lang="less">
		page{
			background:#fff
		}
		.search-container{
			padding:5px 15px;
			.search-item{
				padding:10px;
				border-bottom:1px solid #EEEEED;
				.title{
					font-size:13px;
				}
			}
			
		}
		.shop-list{
			.shop-item{
				border-radius: 10px;
				margin:10px 15px;
				padding:10px 15px;
				font-size:13px;
				border:1px solid #EEEEED;
				.shop-name{
					font-size:12px;
					margin-right:10px;
					color:gray;
					margin-bottom:10px;
				
				}
				.shop-address{
					font-size:11px;
				}
			}
		}
</style>