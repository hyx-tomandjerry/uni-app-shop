<template>
	<view>
		<template v-if="serviceItem.uuid">
			<view class="service-info">
				<normal-detail-item
						leftIntro="uuid"  :leftPadding="true"
						:rightContent="serviceItem.uuid || ''" :marginBottom="true"></normal-detail-item>	
				
				<normal-detail-item
						leftIntro="入库时间"  :leftPadding="true"
						:rightContent="serviceItem.buyDate | formatTime('YMDHMS') " :marginBottom="true"></normal-detail-item>	
			</view>
						
		</template>
		<template v-else>
			<LxEmpty></LxEmpty>
		</template>
			<common-btn-one v-if="serviceItem.uuid"
				type="primary"
				content="绑定"
				@operateBtn="bindService" :isPos="true"></common-btn-one>			
	</view>
</template>

<script>
	import LxEmpty from '../../../../lx_components/lx-empty.vue'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import normalDetailItem from '../../../../components/common/normal-detail-item.vue'
	import {BindCameraApi,CameraApi} from '../../../../api/shop_api.js'
	export default {
		components:{LxEmpty,commonBtnOne,normalDetailItem},
		data() {
			return {
				fromType:'',//设备类型
				shopID:'',//门店id
				serviceItem:{},
				uuid:''
			}
		},
		onLoad(options){
			if(options){
				this.fromType=options.type;
				this.shopID=options.id;
			}
		},
		methods: {
			//绑定设备
			async bindService(uuid,shop){
				if(await BindCameraApi(this.uuid,this.shopID)){
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
				this.serviceItem = await CameraApi(uuid)
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
</style>
