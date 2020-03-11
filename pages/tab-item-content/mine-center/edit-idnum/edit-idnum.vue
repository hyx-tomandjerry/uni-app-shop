<template>
	<view class="borderTop bg-white edit-content">
		<block v-if="isEdit">
			<view class="intro idnum-content">输入身份证号:</view>
			<view class="flex justify-between">
				<view class="flex-1 input-form">
					<input type="text" placeholder="请输入身份证号" class="flex-1" v-model="idnum">
				</view>
				<view style="width:50px;">
					<button class="cu-btn round bg-blue shadow sm" @click="editIdnum">修改</button>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="intro">输入密码:</view>
			<view class="flex justify-between align-center">
				<view class="flex-1 input-form">
					<input type="text" placeholder="请输入密码"  v-model="token">
				</view>
				<view style="width:50px;">
					<button class="cu-btn round bg-blue shadow sm" @click="showIdnum">确定</button>
				</view>
			</view>
		</block>
		
		
	</view>
</template>

<script>
	import {RefreshOnlineUser} from '../../../../api/common_api.js';
	import {SetProfileApi} from '../../../../api/mine_api.js'
	export default {
		data() {
			return {
				token:'',
				isEdit:false,
				idnum:''
			}
		},
		methods: {
			showIdnum(){
				const userPsw = uni.getStorageSync('userPsw');
				if(!this.token){
					this.$utils.showToast('请输入密码');
				}else{
					if(this.token != userPsw){
						this.$utils.showToast('输入密码不正确，请重新输入');
						this.token=''
						
					}else{
						this.isEdit=true;
					}
				}
				
			},
			//修改身份证号
			async editIdnum(){
				if(!this.idnum){
					this.$utils.showToast('请输入身份证号');
				}else{
					
					var reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if(!reg.test(this.idnum)){
						this.$utils.showToast('身份证号不正确')
					}else{
						let res = await RefreshOnlineUser();
						let val={
							gender:res.gender,
							mobile:res.mobile,
							name:res.name,
							birthday:this.$moment(res.birthday || new Date()).format('YYYY-MM-DD'),
							idnum:this.idnum || ''
						}
						if(await SetProfileApi(val)){
							this.$utils.showToast('修改身份证号成功!')
							this.$utils.goBack()
						}
					}
				}
			}
		}
	}
</script>

<style scoped>
.edit-content{
	padding:46upx 30upx;
	height:100vh;
}
.intro{
	font-size:16px;
	color:#898888;
	margin-bottom:20upx;
}

.input-form{
	padding:20upx 10upx 20upx;
	border-bottom:1px solid #EEEEED
}
.idnum-content{
	margin-top:50upx;
}
</style>
