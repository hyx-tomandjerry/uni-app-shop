<template>
	<view >
		<cu-custom :isBack="true">
			<block slot="left">
				<text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold">详情内容</view>
			</block>
			<block slot="right">
				<text class="text-blue" style="font-size:13px;" @click="writeLog()" v-if="itemInfo.report==1">编写汇报</text>
			</block>
		</cu-custom>
		<view class="container borderTop bg-white">
			<view class="title">{{itemInfo.title}}</view>
			<view class="desc flex justify-between  font-weight-normal" style="padding:10px 0;">
				<view class="font-size-normal">{{itemInfo.applierName}}</view>
				<view class="font-size-litter color-normal">
					{{itemInfo.applyDate | formatTime('YMDHMS')}}
				</view>
			</view>
			<view>
				<image :src="itemInfo.coverurl" style="width:100%;height:130px;border-radius: 15px;margin-bottom:10px;"></image>
			</view>
			<view class="detail">
				<view class="content" v-html="itemInfo.summary"  v-if="type=='example'"></view>
				<view class="content" v-html="itemInfo.summary"   v-if="type=='skill'"></view>
			</view>
			
		</view>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				itemInfo:{},
				shopInfo:'',
				type:''
			}
		},
		methods: {
			writeLog(){
				uni.navigateTo({
					url:"../../tab-item-content/work-center/create-log/create-log?id="+this.itemInfo.id+'&type=article'
				})
			},
			getItemInfo(id) {
				this.$ajax('Article',{id:id},res=>{
					this.itemInfo=res;
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(option){
			console.log(option);
			if(option){
				this.getItemInfo(option.id)
				this.type=option.type;
			}
		}
	}
</script>

<style scoped>
	page{
		background:#fff;
		font-size:15px;
		font-weight: 500;
	}
	.detail >>> div{
		margin-bottom:15px;
		
	}
	.container{
		padding:10px 13px 10px 14px;

	}
	.desc{
		padding:10px 0;
	}

	.title{
		font-size:20px;
		font-weight: 600;
		padding:10px 0;
	}
	.content{
		width:100%
	}
	.content >>> img{
        max-width: 100%;
    }
	.content >>> pre {
		white-space: pre-wrap;
   }
   .content >>> strong{
	   font-size:20px !important;
   }
   .img{
	   width:50px;height:50px;border-radius: 50%;vertical-align: middle;margin-right:10px
   }
   .shop-name{
	   color:#00BFFF;font-weight: 600;font-size:17px;display: block;margin-bottom:6px;
   }
</style>
