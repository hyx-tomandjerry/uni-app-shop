<template>
	<view>
		<login-common title="登录" :tabbar="tabbar" @toPro="toOperate('pro')">
			<block slot="head-extra">
				<view class="head-extra font-size-normal color-regular"  @tap="toOperate('design')">
					还没有账号，<text class="color-blue">立即注册</text>
				</view>
			</block>
			<block slot="content">
				<view class="login_form">
					<view class="login-form-item flex justify-start borderBottom align-center">
						<image src="../../../static/icon/icon-denglu-account.png"  class="imgAccount"></image>
						<input type="number" placeholder="请输入账号"
								v-model="account"
								style="flex:1;padding-right:80upx;"
								class="font-size-big font-weight-normal"
								:class="account?'text-black':'color-placeholder'"
								@focus="hideTabbar()"
								@blur="checkTelEvent(account)"
								maxlength="11">
						<text class="text-gray" style="width:80upx;">{{account.length}}/11</text>
					</view>
					<view class="login-form-item flex justify-start borderBottom position_relative align-center">
						<image src="../../../static/icon/icon-denglu-pwd.png"  class="imgPwd"></image>
						<input type="text"
							   placeholder="请输入密码"
							   @blur="showTabbar()"
							   v-if="isShowPwd"
							   v-model="token"
							   class="font-size-big font-weight-normal"
							   :class="token?'text-black':'color-placeholder'">
						<input type="password"
							   placeholder="请输入密码"
								@blur="showTabbar()"
								v-else
								v-model="token"
								class="font-size-big font-weight-normal"
								:class="token?'text-black':'color-placeholder'">
						<div v-if="isShowPwd" @click="showPwd()" class="flex-1" style="width:200upx;height:100%;">
							<image src="../../../static/icon/zhengkaiyanjing.png" class="imgEye" ></image>
						</div>
						<div v-else @click="showPwd()" class="flex-1"  style="height:100%;width:200upx">
							<image src="../../../static/icon/eye.png" class="imgEyeOpen"></image>
						</div>
					</view>
				</view>
				<common-btn-one
					:type="btnType" 
					:disabled="disabled" 
					content="登录"
					@operateBtn="loginEvent" :isPos="false" ></common-btn-one>
				<view class="font-size-normal font-weight-normal color-normal flex justify-between align-center margin-top" >
					<view @tap="toOperate('forget')" class="color-blue">忘记密码?</view>
					<view @tap="remeberPwd" class="flex align-center">
						<text 
							:class="{
								'cuIcon-squarecheck':checked,
								'cuIcon-square':!checked,
								'color-blue':checked
							}"
							style="font-size:18px;"></text>
						<text style="margin-left:6upx;" class="color-regular">记住密码</text>
					</view>
				</view>	
			</block>
		</login-common>
		<loading
				ref="loading"
				:custom="false"
				:shadeClick="true"
				:type="1">
		</loading>
		<!-- 弹出框 -->
			<view class="cu-modal" :class="isShow?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">服务协议与隐私政策</view>
					</view>
					<view class="padding-xl bg-white text-left">
						<view>请你务必审慎阅读、充分理解"服务协议"和"隐私政策"各条款，包括但不限于:为了向你提供即时通讯、内容分享等服务，我们需要收集你的设备信息、
						操作日志等个人信息。你可以在"设置中"查看、变更、删除个人信息并管理你的授权。</view>
						<view>
							你可阅读 <text class="color-blue" @click="toOperate('pro')">《服务协议》</text>和
							<text class="color-blue" @click="toOperate('secret')">《隐私协议》</text>了解详细信息。如你同意，请点击
							"同意"开始接受我们的服务。
						</view>
					</view>
					<view class="cu-bar bg-white borderTop">
						<view class="flex-1 text-center borderRight" @tap="operateProtocol('refuse')">暂不使用</view>
						<view class="flex-1 text-center color-blue" @tap="operateProtocol('agree')">同意</view>
					</view>
				</view>
		    </view>
	</view>
</template>

<script>
	import loginCommon from '../../../components/login/login-common.vue'
	import loading from '../../../components/common/xuan-loading.vue'
	import commonBtnOne from '../../../components/common/common-btn-one.vue'
	import {mapState,mapMutations} from 'vuex';
	import {getXapis,errorApi} from '../../../api/common_api.js'
	import {LoginApi} from '../../../api/login_api.js'
	export default{
		components:{loginCommon,commonBtnOne,loading},
		computed: mapState(['userInfo','remeber']),
		data(){
			return{
				checked:false,
				disabled:true,
				account:'',
				token:'',
				isShowPwd:false,//显示密码
				tabbar:true,//用于键盘隐藏，
				windowHeight:'',
				btnType:'default',
				isShow:false,//显示协议
			}
		},
		watch:{
			account(val){this.change()},
			token(val){this.change()}
		},
		onShow(){
			this.checked=false;
			let system =uni.getSystemInfoSync();
			if(system.platform =='android'){
				if(!uni.getStorageSync('agree')){
					this.isShow = true;
				}
			}
			this.$fire.on('login',res=>{
				this.inInput=false;
				this.account=res.account;
				this.token=res.token;
					
			})
			uni.getStorage({
				key:'remeber',
				success:(res)=>{
					this.checked=res.data;
					if(this.checked){
						const userName=uni.getStorageSync('userName');
						const userPsw=uni.getStorageSync('userPsw');
						if(userName&& userPsw){
							this.account=userName,
							this.token=userPsw
						}else{
							this.account="",
							this.token=""
						}
					}
				}
			})
			uni.getStorage({
				key:'userInfo',
				success: (res) => {
					 if(res.data && res.data.status==this.config.userStatus.normal){
						uni.switchTab({
							url:"../../tab-item/index/index"
						})
					}
								
				}
			})
		
		},
		onLoad(){
			
			this.changeTabbar();
		},
		methods:{
			operateProtocol(type){
				this.isShow = false;
				uni.setStorage({
					key:'agree',
					data:type==='agree'
				})
			},
			changeTabbar(){
				uni.getSystemInfo({
					success: (res) => {
						this.windowHeight=res.windowHeight;
					}
				})
				uni.onWindowResize((res)=>{
					if(res.size.windowHeight<this.windowHeight){
						this.tabbar=false;
					}else{
						this.tabbar=true;
					}
				})
			},
			change(){
				if(this.account && this.account !=null && this.token && this.token!=null){
					this.disabled=false;
					this.btnType='primary'
					return;
				}
				this.disabled=true;
				this.btnType='default'
			},
			remeberPwd(){
				this.checked=!this.checked;
				uni.setStorage({
				    key: 'remeber',
				    data: this.checked,
				});
			},
			close(){
				 this.$refs.loading.close();
			},
			open(){
				this.$refs.loading.open();
			},
			//验证电话号码
			checkTelEvent(event){
				if(event){
					if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(event))){
						this.$utils.showToast('电话号码不存在')
					}
					return;
				}
			},
			showTabbar(){
				this.tabbar=true;
			},
			hideTabbar(){
				this.tabbar=false;
			},
			showPwd(){
				this.isShowPwd=!this.isShowPwd;
			},
			toOperate(type){
				switch(type){
					case 'design':
					uni.navigateTo({
						url:"../design/design"
					})
					break;
					case 'forget':
					uni.navigateTo({
						url:'../find-password/find-password'
					})
					break;
					case 'pro':
					uni.navigateTo({
						url:"../protocol/protocol?type=serve"
					})
					break;
					case 'secret':
					uni.navigateTo({
						url:"../protocol/protocol?type=secret"
					})
					break;
					
				}
			},
			async toLogin(account,token){
				let system = uni.getSystemInfoSync();
				if(system.platform =='android'){
					if(!uni.getStorageSync('agree')){
						uni.showToast({
							title:'你还未同意服务协议与隐私政策!',
							icon:'none',
							success: () => {
								setTimeout(()=>{
									this.isShow = true;
								},1000)
							}
						})
						this.disabled=false;
						return;
					}
					
				}
				let result = await LoginApi(account,token);
				if(result){
					this.open();
					if(result.type==this.config.shoperObj.type){
						this.login(result)
						//使用权限
						let authorArr = result.modules?result.modules.split(','):[];
						this.setAuthor(authorArr);
						//错误码
						let errors = await errorApi()
						this.setErrors(errors);
						//xserver
						if(result.xserver){
							let res = await getXapis();
							this.setXserver(res);	
						}
						uni.setStorageSync('userName', account);
						uni.setStorageSync('userPsw',token);
						this.close();
						this.$utils.showToast('登录成功')
						
						setTimeout(()=>{
							if(this.userInfo.status==this.config.userStatus.free){
								uni.redirectTo({
									url:"../../tab-item/search-company/search-company"
								})
							}else if(this.userInfo.status==this.config.userStatus.normal){
								uni.switchTab({
									url:"../../tab-item/index/index"
								})	
							}
						},1000)
					}else{
						setTimeout(()=>{
							this.$utils.showToast('您的账号无法在“门店助手”登录')
							this.disabled=false;
							this.close()
						},800)
					}
				}
				this.disabled=false;
				
			},	
			check(){
				if(!this.account){
					this.$utils.showToast('请输入账号')
					return;
				}
				if(!this.token){
					this.$utils.showToast('请输入密码')
					return}
				if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.account)){
					this.$utils.showToast('电话号码不存在')
					return;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.token)){
					this.$utils.showToast('密码格式不正确')
					return;
				}
				return true;
			},
			loginEvent(){
				if(this.check()){
					this.disabled=true;
					this.toLogin(this.account,this.token);
				}
			},
		
			 ...mapMutations(['login','setAccount','setRember','setXserver','setErrors','setAuthor'])
		},
		beforeCreate() {
			
			if(uni.getStorageSync('userInfo')){
				uni.switchTab({
					url:'../../tab-item/index/index'
				})
			}
		}
	}
</script>
<style scoped>
	.head-extra{
		margin-top: 16upx;
	}
	.login_form{
		margin-bottom:30upx;
		margin-top: 46upx;
	}
	.login-form-item{
		padding:40upx 24upx 40upx 30upx;
	}
	.imgAccount{
		width:44upx;
		height:44upx !important;
		margin-right:30upx;
	}
	.imgPwd{
		width:44upx;
		height:52upx !important;
		margin-right: 30upx;
	
	}
	.imgEye{
		width:76upx;
		height:50upx !important;
		position:absolute;
		right:44upx;
		top:40upx;
	}
	.imgEyeOpen{
		width:70upx;
		height:60upx !important;
		position:absolute;
		right:44upx;
		top:40upx;
	}
</style>