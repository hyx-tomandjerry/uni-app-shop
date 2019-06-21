<template>
	<view class="create-log">
		<view class="create-log-content">
			<view class="cu-form-group" >
				<view class="log-title"><text class="text-red">*</text>选择门店</view>
				<view>
					<text>{{shopItem.name}}</text>
					<text class="cuIcon-right" style="font-size:16px;margin-left:6px;color:#898888" @click="toChooseShop()"></text>
				</view>
			</view>

			<view class="cu-form-group" v-if="type=='article'">
				<view class="log-title"><text class="text-red">*</text>文章编号</view>
				<input placeholder="文章编号" v-model="ArticleInfo.seq" disabled>
			</view>

			<view class="cu-form-group" v-if="type=='article'">
				<view class="log-title"><text class="text-red">*</text>文章标题</view>
				<input placeholder="文章标题" v-model="ArticleInfo.title" disabled>
			</view>
			<view class="cu-form-group">
				<view class="log-title"><text class="text-red">*</text>汇报标题</view>
				<input placeholder="请输入您的内容标题" v-model="log.title" class="font-size-normal font-weight-normal"
				:class="{
					'text-black':log.title,
					'color-placeholder':!log.title
				}">
			</view>

			<view class="cu-form-group create-log-textarea">
				<textarea  v-model="log.summary" maxlength="1000"   placeholder="请输入汇报内容.." class="font-size-small font-weight-normal"></textarea>
				<!--<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="多行文本输入框"></textarea>-->
				<text class="create-log-num">1000字以内</text>
			</view>
		</view>

		<view class="img-content margin-top-13">
			<view class="cu-bar bg-white margin-top">
				<view class="action color-normal font-size-small font-weight-normal" >
					上传附件
				</view>
				<view class="action">

				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
					 :key="index" @tap="ViewImage(index)" :data-url="imgList[index]">
						<view class="cu-tag bg-red" @tap.stop="DelImg(index)" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="padding-xs solids" @tap="chooseImageEvent()" v-if="imgList.length<4">
						<image src="../../../../static/img/work/camera.png" style="width:78px;height:78px;"></image>
					</view>
				</view>
			</view>

			<!-- <view class="cu-form-group  margin-top">
				<view class="title text-grey" style="font-size:12px;"><text class="text-red">*</text>抄送人</view>
				<view><text class="cuIcon-right" @click="goChoseCopy()"></text></view>
			</view> -->
		</view>

		<view  class="create-log-bottom" style="position:fixed;bottom:0;">
			<button type="default" @click="createLog()">提交</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
	    computed:mapState(['userInfo']),
		data() {
			return {
				log:{
					title:'',//标题
                    summary:'',//内容
				},
				imgList: [],
				index:-1,
				shopItem:'',
				files:[],
				ArticleInfo:'',
				article:'',
				token:'',
				type:'',
				shopID:[],//用于存放回执门店的id
			}
		},
		onLoad(options){
			console.log(options)
			this.type=options.type;
			this.getUploadToken()
			if(options){
				if(options.id){
					this.article = options.id;
					this.getArticleInfo(options.id)
				}

			}
			this.$fire.on('shop',res=>{
				console.log(res)
				this.shopItem={
					id:res.shopID,
					name:res.shopName
				};
			});
			this.$fire.on('articleShop',res=>{
				console.log(res)
				this.shopItem={
					id:res.id,
					name:res.name
				};
			})
		},
		methods: {
		    // 新建日志
			createLog(){
				if(!this.log.title || !this.log.summary){
					uni.showToast({
						title:'请填写完整信息',
						icon:'none'
					})
				}else{
					if(this.type=='article'){
                        this.$ajax('NewWorkReportByShop',{
                            reporter:this.userInfo.id,
                            title:this.log.title,
							 shop:this.shopItem?this.shopItem.id:'',
                            type:1,
                            article:this.type=='article'?this.article:'',
                            summary:this.log.summary,
                            files:this.files?this.files.join(','):'',
                        },res=>{
                            uni.showToast({
                                title:'新建工作汇报成功',
                                icon:'none'
                            });
                            setTimeout(()=>{
                                uni.navigateBack({
                                    delta:1,
                                    success:(res)=>{
                                        this.$fire.fire('logRefresh','111')
                                    }
                                })

                            },500)
                        })
					}else if(this.type=='log'){
						console.log(this.shopItem)
						if(!this.shopItem){
							uni.showToast({
								title:'请选择门店进行汇报',
								icon:'none'
							})
						}else{
                            this.$ajax('NewWorkReportByShop',{
                                reporter:this.userInfo.id,
                                title:this.log.title,
                                shop:this.shopItem?this.shopItem.id:'',
                                type:2,
                                article:this.type=='article'?this.article:'',
                                summary:this.log.summary,
                                files:this.files?this.files.join(','):'',
                            },res=>{
                                uni.showToast({
                                    title:'新建工作汇报成功',
                                    icon:'none'
                                });
                                setTimeout(()=>{
                                    uni.navigateBack({
                                        delta:1,
                                        success:(res)=>{
                                            this.$fire.fire('logRefresh','111')
                                        }
                                    })

                                },500)
                            })

						}
					}


				}
			},
			
			//获得文章的信息
			getArticleInfo(id){
				this.$ajax('Article',{id:id},res=>{
					this.ArticleInfo=res;
					
				})
			},
			//获得要回值的门店
			getReturnShop(id){
				this.$ajax('ShopsByReport',{
					user:this.userInfo.id,
					id:id
				},res=>{
					if(res){
						res.forEach(item=>{
							this.shopID.push(item.id)
						})
						console.log(this.shopID.join(','))
					}
					
				})
			},
			//选择门店
			toChooseShop(){
				if(this.type=='article'){
					uni.navigateTo({
						url:"../receipt-shop-list/receipt-shop-list?id="+this.ArticleInfo.id
					})
				}else if(this.type=='log'){
					uni.navigateTo({
						url:"../../shop-center/search-more-shop/search-more-shop?cat=log"
					})
				}
				
			},
            //获得上传token
            getUploadToken(){
                uni.request({
                    url:this.$store.state.url+'UploadToken',
                    success: (res) => {
                        this.token=res.data.data

                    }
                })
            },
			chooseImageEvent(){
					uni.chooseImage({
						count:9,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: (res) => {
							const tempFilePaths=res.tempFilePaths;
							if (this.imgList.length != 0) {
								this.imgList = this.imgList.concat(res.tempFilePaths)
							} else {
									this.imgList = res.tempFilePaths
							}
                            for(var i=0;i<res.tempFilePaths.length;i++){
                                var  uploadTask=uni.uploadFile({
                                    url:this.$store.state.uploadHostUrl+this.token,
                                    filePath:tempFilePaths[i],
                                    name:'file',
                                    formData:{
                                        'x:type':this.$store.state.doc.workReportShop,
                                        'x:owner': this.userInfo.owner,
                                        'x:creator': this.userInfo.id,
                                    },
                                    success: (uploadFileRes) => {
                                        let res=JSON.parse(uploadFileRes.data);
                                        console.log(this.files)
                                        this.files.push(res.data);
                                    }
                                });
                                uploadTask.onProgressUpdate((res)=>{
                                    if(res.progress==100){
                                        uni.showToast({
                                            title:'上传成功',
                                            icon:'none'
                                        })
                                    }
                                },(error)=>{
                                    uni.showToast({
                                        title:'上传失败',
                                        icon:'none'
                                    })
                                })
                            }



						}
					})

			},
			InputFocus(event){
				console.log('InputFocus')
			},

				ViewImage(e) {
					uni.previewImage({
						urls: this.imgList,
						current: e
					});

				},
				DelImg(event) {
					uni.showModal({
						content: '确定删除？',
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								console.log(event)
								this.imgList.splice(event, 1);
								this.$ajax('RemoveFiles',{
									files:this.files[event],
								},res=>{
									this.files.splice(event,1)
									uni.showToast({
										title:'删除成功',
										icon:'none'
									})
								})
							}
						}
					})
				},
			PickerChange(event) {
				this.index = event.detail.value;
			},
			//选择抄送人
			goChoseCopy(){
				uni.navigateTo({
					url:'../chose-copy/chose-copy'
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	page{
		font-size:12px;
	}
	/*.cu-form-group uni-input{*/
		/*text-align: right;*/
	/*}*/
	.log-title{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:#2A2A2A
	}
	.img-content{
		background:#fff;
	}
	.grid.grid-square>uni-view{
		margin-bottom:24px;
		border-bottom:1px solid #EEEEED
	}
	.cu-bar .search-form{
		margin:0;
	}
	.log-content .cu-bar{
		padding-left:13px;
	}
	.input-placeholder{
		text-align: right;
	}
	.create-log{
		&-textarea{
			position: relative;
			padding-bottom: 24px;
			uni-textarea{
				display: block;
				margin:12px 0 12px 0;
				.uni-textarea-compute{
					display: block;
				}
				.uni-textarea-wrapped{
					.uni-textarea-textarea{
						line-height: 16px;
					}
				}
			}
		}
		&-num{
			position: absolute;
			bottom: 12px;
			right: 12px;
			color: #898888;
		}
		&-content{
			.cu-form-group{

			}
			input{
				text-align: right;
	    	}
		}
		&-bottom{
			width: 100%;
			margin-top: 30px;
			margin-bottom: 30px;
			button{
				color: #fff;
				background:rgba(66,176,237,1);
				width:94%;
				border-radius:5px;
				height: 40px;
				line-height: 40px;
			}
		}
	}
</style>
