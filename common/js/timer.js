//获得时间的函数
export default{
	//获得两个时间的时间差
	getTimeInfo(start,end){
		//计算相差的天数
		let date=new Date(end).getTime()-new Date(start).getTime()
		let days=Math.floor(date/(24*3600*1000));
		// 计算小时
		let leave1=date%(24*3600*1000);//计算天数后的毫秒数
		var hours=Math.floor(leave1/(3600*1000))
		//计算分钟数
		let leave2=leave1%(3600*1000);
		let minutes=Math.floor(leave2/(60*1000));
	
		//计算秒数
		let leave3=leave2%(60*1000);
		let second=Math.floor(leave3/1000);
		let obj={
			days:days,
			hours:hours,
			minutes:minutes
		}
		return obj;
	},
	getDate(type){
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
					
		if (type === 'start') {
		    year = year - 60;
		} else if (type === 'end') {
		    year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;  
	},
}