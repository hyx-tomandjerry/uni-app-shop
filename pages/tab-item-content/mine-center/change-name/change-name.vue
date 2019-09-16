<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back" style="font-size:19px;" @click.stop="goBack()"></text><text style="margin-left:10px;">更改昵称</text></block>
			<block slot="right">
				<text class="cu-tag bg-gradual-green round" @click="changeName()">保存</text>
			</block>
		</cu-custom>
		<view class="name-content">
			<input type="text" v-model="name" style="color:#000;border-bottom:1px solid #39B54A;padding:0px 0 10px 10px;">
			<view style="padding-top:10px;font-size:12px;" class="text-gray">好的名字可以让你的朋友更容易记住你</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:''
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			changeName(){
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('name',this.name)
					}
				})
			}
		},
		onLoad(){
			uni.getStorage({
				key:'userInfo',
				success: (res) => {
					this.name=res.data.name
				}
			})
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
	.name-content{
		padding-top:25px;
		padding-right:15px;
		padding-left:15px
	}
</style>
