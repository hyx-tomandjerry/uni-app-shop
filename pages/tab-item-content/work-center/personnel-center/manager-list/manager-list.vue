<template>
	<view>
		<view style="padding:20px 16px 14px;" class="bg-white">
			<view class="flex justify-between " style="padding-bottom:17px;">
				<view class="position_relative" style="width:88%;">
					<input type="text" placeholder="搜素姓名或者手机号" style="background:rgba(247,247,247,1);
					border-radius:17px;padding-left:52px;height:34px;">
								<image src="../../../../../static/icon/inner-search.png" style="width:17px;height:17px;vertical-align: middle;position: absolute;left:22px;bottom:8px;"></image>
								<image src="../../../../../static/icon/inner-close.png" style="width:17px;height:17px;vertical-align: middle;position: absolute;right:10px;bottom:8px;"></image>
				</view>
				
				<view class="font-size-big font-weight-normal color-placeholder" style="margin-left:6px;padding-top:6px;">搜索</view>
			</view>
		</view>
		<view style="height:13px;background:#EEEEED"></view>
		<view class="manager-list bg-white">
			<view v-if="managerList.length>0">
				<view class="flex justify-between font-size-small font-weight-normal color-normal manager-item borderBottom" v-for="(item,index) in managerList " :key="index">
					<view>{{item.name}}</view>
					<view>
					<image :src="TabCur==item.id?'../../../../../static/icon/radio.png':'../../../../../static/icon/choose.png'" style="width:20px;height:20px;border-radius: 50%;;" @click="chooseManager(item)"></image>
						
					</view>
				</view>
			</view>
			<view v-else>
				<LxEmpty></LxEmpty>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	export default {
		data() {
			return {
				managerList:[],
				page:1,
				TabCur:-1,
			}
		},
		components:{
			uniLoadMore,
			LxEmpty
		},
		methods: {
			chooseManager(item){
				console.log(item)
				this.TabCur=item.id;
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('manager',{
							id:item.id,
							name:item.name
						})
					}
				})
			},
			getManagerList(){
				this.$ajax('Users',{
					team:-1,
					status:-1,
					offset:this.$utils.getOffset(this.page),
					type:1,
					key:''
				},res=>{
					this.managerList=res;
				})

			}
		},
		onLoad(){
			this.getManagerList()
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.manager-item{
		
		padding:16px 20px 10px 17px;
	
	}
</style>
