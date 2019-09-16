<template>
	<view>
		<commonTitle :itemInfo="noticeItem" :type="'notice'">
			<block slot="title">{{noticeItem.title}}</block>
			<block slot='senderName'>{{noticeItem.applierName}}</block>
			<block slot="time">{{noticeItem.applyDate}}</block>
			<block slot="content">
				<view  v-html="noticeItem.message"  ></view>
			</block>
		</commonTitle>
	</view>
</template>
<script>
	import commonTitle from '../../../../components/common-title.vue'
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
			getNoticeItemInfo(id){
				this.$ajax('Message',{id:id},res=>{
					res.applyDate=this.format(res.applyDate,'YMDHMS');
					this.noticeItem=res;
					console.log(this.noticeItem)
				})
			}
		}
	}
</script>
<style lang="less">
		
</style>