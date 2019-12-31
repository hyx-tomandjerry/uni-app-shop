<template>
	<view>
		<commonTitle :itemInfo="noticeItem" :type="'notice'">
			<block slot="title">{{noticeItem.title}}</block>
			<block slot='senderName'>{{noticeItem.applierName}}</block>
			<block slot="time">{{noticeItem.applyDate | formatTime('YMDHMS')}}</block>
			<block slot="content">
				<view  v-html="noticeItem.message"  ></view>
			</block>
		</commonTitle>
	</view>
</template>
<script>
	import commonTitle from '../../../../components/article/common-title.vue'
	import {MessageApi} from '../../../../api/index_api.js'
	export default{
		data(){
			return{
				noticeItem:{}
			}
		},
		components:{
			commonTitle
		},
		onLoad(options){
			if(options.id){
				this.getNoticeItemInfo(options.id)
			}
		},
		methods:{
			async getNoticeItemInfo(id){
				let result = await MessageApi(id);
				if(result.files && result.files.length){
					result.files= result.files.map(item=>item.url)
				}
				this.noticeItem=result;
			}
		}
	}
</script>
<style lang="less">

</style>
