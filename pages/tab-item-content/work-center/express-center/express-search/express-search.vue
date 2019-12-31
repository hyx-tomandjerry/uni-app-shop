<template>
	<view>
		<express-item 
			:isShow="isShow"
			:expressDetail="expressDetail"
			@cancel="cancelOrder"
			@showTrack="isShow=true"
			v-if="expressDetail.id"></express-item>
	</view>
</template>

<script>
	import expressItem from '../../../../../components/express/express-item.vue'
	export default {
		components:{expressItem},
		data() {
			return {
				req:'',
				expressDetail:{},
				isShow:false
			}
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				this.clearInput()
			}
		},
		onNavigationBarSearchInputConfirmed(event){
			this.getItemInfo()
		},
		onNavigationBarSearchInputChanged(event){
			this.seq=event.text;
		},
		methods: {
			cancelOrder(){
				uni.navigateBack({
					delta:1
				})
			},
			getItemInfo(){

				uni.navigateTo({
					url:"../express-item/express-item?id=100038"
				})
			},
			clearInput(){
				// #ifdef APP-PLUS
				 let webView=this.$mp.page.$getAppWebview();
				 webView.setTitleNViewSearchInputText("")
				// #endif			
			},
		}
	}
</script>

<style>

</style>
