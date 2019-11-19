<template>
	<view class="clerk-item-container" >
		<clerk-info-head :clerkItem="clerkItem"></clerk-info-head>
		
		<view class="clerk-info-container bg-white">
			<clerk-info-item intro="门店名称" :content="shopItem.name"></clerk-info-item>
			<clerk-info-item intro="手机号码" :content="clerkItem.account"></clerk-info-item>
			<clerk-info-item intro="工作状态" content="在职"></clerk-info-item>
			<clerk-info-item  type="job" :shopItem="shopItem" :clerkItem="clerkItem"></clerk-info-item>
		</view>
		<!-- v-if="shopItem.manager==userInfo.id && clerkItem.id!=shopItem.manager" -->
		<view class="operate-container bg-white" v-if="shopItem.manager==userInfo.id && clerkItem.id!=shopItem.manager  && clerkItem.motto!='manager'">
			<view class="operate-item color-blue borderBottom" @click="setManager">设为店长</view>
			<view class="operate-item color-red" @click="deleteClerk">删除</view>
		</view>
		
		<!-- 设置店长 -->
		<showModel :isShow="modalName=='setModel'" @hideModel="hideModal" @confirmDel="setShoper" v-if="modalName=='setModel'">
			<block slot="content">	确定要将{{clerkItem.name}}设置店长吗?</block>
		</showModel>
		<!-- //删除店员 -->
		<showModel :isShow="modalName=='deleteModel'" @hideModel="hideModal"
				   v-if="modalName=='deleteModel'"
				   @confirmDel="confirmDelete">
			<block slot="content">确定要将{{clerkItem.name}}从{{selectIndex==1?'公司':'门店'}}删除吗?</block>
		</showModel>
	</view>


</template>

<script>

	import {mapState} from 'vuex'
	import showModel from '../../../../components/show-model.vue'
	import clerkInfoHead from '../../../../components/shop/clerk-info-head.vue'
	import clerkInfoItem from '../../../../components/shop/clerk-info-item.vue'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				clerkItem:{},//店员信息
				shopItem:{},//门店信息
				modalName:'',
				selectIndex:0,	
			}
		},
		components:{showModel,clerkInfoHead,clerkInfoItem},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//设置店长
			setManager(){
				this.modalName='setModel'
			},
			//确认设置店长
			setShoper(){
				this.$ajax('SetShopManager',{
					shop:this.shopItem.id,
					user:this.clerkItem.id
				},res=>{
					uni.showToast({
						title:'设置店长成功',
						icon:'none'
					})
					this.hideModal()
					this.goBack()
				})
			},
			hideModal(){
				this.modalName=null;
			},
			//删除店员
			deleteClerk(){
				// this.modalName='deleteModel'
				uni.showActionSheet({
				    itemList: ['从公司彻底删除', '从门店删除', '取消'],
				    success:(res)=> {
						this.selectIndex=res.tapIndex+1;
						switch(res.tapIndex+1){
							case 1:
							this.modalName='deleteModel'
							break;
							case 2:
							this.modalName='deleteModel'
							break;
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			checkShopDetail(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shopItem=res;
					console.log(res.manager)
				})
			
			},
			// 确认删除店员
			confirmDelete(){
				this.$ajax('RemoveSalesman',{
					shop:this.selectIndex==1?0:this.shopItem.id,
					users:this.clerkItem.id,
					permanent:this.selectIndex==1?1:0
				},res=>{
					uni.showToast({
						title:'删除店员成功',
						icon:'none'
					})
					this.hideModal();
					this.goBack()
				})
			},
		},
		onLoad(options){
			if(options.shopID){
				this.checkShopDetail(options.shopID)
			}
			this.clerkItem=options.clerkItem?JSON.parse(options.clerkItem):{};
			console.log(this.clerkItem)
		},

	}
</script>

<style lang="less">
	
	.user-info-img{
		background-color: #fff;
		width:200upx;
		height:200upx !important;
		border-radius: 100%;
		flex-shrink: 0;
		position:absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
	}
	
	.user-info-container{
		height:500upx;
		.arrow-back{
			left:80upx;
			top:90upx;
		}
		.name{
			position:absolute;
			bottom:15px;
			left:25px;
			
		}

	}
	.clerk-info-container{
		margin-bottom: 60px;
		
	}
	.operate-container{
		.operate-item{
			height:53px;
			line-height:53px;
			text-align: center;
		}
	}
</style>
