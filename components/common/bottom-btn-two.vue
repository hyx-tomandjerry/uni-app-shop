<template>
	<view class="btn-container flex-com">
		<view class="first-btn flex-sm" :data-target="refuse_data_target" @tap="showLeftBtn">{{refuse_btn_con}}</view>
		<view class="second-btn flex-1"  @tap="showRightBtn" :data-target="agree_data_target">{{agree_btn_con}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			refuse_btn_con:String,//左边按钮内容
			agree_btn_con:String,//右边按钮内容
			refuse_data_target:String,//数据对象
			agree_data_target:String
		},
		methods:{
			showLeftBtn(){
				this.$emit('refuseBtn',this.refuse_data_target)
			},
			showRightBtn(){
				if(this.agree_data_target){
					this.$emit('agressBtn',this.agree_data_target)
				}else{
					this.$emit('agressBtn')
				}
				
			}
		}
		
	}
</script>

<style scoped>
	.btn-container{
		font-size:34upx;
		background-color: #fff;
		padding:30upx;
		position: fixed;
		    width: 100%;
		    bottom: 10px;
		
	}	
	.first-btn{
		margin-right:20upx;
		height:80upx;	line-height:80upx;	color:rgba(66,176,237,1);
		border:1upx solid rgba(66,176,237,1);
		text-align: center;
		border-radius:10upx;
	}
	.second-btn{
		height:80upx;	line-height:80upx;	color:#fff;
		background-color: rgba(66,176,237,1);
		text-align: center;
		border-radius:10upx;
	}
	.flex-com{
		display: flex;
		justify-content: flex-start;
		align-content: center;
	}
</style>
