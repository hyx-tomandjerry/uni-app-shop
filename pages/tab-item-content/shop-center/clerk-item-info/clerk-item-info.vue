<template>
	<view class="clerk-item-container" >
		<view class="user-info-container position_relative">
			<image :src="clerkItem.headurl?clerkItem.headurl:'../../../../static/img/default.png'" mode="" class="user-info-img"></image>
			<text class="cuIcon-back font-size-back position_absolute arrow-back color-normal" @tap="goBack" style="left:15px;top:15px;"></text>
			<view class="name align-center flex justify-start">
				<text class="font-size-supper font-weight-bold text-white">{{clerkItem.name || ''}}</text>
				<text class="status-tag">在职</text>
			</view>
		</view>
		<view class="clerk-info-container bg-white">
			<view class="clerk-info-item flex justify-between borderBottom">
				<view>门店名称</view>
				<view>{{shopItem.name}}</view>
			</view>
			<view class="clerk-info-item flex justify-between borderBottom">
				<view>手机号</view>
				<view>{{clerkItem.account}}</view>
			</view>
			<view class="clerk-info-item flex justify-between borderBottom">
				<view>职位</view>
				<view>{{shopItem.manager==clerkItem.id?'店长':'店员'}}</view>
			</view>
		</view>
		<!-- v-if="shopItem.manager==userInfo.id && clerkItem.id!=shopItem.manager" -->
		<view class="operate-container bg-white" v-if="shopItem.manager==userInfo.id && clerkItem.id!=shopItem.manager">
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
			<block slot="content">确定要将{{clerkItem.name}}删除吗?</block>
		</showModel>
	</view>


</template>

<script>

	import {mapState} from 'vuex'
	import showModel from '../../../../components/show-model.vue'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				clerkItem:"",//店员信息
				shopItem:"",//门店信息
				modalName:''
			}
		},
		components:{showModel},
		methods: {
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
				this.modalName='deleteModel'
			},
			// 确认删除店员
			confirmDelete(){
				this.$ajax('RemoveSalesman',{
					shop:this.shopItem.id,
					users:this.clerkItem.id,
				},res=>{
					uni.showToast({
						title:'删除店员成功',
						icon:'none'
					})
					this.hideModal();
					this.goBack()
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},

		},
		onLoad(){

			this.$fire.on('clerk',result=>{
				if(result){
					this.shopItem=result.shopItem;
					this.clerkItem=result.clerkItem
				}
			})
		},

	}
</script>

<style lang="less">
	.user-info-container{
		.user-info-img{
			width:100%;
			border-radius: 0;
			height:267px;
		}rank
		.arrow-back{
			left:20px;
			top:45px;
		}
		.name{
			position:absolute;
			bottom:15px;
			left:25px;
			.status-tag{
				margin-left:20upx;
				background:rgba(32,208,158,1);
				border-radius:13px;
				font-size:22upx;
				color:#fff;
				padding:0px 10upx;
			}
		}

	}
	.clerk-info-container{
		margin-bottom: 60px;
		.clerk-info-item{
			height:53px;
			line-height:53px;
			padding:0 15px;
		}
	}
	.operate-container{
		.operate-item{
			height:53px;
			line-height:53px;
			text-align: center;
		}
	}
</style>
