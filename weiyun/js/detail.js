//--------------------放大镜搜索框区--------------------
var personage = tools.$(".personage")[0];
var seek = tools.$("div",personage)[0]
seek.onOff = true;
seek.onmouseover = function(){	 	//鼠标移入
	if(seek.onOff){
		this.style.borderColor = "#5ba8fb"
		seek.firstElementChild.style.backgroundPosition = "-142px 0"
	}
}
seek.onmouseout = function(){		//鼠标移出
	if(seek.onOff){
		this.style.borderColor = "#c2c3ca"
		seek.firstElementChild.style.backgroundPosition = "-129px 0"
	}
}
seek.firstElementChild.onclick = function(){	//点击放大镜
	seek.lastElementChild.value = ""
	seek.lastElementChild.focus()
}
seek.inda = false
seek.lastElementChild.onmousedown = function(){		//获取焦点
	seek.inda = true
	seek.lastElementChild.value = ""
	seek.firstElementChild.style.backgroundPosition = "-155px 0"
	seek.onOff = false;
}
seek.lastElementChild.onblur = function(){		//失去焦点
	seek.inda = false
	if(seek.lastElementChild.value == ""){
		seek.lastElementChild.value = "搜索全部文件"
	}
	seek.style.borderColor = "#c2c3ca"			
	seek.firstElementChild.style.backgroundPosition = "-129px 0"
	seek.onOff = true;
}

//--------------------上传区--------------------
var uploading = tools.$(".uploading")[0]
var uploadingUl = tools.$("ul",uploading)[0]
uploading.firstElementChild.onmouseover = function(){
	uploadingUl.style.display = "block"
}
uploading.firstElementChild.onmouseout = function(){
	uploadingUl.style.display = "none"
}
uploadingUl.onmouseover = function(){
	this.style.display = "block"
}
uploadingUl.onmouseout = function(){
	this.style.display = "none"
}

//--------------------展开关闭树形菜单和排序区--------------------
var establish = tools.$("#establish")
establish.onmouseover = function(){
	establish.firstElementChild.style.backgroundPosition = "-195px 0"
}
establish.onmouseout = function(){
	establish.firstElementChild.style.backgroundPosition = "-180px 0"
}
var navigations = tools.$("#navigation")
var sideBar = tools.$("#sideBar")
var tree = tools.$("#tree")
var clinetW = tools.view().W;
navigations.style.width = clinetW - sideBar.offsetWidth - tree.offsetWidth + "px"
details.style.float = "right"
details.style.width = clinetW - sideBar.offsetWidth - tree.offsetWidth + "px"
establish.onOff = true;
establish.onclick = function(){
	if(establish.onOff){
		tree.style.display = "none";
	}else{
		tree.style.display = "block";
	}
	establish.onOff = !establish.onOff
	navigations.style.width = clinetW - sideBar.offsetWidth - tree.offsetWidth + "px"
	details.style.width = clinetW - sideBar.offsetWidth - tree.offsetWidth + "px"
}
var sort = tools.$("#sort")
var stateUl = tools.$(".stateUl")[0]
sort.onmouseover = function(){
	sort.firstElementChild.style.backgroundPosition = "-183px -12px"
	sort.lastElementChild.style.borderTopColor = "#000"
	this.style.borderBottomColor = "#fff"
	stateUl.style.display = "block"
}
sort.onmouseout = function(){
	sort.firstElementChild.style.backgroundPosition = "-168px -12px"
	sort.lastElementChild.style.borderTopColor = "#8d919b"
	this.style.borderBottomColor = "#bfc3cb"
	stateUl.style.display = "none"
}
stateUl.onmouseover = function(){
	sort.firstElementChild.style.backgroundPosition = "-183px -12px"
	this.style.display = "block"
	sort.style.borderBottomColor = "#fff"
}
stateUl.onmouseout = function(){
	sort.firstElementChild.style.backgroundPosition = "-168px -12px"
	this.style.display = "none"
	sort.style.borderBottomColor = "#bfc3cb"
}
//--------------------自适应屏幕的高度--------------------
var header = tools.$("#header")
var functions = tools.$("#function")
var visual = tools.$("#visual")
var clinetH = tools.view().H;  //可视区的高
var clinetW = tools.view().W;
document.body.style.width = clinetW + "PX"
visual.style.height = clinetH - header.offsetHeight -functions.offsetHeight + "px";
details.style.height = clinetH - header.offsetHeight -functions.offsetHeight + "px";
window.onresize = function(){
	clinetH = tools.view().H;
	visual.style.height = clinetH - header.offsetHeight -functions.offsetHeight + "px";
	details.style.height = clinetH - header.offsetHeight -functions.offsetHeight + "px";
	document.body.style.width = clinetW + "PX"
}