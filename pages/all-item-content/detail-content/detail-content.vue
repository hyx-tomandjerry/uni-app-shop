<template>
	<view >
		<view class="container">
			<view class="title">{{itemInfo.title}}</view>
			<view class="desc">
				<view class="flex justify-start">
					<image :src="shopInfo.coverurl" style="width:50px;height:50px;border-radius: 50%;vertical-align: middle;margin-right:10px"></image>
					<view>
						<view style="color:#00BFFF;font-weight: 600;font-size:17px;display: block;margin-bottom:6px;padding-top:4px">{{itemInfo.shopName}}</view>
						<view style="font-size:12px;color:grey;">
							<text style="margin-right:10px;">{{itemInfo.createdate |formatTime('YMD')}}</text>{{itemInfo.creatorName}}
						</view>
						
					</view>
					
				</view>
			</view>
			<view class="content" v-html="itemInfo.summary"  v-if="type=='example'"></view>
			<view class="content" v-html="itemInfo.summary"   v-if="type=='skill'"></view>
		</view>
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				itemInfo:'',
				shopInfo:'',
				type:''
			}
		},
		methods: {
			getItemInfo(id) {
				this.$ajax('Article',{id:id},res=>{
					this.itemInfo=res;
					console.log(this.itemInfo)
					this.getShopInfo(res.shop)
				})
			},
			getShopInfo(id){
				this.$ajax('ProprietorShop',{id:id},res=>{
					this.shopInfo=res;
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
</style>
