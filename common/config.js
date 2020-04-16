
export  const config = {
	xiaoxiongUrl:'http://192.168.10.186:8080/services',
	proUrl:'http://192.168.10.222/services',//测试环境
	// proUrl:'http://s.oaks.cn/services',
	uploadHostUrl:'http://up.qiniup.com?token=',
	mapKey:"1ff4f1c489532e9aee6fdfbcab87a9b8",
	// mapKey:'5412b58e59680d3cb8ddab0d7e85c2ad',
	gender:{1:'男',2:'女'},
	genderZn:{'man':1,'woman':2},
	//门店助手
	shoperObj:{ownerType:2,type:4},
	report:1,//回执
	pageCount:20,
	//用户状态
	userStatus:{
	    'normal':1,
	    'free':2,
	    'inviting':3,
	    'applying':4,
	    'quit':5,
		'refuse':6
	},
	userStatusZn:{
	      1:'正常',
	      2:'未邀请',
	      3:'邀请中待确认',
	      4:'申请加入中',
	      5:'离职',
		6:'被拒绝',
	  },
	//门店状态
	shopStatusZn:{
	    1:'筹备中',
	    2:'施工中',
	    3:'营业中',
	    4:'撤柜关闭',
	    5:'重装关闭',
	    6:'移位关闭',
	},
	shopStatus:{
	    ready:1,
	    processing:2,
	    businessing:3,
	    canceled:4,
	    renovated:5,
	    moved:6
	},
	/**
	 * 附件
	 */
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
	    workReportShop:34,
		agreementComment:35,
		 trainingArticle:36,
		 shopSetupApp:37,
		 serviceOrderCatalog:38,//维修类别
		 taskRecept:39,//验收同意或者拒绝
		 wfapproval:40,//审批同意或者拒绝
		 displayCheck:41,//陈列巡检附件
		 brandLogo:42,//品牌封面
		 paymentApp:43,//付款审批
		 complaint :44,//物流申诉附件   
	},
	/**
	 * 报修
	 */
	repairStatus:{
	    'submit':1,
	    'executing':2,
	    'finished':3,
	    'commented':4,
	},
	repairStatusZn:{
	    1:'未处理',
	    2:'执行中',
	    3:'被拒绝',
	    4:'已完成'
	},
	repairTypeZn: {
	    2:'灯具照明',
	    3:'电器设备',
	    4:'道具货架',
	    5:'商场设施',
	    6:'灯箱标识',
	    7:'其它类别',
	},
	repairTypeArray:[
	    {name:'灯具照明',id:2},
	    {name:'电器设备',id:3},
	    {name:'道具货架',id:4},
	    {name:'商场设施',id:5},
	    {name:'灯箱标识',id:6},
	    {name:'其它类别',id:7},
	],
	repairType:{
	    'light':'灯具照明',
	    'elect':'电器设备',
	    'building':'道具货架',
	    'square':'商场设施',
	    'lightBox':'灯箱标识',
	    'other':'其它类别',
	},
	/**
	 * 审批
	 */
	approvalStatus:{
		wait:0,
		applied:1,
		accepted:2,
		rejected:3,
	},
	approvalStatusZn:{
		0:'待审批',
		1:'审批中',
		2:'已通过',
		3:'被驳回',
	},
	//申请类型
	approvalMode: {
	    common:1,//通用
	    change:2,//变更
	    expense:3,//费用报销
	    material:4,//物料
	    worktime:5,//工时
	    overtime:6,//加班
	    wtappeal:7,//工时申诉 补记
	    bizztrip:8,//出差
	    absence:9,//请假
	    outside:10,//外出
	    vehicle:11,//用车
	    license:12,//证书
	    stamp:13,//印章
	    resign:14,//离职
	    regular:15,//转正
	    payment:16,//其他付款
	    imprest:17,//备用金
	    deposit:18,//押金
	    purchase:19,//采购
	    agreement:20,//报价
	    article_sales:21,//销售技巧
	    message:22,//公司公告
	    article_cases:23,//陈列案例
	    shop_setup:24,//开店申请
	    shop_renew:25,//重装申请
	    shop_shift:26,//移位申请
	    shop_close:27,//门店撤柜
	    repair_service:28,//报修
	    payment2:29,//装修付款
	    payment3:30//其他付款
	},
	notifyType: {
	    notDefine:0,
	    assigned:1,//TODO (Receive or Refuse)             //任务分配后，通知执行人，接收
	    received:2,// INFO (Notify the task assigner)       //执行人接收后，通知分配人
	    refused:3,// INFO (Notify the task assigner)       //执行人拒绝接收，通知分配人
	    finished:4,//TODO (Accept or Reject)                //执行人提交巡检，通知巡检人
	    accepted:5, // INFO (Notify executors)                //巡检通过，通知执行人.
	    rejected:6, // INFO (Notify executors)                 //巡检没通过，通知执行人
	    extperiod:7,//TODO (Accept or Rejectg)            //执行人申请延期，通知分配人
	    abort:8,//TODO (Accept or Reject)                   //执行人申请中止，通知分配人
	    delayed:9,//INFO (Notify the executors)         //批准延期，通知执行人
	    nodelay:10,//INFO (Notify all executors)         //不批准延期，通知执行人
	    aborted:11,//INFO (Notify all executors)         //批准中止，通知执行人
	    noabort:12,//INFO (Notify all executors)        //不批准中止，通知执行人
	    canceled:13,//INFO (Notify all executors)      //任务被取消，通知执行人
	    breakdown:14,
	    modified:15,
	    e_wf_approval:16,
	    e_wf_accepted:17,
	    e_wf_rejected:18,
	    e_wf_copyto:19,
	    e_wf_finished:20,//审批流完成
	    e_task_assignproc:30,
	    e_price_submit:31,
	    e_price_reject:32,
	    e_price_confirm:33,
	    e_service_submit:40,
	    e_order_assigned:41,
	    e_order_discarded:42,
	    e_order_pursed:43,
	    e_order_refused:44,
	    e_shop_transfer:45,
	    e_report_reply:50,
	},
	notice:{
	    todo:1,//代办
	    info:2,//通知
	},
	/**
	 * 快递
	 */
	expressStatusZn:{
	    1:'待取件',
	    2:'已取件',
	    3:'已发件',
	    4:'已到达',
	    5:'已签收',
	},
	expressStatus:{
	    'unSign':1,
	    'pick':2,
	    'travel':3,
	    'arrive':4,
	    'sign':5
	},
	/*特快送和特惠送*/
	expressType:{
		'speed':1,//快
		'price':2,//惠
	},
	/*快递主体,门店/仓库/公司/消费者*/
	expressItem:{
	  shop:1,//门店
	  store:2,//仓库
	  company:3,//公司
	  customer:4,//消费者
	
	},
	expressItemZn:{
		1:'门店',
		2:'仓库',
		3:'公司',
		4:'消费者'
	},
	/*发件/收件*/
	expressGive:{
	    'send':1,//发件
	    'receive':2,//收件
	},
	/*我调拨的和调拨任务*/
	distributeTab:{
		'my':1,
		'work':0
	},
	/*调拨状态*/
	distributeStatus:{
	  'unHandle':1,
	  'finish':3
	},
	//调拨状态
	distributeStatusZn:{
	   1:'未处理',
	    3:'已完成'
	},
	/*投诉状态*/
	complaintStatus:{
		'todo':1,
		'doing':2,
		'down':3
	},
	//投诉状态
	complaintStatusZn:{
		1:'未处理',
		2:'处理中',
		3:'已处理'
	},
	/*销售和陈列公告*/
	articleTypeZn:{
		1:'销售公告',
		2:'陈列公告'
	},
	/*销售和陈列公告*/
	articleType:{
		'sale':1,
		'display':2
	},
	// 任务状态
	taskStatusZn:{
		1:'未分配',
		2:'未接受',
		3:'已拒绝',
		4:'已接受',
		5:'已超期',
		6:'待验收',
		7:'验收未通过',
		8:'验收通过',
		9:'已转派',
		0:'已删除',   
	},
	taskStatus:{
		created:1,         //Created but not assign to workers
		assigned:2,       //Waiting for accepting
		 refused:3,       //Waiting for accepting
		 accepted:4,
		 delayed:5,
		 finished:6,
		 rejected:7,               //Failed to approve
		 receipted:8,           //Confirmed
		 aborted:9,                 //Re-assign to another worker
		 canceled:0,       //Equals 1, reassign again  
	},
	constants:{
	    brand_type:29,//品牌类别
	    repair_type:39,//维修类别
	    serviceorder_file:18,//报修附件
	    shop_file:26,//门店附件,
	    log : 4,		//Work Report Daily日志
	    shopCover:29,//门店头像,
		companyCover:21,//公司头像
		licenseCover:7,//营业执照
		work_flow:28,//流程模板
		check_flow:6,//审批模板
	
	},
	//请假类型
	absenceTypeZn:{
		1:'事假',
		2:'病假',
		3:'调休'
	},
	absenceType:{
		'affair':1,
		'sick':2,
		"change":3
	},
	/*工作申请状态*/
	applyStatusZn:{
		0:'待审批',
		1:'审批中',
		2:'已通过',
		3:'已驳回',
		// 4:'已通过'
	},
	applyStatus:{
		wait:0,
		applied:1,
		accepted:2,
		rejected:3,
		// excepted:4,
	},
	/*绩效日分解方法*/
	resolveWayZn:{
		1:'按日平摊',
		2:'周末结算'
	},
	resolveWay:{
		'day':1,
		'week':2
	},
	approvalModeZn: {
		1:'通用',
		2:'变更',
		3:'费用报销',
		4:'领料',
		5:'工时',
		6:'加班',
		7:'工时',
		8:'出差',
		9:'请假',
		10:'外出',
		11:'用车',
		12:'证书借用',
		13:'印章',
		14:'离职',
		15:'转正',
		16:'付款',
		17:'备用金',
		18:'押金',
		19:'采购',
		20:'报价',
		21:'销售技巧',
		22:'公告',
		23:'陈列案例',
		24:'开店',
		25:'重装',
		26:'移位',
		27:'撤柜',
		28:'报修',
		29:'装修付款',
		30:'其他付款',
	},
	// //摄像头的状态
	// static cameraStatusZn = {
	//     2:'未签收',
	//     3:'已开通',
	//     4:'已绑定',
	//     5:'未绑定',
	//     6:'已欠费',
	//     7:'已报废'
	// }
	
	// //CPE的状态
	// static routerStatusZn = {
	//     2:'未签收',
	//     3:'未激活',
	//     4:'已绑定',
	//     5:'已解绑',
	//     6:'已欠费',
	//     7:'已报废'
	// }
	serviceStatus:{
		unsign:2,//未签收不显示
		unactive:3,//未激活不显示
		binding:4,//(cpe)已绑定/(摄像头)已激活显示
		unbind:5,//(cpe)已解绑/(摄像头)已停机不显示
		payment:6,//已欠费显示,去充值
		wrong:7,//已报废不显示
	},
	serviceStatusZn:{
		2:'未签收',
		3:'未激活',
		4:'已绑定',
		5:'已解绑',
		6:'已欠费',
		7:'已报废'
	},
	//签约
	authorZn:{
		'decorate':1,//装修
		'sale':2,//销售
		'express':3,//物流
		'device':4,//摄像头
		'display':5,//陈列公告
	},
	//试用
	tryZn:{
		'decorate':-1,//装修
		'sale':-2,//销售
		'express':-3,//物流
		'device':-4,//摄像头
		'display':-5,//陈列公告
	}
}
