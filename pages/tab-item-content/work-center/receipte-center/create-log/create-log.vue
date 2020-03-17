<template>
    <view class="create-log borderTop">
        <view class="create-log-content">
			<common-flex leftContent="选择门店" 
				:rightContent="shopItem.name || ''" 
				type="navigate"
				 @operateItem="toChooseShop"></common-flex>
			<common-flex leftContent="文章编号" :rightContent="ArticleInfo.seq || ''"></common-flex>
			<common-flex leftContent="文章标题" :rightContent="ArticleInfo.name || ''"></common-flex>
            <view class="cu-form-group">
                <view class="log-title">
                    <text class="text-red">*</text>
                    汇报标题
                </view>
                <input placeholder="请输入您的内容标题" v-model="title" class="font-size-small"
                       :class="title?'explain-color':'color-placeholder'" required>
            </view>
            <view class="cu-form-group create-log-textarea position_relative">
				<textarea v-model="summary" maxlength="1000" placeholder="请输入内容.."
                          class="font-size-small font-weight-normal"
                          :class="summary?'explain-color':'color-placeholder'"
                          style="background:rgba(247,247,247,1);border-radius:4px;padding-top:10px;padding-left:15px;min-height:300upx;"></textarea>
                <text class="create-log-num position_absolute" style="right:20px;bottom:40px;">1000字以内</text>
            </view>
        </view>
		<file-upload
			:isRed="false"
			@upload="uploadSuccess"
			:inImgList="imgList"
			:inFiles="files"
			src="../../../../../static/img/work/camera.png" 
			:xType="doc.workReportShop" 
			></file-upload>
			<view style="height:100upx;"></view>
		<common-btn-one
			:type="type" 
			:disabled="disabled"  
			content="提交"
			@operateBtn="createLog" :isPos="true"></common-btn-one>
    </view>
</template>

<script>
    import {mapState} from 'vuex'
	import commonFlex from '../../../../../components/common/common-flex.vue'
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import fileUpload from '../../../../../components/common/file-upload.vue'
	
	import {NewWorkReportByShopApi,ArticleApi} from '../../../../../api/index_api.js'
    export default {
		components:{commonBtnOne,commonFlex,fileUpload},
        computed: {
			...mapState(['userInfo']),
			doc(){
				return this.config.doc
			}
		},
        data() {
            return {
				title:"",//标题
				summary:"",//备注
                shopItem: {},//选择要回执的门店
                files: [],//上传文件的id
                ArticleInfo: '',//单个文章详情 
				article:'',//文章ID
				imgList:[],
				disabled:false,
				type:'default'
            }
        },
		watch:{
			shopItem(){this.change()},
			title(){this.change()}
		},
		onShow(){
			this.$fire.on('articleShop', res => {
			
			    this.shopItem = {
			        id: res.id,
			        name: res.name
			    };
			})
		},
        onLoad(options) {
            if (options) {
                if (options.id) {
                    this.article = options.id;
                    this.getArticleInfo(options.id)
                }

            }
            
        },
        methods: {
			uploadSuccess(event){
				this.files=event;
			},
			change(){
				if(this.shopItem.id && this.shopItem.id !="" && this.title && this.title !=''){
					this.disabled=false;
					this.type="primary"
					return;
				}
				this.disabled=true;
			},
			success(event){
				this.files=event;
			},
			check(){
				if(!this.shopItem.id){
					this.$utils.showToast('请选择门店进行回执')
					return false;
				}
				if(!this.title){
					this.$utils.showToast('请填写汇报标题')
					return false;
				}
				return true;
			},
            // 新建日志
            async createLog() {
				
				if(this.check()){
					this.disabled=true;
					let val={
						reporter:this.userInfo.id,
						name: this.title,
						shop: this.shopItem ? this.shopItem.id : '',
						type: this.ArticleInfo.type,
						article: this.article,
						summary: this.summary,
						files: this.files ? this.files.join(',') : '',
					}
					console.log(val)
					if(await NewWorkReportByShopApi(val)){
						this.$utils.showToast('新建回执成功')
						this.$utils.goBack()
						this.$utils.hide()
					}
				}
            },

            //获得文章的信息
            async getArticleInfo(id) {
				this.ArticleInfo = await ArticleApi(id)
            },
            //选择门店
            toChooseShop() {
                uni.navigateTo({
					url:'../../../shop-center/near-shop-list/near-shop-list?cat=article&id='+this.article
                })

            },
        }
		
    }
</script>

<style lang="less" scoped>
    page {
        font-size: 12px;
		height:100%;
    }
	
	.create-log-bottom>button{
		margin:20upx 30upx;
	}
    .log-title {
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #2A2A2A
    }

    .img-content {
        background: #fff;
		margin-bottom:150upx;
    }

    .grid.grid-square > uni-view {
        margin-bottom: 24px;
        border-bottom: 1px solid #EEEEED
    }

    .cu-bar .search-form {
        margin: 0;
    }

    .log-content .cu-bar {
        padding-left: 13px;
    }

    .input-placeholder {
        text-align: right;
    }

    .create-log {
        &-textarea {
            position: relative;
            padding-bottom: 24px;

            uni-textarea {
                display: block;
                margin: 12px 0 12px 0;

                .uni-textarea-compute {
                    display: block;
                }

                .uni-textarea-wrapped {
                    .uni-textarea-textarea {
                        line-height: 16px;
                    }
                }
            }
        }

        &-num {
            position: absolute;
            bottom: 12px;
            right: 12px;
            color: #898888;
        }

        &-content {
            .cu-form-group {

            }

            input {
                text-align: right;
            }
        }

        &-bottom {
            width: 100%;
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }
</style>
