<template>
	<view class="position_relative">
		<view class="log-content borderTop bg-white">
			<receipt-head :item="selectItem"></receipt-head>
			<view class="log-summary" >
				<view  style="margin-bottom:4px;font-size:17px;font-weight: bold;" class="color-normal">{{selectItem.name || ''}}</view>
				<view class="log-detail ">
					{{selectItem.summary}}
				</view>
			</view>
			<files-content :files="selectItem.files" :isShowTitle="false"></files-content>
		</view>

		<view class="article-content bg-white font-size-small font-weight-normal" >
			<common-flex leftContent="文章类型"
				:rightContent="selectItem.type | articleTypeZnPipe" :isRed="false"></common-flex>
			<common-flex leftContent="文章标题" :rightContent="selectItem.articleTitle || ''" :isRed="false"></common-flex>
			<common-flex leftContent="文章编号" 
				:rightContent="selectItem.articleSeq" :isRed="false"></common-flex>
		</view>		
	</view>
</template>

<script>
	
	import downloader from '../../../../../common/img-downloader.js'
	import receiptHead from '../../../../../components/work-receipt/receipt-head.vue'
	import filesContent from '../../../../../components/common/files-content.vue'
	import commonFlex from '../../../../../components/common/common-flex.vue'
	
	import {WorkReportByShopApi} from '../../../../../api/index_api.js'
	export default {
		data() {
			return {
			    selectItem:{},
				id:'',
				shopID:''
			}
		},
		components:{filesContent,receiptHead,commonFlex},
		onPullDownRefresh(){
			//下拉刷新
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.getItem(this.id)
			},800)		
		
		},
        onLoad(params){
			this.id = params.id;
			this.shopID=params.shop;
			this.getItem(this.id)	
		},
		methods: {
			async getItem(id){
				let result = await WorkReportByShopApi(id,this.shopID);
				if(result.files&& result.files.length){
					result.files = result.files.map(item=>item.url)
				}
				this.selectItem = result

			}
		},
	}
</script>

<style lang="less">
	uni-textarea{
		min-width:360px;
		overflow:hidden;
	}
	.log-content{
		padding:19px 12px 22px 17px;
		margin-bottom:13px;
		.log-user{
			margin-bottom:9px;
		}
		.log-summary{
			margin-bottom:13px;
		}
	}
	.article-content{
		margin-bottom:13px;
		.article-item{
			padding:13px 12px 12px 14px;
		}
	}
	.comment-content{
		padding-top:11px;
		padding-left:16px;
		padding-bottom:50px;
		.comment-item{
			padding:26px 0 28px;
		}
	}
	.chat-comment{
		padding:12px 14px 7px 17px;
		background:#fff;
	}
</style>
