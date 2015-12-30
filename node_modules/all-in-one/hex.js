var Index = [],
	i;
// 数字
for(i = 48; i < 58; i ++){
	Index.push(String.fromCharCode(i));
}
// 大写
for(i = 65; i < 91; i ++){
	Index.push(String.fromCharCode(i));
}
// 小写
for(i = 97; i < 123; i ++){
	Index.push(String.fromCharCode(i));
}
// 特殊字符
Index = Index.concat("~!@#$%^&*()_+[]{}:;<>?/.`-=|".split(""));

var hex = Index.length;

module.exports = function(num){
	if(num == 0)
		return "0";

	var result = [],
		item = 1;
	while(num >= item){
		result.unshift(Index[(num % (item * hex)) / item | 0]);
		item *= hex;
	}
	return result.join("");
};