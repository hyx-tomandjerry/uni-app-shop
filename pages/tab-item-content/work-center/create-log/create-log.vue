<template>
    <view class="create-log borderTop">
        <view class="create-log-content">
            <view class="cu-form-group">
                <view class="log-title">
                    <text class="text-red">*</text>
                    选择门店
                </view>
                <view>
                    <text class="font-size-normal color-normal">{{shopItem.name}}</text>
                    <text class="cuIcon-right" style="font-size:16px;margin-left:6px;color:#898888"
                          @click="toChooseShop()"></text>
                </view>
            </view>

            <view class="cu-form-group">
                <view class="log-title">
                    <text class="text-red">*</text>
                    文章编号
                </view>
                <input placeholder="文章编号" v-model="ArticleInfo.seq" disabled style="font-size:14px;color:#898888;">
            </view>

            <view class="cu-form-group">
                <view class="log-title" style="width:20%;">
                    <text class="text-red">*</text>
                    文章标题
                </view>
                <input placeholder="文章标题" v-model="ArticleInfo.name" disabled style="font-size:14px;flex:1"
                       class="text-ellipse">
            </view>
            <view class="cu-form-group">
                <view class="log-title">
                    <text class="text-red">*</text>
                    汇报标题
                </view>
                <input placeholder="请输入您的内容标题" v-model="log.title" class="font-size-small"
                       :class="log.title?'explain-color':'color-placeholder'" required>
            </view>
            <view class="cu-form-group create-log-textarea position_relative">
				<textarea v-model="log.summary" maxlength="1000" placeholder="请输入内容.."
                          class="font-size-small font-weight-normal"
                          :class="log.summary?'explain-color':'color-placeholder'"
                          style="background:rgba(247,247,247,1);border-radius:4px;padding-top:10px;padding-left:15px;min-height:100px;"></textarea>
                <text class="create-log-num position_absolute" style="right:20px;bottom:40px;">1000字以内</text>
            </view>
        </view>

        <view class="img-content margin-top-13">
            <view class="cu-bar bg-white margin-top">
                <view class="action color-normal font-size-small font-weight-normal">
                    上传附件
                </view>
                <view class="action">

                </view>
            </view>
			<uploadImg  :xType="$store.state.doc.workReportShop" @success="success($event)"></uploadImg>
        </view>

        <view class="create-log-bottom" style="position:fixed;bottom:0;">
            <button type="default" @click="createLog()">提交</button>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex'
	import uploadImg from '../../../../components/upload-img.vue'
    export default {
        computed: mapState(['userInfo']),
        data() {
            return {
                log: {
                    title: '',//标题
                    summary: '',//内容
                },
                shopItem: '',//选择要回执的门店
                files: [],//上传文件的id
                ArticleInfo: '',//单个文章详情 
				article:'',//文章ID
            }
        },
		components:{uploadImg},
        onLoad(options) {
            if (options) {
                if (options.id) {
                    this.article = options.id;
                    this.getArticleInfo(options.id)
                }

            }
            this.$fire.on('articleShop', res => {

                this.shopItem = {
                    id: res.id,
                    name: res.name
                };
            })
        },
        methods: {
			success(event){
				this.files=event;
			},
            // 新建日志
            createLog() {
                if (!this.log.title || !this.log.summary) {
                    uni.showToast({
                        title: '请填写完整信息',
                        icon: 'none'
                    })
                } else {
                    this.$ajax('NewWorkReportByShop', {
                        reporter: this.userInfo.id,
                        name: this.log.title,
                        shop: this.shopItem ? this.shopItem.id : '',
                        type: 1,
                        article: this.article,
                        summary: this.log.summary,
                        files: this.files ? this.files.join(',') : '',
                    }, res => {
                        if (res == -76) {
                            uni.showToast({
                                title: '不能在一个门店下重复建立工作回执',
                                icon: 'none'
                            })
                        } else {
                            uni.showToast({
                                title: '新建工作回执成功',
                                icon: 'none'
                            });
                            setTimeout(() => {
                                uni.navigateBack({
                                    delta: 1
                                })

                            }, 500)
                        }
                    })
                }
            },

            //获得文章的信息
            getArticleInfo(id) {
                this.$ajax('Article', {id: id}, res => {
                    this.ArticleInfo = res;

                })
            },
            //选择门店
            toChooseShop() {
                uni.navigateTo({
                    url: "../../shop-center/near-shop-list/near-shop-list?cat=article&id=" + this.ArticleInfo.id
                })

            },
        }
    }
</script>

<style lang="less" scoped>
    page {
        font-size: 12px;
    }

    /*.cu-form-group uni-input{*/
    /*text-align: right;*/
    /*}*/
    .log-title {
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #2A2A2A
    }

    .img-content {
        background: #fff;
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

            button {
                color: #fff;
                background: rgba(66, 176, 237, 1);
                width: 94%;
                border-radius: 5px;
                height: 40px;
                line-height: 40px;
            }
        }
    }
</style>
