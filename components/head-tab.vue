<template>
	<view>
		<view class="header-content" >
			<slot name="left">
				<view class="cuIcon-back back" @click="goBack()"></view>
			</slot>
			<view style="position:absolute;left:70px;right:70px;min-width:0;user-select:auto">
				<slot name="content">
					<view class="title">{{title}}</view>
					</slot>
			</view>
			
			<view style="position:absolute;right:15px;top:20px;">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['title'],
		data() {
			return {
				
			};
		},
		methods:{
			goBack(){
				this.$emit('goBack')
			}
		},
		created(){
			this.title=this.title
		}
	}
</script>

<style lang="less">
	.header-content{
		background:rgb(248,248,248);
		color:#000;
		position:fixed;
		left:0;
		width:100%;
		min-height:44px;
		padding:30px 15px 7px;
		// padding:7px 3px;
		display: flex;
		overflow: hidden;
		z-index:1000;
		justify-content: space-between;
		box-sizing: border-box;
		transition-property: all;
		.back{
			font-size:20px;
			color:rgba(0,0,0,0.6);
			
		}
		.title{
			font-weight: 700;
			font-size: 16px;
			line-height: 30px;
			text-align: center;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	// .header-content{
	// 	background:rgb(248,248,248);
	// 	color:#000;
	// 	min-height:44px;
	// 	align-items: center;
	// 	text-align:center;
	// 	position:fixed;width:100%;
	// 	background:rgb(248, 248, 248);
	// 	z-index:100;
	// 	.back{
	// 		font-size:13px;position: absolute;left:20px;top:10px;
	// 	}
	// 	.title{
	// 		font-weight: 700;
 //    font-size: 16px;
 //    line-height: 30px;
 //    text-align: center;
 //    overflow: hidden;
 //    white-space: nowrap;
 //    text-overflow: ellipsis;
	// 	}
	// }
</style>
