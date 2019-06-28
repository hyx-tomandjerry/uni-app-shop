<template>
	<view>
		<cu-custom :isBack="true" >
			<block slot="left"><text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text></block>
			<block slot="content">编辑签名</block>
			<block slot="right">
				<text class="cu-tag bg-gradual-green round" @click="submit()">提交</text>
			</block>
		</cu-custom>
		<view class="content" style="padding:14px 10px;">
			<textarea  placeholder="输入自己的签名" v-model="motto"
				style="background:#EEEEED;width:100%;border-radius: 15px;padding:10px;20px;"
			/>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				motto:''
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			submit(){
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('motto',this.motto)
					}
				})
			}
		},
		onLoad(options){
			this.motto=options.content;
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
</style>
