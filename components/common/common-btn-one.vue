<template>
	<view class="btn-container bg-white" :class="{'btn-position':isPos,'isMargin':isMargin}">
	    <button :type="type" 
			@tap="operateBtn" 
			:data-target="dataTarget"
			:disabled="disabled" :loading="loading">
			{{content}}
		</button>
		
	</view>
</template>

<script>
	export default{
		props:{
			type:String,//default | primary
			disabled:Boolean,//是否禁用
			loading:Boolean,//是否显示加载中
			content:String,//按钮上显示的内容
			dataTarget:String,//显示的modelname
			isPos:{
				type:Boolean,
				default:true
			},//是否定位
			isMargin:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			operateBtn(){
				if(this.dataTarget){
					this.$emit('operateBtn',this.dataTarget)
				}else{
					this.$emit('operateBtn')
				}
			}
		}
	}
</script>

<style scoped>
	.btn-position{
		position:fixed;
		left:30upx;
		right:30upx;
		bottom:20upx;
	}
	/* .btn-container>button{
		margin:20upx 30upx;
	} */
	.isMargin{
		margin:20upx 30upx;
	}
</style>
