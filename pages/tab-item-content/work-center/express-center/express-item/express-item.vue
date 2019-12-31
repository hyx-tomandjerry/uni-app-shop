<template>
	<view>
		<express-item 
		:expressDetail="expressDetail" 
		@cancel="cancelOrder"
		@orderComplaint="orderComplaint"
		:isShow="isShow"></express-item>
	
	</view>
</template>
<script>
	import expressItem from '../../../../../components/express/express-item.vue'
	import {WaybillApi,CancelComplaintApi} from '../../../../../api/express_api.js'
	export default{
		components:{expressItem},
		data(){
			return{
				expressDetail:{},
				isShow:false,
				showLoad:false,
				expressID:''
			}
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				uni.navigateTo({
					url:"../package-track/package-track?id="+this.expressDetail.id
				})
			}
		},
		onShow(){this.getItemInfo(this.expressID)},
		methods:{
			async orderComplaint(){
				switch(this.expressDetail.complaint){
					case 0:
					//要申诉
					uni.showModal({
						content:'确定要申诉?',
						success: (res) => {
							if(res.confirm){
								uni.navigateTo({
									url:"../complaint/express-complaint/express-complaint?id="+this.expressDetail.id
								})
							}
						}
					})
					break;
					default:
					if(await CancelComplaintApi(this.expressDetail.id)){
						this.$utils.showToast('取消申诉')
						this.$utils.hide()
						
					}

				}
				
				
			},
			hideLoad(){
				this.showLoad=false;
			},
			cancelOrder(){
				this.$utils.goBack()
			},
			async getItemInfo(id){
				this.expressDetail = await WaybillApi(id)
			},
			
				
		},
		onLoad(options){
			if(options){
				this.expressID=options.id;
				this.getItemInfo(options.id);
			}
		}
	}
</script>
<style scoped>
	
</style>