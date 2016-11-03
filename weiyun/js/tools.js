var tools = {
	//获取元素
	$:function (selector,context){
		var firstChar = selector.charAt(0);
		context = context || document;
		if( firstChar === "#" ){
			return document.getElementById(selector.substring(1));
		}else if(firstChar === "."){
			return context.getElementsByClassName(selector.substring(1));
		}else{
			return context.getElementsByTagName(selector);
		}	
	},
	//获取样式
	 //参数
	 	//1.元素 2属性
	getStyle:function (obj,attr){
		if( obj.currentStyle ){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj)[attr];
		}
	},
	//获取光标位置
	 //参数
	 	//1元素  2起始位置 3结束位置
	selectionRange:function (element,start,end){
		element.setSelectionRange(start,end);
		element.focus();	
	},
	//用处，就是获取可视区的宽高
	view:function (){
		return {
			W:document.documentElement.clientWidth,
			H:document.documentElement.clientHeight
		}
	},
	//获取纵向滚动条滚动了多少
	scrollT:function (){
		return document.documentElement.scrollTop || document.body.scrollTop;	
	},
	//给一个元素加上滚轮事件
	// 参数：
	// 		element:给这个元素绑定鼠标滚轮事件
	// 		upFn：向上触发的函数
	// 		downFn:向下触发的函数
	mouseWheel:function (element,upFn,downFn){
		element.onmousewheel = wheelFn
		if( element.addEventListener ){
			element.addEventListener("DOMMouseScroll",wheelFn,false);
		}
		function wheelFn(ev){
			var direction = true;
			if(ev.wheelDelta){  //ie和chrome
				direction = ev.wheelDelta > 0 ? true : false;
			}else if(ev.detail){ //FF
				direction = ev.detail < 0 ? true : false;
			}
			if( direction ){  //向上
				typeof upFn === "function" && upFn.call(element,ev);
			}else{  //向下
				typeof downFn === "function" && downFn.call(element,ev);
			}
			ev.preventDefault();
		}
	},
	//参数1 当前元素, 参数2 需要找到的元素
	parents:function (element,selector){
		var first = selector.charAt();
		if( first === "#" ){
			selector = selector.slice(1); 
			while(element.nodeType != 9 && element.id != selector){  //当前这个元素的id不为box
				element = element.parentNode;
			}
		}else if(first === "."){
			selector = selector.slice(1); 
			while(element.nodeType != 9 && !tools.hasClass(element,selector)){  //当前这个元素的id不为box
				element = element.parentNode;
			}
		}else {
			while(element.nodeType != 9 && element.nodeName.toLowerCase() != selector){  //当前这个元素的id不为box
				element = element.parentNode;
			}
		}
		return element.nodeType === 9 ? null : element;
	},
	//添加事件处理
	addEvent:function (obj,evName,fnName){
		obj.addEventListener(evName,fnName,false);	
	},
	//删除事件处理
	removeEvent:function (obj,evName,fnName){
		obj.removeEventListener(evName,fnName,false);	
	},
	//newElement：要插入的新节点	targetElement：要插入到那个元素后面
	insertAfter:function (newElement,targetElement){
		var parent = targetElement.parentNode;
		if( targetElement === parent.lastElementChild ){
			parent.appendChild(newElement)
		}else{
			parent.insertBefore(newElement,targetElement.nextElementSibling);
		}
	},
	//判断class是否存在
	hasClass:function (element,classNames){
		var classAll = 	element.className.split(" ");
		for( var i = 0; i < classAll.length; i++ ){
			if( classAll[i] === classNames ){
				return true;
			}
		}
		return false;
	},
	//删除class
	removeClass:function (element,classNames){
		if( tools.hasClass(element,classNames) ){
			var classAll = element.className.split(" ");
			for( var i = 0; i < classAll.length; i++ ){
				if( classAll[i] === classNames ){
					classAll.splice(i,1);
					i--;
				}
			}
			if( classAll.length === 0 ){
				element.removeAttribute("class");
			}else{
				element.className = classAll.join(" ");
			}
		}
	},
	//添加class
	addClass:function (element,classNames){
		var classAll = element.className;
		if( !tools.hasClass(element,classNames) ){
			classAll += " " + classNames;
		}
		element.className = classAll.trim();
	},
	//有class就删除，没有就添加
	toggleClass:function (element,classNames){
		if( tools.hasClass(element,classNames) ){
			tools.removeClass(element,classNames);
			return false;
		}else{
			tools.addClass(element,classNames);
			return true;
		}
	},
	getTreeById:function (classNams,id,parents){
	   var classElement = tools.$("."+classNams,parents);
	   for( var i = 0; i < classElement.length; i++ ){
	     if( classElement[i].dataset.fileId == id ){
	        return  classElement[i];
	     }
	   }
	   return null;
	}
}