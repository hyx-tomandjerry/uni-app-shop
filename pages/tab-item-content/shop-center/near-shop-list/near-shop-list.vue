

 <template>
 	<view>
		<view class="shop-content bg-white">
			<scroll-view scroll-y="true" >
				<view class="shop-list-item" v-for="(item,index) in shopList" :key="index" @click="choseShop(item)">
					<view class="shop-item-name flex justify-between">
					<view>
						<text class="cuIcon-shop" style="margin-right:8px;"></text><text>{{item.name}}</text>
					</view>

					<text class="text-blue cuIcon-brand" v-if="item.catalogName">{{item.catalogName}}</text>

					</view>
					<view style="width:100%" class=".shop-item-address">
						<text class="cuIcon-location" style="margin-right:5px;"></text>
						<text style="text-align:left;font-size:11px" >
							{{item.provinceName || ''}}{{item.cityName || ''}}{{item.districtName||''}}{{item.address}}
						</text>

					</view>
					<!-- <view class="cu-tag line-blue text-blue" v-if="item.catalogName">品牌名称</view> -->
				</view>
			</scroll-view>
		</view>
		
		<view v-if="type=='express'" style="position:fixed;bottom:0px;width:100%">
			<view v-if="cat=='send'">
				<view class="cu-btn" style="width:100%;background:lightgray;" @click="searchMore()">搜索更多</view>
			</view>
			<view v-if="cat=='receive'">
				<view class="cu-btn" style="width:30%;background:lightgreen;" @click="searchMore()">搜索更多</view>
				<view class="cu-btn" style="width:30%;background:lightgray;" @click="chooseStore()">选择仓库</view>
				<view class="cu-btn bg-orange text-white" style="width:40%" @click="createAddress()"
				><text class="cuIcon-add" style="font-size:15px;margin-right:5px;"></text>创建新地址</view>
			</view>
		</view>
 	</view>
 </template>
 <script>
 	export default{
 		data(){
 			return{
				shopList:[],
				shopAddress:'',
				type:'',
				cat:'',
				shopID:''
 			}
 		},
 		components:{

 		},
 		onLoad(options){
			console.log(options)
			this.type=options.type;
			this.cat=options.cat;
			if(options.shop){
				this.shopID=options.shop
			}
			this.getNearShopList()
 		},
		methods:{
			chooseStore(){},
			//搜索更多
			searchMore(){
				uni.navigateTo({
					url:'../search-more-shop/search-more-shop'
				})
			},
			//新建地址
			createAddress(){
				uni.navigateTo({
					url:"../../work-center/express-center/create-address/create-address"
				})
			},
 		    getNearShopList(){
				if(this.cat=='receive'){
					 this.$ajax('IntraCityShops',{
					    shop:this.shopID
					},res=>{
					    this.shopList=res
						console.log(this.shopList)
					})
				}else{
					this.$ajax('MyShops',{
					    address:''
					},res=>{
					    this.shopList=res
						console.log(this.shopList)
					})
				}
                
			},
			choseShop(item){
				uni.navigateBack({
					delta:1,
					success: (res) => {
						this.$fire.fire('shop',item)
					}
				})
			}
		}
 	}
 </script>
 <style lang="less">
	 uni-page{
	 	background:#fff;
	 }
	 .shop-list-item{
		 padding:16px 9px 17px 14px;
		 margin:3px 4px;
		 border:1px solid #EEEEED;
		 border-radius:5px;
		 .shop-item-name{
				font-size:15px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(42,42,42,1);
				margin-bottom:7px;
		 }
		 .shop-item-address{
				font-size:13px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(137,136,136,1);
				margin-bottom:8px;
		 }
	 }
 		// .header{
 		// 	padding: 44px 15px 10px 15px;
 		// 	line-height:15px;
 		// 	align-items: center;
 		// 	border-bottom:1px solid #EEEEED;
 		// 	.title{
 		// 		font-size:16px;
 		// 		font-family:PingFangSC-Semibold;
 		// 		font-weight:600;
 		// 		color:rgba(42,42,42,1);
 		// 	}
			// .chose{
			// 	font-size:14px;
			// 	font-family:PingFangSC-Regular;
			// 	font-weight:400;
			// 	color:rgba(42,42,42,1);
			// }
 		// }
		.shopImg{
			width:103px;
			height:79px;
			margin-right:17px;
		}
		.shop-name{
			font-size:16px;
			font-family:'PingFangSC-Regular';
			font-weight:400;
			color:rgba(42,42,42,1);
			margin-bottom:10px;
		}
		.shop-desc{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(137,136,136,1);
			margin-bottom:10px;
		}
		.img15{
			width:15px;
			height:15px;
			margin-right:5px;
		}
		.noManager{
			margin-top:5px;
			margin-bottom:20px;
		}
 </style>
