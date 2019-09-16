<template>
	<view>
		<view class="bg-white search-container">
			<view class="flex justify-between search-content align-center" style="width:100%">
				<view class="position_relative search-input-content">
					<input type="text" :placeholder="placeholder"  class="search-input" v-model="inputkey">
						<image :src="searchImg" class="search-img"></image>
						<!-- <image :src="searchClose"  class="search-close" @click="clearInput"></image> -->
				</view>
				
				<view class="font-size-normal color-placeholder search-btn" @click="getSearchList">搜索</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				inputkey:''
			}
		},
		
		props:{
			//搜索图片
			searchImg:{
				type:String,
				default:''
			},
			//关闭图片
			searchClose:{
				type:String,
				default:''
			},
			placeholder:{
				type:String,
				default:''
			}
			
			
			
		},
		methods:{
			getSearchList(){
				this.$emit('getSearchList',this.inputkey)
			}
		}
	}
</script>

<style lang="less">
	.search-container{
		width:100%;
		padding:20px 16px 14px;
		.search-content{
			.search-input-content{
				width:88%;
				.search-input{
					background:rgba(247,247,247,1);
					border-radius:17px;padding-left:52px;height:34px;
				}
				.search-img{
					width:17px;height:17px;vertical-align: middle;position: absolute;left:22px;bottom:8px;
				}
				.search-close{
					width:17px;height:17px;vertical-align: middle;position: absolute;right:10px;bottom:10px;
				}
			}
			.search-btn{
				margin-left:6px;padding-top:6px;
			}
		}
	}
</style>
