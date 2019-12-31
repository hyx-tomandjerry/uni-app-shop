<template>
	<view class="borderTop">
		<view class="express-info bg-white">
			<view class="flex">
				<view class="font-size-mini color-regular flex-xs">寄件地址</view>
				<view class="flex-1 font-size-mini color-normal">
					<view style="margin-bottom:10upx;">
						<text>{{expressDetail.senderName || ''}}</text>
						<text v-show="expressDetail.senderMobile">({{expressDetail.senderMobile}})</text>
					</view>
					<view class="color-regular font-size-mini">
						{{expressDetail.depaddr || ''}}
					</view>
				</view>
			</view>
			<view class="flex">
				<view class="font-size-mini color-regular flex-xs">收件地址</view>
				<view class="flex-1 font-size-mini color-normal">
					<view style="margin-bottom:10upx;">
						<text>{{expressDetail.recverName || ''}}</text>
						<text v-show="expressDetail.recverMobile">({{expressDetail.recverMobile}})</text>
					</view>
					<view class="color-regular font-size-mini">
						{{expressDetail.desaddr || ''}}
					</view>
				</view>
			</view>
			<view class="flex margin-top-13">
				<view class="font-size-mini color-regular flex-xs">运单编号</view>
				<view class="flex-1 font-size-mini color-normal">
					<view style="margin-bottom:10upx;">
						{{expressDetail.seq || ''}}
					</view>
					
				</view>
			</view>
			
			<view class="flex margin-top-13">
				<view class="flex-xs color-regular">申诉类型</view>
				<view class="flex-1 type-item" >
					<block v-for="(item,index) in complaintList" :key="index">
						<view @tap="chooseItem(item,'type')" style="margin:10upx 0;">
							<image 
								:src="complainType==item.id?'../../../../../../static/icon/icon-xuanzhong.png':'../../../../../../static/icon/icon-weixuanzhong.png'" 
								mode="widthFix" lazy-load class="xuanze-img"></image>
							<text>{{item.name}}</text>
						</view>
					</block>
				</view>	
			</view>
			
		</view>
		<view class="margin-top bg-white text-content">
			<view class="color-normal font-size-normal ">内容描述</view>
			<textarea  placeholder="输入内容描述..." class="input-text" v-model="summary"/>
			<file-upload 
				src="../../../../../../static/img/work/camera.png"
				@upload="uploadFile"
				:xType="doc.complaint"
				xTarget="0"
				></file-upload>
							
		</view>
		<common-btn-one
			type="primary"
			:disabled="disabled" 
			content="提交申诉"
			@operateBtn="submitComplaint" :isPos="true"></common-btn-one>				
	</view>
</template>

<script>
	import commonFlex from '../../../../../../components/common/common-flex.vue'
	import commonBtnOne from '../../../../../../components/common/common-btn-one.vue'
	import fileUpload from '../../../../../../components/common/file-upload.vue'
	import {mapState} from 'vuex'
	import {NewWaybillComplaintApi,WaybillApi} from '../../../../../../api/express_api.js'
	export default {
		components:{commonFlex,commonBtnOne,fileUpload},
		computed:{
			...mapState(['userInfo']),
			doc(){return this.config.doc}
		},
		data() {
			return {
				disabled:false,
				expressDetail:{},
				complaintList:[
					{id:1,name:'虚假签收-未经允许包裹放入代收点'},
					{id:2,name:'虚假签收-未收到货且未告知货在哪'},
					{id:3,name:'未送货上门-未经允许包裹放入自提柜'},
					{id:4,name:'其他'}
				],
				compDetailList:[],
				complainType:0,//申诉类型
				complainVal:'',
				compDetailType:0,//申诉说明
				compDetailVal:'',
				files:[],//附件,
				summary:''
				
		
			}
		},
		methods: {
			async submitComplaint(){
				if(!this.expressDetail.seq){
					this.$utils.showToast('没有运单编号，无法投诉')
					return;
				}
				let val={
					seq:this.expressDetail.seq,
					target:this.expressDetail.id,
					creator:this.userInfo.id,
					reason:this.complainVal?this.complainVal:'',
					summary:this.summary?this.summary:'',
					files:this.files?this.files.join(','):''
				}
				if(await NewWaybillComplaintApi(val)){
					
					this.$utils.showToast('物流申诉成功')
					setTimeout(()=>{
						uni.hideToast();
						uni.navigateBack({
							delta:1
						})
					},200)
				}

			},
			uploadFile(file){
				this.files=file;
			},			
			chooseItem(item,type){
				switch(type){
					case 'type':
					this.complainType=item.id;
					this.complainVal=item.name;
					break;
					case 'detail':
						this.compDetailType=item.id;
						this.compDetailVal=item.name
					break;
				}
			},
			async getItemInfo(id){
				this.expressDetail = await WaybillApi(id)
			}
		},
		onLoad(options){
			if(options.id){
				this.getItemInfo(options.id)
			}
		}
	}
</script>

<style scoped>
	.express-info,.text-content{
		padding:40upx 30upx;
		
		
	}
	.text-content{
		margin-bottom: 150upx;
	}
	.express-info>view{
		margin-bottom: 10upx;
	}
	.xuanze-img{
		width:35upx;
		height:35upx !important;
		margin-right:4upx;
	}
	.input-text{
		width:100%;
		max-height:150upx;
		border-radius: 10upx;
		background:#F9F9F9;
		padding:20upx  0 20upx 30upx ;
		margin-bottom: 20upx;
	}
	.text-content>view{
		margin-bottom: 20upx;
	}
	.cu-form-group{
		padding:0;
	}
	.type-item>view:first-child{
		margin:0 !important;
	}
</style>
