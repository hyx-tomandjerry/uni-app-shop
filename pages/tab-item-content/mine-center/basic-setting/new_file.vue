uploadCover(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths=res.tempFilePaths;
						this.coverList = res.tempFilePaths
						uni.getStorage({
							key:'userInfo',
							success: (res) => {
								const uploadTask=uni.uploadFile({
									url:this.$store.state.uploadHostUrl+this.token,
									filePath:tempFilePaths[0],
									name:'file',
									formData:{
										'x:type':this.$store.state.constants.shopCover,
										'x:owner': res.data.owner,
										'x:creator': res.data.id,
									},
									success: (uploadFileRes) => {
										let res=JSON.parse(uploadFileRes.data)
										this.shop.coverID=res.data;
										console.log(this.shop.coverID)
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
						})


					}
				})
			},