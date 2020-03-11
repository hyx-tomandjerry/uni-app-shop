<template>
	<view class="clerk-item-container position_relative" :style="{height:screenHeight+'px'}">
		<clerk-info-head :clerkItem="clerkItem"></clerk-info-head>
		
		<view class="clerk-info-container bg-white">
			<common-flex leftContent="门店名称" :rightContent="shopItem.name" :isRed="false"></common-flex>
			<common-flex leftContent="手机号码" :rightContent="clerkItem.account" :isRed="false"></common-flex>
			<common-flex leftContent="工作状态" :isColorBlue="true"
				:rightContent="clerkItem.status | userStatusZnPipe" 
				:isRed="false"></common-flex>
			<common-flex  :shopItem="shopItem" :clerkItem="clerkItem"  :isRed="false" type="job" :clerkTab="clerkTab"></common-flex>
		</view>
		<view class="flex justify-around" v-if="clerkItem.status == userStatus.applying && shopItem.manager==userInfo.id && clerkTab==1">
			<view class="text-center" @tap="setJoin('refuse')">
				<image src="../../../../static/img/shop/clerk/refuse.png" mode="widthFix" class="agree-img"></image>
				<view>拒绝加入</view>
			</view>
			<view class="text-center"  @tap="setJoin('agree')">
				<image src="../../../../static/img/shop/clerk/agree.png" mode="widthFix" class="agree-img"></image>
				<view>同意加入</view>
			</view>
		</view>		
		<!-- 右上方弹框 -->
		<top-right-pupop
			@operateItem="operateClerk"
			@hideModel="hideModel"
			:statusHeight="statusHeight"
			:topRightList="topRightList"
			:isShowModel="isShowModel"></top-right-pupop>
	</view>


</template>

<script>

	import {mapState} from 'vuex'
	import clerkInfoHead from '../../../../components/shop/clerk-info-head.vue'
	import commonFlex from '../../../../components/common/common-flex.vue'
	import topRightPupop from '../../../../components/shop/top-right-pupop.vue'
	import {ChainShopApi,ShopSalesmenApi,UsersApi,SetShopManagerApi} from '../../../../api/shop_api.js'
	import {RemoveSalesman} from '../../../../api/common_api.js'
	import {AcceptSalesmanApi} from '../../../../api/shop_api.js'
	export default {
		computed:{
			...mapState(['userInfo']),
			userStatus(){return this.config.userStatus}},
		components:{clerkInfoHead,commonFlex,topRightPupop},
		data() {
			return {
				clerkItem:{},//店员信息
				shopItem:{},//门店信息
				clerkTab:1,
				clerkID:'',
				statusHeight:44,
				isShowModel:false,
				screenHeight:500,
				topRightList:[]
			}
		},
		onNavigationBarButtonTap(event){
			if(this.clerkTab==2) return;
			if(event.index==0){
				if(this.shopItem.manager==this.userInfo.id && this.clerkItem.status==this.userStatus.normal){
					//如果是店长
					this.topRightList=[
						{name:'设为店长',img:'../../../../static/img/shop/clerk/clerk.png',value:'manager'},
						{name:'删除店员',img:'../../../../static/img/shop/clerk/manager.png',value:'delete'},
					]
					this.isShowModel=!this.isShowModel;
				}else{
					this.isShowModel=false;
				}
				
			}
		},
		methods: {
			hideModel(){
				this.isShowModel=false;
			},
			async setJoin(type){
				
				switch(type){
					case 'agree':
					if(await AcceptSalesmanApi(this.shopItem.id,this.clerkItem.id,0)){
						this.$utils.showToast('店员加入成功')
						this.$utils.goBack()
					}
					break;
					case 'refuse':
						uni.showModal({
							content:`确定要拒绝${this.clerkItem.name}加入?`,
							success: (res) => {
								if(res.confirm){
									if(AcceptSalesmanApi(this.shopItem.id,this.clerkItem.id,1)){
										this.$utils.showToast('拒绝加入')
										this.$utils.goBack()
									}
								}
							}
						})
					break;
				}
			},
			//同意或者拒绝
			operateClerk(type){
				this.isShowModel=false;
				switch(type){
					case 'agree':
						this.setJoin(type)
					break;
					case 'refuse':
						this.setJoin(type)
						
						
					break;
					case 'manager':
						this.setManager()
					break;
					case 'delete':
						this.deleteClerk()
						break;
				}
			},
			//设置店长
			async setManager(){
				uni.showModal({
				    content: `确定要将${this.clerkItem.name}设置店长?`,
				    success:(res)=> {
				        if (res.confirm) {
							if( SetShopManagerApi(this.shopItem.id,this.clerkItem.id)){
								this.$utils.showToast('设置店长成功');
								this.$utils.goBack();
							}
				        }
				    }
				});
			},
			//删除店员
			 deleteClerk(){
				uni.showActionSheet({
				    itemList: ['从公司彻底删除', '从门店删除'],
				    success:(res)=> {
						if(res.tapIndex!=2){
							let num=res.tapIndex+1;
							uni.showModal({
							    content: `确定要将${this.clerkItem.name}从${num==1?'公司':'门店'}删除吗`,
							    success:(res)=> {
							        if (res.confirm) {
										let val={
											shop:num==1?0:this.shopItem.id,
											users:this.clerkItem.id,
											permanent:num==1?1:0
										}
										if(RemoveSalesman(val)){
											this.$utils.showToast('删除店员成功')
											this.$utils.goBack()
										}
							           
							        } 
							    }
							});
						}
				    }
				});
			},
			async checkShopDetail(id){
				this.shopItem = await ChainShopApi(id);
				this.findClerkItem()
			
			},
			//找到选择的门店或者区域人员
			async findClerkItem(){
				let result =[]
				switch(Number(this.clerkTab)){
					case 1:
						result = await ShopSalesmenApi(this.shopItem.id);
						this.clerkItem=result.find(item=>item.id==this.clerkID)
					break;
					case 2:
						result = await UsersApi(this.shopItem.zone)
						this.clerkItem=result.find(item=>item.id==this.clerkID)
					break;
				}
				
			},

			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(options){
			uni.getSystemInfo({
				success:(res)=>{
					this.statusHeight=res.statusBarHeight+uni.upx2px(40);
					this.screenHeight=res.windowHeight
				}
			})
			this.clerkTab=Number(options.clerkTab);
			this.clerkID=Number(options.clerkID)
			this.checkShopDetail(options.shopID);
		},

	}
</script>

<style scoped>
	.mask{
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		height:100%;
		background:rgba(0,0,0,0.2)
	}
	.model-content{
		background:#FFFFFF;
		width:300upx;
		border-radius: 10upx;
		position:fixed;
		right:40upx;
		z-index:10000000000000
	}
	.model-content view{
		height:100upx;
		font-size:15px;
		line-height:100upx;
		padding:0upx 16upx;
		border-bottom:1px solid #EEEEED;
	}
	.model-content>view>text{
		margin-right:20upx;
		font-size:18px;
	}
	.clerk-info-container{
		margin-bottom: 120upx;
		
	}
	.operate-item{
		height:106upx;
		line-height:106upx;
		text-align: center;
	}
	.agree-img{
		width:58px;
		height:58px !important;
	}
</style>
