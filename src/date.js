export default {
	// 格式化时间 YY-MM--DD
	getFormatDate() {
		const nn = new Date();
		const seperator = "-";
		var year = nn.getFullYear();
		var month = nn.getMonth() + 1;
		var nowDate = nn.getDate();
		var hour = nn.getHours();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (nowDate >= 0 && nowDate <= 9) {
			nowDate = "0" + nowDate;
		}
		if (hour >= 0 && hour <= 9) {
			hour = "0" + hour;
		}
		const newDate = year + seperator + month + seperator + nowDate +" "+hour;
		return newDate;
	}
}
