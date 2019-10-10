<template>
	<view class="borderTop ">
		<view class="code-container" :style="{minHeight:screenHeight+'px'}">
			<view class="text-center font-size-normal color-normal intro-container">
				<view>我们已向<text class="color-blue">{{telephone}}</text>发送验证码短信请查看</view>
				<view>短信并输入验证码</view>
			</view>
			<view class="input-area flex justify-center">
				<input type="number" class="input-style" maxlength="1"
				:class="{'noInput-style':!item.num,
					'input-active':item.num}"
				v-for="(item,index) in numList" :key="index" v-model="item.num">
			</view>
			<view class=" color-blue" @click="againSend">重新发送验证码</view>
		</view>
		<view class="btn-container" @click='checkCode'>
			下一步
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end borderBottom">
							<view class="content font-size-big color-normal">提示</view>
						</view>
						<view class="padding-xl font-size-normal color-normal bg-white borderBottom">
							<view>请使用<text class="color-blue">{{telephone}}</text>手机号登录</view>
						</view>
						<view class="btn-area" @click="hideModel">我知道了</view>
					</view>
				</view>
	</view>
</template>
<script>
	import {
			mapState,
			mapMutations
		} from 'vuex';
	export default{
		data(){
			return{
				telephone:'',
				numList:[
					{index:1,num:''},
					{index:2,num:''},
					{index:3,num:''},
					{index:4,num:''},
				],
				screenHeight:'',
				modalName:''
			}
		},
		methods:{
			againSend(){
				this.$ajax('SendVerCode',{
					mobile:this.telephone
				},res=>{
					uni.showToast({
						title:`已经向${telephone}发送短信,请查看`,
						icon:'none'
					})
				})
			},
			hideModel(){
				if(this.modalName){
					this.modalName=null;
					this.logout();
					uni.redirectTo({
						url:'../../../login-design/login/login'
					})
				}
			},
			checkCode(){
				let flag=false;
				this.numList.forEach(item=>{
					if(!item.num){
						flag=false
					}else{
						flag=true;
					}
				})
				if(flag){
					let arr=[]
					this.numList.forEach(item=>{
						arr.push(item.num)
					})
					this.$ajax('CheckVerCode',{
						mobile:this.telephone,
						code:arr.join('')
					},res=>{
						this.modalName='modal'
					})
				}else{
					uni.showToast({
						title:'请输入验证码!',
						icon:'none'
					})
				}
			},
			...mapMutations(['logout']),
		},
		components:{
			
		},
		onLoad(options){
			if(options.telephone){
				this.telephone=options.telephone;
			}
			uni.getSystemInfo({
				success:(res)=>{
					
					this.screenHeight=res.windowHeight-60;
				}
			})
		},
	}
</script>
<style lang="less">
		page,
		uni-page{
			background-color: #fff;
		}
		.code-container{
			padding-top: 56px;
			text-align:center;
			.intro-container{
				margin-bottom: 38px;
			}
			.input-area{
				margin-bottom: 24px;
				.input-style{
					width:43px;
					height:44px;
					line-height:44px;
					font-size:24px;
					color:#2A2A2A;
					background:rgba(242,242,242,1);
					border-radius:4px;
					text-align: center;
					
					margin:10px;
				}
				.noInput-style{
					border:1px solid rgba(202,202,202,1)
				}
				.input-active{
					border:1px solid rgba(66,176,237,1);
				}
			}
			
			
		}
		.btn-container{
			height:40px;
			line-height:40px;
			font-size:17px;
			color:#fff;
			text-align: center;
			background:rgba(66,176,237,1);
			border-radius:5px;
			margin:13px 12px 11px 15px;
		
		}
		.btn-area{
			height:43px;
			line-height:43px;
			text-align: center;
			background-color: #fff;
			font-size:16px;
			color:#42B0ED
		}
</style>