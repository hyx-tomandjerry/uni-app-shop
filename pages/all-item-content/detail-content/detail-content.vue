<template>
	<view >
		<view >
			<commonTitle :itemInfo='itemInfo' :type="'article'">
				<block slot="title">
					<view class="title-name">{{itemInfo.name}}</view>
				</block>
				<block slot='senderName'>{{itemInfo.applierName}}</block>
				<block slot="time">{{itemInfo['applyDate'] |formatTime('YMDHMS')}}</block>
				<block slot="content">
					<view class="article-text">{{itemInfo.content}}</view>
				</block>
			</commonTitle>
		</view>
	</view>
</template>

<script>
	import commonTitle from '../../../components/article/common-title.vue'
	import {ArticleApi} from '../../../api/index_api.js'
	export default{
		data(){
			return{
				itemInfo:{},
			}
		},
		components:{commonTitle},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				if(this.itemInfo.report==this.config.report){
					uni.navigateTo({
						url:"../../tab-item-content/work-center/receipte-center/create-log/create-log?id="+this.itemInfo.id
					})
				}else{
					this.$utils.showToast('该文章不需要编写回执')
				}
				
			}
		},
		methods: {
			writeLog(){
				uni.navigateTo({
					url:"../../tab-item-content/work-center/create-log/create-log?id="+this.itemInfo.id
				})
			},
			async getItemInfo(id) {
				this.itemInfo = await ArticleApi(id);
			}
		},
		onLoad(option){
			if(option){
				this.getItemInfo(option.id)
			}
		}
	}
</script>

<style scoped >
	.title-name{
		word-break: break-word;
		
	}
	page{
		background:rgba(247,247,247,1);
	}
	.detail >>> div{
		margin-bottom:15px;

	}
	.article-text{
		white-space: pre-wrap;
		word-break: break-all;
	}
	.v_html{
		width:100%
	}
	.v_html >>> img{
        width: 100%;
		border-radius: 8px;
    }
	.v_html >>> pre {
		white-space: pre-wrap;
   }
   .v_html >>> strong{
	   font-size:20px !important;
   }
   .content_title{
	   font-size:18px;margin-bottom:14px;
   }

</style>
