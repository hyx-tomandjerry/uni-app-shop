<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left">
				<view class="cuIcon-back font-size-middle explain-color" @click="goBack()"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold explain-color">公司信息</view>
			</block>
			<block slot="right">
				<view class="text-black" @click="updateCompanyInfo()">编辑</view>
			</block>
		</cu-custom>
		
		<!-- <view class="company-header borderTop flex justify-start bg-white margin-bottom-normal">
			<image src="../../../../static/img/default.png" class="logoImg"></image>
			<view class="font-size-normal" style="padding-top:4px;">
				<view class=" text-black font-weight-bold" style="margin-bottom:3px;">{{companyInfo.name || ''}}</view>
				<view class="color-normal">EID:{{companyInfo.eid || ''}}</view>
			</view>
		</view> -->
		
		<view class="company-info-contaienr bg-white borderTop">
			<view class="company-info-item flex justify-between align-center position_relative borderBottom" @click="uploadCover()">
				<view class="color-normal font-size-small">头像</view>
				<image :src="companyInfo.logourl?companyInfo.logourl:'../../../../static/img/default.png'" class="logoImg"></image>
				<text class="cuIcon-right font-size-big" style="position:absolute;right:11px;"></text>
			</view>
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">企业名称</view>
				<input type="text" placeholder="请输入企业简称" v-model="companyInfo.name"
				 :class="{'color-normal':companyInfo.name,'color-placeholder':!companyInfo.name}"
				 style="text-align: right;font-size:14px;">
			</view>
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">企业EID</view>
				<view>{{companyInfo.eid || ''}}</view>
			</view>
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">企业简称</view>
				<input type="text" placeholder="请输入企业简称" v-model="companyInfo.alias"
				 :class="{'color-normal':companyInfo.alias,'color-placeholder':!companyInfo.alias}"
				 style="text-align: right;font-size:14px;">
			</view>
			
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">英文简称</view>
				<input type="text" placeholder="请输入企业简称" v-model="companyInfo.prefix"
				 :class="{'color-normal':companyInfo.prefix,'color-placeholder':!companyInfo.prefix}"
				 style="text-align: right;font-size:14px;">
			</view>
			
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">联系人姓名</view>
				<input type="text" placeholder="请输入企业简称" v-model="companyInfo.contactor"
				 :class="{'color-normal':companyInfo.contactor,'color-placeholder':!companyInfo.contactor}"
				 style="text-align: right;font-size:14px;">
			</view>
			
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">联系人手机</view>
				<input type="text" placeholder="请输入企业简称" v-model="companyInfo.telephone"
				 :class="{'color-normal':companyInfo.telephone,'color-placeholder':!companyInfo.telephone}"
				 style="text-align: right;font-size:14px;">
			</view>
			
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">所在省市区</view>
				<addressed @changes="childClick($event)" :isShow="false"></addressed>
			</view>
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">公司详细地址</view>
				<input type="text" placeholder="请输入详细地址" v-model="companyInfo.address"
				 :class="{'color-normal':companyInfo.address,'color-placeholder':!companyInfo.address}"
				 style="text-align: right;font-size:14px;">
			</view>
			
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">纳税人识别号</view>
				<input type="text" placeholder="请输入详细地址" v-model="companyInfo.bizlid"
				 :class="{'color-normal':companyInfo.bizlid,'color-placeholder':!companyInfo.bizlid}"
				 style="text-align: right;font-size:14px;">
			</view>
			
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">公司银行账户</view>
				<input type="text" placeholder="请输入详细地址" v-model="companyInfo.bankName"
				 :class="{'color-normal':companyInfo.bankName,'color-placeholder':!companyInfo.bankName}"
				 style="text-align: right;font-size:14px;">
			</view>
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">公司银行账号</view>
				<input type="text" :placeholder="companyInfo.bankNum?companyInfo.bankNum:'请输入银行账号'" v-model="companyInfo.bankNum"
				 :class="{'color-normal':companyInfo.bankNum,'color-placeholder':!companyInfo.bankNum}"
				 style="text-align: right;font-size:14px;" @blur="checkBankNum(companyInfo.bankNum)">
			</view>
			<view class="company-info-item flex justify-between align-center borderBottom">
				<view class="color-normal font-size-small">公司开户银行</view>
				<input type="text" placeholder="请输入详细地址" v-model="companyInfo.bank"
				 :class="{'color-normal':companyInfo.bank,'color-placeholder':!companyInfo.bank}"
				 style="text-align: right;font-size:14px;">
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	import addressed from '../../../../components/jm-address/jm-address.vue'
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['userInfo','replacerObj','bankNames']),
		data() {
			return {
				token:'',
				coverID:'',
				companyInfo:{
					alias:'',
					name:'',
					prefix:'',
					contactor:'',
					telephone:'',
					cityID:'',
					distirctID:'',
					provinceID:'',
					provinceName:'',
					districtName:'',
					cityName:'',
					address:'',
					bizlid:'',//工商信息，
					bank:'',//开户银行
					bankNum:'',//银行账号
					bankName:'',//银行账户
					
				},
				isRight:false,
				logourl:''
				
			}
		},
		components:{
			addressed
		},
		methods: {
			checkBankNum(event){
				
				uni.request({
					url:'https://ccdcapi.alipay.com/validateAndCacheCardInfo.json',
					data:{
						cardNo:event,
						cardBinCheck:true
					},
					success: (res) => {
						
						
						if(res.data.validated){
							
							this.companyInfo.bank=this.bankNames[res.data.bank];
							
						}else{
							this.isRight=true;
							uni.showToast({
								title: '银行卡号不存在',
								icon:'none'
							});
						
							
						}
					},
					fail:()=>{
						
					}
				})
			},
			//获得头像图片
			getAvater(id){
				this.$ajax('File',{id:id},res=>{
					this.companyInfo.logourl=res.resurl;
				})
			},
			uploadCover(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths=res.tempFilePaths;
						
			            const uploadTask=uni.uploadFile({
			                url:this.$store.state.uploadHostUrl+this.token,
			                filePath:tempFilePaths[0],
			                name:'file',
			                formData:{
			                    'x:type':this.$store.state.constants.companyCover,
			                    'x:owner': this.userInfo.owner,
			                    'x:creator': this.userInfo.id,
								'x:target':this.userInfo.owner
			                },
			                success: (uploadFileRes) => {
			                  
								let FileRes=JSON.parse(uploadFileRes.data)
			                    this.coverID=FileRes.data;
			                    
			                    this.getAvater(this.coverID)
			
			                }
			            });
			            uploadTask.onProgressUpdate((res)=>{
			                if(res.progress==100){
			                    uni.showToast({
			                        title:'上传成功',
			                        icon:'none'
			                    })
			                }
			
			            },(error)=>{
			                uni.showToast({
			                    title:'上传失败',
			                    icon:'none'
			                })
			            })
			
			
			
					}
				})
			},
			//获得上传图片的token
			getUploadToken(){
				this.$ajax('UploadToken',{},res=>{
					this.token=res;
				})
			},
			updateCompanyInfo(){
					if(this.isRight){
						uni.showToast({
							title:'银行卡号不存在',
							icon:'none'
						})
					}else{
						this.$ajax('SetCustomer',{
							name:this.companyInfo.name?this.companyInfo.name:'',
							alias:this.companyInfo.alias?this.companyInfo.alias:'',
							prefix:this.companyInfo.prefix?this.companyInfo.prefix:'',
							license:this.companyInfo.bizlid?this.companyInfo.bizlid:'',
							address:this.companyInfo.address?this.companyInfo.address:'',
							contactor:this.companyInfo.contactor?this.companyInfo.contactor:'',
							telephone:this.companyInfo.telephone?this.companyInfo.telephone:'',
							type:this.replacerObj.type,
							id:this.userInfo.owner,
							province:this.companyInfo.provinceID?this.companyInfo.provinceID:0,
							district:this.companyInfo.distirctID?this.companyInfo.distirctID:0,
							city:this.companyInfo.cityID?this.companyInfo.cityID:0,
							bank:this.companyInfo.bank?this.companyInfo.bank:'',
							bankname:this.companyInfo.bankName?this.companyInfo.bankName:'',
							banknum:this.companyInfo.bankNum?this.companyInfo.bankNum:''
						},res=>{
							uni.showToast({
								title:'编辑公司信息成功',
								icon:'none'
							})
						})
					}
					
				
				
			},
			childClick(e){
				this.companyInfo.provinceID=e.provinceID;
				this.companyInfo.distirctID=e.districtID;
				this.companyInfo.cityID=e.cityID;
				this.companyInfo.cityName=e.city;
				this.companyInfo.provinceName=e.province;
				this.companyInfo.districtName=e.district;
				
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//获得公司信息
			getCompanyInfo(){
				this.$ajax('Customer',{
					id:this.userInfo.owner
				},res=>{
					this.companyInfo=res;
				})
			}
		},
		onLoad(){
			this.getCompanyInfo();
			this.getUploadToken();
		},
		onShow(){
			console.log('onShow')
			this.getCompanyInfo();
		}
	}
</script>

<style lang="less">
	.company-header{
		padding-top:15px;
		padding-left:20px;
		padding-bottom:14px;
		
	}
	.company-info-contaienr{
		.company-info-item{
			padding:16px 15px 13px 13px;
		}
		.logoImg{
			width:45px;
			height:45px;
			border-radius: 50%;
			vertical-align: middle;
			margin-right:13px;
		}
	}
</style>
