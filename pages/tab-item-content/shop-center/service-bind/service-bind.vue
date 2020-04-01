<template>
	<view class="service-container borderTop">
		<common-form-group :intro="getIntro">
			<input
			    :placeholder="getIntro"
			    class="font-size-normal font-weight-normal text-right"
			    v-model="uuid" slot="right"/>
		</common-form-group>
		
		<!-- :content="fromType=='change'?'更换':'绑定'" -->
			<common-btn-one 
				type="primary"
				content="确定"
				@operateBtn="searchService" :isPos="true"></common-btn-one>		
					
		<!-- 对话框 -->
		<view class="cu-modal " :class="modalName=='infoModal'  && serviceItem?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{fromType =='cpe'?'CPE':'摄像头'}}信息</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					
					<normal-detail-item
							width="40%"
							leftIntro="名称 : "  
							:leftPadding="true"
							:rightContent="serviceItem.name || ''"
							:marginBottom="true"></normal-detail-item>	
					<normal-detail-item
							width="40%"
							leftIntro="uuid : "
							  v-if="fromType=='camera'"
							:leftPadding="true"
							:rightContent="serviceItem.uuid || ''"
							:marginBottom="true"></normal-detail-item>			
					<normal-detail-item
					        width="40%"
							v-if="fromType=='cpe'"
							leftIntro="序列号 : "  
							:leftPadding="true"
							:rightContent="serviceItem.seq || ''"
							:marginBottom="true"></normal-detail-item>	
					<!-- <normal-detail-item
							width="40%"
							v-if="fromType=='cpe'"
							leftIntro="SIM : "  
							:leftPadding="true"
							:rightContent="serviceItem.sim || ''"
							:marginBottom="true"></normal-detail-item>	 -->
					<normal-detail-item
							width="40%"
							leftIntro="购买时间 : "  
							:leftPadding="true"
							:rightContent="serviceItem.buyDate | formatTime('YMDHMS') "
							:marginBottom="true"></normal-detail-item>	
					<normal-detail-item
							width="40%"
							v-if="fromType=='cpe'"
							leftIntro="生产厂商 : "  
							:leftPadding="true"
							:isLeft="true"
							:rightContent="serviceItem.vendorName||'' "
							:marginBottom="true"></normal-detail-item>	
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-color-light margin-left text-white" @tap="bindService">绑定</button>

					</view>
				</view>
			</view>
		</view>	
		<common-loading 
			    ref="loading"
			    :custom="false"
			    :shadeClick="true"
				:shadeShow="false"
			    :type="1"
			   >
			        <!-- <view class="test">自定义</view> -->
		</common-loading>
	</view>
	
</template>

<script>
	import LxEmpty from '../../../../lx_components/lx-empty.vue'
	import CommonLoading from '../../../../components/common/xuan-loading.vue'
	import CommonFormGroup from '../../../../components/common/common-form-group.vue'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import normalDetailItem from '../../../../components/common/normal-detail-item.vue'
	import {BindCameraApi,CameraApi,ActivateRouterApi,RouterApi,ReplaceRouterApi} from '../../../../api/shop_api.js'
	export default {
		components:{LxEmpty,commonBtnOne,normalDetailItem,CommonFormGroup,CommonLoading},
		data() {
			return {
				fromType:'',//设备类型
				shopID:'',//门店id
				serviceItem:'',
				uuid:'',
				seq:'',
				modalName:''
			}
		},
		computed:{
			getIntro(){
				return this.fromType =='cpe'?'CPE序列号':'摄像头序列号'
			},
			getTitle(){
				return this.fromType =='cpe'?'CPE':'摄像头'
			}
		
		},
		// onShow(){
		// 	RouterApi('2151551212125122').then(res=>{
		// 		this.serviceItem=res;
		// 	});
		
		// },
		onLoad(options){
			
			if(options.type){
				this.fromType=options.type;
				uni.setNavigationBarTitle({
					title:this.fromType=='cpe'?'绑定CPE':'绑定摄像头'
				})
			}
			if(options.id){
				this.shopID=options.id;	
			}
			if(options.seq){
				this.seq=options.seq
			}
		
			
			
		},
		methods: {
			hideModal(){
				this.modalName=null;
			},
			open(){
				this.$refs.loading.open()
			},
			close(){
				this.$refs.loading.close()
			},
			//绑定设备
			 bindService(){
				 this.hideModal()
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
			check(){
				if(!this.uuid){
					this.$utils.showToast('请输入设备序列号');
					return false;
				}
				return true;
			},
			//搜索设备号
			searchService(uuid){
				if(this.check()){
					this.open()
					
					switch(this.fromType){
						case 'camera':
						this.open()
						CameraApi(this.uuid).then(res=>{
							this.serviceItem=res;
							setTimeout(()=>{
								this.close();
								this.modalName='infoModal'
								console.log('bbbbb')
							},2000)
						})
						break;
						case 'cpe':
						
						RouterApi(this.uuid).then(res=>{
							this.serviceItem=res;
							setTimeout(()=>{
								
								this.modalName='infoModal';
								this.close();
							},2000)
						})
						
						break;
					}
				}
				
				
			}
			
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				uni.scanCode({
				   success: (res) => {
					   this.uuid=res.result;
					   this.searchService(res.result)
				   }
				});
			}
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
