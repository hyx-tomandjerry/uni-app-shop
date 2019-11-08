<template>
	<view>
		<view class="cu-modal" :class="isShow?'show':''" >
		
			<view class="cu-dialog">
				<view class=" bg-white justify-end borderBottom" style="padding:14px 0 8px;">
					<view class=" font-weight-bold font-size-small color-normal">{{shopItem.name}}({{shopItem.brandName}})</view>
					<text class="cuIcon-close font-size-big position_absolute" style="right:10px;top:10px;" @tap="hideModal()"></text>
				</view>
				<view  class="bg-white record-container">
						<view class="flex justify-start bg-white " >
							<view>
								<image src="../../../../static/img/shop/record-name.png" mode="widthFix" lazy-load></image>
							</view>
							<input type="text" v-model="designer.name" 
								placeholder="请输入店员姓名"  class="join-modal-input">
						</view>
		
						<view class="flex justify-start bg-white position_relative" >
							<view >
								<image src="../../../../static/img/shop/record-shouji.png" mode="widthFix" lazy-load></image>
							</view>
							<input type="text" v-model="designer.telephone"
								class="join-modal-input"
								 maxlength="11"
								placeholder="请输入手机号"  @blur="checkTelEvent(designer.telephone)">
							<text class="position_absolute color-placeholder">{{designer.telephone?designer.telephone.length:0}}/11</text>
						</view>
				</view>
				<view class="bg-white" >
					<button class=" bg-blue text-white font-size-small font-weight-normal" size="default" @tap="recordUser">确定录入</button>
				</view>
			</view>
			
		</view>
		
		<simpleModel :isShow="secondModal=='telModal'" @hideSimpleModel="hideSecondModal" v-if="secondModal=='telModal'">
			<block slot="content">电话号码不存在</block>
		</simpleModel>
		<simpleModel :isShow="secondModal=='nameModal'" @hideSimpleModel="hideSecondModal" v-if="secondModal=='nameModal'">
			<block slot="content">请输入店员姓名</block>
		</simpleModel>
	</view>
	
</template>

<script> 
import simpleModel from '../simple-model.vue'
export default{
	components:{simpleModel},
	data(){
		return{
			designer:{
				name:'',
				telephone:''
			},
			secondModal:''
		}
	},
	props:{
		isShow:Boolean,
		shopID:[Number,String],
		shopItem:Object
	},
	methods:{
		hideModal(){
			this.$emit('hideModal')
		},	
		//验证电话号码
		checkTelEvent(event){
			if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){
				this.secondModal='telModal'
			}
		},
		hideSecondModal(){
			this.secondModal=null;
		},
		recordUser(){
			if(!this.designer.name){
				this.secondModal='nameModal'
			}else if(!this.designer.telephone){
				this.secondModal='telModal'
			}else{
				if(!(/^1[345678]\d{9}$/.test(this.designer.telephone))){
					this.secondModal='telModal'
				
				}else{
					this.$emit('recordUser',this.designer)
				}
			}
		}
	}
}
</script>

<style scoped lang="less">
	.join-modal-item{
		line-height:50px;height:50px;padding-left:14px;
		.join-modal-input{
			margin-top:10px;text-align:left;font-size:13px;
		}
	}
	
	.record-container{
		padding-bottom:20px
	}
	.record-container>view:first-child{
		padding-top:22px;padding-left:14px;
	}
	.record-container>view:first-child>view{
		margin-right:5px;width:11%;margin-top:4px;
	}
	.record-container>view:first-child>view>image{
		width:26px;height:26px;vertical-align: middle;flex-shrink: 0;
	}
	.record-container>view:first-child>input{
		box-shadow:0px 1px 4px 1px rgba(227,227,227,0.5);border-radius:18px;height:35px;line-height:25px;padding-left:13px;width:78%;text-align:left
	}
	.record-container>view:last-child{
		padding-top:17px;padding-left:14px;
	}
	.record-container>view:last-child>view{
		margin-right:5px;width:11%;margin-top:4px;
	}
	.record-container>view:last-child>view>image{
		width:26px;height:26px;vertical-align: middle;
	}
	.record-container>view:last-child>input{
		box-shadow:0px 1px 4px 1px rgba(227,227,227,0.5);
		border-radius:18px;height:35px;line-height:25px;padding-left:13px;width:78%;text-align:left
	}
	.record-container>view:last-child>text{
		right:30px;top:27px;
	}
	.cu-dialog>view:last-child{
		padding:0 13px 15px;
	}
	.cu-dialog>view:last-child>button{
		border-radius: 5px;
	}
	.cu-dialog{
		max-width:263px;
	}
</style>
