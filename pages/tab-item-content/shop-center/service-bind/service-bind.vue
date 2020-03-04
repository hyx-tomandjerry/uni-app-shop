<template>
	<view class="service-container">
		<template v-if="fromType=='camera' &&serviceItem">
			<view class="service-info">
				<normal-detail-item
						leftIntro="uuid"  :leftPadding="true"
						:rightContent="serviceItem.uuid || ''" :marginBottom="true"></normal-detail-item>	
				
				<normal-detail-item
						leftIntro="入库时间"  :leftPadding="true"
						:rightContent="serviceItem.buyDate | formatTime('YMDHMS') " :marginBottom="true"></normal-detail-item>	
			</view>
						
		</template>
		<template v-else-if="fromType=='cpe' && serviceItem">
			<normal-detail-item
					leftIntro="设备序列号"  :leftPadding="true"
					:rightContent="serviceItem.seq" :marginBottom="true"></normal-detail-item>	
					<normal-detail-item
							leftIntro="SIM卡序列号"  :leftPadding="true"
							:rightContent="serviceItem.sim" :marginBottom="true"></normal-detail-item>	
			<normal-detail-item
					leftIntro="购买时间"  :leftPadding="true"
					:rightContent="serviceItem.buyDate | formatTime('YMDHMS') " :marginBottom="true"></normal-detail-item>	
		</template>
		<template v-else>
			<LxEmpty></LxEmpty>
		</template>
			<common-btn-one 
				type="primary"
				:content="fromType=='change'?'更换':'绑定'"
				@operateBtn="bindService" :isPos="true"></common-btn-one>			
	</view>
</template>

<script>
	import LxEmpty from '../../../../lx_components/lx-empty.vue'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import normalDetailItem from '../../../../components/common/normal-detail-item.vue'
	import {BindCameraApi,CameraApi,ActivateRouterApi,RouterApi,ReplaceRouterApi} from '../../../../api/shop_api.js'
	export default {
		components:{LxEmpty,commonBtnOne,normalDetailItem},
		data() {
			return {
				fromType:'',//设备类型
				shopID:'',//门店id
				serviceItem:null,
				uuid:'',
				seq:''
			}
		},
		onLoad(options){
			if(options.type){
				this.fromType=options.type;
			}
			if(options.id){
				this.shopID=options.id;	
			}
			if(options.seq){
				this.seq=options.seq
			}
		},
		methods: {
			//绑定设备
			 bindService(){
				switch(this.fromType){
					case 'camera':
					this.bindService()
					break;
					case 'cpe':
					this.bindCPE()
					break;
					case 'change':
					break;
				}
			},
			async changeService(){
				if(await ReplaceRouterApi(this.uuid,this.seq)){
					this.$utils.showToast('更换CPE成功')
					this.$utils.goBack()
					this.$utils.hide()
				}
			},
			async bingCamera(){
				if(await BindCameraApi(this.uuid,this.shopID)){
					this.$utils.showToast('绑定设备成功')
					this.$utils.goBack()
				}
			},
			async bindCPE(){
				
				if(await ActivateRouterApi(this.uuid,this.shopID)){
					this.$utils.showToast('绑定设备成功')
					this.$utils.goBack()
				}
			},
			// 设置input输入框中内容
			setInputText(text){
				if(text){
					// #ifdef APP-PLUS
					var webView = this.$mp.page.$getAppWebview();  
					// 设置 searchInput的 text  
					webView.setTitleNViewSearchInputText(text)  			   
					// #endif
				}
			},
			//搜索设备号
			async searchService(uuid){
				switch(this.fromType){
					case 'camera':
					this.serviceItem = await CameraApi(uuid)
					break;
					case 'cpe':
					this.serviceItem = await RouterApi(uuid)
				
					break;
				}
				
			}
			
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				uni.scanCode({
				   success: (res) => {
					   this.uuid=res;
						this.setInputText(res.result)
						this.searchService(res.result)
				   }
				});
			}
		},
		onNavigationBarSearchInputConfirmed(event){
			if(!event.text){
				this.$utils.showToast('设备序列号为空')
				return;
			}
			this.uuid=event.text;
			this.searchService(event.text)
		}
	}
</script>

<style>
page{
	background:#FFFFFF
}
.service-info{
	padding:40upx 30upx;
}
.service-container{
	padding:30upx 0;
}
</style>
