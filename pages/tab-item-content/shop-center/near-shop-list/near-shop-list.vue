

 <template>
 	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >选择门店</view></block>
		</cu-custom>
		<view class="shop-content borderTop" v-if="shopList.length">
			<block v-for="(item,index) in shopList" :key="index">
				<shopListItem :item="item" :index="index"  @checkShopDetail="choseShop"></shopListItem>
			</block>
			<uni-load-more :contentText="content" :showIcon="true" v-if="shopList.length" :status="loading"></uni-load-more>
		</view>
		<view v-else>
			<lx-empty></lx-empty>
		</view>
		<showModel :isShow="modalName=='shopModal'" @hideModel="hideShopModel" @confirmDel="hideShopModel" v-if="modalName=='shopModal'">
			<block slot="content">该门店没有营业，不能进行操作!</block>
		</showModel>
		
 	</view>
 </template>
 <script>
	 import LxEmpty from '../../../../lx_components/lx-empty.vue'
	 import {mapState} from 'vuex'
	 import showModel from '../../../../components/show-model.vue'
	 import uniLoadMore from '../../../../components/uni-load-more.vue'
	 import shopListItem from '../../../../components/shop-list-item.vue'
 	export default{
		computed:mapState(['userInfo','shopStatusZn']),
 		data(){
 			return{
				shopList:[],
				cat:'',//用于判断是新建报修还是工作日志
				shopIndex:-1,//用于选中门店，突出颜色
				articleID:'',//用于筛选要回执的门店
				page:1,
				modalName:'',
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
					},
				loading:'more',
				

 			}
 		},
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.page=1;
				this.getNearShopList()
			},900)
		},
		onReachBottom(){
					this.page++;
					this.loading='loading';
					setTimeout(()=>{
						if(this.cat=='createOrder'){
							this.$ajax('MyShops',{
								address:'',
								offset:this.$utils.getOffset(this.page)
							},res=>{
								if(res==''){
									setTimeout(()=>{
										this.loading='noMore'
									},900)
								}else{
									res.forEach(item=>{
										this.shopList=this.shopList.concat(item)
									})
									this.loading='loading';
									setTimeout(()=>{
										this.loading='noMore'
									},900)
								}
							
							})
						}else if(this.cat=='article'){
							this.$ajax('ShopsByReport',{
								user:this.userInfo.id,
								id:this.articleID,
								offset:this.$utils.getOffset(this.page)
							},res=>{
								if(res==''){
									setTimeout(()=>{
										this.loading='noMore'
									},900)
								}else{
									res.forEach(item=>{
										this.shopList=this.shopList.concat(item)
									})
									this.loading='loading';
									setTimeout(()=>{
										this.loading='noMore'
									},900)
								}
															
							
							})
						}
					},1000)
				
				},
 		components:{
			LxEmpty,showModel,uniLoadMore,shopListItem
 		},
 		onLoad(options){
			
			this.cat=options.cat;
			console.log(options)
			if(options.id){
				this.articleID=options.id;
			}
			this.getNearShopList()
 		},
		methods:{
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			hideShopModel(){
				if(this.modalName){
					this.modalName=null;
				}
			},
 		    getNearShopList(){
				// 新建报修或者报销申请
				if(this.cat=='createOrder' || this.cat=='apply'){
					this.$ajax('MyShops',{
						address:'',
						offset:this.$utils.getOffset(this.page)
					},res=>{
						this.shopList=res

					})
				}else if(this.cat=='article'){
					// 新建文章回执
					this.$ajax('ShopsByReport',{
						user:this.userInfo.id,
						id:this.articleID,
						offset:this.$utils.getOffset(this.page)
					},res=>{
						this.shopList=res;

					})
				}

			},
			
			choseShop(item){
				if(this.cat=='article'){
					this.shopIndex=item.id;
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,
							success:(res)=>{
								this.$fire.fire('articleShop',item)
							}
						})
					},500)
				}else if(item.status!==this.shopStatusZn.businessing){
					this.modalName='shopModal';
				}else if(this.cat=='createOrder' || this.cat=='apply'){
					//新建报修选择门店
					this.shopIndex=item.id;
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,
							success:(res)=>{
								this.$fire.fire('createOrderShopID',item.id)
							}
						})
					},500)
				}
				

			}
		}
 	}
 </script>
 <style lang="less">
	page{
	 	background:rgba(247,247,247,1);
	 }
	 .shop-list-item{
		 margin-bottom:13px;
		 padding:18px 10px 23px 14px;
		 width:100%;
		 .shop-img-area{
			 width:30%;
			 margin-right: 10px;
			.shop-img{
				height:86px;
				border-radius:6px;		 
			} 
		 }
		 .shop-info-area{
			 margin-top: -10px;
			 .shop-tag{
				 width:18px;
				 height: 18px;
				 margin-left: 5px;
			 }
			 .shop-tag-canceled{
				 width: 56px;
				 height: 18px;
				 margin-left: 5px;
			 }
		 }
		 
	 }





 </style>
