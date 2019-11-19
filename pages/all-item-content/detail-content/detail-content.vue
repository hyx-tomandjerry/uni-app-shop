<template>
	<view >
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left">
				<text class="cuIcon-back font-size-middle" @click.stop="goBack()"></text>
			</block>
			<block slot="content">
				<view class="font-weight-bold content_title color-normal" >详情内容</view>
			</block>
			<block slot="right">
				<view class="text-blue font-size-small font-weight-normal"  style="margin-right:15px;" @click="writeLog()"
					  v-if="userInfo.type==shoperObj.type && itemInfo.report==report"
				>编写回执</view>
			</block>
		</cu-custom>
		<view >
			<commonTitle :itemInfo='itemInfo' :type="'article'">
				<block slot="title">{{itemInfo.name}}</block>
				<block slot='senderName'>{{itemInfo.applierName}}</block>
				<block slot="time">{{itemInfo['applyDate']}}</block>
				<block slot="content">
					<view class="article-text">{{itemInfo.content}}</view>
				</block>
			</commonTitle>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import commonTitle from '../../../components/common-title.vue'
	// import moment from 'moment'
	export default{
		computed:mapState(['userInfo','shoperObj','report']),
		data(){
			return{
				itemInfo:{},
			}
		},
		components:{commonTitle},
		methods: {
			writeLog(){
				uni.navigateTo({
					url:"../../tab-item-content/work-center/create-log/create-log?id="+this.itemInfo.id
				})
			},
			getItemInfo(id) {
				this.$ajax('Article',{id:id},res=>{
					res.applyDate=this.$moment(res.applyDate).format('YYYY-MM-DD hh:mm:ss')
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
			if(option){
				this.getItemInfo(option.id)
			}
		}
	}
</script>

<style scoped >
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
