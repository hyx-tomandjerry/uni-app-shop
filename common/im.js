import store from '../store/index'
import webim from '../static/js/webim'
export default {
    //断开连接
    webimLogout(){
        webim.logout(resp=>{
            console.log('im登出成功')
        },(err)=>{
            console.error('im登出失败')
        })
    },
    //建立连接
    webimLogin () {
        return new Promise ((resolve,reject) => {

            let data = store.state.userInfo
        


            if (data.status == 1) {
                let loginInfo = {
                    sdkAppID: store.state.IMSDKAPPID,
                    appIDAt3rd: store.state.IMSDKAPPID,
                    identifier: data.imUser,
                    identifierNick: data.name,
                    accountType: 39016,
                    userSig: data.extprops
                }
                // data.extprops
                //
                //                 // this.loginInfo = {
                //                 //     sdkAppID : AppGlobal.IMSDKAPPID,
                //                 //     appIDAt3rd : AppGlobal.IMSDKAPPID ,
                //                 //     identifier : 'OAKIMADMIN',
                //                 //     identifierNick : data.name,
                //                 //     accountType : 39016,
                //                 //     userSig : 'eJxlj01vgkAARO-8CsK1TdkPNmgTD0CRkIJIMI1y2RBZZEUBcRerTf97U2pSEuf6XmYyX4qqqtoqSF6y7baRtaDi\n' +
                //                 //     '2jJNfVU1oD3-w7blOc0ExV3*ANlnyztGs0KwboCQEIIAGDs8Z7XgBb8bkfXuh9Zb6C9Gzjmv6DD0V2IAADEiEzhW*G6AoRs7vvPEjrdg01zmh2L\n' +
                //                 //     'u6vYyKaWHveCWZnpilmmxrlzPsU8TA1jcXulRNV024QeM0ouxCwzYT*Vpzw7Jx\n' +
                //                 //     'l540qtLNwN*LPt9PJuNJgU-svsrbBKETdMc0Z51Z97Ug4AAJBBh8BtN*VZ*ADTIXW0_'
                //                 // }

                store.dispatch('setImStore', loginInfo);

                //监听事件
                const listeners = {
                    "onConnNotify": this.onConnNotify,//监听连接状态回调变化事件,必填
                    "jsonpCallback": () => {
                    },//IE9(含)以下浏览器用到的 jsonp 回调函数，
                    "onMsgNotify": this.onMsgNotify,//监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
                    "onBigGroupMsgNotify": () => {
                    },//监听新消息(直播聊天室)事件，直播场景下必填
                    "onGroupSystemNotifys": () => {
                    },//监听（多终端同步）群系统消息事件，如果不需要监听，可不填
                    "onGroupInfoChangeNotify": () => {
                    },//监听群资料变化事件，选填
                    "onFriendSystemNotifys": () => {
                    },//监听好友系统通知事件，选填
                    "onProfileSystemNotifys": () => {
                    },//监听资料系统（自己或好友）通知事件，选填
                    "onKickedEventCall": () => {
                    },//被其他登录实例踢下线
                    "onC2cEventNotifys": () => {
                    }//监听 C2C 系统消息通道
                };
                //额外参数
                const options = {
                    isAccessFormalEnv: true,//是否访问正式环境下的后台接口，True-访问正式，False-访问测试环境默认访问正式环境接口，选填
                    isLogOn: false,//是否开启控制台打印日志，True-开启，False-关闭，默认开启，选填
                }
                webim.login(
                    loginInfo, listeners, options,
                    (resp) => {
                        // loginInfo.identifierNick = resp.identifierNick;//设置当前用户昵称
                        // initDemoApp();
                        console.log('登录成功')

                        // this.syncMsg().subscribe(()=>{
                        resolve()
                        // this.appService.eventBus.next({name:'imlogSuccess'})
                        // })
                    },
                    (err) => {
                        console.error(err)
                        // this.appService.msg ('error' , err.ErrorInfo);
                    }
                );
            }


            // if ( data.id == 220 ) {
            //     this.loginInfo = {
            //         sdkAppID : '1400129198' ,
            //         appIDAt3rd : '1400129198' ,
            //         identifier : 'xiangmulin1' ,
            //         identifierNick : '王总' ,
            //         accountType : 1 ,
            //         userSig : 'eJxlj11PgzAARd-5FaSvM64tdDLf5kKU8DEnzMheCKMFmrm2dGVuMf53Iy6RxPt6Tu7N-bRs2wZZlN6WVSV7YQpzUQzY9zaA4OYPKsVpUZrC0fQfZGfFNSvK2jA9QEQIwRCOHU6ZMLzmV*PMS9Ec*ncu0Eg60n0xLP22uBAiPEdzb6zwZoCxny*D9VIGpXJ367ZPcEIlVWaS7rCrLz6ZvJi2S5*6NEtC*RGLRdAunonn1JupzPto9vborTYxXoUnJxN6*1r5naa8mYb7IHrIt6NJww-sestFdy6ZeXhET0wfuRSDgCEiCDvwJ8D6sr4BFB9fog__'
            //     }
            // } else if ( data.id == 221) {
            //     this.loginInfo = {
            //         sdkAppID : '1400129198' ,
            //         appIDAt3rd : '1400129198' ,
            //         identifier : 'xiangmulin2' ,
            //         identifierNick : '小杨' ,
            //         accountType : 1 ,
            //         userSig : 'eJxlj0FrgzAAhe-*CvG6sSapac1uVrtSpqJYivUSpMY2nUYbY3WM-fcxV5jQd-0*3uN9abquGzsvfsmOx7oTiqrPhhn6q24A4-kfNg3PaaboXOYPkA0Nl4xmhWJyhBBjjACYOjxnQvGC342BZ*JUdSUXaCK1*Qcdl-5aTAAgIpBYU4WfRuivD842cvp978Vu4l1JGwezZRKV6wEI*2m2CPyoArhzb*khbUOT9Nuz-R6tqmuiztJyrI1fvRFx8Qnx0l1crswkDoOLG9ZF0sqNPZlUvGL3WyZcmnhByITemGx5LUYBAYghmoPfGNq39gOzIl73'
            //     }
            // }
            })
    },

    //监听连接状态回调变化事件
    onConnNotify(resp){
        console.log ('连接状态',resp)
        let info;
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                webim.Log.warn ('建立连接成功: ' + resp.ErrorInfo);
                break;
            case webim.CONNECTION_STATUS.OFF:
                info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
                alert (info);
                webim.Log.warn (info);
                break;
            case webim.CONNECTION_STATUS.RECONNECT:
                info = '连接状态恢复正常: ' + resp.ErrorInfo;
                alert (info);
                webim.Log.warn (info);
                break;
            default:
                webim.Log.error ('未知连接状态: =' + resp.ErrorInfo);
                break;
        }
    },

    //监听收到新消息回调事件
    onMsgNotify(resp){
        console.log('收到消息未过滤',resp)
        let newMsg
        for (let j in resp) { //遍历新消息
            newMsg = resp[j];

            if(newMsg.getSession ().type () == webim.SESSION_TYPE.GROUP && newMsg.isSend){
                return;
            }

            // if(newMsg.getSession ().type () == webim.SESSION_TYPE.GROUP && newMsg.elems[0].getType() == webim.MSG_ELEMENT_TYPE.GROUP_TIP && newMsg.elems[0].getContent().getOpType() != webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO){
            //     return;
            // }
        }


        console.log('收到消息',resp)
        this.$fire.fire('onMsgNotify',resp)
    },
    //发送消息
    handleMsgSend (selToID , friendHeadUrl ,GroupNick,selType, msgContent) {
        return new Promise((resolve,reject)=>{

            let loginInfo = store.state.imInfo
            let selSess

            let isSend = true; //是否为自己发送
            let seq = - 1; //消息序列，-1表示sdk自动生成，用于去重
            let random = Math.round (Math.random () * 4294967296); //消息随机数，用于去重
            let msgTime = Math.round (new Date ().getTime () / 1000); //消息时间戳
            let subType; //消息子类型
            if(selType==webim.SESSION_TYPE.C2C){
                selSess = new webim.Session(selType,selToID,selToID,friendHeadUrl,Math.round(new Date().getTime()/1000));
                subType = webim.C2C_MSG_SUB_TYPE.COMMON;
            }else{
                selSess = new webim.Session(selType,selToID,GroupNick,friendHeadUrl,Math.round(new Date().getTime()/1000));
                subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
            }
            let msg=new webim.Msg(selSess,isSend,seq,random,msgTime,loginInfo.identifier,subType,loginInfo.identifierNick);


            let reg = /<img[^>]*src[=\"\'\s]+[^\.]*\/([^\.]+)\.[^\"\']+[\"\']?[^>]*>/gi;//筛选表情的img

            // console.log(msgContent.replace(reg,'$1'))
            let emotions = msgContent.match(reg)



            let text_obj,face_obj,tmsg,emotionIndex,emotion,restMsgIndex;

            if(!emotions ||emotions.length<1){
                //不含有表情
                text_obj=new webim.Msg.Elem.Text(msgContent);
                msg.addText(text_obj);
            }else {

                // emotions.forEach((data,index,array)=>{
                //     let i = data.indexOf('.gif')
                //     array[index] =  data.substring(i-1,i)
                // })

                // console.log(emotions)

                //含有表情
                for(let i=0;i<emotions.length;i++){
                    tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
                    if(tmsg){
                        text_obj = new webim.Msg.Elem.Text(tmsg);
                        msg.addText(text_obj);
                    }

                    let img = msgContent.substring(msgContent.indexOf(emotions[i]), msgContent.indexOf(emotions[i])+emotions[i].length);
                    let emotionIndex = img.replace(reg,'$1').replace('aa','')//表情的索引
                    // let b = a.substring(ii-1,ii)


                    console.log(img)
                    console.log(emotionIndex)


                    // webim.Msg.Elem.Face  index  data


                    emotion= Emotions[emotionIndex];//表情的data
                    if(emotion){
                        face_obj = new webim.Msg.Elem.Face(Number(emotionIndex) , emotion);
                        msg.addFace(face_obj);
                        // msg.addFace(face_obj);
                    }else{
                        text_obj = new webim.Msg.Elem.Text(emotionIndex);
                        msg.addText(text_obj);
                    }
                    restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
                    msgContent = msgContent.substring(restMsgIndex);

                    // console.log(emotionIndex,emotion)
                    //
                    // console.log(msgContent)
                }
                if (msgContent) {
                    text_obj = new webim.Msg.Elem.Text(msgContent);
                    msg.addText(text_obj);
                }
                console.log(msg)
            }

            msg.PushInfo = {
                "PushFlag": 0,
                "Desc": '测试离线推送内容', //离线推送内容
                "Ext": '测试离线推送透传内容', //离线推送透传内容
                "AndroidInfo": {
                    "Sound": "android.mp3" //离线推送声音文件路径。
                },
                "ApnsInfo": {
                    "Sound": "apns.mp3", //离线推送声音文件路径。
                    "BadgeMode": 1
                }
            };


            msg.PushInfoBoolean = true; //是否开启离线推送push同步
            msg.sending = 1;
            msg.originContent = msgContent;
            // this.addMsg(msg);


            webim.sendMsg(msg,(resp)=>{
                //发送成功
                console.log('发送成功',msg)
                webim.Tool.setCookie('tmpmsg_'+selToID,'',0);
                resolve(msg)
            },(err)=>{
                console.log('发送消息失敗',err.ErrorInfo);
                console.log('重发');
            })
        })
    },

// 发送图片消息
handlePicMsgSend (selToID , friendHeadUrl ,selType, images,imgName){
    return new Promise ((resolve,reject) => {

        let loginInfo = store.state.imInfo
        let selSess=new webim.Session(selType,selToID,selToID,friendHeadUrl,Math.round(new Date().getTime()/1000));
        let isSend = true; //是否为自己发送
        let seq = - 1; //消息序列，-1表示sdk自动生成，用于去重
        let random = Math.round (Math.random () * 4294967296); //消息随机数，用于去重
        let msgTime = Math.round (new Date ().getTime () / 1000); //消息时间戳
        let subType; //消息子类型
        if(selType==webim.SESSION_TYPE.C2C){
            subType = webim.C2C_MSG_SUB_TYPE.COMMON;
        }else{
            subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
        }


        let msg=new webim.Msg(selSess,isSend,seq,random,msgTime,loginInfo.identifier,subType,loginInfo.identifierNick);
        let images_obj = new webim.Msg.Elem.Images(images.File_UUID, imgName.split(".")[1]);

        for (let i in images.URL_INFO) {
            let img = images.URL_INFO[i];
            let newImg;
            let type;
            switch (img.PIC_TYPE) {
                case 1: //原图
                    type = 1; //原图
                    break;
                case 2: //小图（缩略图）
                    type = 3; //小图
                    break;
                case 4: //大图
                    type = 2; //大图
                    break;
            }
            newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl);
            images_obj.addImage(newImg);
        }
        msg.addImage(images_obj);

        webim.sendMsg(msg,(resp)=>{
            //发送成功

            console.log('发送图片消息成功',msg)
            // webim.Tool.setCookie('tmpmsg_'+selToID,'',0);
            resolve(msg)
        },(err)=>{
            console.log('发送图片消息失敗',err.ErrorInfo);
            console.log('重发');
        })
    })
},

// 发送文件消息
handleFileMsgSend (selToID , friendHeadUrl ,selType, file,fileName) {
    return new Promise((resolve,reject) => {
        let loginInfo = store.state.imInfo
        let selSess=new webim.Session(selType,selToID,selToID,friendHeadUrl,Math.round(new Date().getTime()/1000));
        let isSend = true; //是否为自己发送
        let seq = - 1; //消息序列，-1表示sdk自动生成，用于去重
        let random = Math.round (Math.random () * 4294967296); //消息随机数，用于去重
        let msgTime = Math.round (new Date ().getTime () / 1000); //消息时间戳
        let subType; //消息子类型
        if(selType==webim.SESSION_TYPE.C2C){
            subType = webim.C2C_MSG_SUB_TYPE.COMMON;
        }else{
            subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
        }
        let msg=new webim.Msg(selSess,isSend,seq,random,msgTime,loginInfo.identifier,subType,loginInfo.identifierNick);

        let uuid=file.File_UUID;//文件UUID
        let fileSize=file.File_Size;//文件大小
        let downloadFlag=file.Download_Flag;

        if(!fileName){
            let random=Math.round(Math.random() * 4294967296);
            fileName=random.toString();
        }

        let fileObj=new webim.Msg.Elem.File(uuid,fileName, fileSize, loginInfo.imuser, selToID, downloadFlag, selType);

        msg.addFile(fileObj);

        webim.sendMsg(msg,(resp)=>{
            //发送成功
            console.log('发送文件消息成功',msg)
            // webim.Tool.setCookie('tmpmsg_'+selToID,'',0);
            resolve (msg)
        },(err)=>{
            console.log(err.ErrorInfo);
            console.log('重发');
        })


    })

},
//初始化聊天界面左侧最近会话列表
getRecentContactList () {
    return new Promise ((resolve,reject) => {
        let options = {
            'Count': 1 //要拉取的最近会话条数
        };
        webim.getRecentContactList(
            options,
            (resp)=> {
                console.log('左侧会话列表',resp)
                resolve(resp.SessionItem?resp.SessionItem:[])
            },
            (error)=>{

            }
        );
    })
},



//获取最新的c2c历史消息,用于切换好友聊天，重新拉取好友的聊天消息
// getPrePageC2CHistroyMsgInfoMap:any={};
getLastC2CHistoryMsgs(selToID){
    return new Promise ((resolve,reject) => {
        let selType = webim.SESSION_TYPE.C2C
        if (selType == webim.SESSION_TYPE.GROUP) {
            alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
            return;
        }
        // if (!selToID || selToID == '@TIM#SYSTEM') {
        //     alert('当前的聊天id非法，selToID=' + selToID);
        //     return;
        // }
        let lastMsgTime = 0; //第一次拉取好友历史消息时，必须传0
        let msgKey = '';
        let options = {
            'Peer_Account': selToID, //好友帐号
            'MaxCnt': 15, //拉取消息条数
            'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
            'MsgKey': msgKey
        };
        webim.MsgStore.delSessByTypeId(selType, selToID);
        webim.getC2CHistoryMsgs(
            options,
            (resp)=> {




                // if (resp.MsgList.length == 0) {
                //     webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
                //     return;
                // }




                // console.log('拉取私聊消息成功',resp)

                resolve(resp)
                observer.complete()
            },
            (err)=> {
                console.error('error','获取聊天失败'+err.ErrorInfo);
            }
        );
    })


},



//向上翻页，获取更早的好友历史消息
getPrePageC2CHistoryMsgs(getPrePageC2CHistroyMsgInfoMap,selToID) {

    return new Promise ((resolve, reject) => {
        let selType = webim.SESSION_TYPE.C2C
        if (selType == webim.SESSION_TYPE.GROUP) {
            alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
            return;
        }
        let tempInfo = getPrePageC2CHistroyMsgInfoMap[selToID]; //获取下一次拉取的c2c消息时间和消息Key
        let lastMsgTime;
        let msgKey;
        if (tempInfo) {
            lastMsgTime = tempInfo.LastMsgTime;
            msgKey = tempInfo.MsgKey;
        } else {
            alert('获取下一次拉取的c2c消息时间和消息Key为空');
            return;
        }
        let options = {
            'Peer_Account': selToID, //好友帐号
            'MaxCnt': 15, //拉取消息条数
            'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
            'MsgKey': msgKey
        };
        console.log('option',options)
        webim.getC2CHistoryMsgs(
            options,
            (resp)=> {
                let complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有
                // if (resp.MsgList.length == 0) {
                //     webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
                //     return;
                // }
                console.log('获取更多私聊消息成功',resp)
                resolve(resp)
            },(error)=>{
                console.error('error','获取聊天失败'+error.ErrorInfo);
            }
        );
    })


},

// getPrePageGroupHistroyMsgInfoMap = {}

//右击删除所选最近联系人
delChat(sess_type,to_id){

    return new Promise ((resolve, reject) => {
        let data={
            'To_Account':to_id,
            'chatType':sess_type
        }
        webim.deleteChat(
            data,
            (resp)=>{
                console.log('刪除会话成功',resp)
                resolve(resp)
            },(err)=>{
                console.log('刪除会话失败',err.ErrorInfo)
            }
        )
    })


},
//图片上传
uploadPic(selType,file,selToID){
    return new Promise((resolve, reject)=>{
        let businessType; //业务类型，1-发群图片，2-向好友发图片
        if (selType == webim.SESSION_TYPE.C2C) { //向好友发图片
            businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG;
        } else if (selType == webim.SESSION_TYPE.GROUP) { //发群图片
            businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;
        }
        //封装上传图片请求
        let opt = {
            'file': file, //图片对象
            'onProgressCallBack': (loadedSize, totalSize)=>{}, //上传图片进度条回调函数
            //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
            'To_Account': selToID, //接收者
            'businessType': businessType //业务类型
        };
        //上传图片
        webim.uploadPic(opt,
            (resp)=> {
                console.log('上传图片成功',resp);
                //上传成功发送图片
                resolve(resp)
            },
            (err)=> {
                console.log('上传图片失败',err.ErrorInfo);
            }
        );
    })
},
//文件上传
uploadFile(selType,file,selToID){
    return new Promise((observer)=>{
        let businessType; //业务类型，1-发群文件，2-向好友发文件
        if (selType == webim.SESSION_TYPE.C2C) { //向好友发文件
            businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG;
        } else if (selType == webim.SESSION_TYPE.GROUP) { //发群文件
            businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;
        }
        //封装上传文件请求
        let opt = {
            'file': file, //文件对象
            'onProgressCallBack': (loadedSize, totalSize)=>{}, //上传文件进度条回调函数
            //'abortButton': document.getElementById('upd_abort'), //停止上传文件按钮
            'To_Account': selToID, //接收者
            'businessType': businessType, //业务类型
            'fileType': webim.UPLOAD_RES_TYPE.FILE//表示上传文件
        };
        //上传文件
        webim.uploadFile(opt,
            (resp)=> {
                console.log('上传文件成功',resp);
                //上传成功发送文件
                resolve(resp)
            },
            (err)=> {
                console.log('上传文件失败',err.ErrorInfo);
            }
        );
    })
},


/***
 *
 * 拉取最近的未读消息总数
 * */
syncMsg(){
    return new Promise((resolve, reject)=>{
        webim.syncMsgs (
            (resp) => {
                console.log('拉取未读消息成功',resp)
                resolve(resp)
            },
            (err)=> {
                console.log('拉取未读消息失败',err.ErrorInfo);
            }
        );
    })
}

}
