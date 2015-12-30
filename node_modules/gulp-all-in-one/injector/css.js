function $all_in_one_css_injector(content){
	var styleNode = document.createElement("div");
	styleNode.innerHTML = '<br /><style type="text/css">' + content + '</style>';
	return styleNode = document.getElementsByTagName("head")[0].appendChild(styleNode.lastChild);
}