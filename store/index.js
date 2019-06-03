// store
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store=new Vuex.Store({
	state:{
		appKey:null,//存储服务器发送给客户端的sessionkey
		hostUrl:'http://192.168.10.22/services',
		url:'http://192.168.10.58:8080/blade/services?f=',
		// url:'http://192.168.10.22/services?f=',
		uploadHostUrl:'http://up.qiniup.com?token=',
		userInfo:null,
		statusHeight:44,
		IMSDKAPPID:1400132581,
		loginInfo:'',//聊天信息
		constants:{
			brand_type:29,//品牌类别
			repair_type:39,//维修类别
			serviceorder_file:18,//报修附件
			shop_file:26,//门店附件,
			 log : 4,		//Work Report Daily日志
			 shopCover:29,//门店头像

		},
		shoperType:4,
		expressList:[
			{name:'申通快递',id:1,img:'../../../../../static/icon/express/shentong.png'},
			{name:'圆通快递',id:2,img:'../../../../../static/icon/express/yuantong.png'},
			{name:'中通快递',id:3,img:'../../../../../static/icon/xpress/zhongtong.png'},
			{name:'韵达快递',id:4,img:'../../../../../static/icon/express/yunda.png'},
			{name:'天天快递',id:5,img:'../../../../../static/icon/express/tiantian.png'},
			{name:'汇通快递',id:6,img:'../../../../../static/icon/express/huitong.png'},
			{name:'德邦快递',id:7,img:'../../../../../static/icon/express/debang.png'},
			{name:'顺丰',id:8,img:'../../../../../static/icon/express/shunfeng.png'},
		],
		logisticsList:[
			{name:'顺丰速运',id:1,img:'../../../../../static/icon/express/shunfeng.png'},
			{name:'圆通速递',id:2,img:'../../../../../static/icon/express/yuantong.png'},
			{name:'申通快递',id:4,img:'../../../../../static/icon/express/shentong.png'},
		],
		expressStatus:{
			1:'待签收',
			2:'已揽件',
			3:'已签收'
		},
		expressStatusZn:{
			'unSign':1,
			'sign':2,
			'finish':3
		},
		distributeStatus:{
			1:'未处理',
			2:'已转为订单'
		},
		distributeStatusZn:{
			'unDeal':1,
			'finish':2
		},
		//快递公司
		expressZn:{
			1:'申通快递',
			2:'圆通快递',
			3:'中通快递',
			4:'韵达快递',
			5:'天天快递',
			6:'汇通快递',
			7:'德邦快递',
			8:'顺丰'
		},
		//物流公司
		logisticsZn:{
			1:'顺丰速运',
			2:'圆通速递',
			3:'远成物流',
			4:'申通快递'
		},
		notice:{
			todo:1,//代办
			info:2,//通知
		},
		//门店状态
		shopStatus:{
			1:'筹备中',
			2:'施工中',
			3:'营业中',
			4:'已撤柜',
			5:'已重装',
			6:'已移位',
		},
		shopStatusZn:{
			ready:1,
			processing:2,
			businessing:3,
			canceled:4,
			renovated:5,
			moved:6
		},
		shopStatusColor:{
			1:'#5cdbd3',
			2:'#ffa940',
			3:'#52c41a',
			4:'#f5222d',
			5:'#9254de',
			6:'#006d75'
		},
		noticeType:{
			'unSign':0,
			'distributeWork':1,
			'agressWork':2,
			'refuseWork':3,
			'applyCheck':4,
			'passCheck':5,
			'unpassCheck':6,
			'applyDelay':7,

			'applyEnd':8,
			'agressDelay':9,
			'unagressDelay':10,
			'endWork':11,
			'unagreeEndWork':12,
			'deleteWork':13,

			'resignWork':14,
			'editWork':15,
			'applyShenpi':16,
			'shenqiPass':17,
			'applyRefuse':18,
			'newApplyCopy':19,
			'checkFinish':20,
			'point':30
		},
		noticeTypeZn:{
			0:'未分配',
			1:'分派任务',
			2:'接收任务',
			3:'拒收任务',
			4:'申请验收',
			5:'通过验收',
			6:'未通过验收',
			7:'申请延期',
			8:'申请终止',
			9:'同意延期',
			10:'未同意延期',
			11:'终止任务',
			12:'未同意终止',
			13:'删除任务',
			14:'转派任务',
			15:'修改任务',
			16:'申请审批',
			17:'审批通过',
			18:'审批驳回',
			19:'新建审批抄送',
			20:'审批完成',
			30:'指定流程负责人'
		},
		noticeTypeColor:{

		0:'#8c8c8c',
        1:'#5cdbd3',
        2:'#096dd9',
        3:'#ff7a45',
        4:'#9254de',
        5:'#52c41a',
        6:'#f5222d',
        7:'#d46b08',


        8:'#ffa940',
        9:'#614700',
        10:'#612500',
        11:'#002329',
        12:'#ad8b00',
        13:'#cf1322',

        14:'#69c0ff',
        15:'#14B4F2',
        16:'#14B4F2',
        17:'#14B4F2',
        18:'#14B4F2',
        19:'#14B4F2',
        20:'#7cb305',
        30:'#7cb305',
		},
		repairStatusZn:{
			0:'全部',
			1:'未处理',
			2:'处理中',
			3:'无效',
			4:'已完成'
		},
		repairStatus:{
			'all':0,
			'untreated':1,
			'treating':2,
			'refuse':3,
			'finish':4
		},
		repairStatusColor:{
			1:'bg-green',
			2:'bg-blue',
			3:'bg-red',
			4:'bg-purple'
		},
		userStatusZn:{
			1:'正常',
			2:'无业',
			3:'邀请中',
			4:'申请中',
			5:'离职'
		},
		userStatus:{
			'normal':1,
			'free':2,
			'inviting':3,
			'applying':4,
			'quit':5
		},
		province:'',//省份
		address:'',//详细地址
		repairSubID:'',//用于新增保修的报修ID;
        pageCount: 20, //每页分页数
        doc: {
            withoutTarget : 0,		//Without target
            contract : 1,		//Project files
            flow : 2, 		//Process Node files流程
            task : 3, 			//Task files任务
            log : 4,		//Work Report Daily日志
            attendance : 5,		//Attendance Daily
            expense : 6,		//Expense
            license : 7,		//营业执照
            commonForm : 8,		//新建审批附件
            message : 9,		//Docs sending in IM
            approval : 10,		//Approval
            headCover : 11,		//User head picture头像
            contractCover : 12,      //Contract Cover Picture项目
            carousel : 13,		//App Slide show pictures
            share : 14,			//App Slide show pictures
            quotaCover : 15, 	//Quota Cover Picture定额
            modelCover : 16, 	//Material Model Cover Picture物料
            acceptReport : 17, 	//验收
            serviceorder:18,//维修
            projectorvendor:19,//需求
            project:20,//需求附件
            cusHeadImg:21,//公司头像
            routineApp:22,//常见审批附件,
            outstockApp:23,//领料审批附件,
            vehicleApp:24,//用车审批附件,
            bizTripApp:25,//出差审批附件,
            shop:26,//门店附件
            purchase:27,//采购
            projectverimg:28,//业主端项目
            shopCover:29,//门店头像
            article:31,
            articleCover:32,
            messages:33,//公司公告
            workReportShop:34
        }
	},
	mutations:{
		setUserInfo(state,userInfo){
			this.state.userInfo=userInfo;
		},
		setProvince(state,province){
			this.state.province=province;
		},
		setAddress(state,address){
			this.state.address=address;
		},
		setLoginInfo(state,loginInfo){
			this.state.loginInfo=loginInfo
		}

	}

})
export default store;
