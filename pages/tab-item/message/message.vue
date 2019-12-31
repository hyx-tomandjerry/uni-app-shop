<!--<template>-->
	<!--<view class="position_relative">-->
		<!--<view class="title">-->
			<!--消息-->
		<!--</view>-->
		<!--<view style="position:relative;">-->
			<!--<view class="header-content" >-->
				<!--<view class="flex justify-start" @click="showGroupList('telephone')">-->
					<!--<image src="../../../static/img/message/telephone.png" class="header-img"-->
					<!--&gt;</image>-->
					<!--<view class="list-title">通讯录</view>-->
				<!--</view>-->
			<!--</view>-->
			<!--<view style="height:13px;width:100%;background:rgba(247,247,247,1)"></view>-->
			<!--<scroll-view scroll-y="true" class="page" :class="modalName!=null?'show':''" >-->
				<!--<view class="cu-list menu-avatar">-->
					<!--<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in chatList"  :key="index"-->
					 <!--@touchstart="ListTouchStart($event)"-->
					 <!--@click="chat(item)"-->
					  <!--@touchmove="ListTouchMove($event)"-->
					   <!--@touchend="ListTouchEnd($event)" :data-target="'move-box-' + index">-->
						<!--<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>-->
						<!--<view class="content" >-->
							<!--<view class="text-grey">{{item.C2cNick}}</view>-->
							<!--<view class="text-gray text-sm" >-->
								<!--{{item.LastMsg.MsgBody[0].MsgContent.Text}}-->
							<!--</view>-->
						<!--</view>-->
						<!--<view class="action">-->
							<!--<view class="text-grey text-xs">{{item.MsgTimeStamp | formatTime('HMS')}}</view>-->
							<!--<view class=" round bg-grey sm"></view>-->
						<!--</view>-->
						<!--<view class="move">-->
							<!--<view class="bg-grey">置顶</view>-->
							<!--<view class="bg-red">删除</view>-->
						<!--</view>-->
					<!--</view>-->
				<!--</view>-->
			<!---->
			<!--</scroll-view>-->
		<!--</view>-->
		<!---->
	<!--</view>-->
<!--</template>-->

<!--<script>-->
	<!--import webim from '../../../static/js/webim.js'-->
	<!---->
	<!--export default {-->
		<!---->
		<!--data() {-->
			<!--return {-->
				<!--chatList:[],//当前聊天列表-->
				<!--modalName: null,-->

				<!--listTouchStart: 0,-->
				<!--listTouchDirection: null,-->
			<!--}-->
		<!--},-->
		<!--onLoad(){-->
			<!--this.getLoginInfo();-->
			<!--this.$fire.on('group',result=>{-->
				<!--console.log(result)-->

			<!--})-->

		<!--},-->

		<!--methods: {-->
			<!---->
			<!--showWorkClick(){-->
				<!--uni.navigateTo({-->
					<!--url:'../work/work'-->
				<!--})-->
			<!--},-->
			<!--chat(item){-->
				<!--console.log(item)-->
				<!--//进行聊天-->
				<!--uni.navigateTo({-->
					<!--// url:'../../tab-item-content/message-center/chat/chat?chatAccount='+item.To_Account-->
						<!--url:'../../tab-item-content/message-center/chat/chat'-->
				<!--})-->
			<!--},-->
			<!--// ListTouch触摸开始-->
			<!--ListTouchStart(e) {-->
				<!--this.listTouchStart = e.touches[0].pageX-->
			<!--},-->

			<!--// ListTouch计算方向-->
			<!--ListTouchMove(e) {-->
				<!--this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'-->
			<!--},-->

			<!--// ListTouch计算滚动-->
			<!--ListTouchEnd(e) {-->
				<!--if (this.listTouchDirection === 'left') {-->
					<!--this.modalName = e.currentTarget.dataset.target-->
				<!--} else {-->
					<!--this.modalName = null-->
				<!--}-->
				<!--this.listTouchDirection = null-->
			<!--},-->
			<!--showGroupList(name){-->
				<!--uni.getStorage({-->
					<!--key:'userInfo',-->
					<!--success: (res) => {-->
						<!--if(res.data.status!==1){-->
							<!--uni.showToast({-->
								<!--title:'您没有该权限',-->
								<!--icon:'none'-->
							<!--})-->
							<!--return;-->
						<!--}-->
                        <!--uni.navigateTo({-->
                            <!--url:'../../tab-item-content/message-center/group-list/group-list?type='+name-->
                        <!--})-->
					<!--}-->
				<!--})-->

			<!--},-->
			<!--//获得通讯录列表-->
			<!--getAllFriendEvent(){-->
				<!--let options={-->
					<!--'From_Account':this.$store.state.loginInfo.identifier,-->
					<!--'TimeStamp':0,-->
					 <!--'StartIndex': 0,-->
					  <!--'GetCount': 20000,-->
                    <!--'LastStandardSequence': 0,-->
                    <!--"TagList": [-->
                        <!--"Tag_Profile_IM_Nick",-->
                        <!--"Tag_SNS_IM_Remark",-->
                        <!--"Tag_Profile_IM_Gender"-->
                    <!--]-->
				<!--};-->
				<!--webim.getAllFriend(options,(resp)=>{-->
					<!--// console.log('好友列表',resp.InfoItem)-->
				<!--},(error)=>{-->
					<!--// console.log('获取好友列表失败')-->
				<!--})-->
			<!--},-->
			<!--//获得当前会话列表-->
			<!--getRecentContactList(){-->
				<!--let options={"Count":1};-->
				<!--webim.getRecentContactList(options,(resp)=>{-->
					<!--this.chatList=resp.SessionItem-->
					<!--// console.log('左侧会话列表',this.chatList)-->
				<!--})-->
			<!--},-->

			<!--showIndexClick(){-->
				<!--uni.navigateTo({-->
					<!--url:'../index/index'-->
				<!--})-->
			<!--},-->
			<!--showMineClick(){-->
				<!--uni.navigateTo({-->
					<!--url:'../mine/mine'-->
				<!--})-->
			<!--},-->
			<!--getLoginInfo(){-->
				<!--this.$ajax('Login',{-->
					<!--user:'13167233205',-->
					<!--token:'abc123456'-->
				<!--},res=>{-->
					<!--if(res.status==1){-->
						<!--var onConnNotify=function(resp){-->
							<!--// console.log('链接状态',resp);-->
							<!--let info ;-->
							<!--switch(resp.ErrorCode){-->
								<!--case webim.CONNECTION_STATUS.ON:-->
									<!--webim.Log.warn('建立连接成功:'+resp.ErrorInfo);-->
									<!--break;-->
								<!--case webim.CONNECTION_STATUS.OFF:-->
									<!--info="连接已断开，无法收到新消息，请检查下您的网络是否正常:"+resp.ErrorInfo;-->
									<!--webim.Log.warn(info);-->
									<!--break;-->
								<!--case webim.CONNECTION_STATUS.RECONNECT:-->
									<!--info="连接状态恢复正常:"+res.ErrorInfo;-->
									<!--webim.Log.warn(info);-->
									<!--break;-->
								<!--default:-->
									<!--webim.Log.error('未知连接状态:' + resp.ErrorInfo);-->
									<!--break;-->
							<!--}-->
						<!--};-->
						<!--//监听收到新消息回调事件-->
						<!--var  onMsgNotify=function(resp){-->
							<!--let newMsg-->
							<!--for(let i in resp){-->
								<!--//遍历新消息-->
								<!--newMsg=resp[i];-->
								<!--if(newMsg.getSession().type()==webim.SESSION_TYPE.GROUP && newMsg.isSend){-->
									<!--return;-->
								<!--}-->
							<!--}-->
						<!--};-->
						<!--const loginInfo={-->
							<!--sdkAppID:this.$store.state.IMSDKAPPID,-->
							<!--appIDAt3rd:this.$store.state.IMSDKAPPID,-->
							<!--identifier:res.imUser,-->
							<!--identifierNick:res.name,-->
							<!--accountType:39016,-->
							<!--userSig:res.extprops-->
						<!--};-->
						<!--const listeners={-->
							<!--"onConnNotify":onConnNotify,-->
							<!--"jsonpCallback":()=>{},-->
							<!--"onMsgNotify":onMsgNotify,-->
							<!--"onBigGroupMsgNotify":{},-->
							<!--"onGroupSystemNotifys":{},-->
							<!--"onGroupInfoChangeNotify":{},-->
							<!--"onFriendSystemNotifys":{},-->
							<!--"onProfileSystemNotifys":{},-->
							<!--"onKickedEventCall":()=>{},-->
							<!--"onC2cEventNotifys":()=>{}-->
						<!--};-->
						<!--const options={-->
							<!--isAccessFormalEnv:true,-->
							<!--isLogOn:false-->
						<!--};-->
						<!--webim.login(-->
								<!--loginInfo,listeners,options,-->
								<!--(resp)=>{-->
									<!--// console.log(loginInfo)-->
									<!--// console.log('用户登录成功')-->
									<!--this.$store.commit('setLoginInfo',loginInfo);-->
									<!--this.getAllFriendEvent();-->
									<!--this.getRecentContactList();-->

								<!--},-->
								<!--(err)=>{-->
									<!--// console.log(err,'用户登录失败');-->
								<!--}-->
						<!--)-->
					<!--}-->
				<!--})-->
				<!--// uni.request({-->
				<!--// 	url:this.$store.state.url+'Login',-->
				<!--// 	data:{-->
				<!--// 		user:'13167233205',-->
				<!--// 		token:'abc123456'-->
				<!--// 	},-->
				<!--// 	success: (res) => {-->
				<!--// 		console.log(res)-->
				<!--// 		if(res.data.data.status==1){-->
				<!--// 		 //监听链接状态回调事件-->
				<!--// 		var onConnNotify=function(resp){-->
				<!--// 			// console.log('链接状态',resp);-->
				<!--// 			let info ;-->
				<!--// 			switch(resp.ErrorCode){-->
				<!--// 				case webim.CONNECTION_STATUS.ON:-->
				<!--// 				webim.Log.warn('建立连接成功:'+resp.ErrorInfo);-->
				<!--// 				break;-->
				<!--// 			case webim.CONNECTION_STATUS.OFF:-->
				<!--// 				info="连接已断开，无法收到新消息，请检查下您的网络是否正常:"+resp.ErrorInfo;-->
				<!--// 				webim.Log.warn(info);-->
				<!--// 				break;-->
				<!--// 			case webim.CONNECTION_STATUS.RECONNECT:-->
				<!--// 				info="连接状态恢复正常:"+res.ErrorInfo;-->
				<!--// 				webim.Log.warn(info);-->
				<!--// 				break;-->
				<!--// 			default:-->
				<!--// 				webim.Log.error('未知连接状态:' + resp.ErrorInfo);-->
				<!--// 				break;-->
				<!--// 			}-->
				<!--// 		};-->
				<!--// 			//监听收到新消息回调事件-->
				<!--// 		var  onMsgNotify=function(resp){-->
				<!--// 				let newMsg-->
				<!--// 				for(let i in resp){-->
				<!--// 					//遍历新消息-->
				<!--// 					newMsg=resp[i];-->
				<!--// 					if(newMsg.getSession().type()==webim.SESSION_TYPE.GROUP && newMsg.isSend){-->
				<!--// 						return;-->
				<!--// 					}-->
				<!--// 				}-->
				<!--// 			};-->
				<!--// 			const loginInfo={-->
				<!--// 				sdkAppID:this.$store.state.IMSDKAPPID,-->
				<!--// 				appIDAt3rd:this.$store.state.IMSDKAPPID,-->
				<!--// 				identifier:res.data.data.imUser,-->
				<!--// 				identifierNick:res.data.data.name,-->
				<!--// 				accountType:39016,-->
				<!--// 				userSig:res.data.data.extprops-->
				<!--// 			};-->
				<!--// 			const listeners={-->
				<!--// 				"onConnNotify":onConnNotify,-->
				<!--// 				"jsonpCallback":()=>{},-->
				<!--// 				"onMsgNotify":onMsgNotify,-->
				<!--// 				"onBigGroupMsgNotify":{},-->
				<!--// 				"onGroupSystemNotifys":{},-->
				<!--// 				"onGroupInfoChangeNotify":{},-->
				<!--// 				"onFriendSystemNotifys":{},-->
				<!--// 				"onProfileSystemNotifys":{},-->
				<!--// 				"onKickedEventCall":()=>{},-->
				<!--// 				"onC2cEventNotifys":()=>{}-->
				<!--// 			};-->
				<!--// 			const options={-->
				<!--// 				isAccessFormalEnv:true,-->
				<!--// 				isLogOn:false-->
				<!--// 			};-->
				<!--// 			webim.login(-->
				<!--// 				loginInfo,listeners,options,-->
				<!--// 				(resp)=>{-->
				<!--// 					// console.log(loginInfo)-->
				<!--// 					// console.log('用户登录成功')-->
				<!--// 					this.$store.commit('setLoginInfo',loginInfo);-->
				<!--// 					this.getAllFriendEvent();-->
				<!--// 					this.getRecentContactList();-->
				<!--//-->
				<!--// 				},-->
				<!--// 				(err)=>{-->
				<!--// 					// console.log(err,'用户登录失败');-->
				<!--// 				}-->
				<!--// 			)-->
				<!--// 		}-->
				<!--// 	},-->
				<!--// 	fail:(error)=>{-->
				<!--// 		uni.showToast({-->
				<!--// 			title:error,-->
				<!--// 			icon:'none'-->
				<!--// 		})-->
				<!--// 	}-->
				<!--// })-->
			<!--},-->


		<!--}-->
	<!--}-->
<!--</script>-->

<!--<style lang="less">-->
	<!--page{-->
		<!--background:#fff-->
	<!--}-->
	<!--.title{-->
		<!--font-size:25px;-->
		<!--font-weight: bold;-->
		<!--padding-left:50rpx;-->
		<!--padding-bottom:48rpx;-->
		<!--background: #fff;-->
	<!--}-->
	<!--.top-content{-->
		<!--position:fixed;-->
		<!--top:10px;-->
	<!--}-->
	<!--.page {-->
		<!--height: 100Vh;-->
		<!--width: 100vw;-->
	<!--}-->

	<!--.page.show {-->
		<!--overflow: hidden;-->
	<!--}-->
	<!--.header-content{-->
		<!--padding-right:26rpx;-->
		<!--padding-left:32rpx;-->
		<!--padding-top:10px;-->
		<!--background:#fff;-->
		<!--.header-img{-->
			<!--width:50px;-->
			<!--height:50px;-->
			<!--vertical-align: middle;-->
			<!--margin-right:29rpx;-->
		<!--}-->

	<!--}-->
	<!--.list-title{-->
		<!--width:70%;-->
		<!--line-height:50px;-->
		<!--height:50px;-->
		<!--font-size:30rpx;-->
		<!--font-family:MicrosoftYaHei;-->
		<!--font-weight:400;-->
		<!--color:rgba(42,42,42,1);-->
		<!--border-bottom:1px solid #EEEEED;-->
		<!--margin-bottom:17px;-->
	<!--}-->
	<!--.talk-content{-->

		<!--padding-right:26rpx;-->
		<!--padding-left:32rpx;-->
		<!--padding-top:10px;-->
	<!--}-->
<!--</style>-->




