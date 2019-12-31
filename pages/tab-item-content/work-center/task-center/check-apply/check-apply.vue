<template>
	<view>
		<view class="input-container margin-bottom-normal bg-white borderTop">
			<textarea style="padding:30upx 20upx;" placeholder="请输入完工说明......" v-model="inputValue" :class="{
				'color-normal':inputValue,
				'color-regular':!inputValue
			}"/>
		</view>
		<file-upload
			:isRed="true"
			@upload="uploadSuccess"
			:inImgList="imgList"
			:inFiles="files"
			src="../../../../../static/img/work/camera.png" 
			:xType="doc.taskRecept" 
			:xTarget="taskID"></file-upload>
		<common-btn-one
			type='primary'
			:disabled="disabled" 
			content="申请验收"
			@operateBtn="submitCheck"></common-btn-one>
	</view>
</template>

<script>
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import fileUpload from '../../../../../components/common/file-upload.vue'
	
	import {FinishTaskApi} from '../../../../../api/task.js'
	export default {
		computed:{
			doc(){return this.config.doc}
		},
		components:{commonBtnOne,fileUpload},
		data() {
			return {
				inputValue:'',
				imgList:[],
				taskID:'',
				files:[],
				disabled:false
				
			}
		},
		onLoad(options){
			if(options.id){this.taskID=options.id}
		},
		methods: {
			uploadSuccess(event){
				this.files=event;
			},
			async submitCheck(){
				this.disabled=true;
				let val={
					task:this.taskID,
					summary:this.inputValue?this.inputValue:'',
					files:this.files?this.files.join(','):''
				}
				if(await FinishTaskApi(val)){
					this.$utils.showToast('提交验收')
					this.$utils.goBack()
					this.$utils.hide()
				}else{
					this.disabled=false;
				}

			},

		}
	}
</script>

<style lang="less" scoped>

	uni-textarea{
		width:100%;
		padding:12px 14px;
	}
</style>
