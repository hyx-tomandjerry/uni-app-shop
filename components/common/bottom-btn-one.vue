<template>
	<view class="btn-container"  @tap="showModal" :data-target="dataTarget" >
		<view class="btn">{{content}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			content:String,//按钮内容
			dataTarget:String,//数据对象
		},
		methods:{
			showModal(){
				if(this.dataTarget){
					this.$emit('showModal',this.dataTarget)
				}else{
					this.$emit('showModal')
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
		margin-top:100upx;
		position: fixed;
		    width: 100%;
		    bottom: 10px;
	}	
	.btn{
		height:80upx;
		line-height:80upx;
		color:#fff;
		text-align: center;
		border-radius:10upx;
		background:rgba(66,176,237,1);
	}
</style>
