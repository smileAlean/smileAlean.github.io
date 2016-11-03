//---------------------警告框----------------------------
var warn
var timer
function warning(number,W){
	if(warn){
		document.body.removeChild(warn)
		clearInterval(timer)
	}
	warn = document.createElement("div")
	warn.className = "warning"
	warn.style.width = W + "px"
	warn.style.left = (tools.view().W)/2 -(W/2) + "px"
	warn.style.background = "url(img/"+number+".png)"
	document.body.appendChild(warn)
	MTween(warn,{top:0},200,"linear",function(){
		timer = setTimeout(function(){
			MTween(warn,{top:-32},200)
		},1000)
	})
}

//---------------------新建文件---------------------------
var morenOnOff = true;
var news = tools.$("#new")
var allCheck = tools.$(".allCheck")[0]  //全选按钮
tools.addEvent(news,"click",function(){
	morenOnOff = false;
	if(divs.length === 0){
		details.innerHTML = ''
	}
	var divj = document.createElement("div")//创建div
	divj.innerHTML = '<span></span><input>'
	details.insertBefore(divj,details.firstChild);//插入到内容区域前面
	divj.lastElementChild.focus()	//获取焦点
	divj.lastElementChild.style.background = "#fff"	//输入框背景
	divj.onmouseover = function(){//移入
		this.className = "active"
	}
	divj.onmouseout = function(){//移出
		this.className = ""
	}
	document.onkeyup = function(ev){
		if(ev.keyCode === 13){
			fn()
		}
	}
	function fn(){
		morenOnOff = true;
		if(divj.lastElementChild.value.trim() == ""){
			details.removeChild(divj)//没输入名字删除div
			if(divs.length === 0){
				empty()
			}
		}else if(pure.reName(dataFiles,navigation.lastElementChild.dataset.fileId,divj.lastElementChild.value.trim())){
            details.removeChild(divj)//重名也删除
            warning(8,257)
		}else{
			var arri = new Date().getTime()
			divj.onmouseover = divj.onmouseout = null;
			divj.lastElementChild.setAttribute("readonly","readonly")
			divj.lastElementChild.style.background = "transparent"
			divj.setAttribute("data-file-id",arri)
			allCheck.onOff = true;
			Multiple(divj)
			allCheck.style.backgroundPosition = "-198px -12px"
	    	for (var i = 0; i < divs.length; i++) {
				divs[i].className = ""
				divs[i].firstElementChild.onOff = true;
				divs[i].firstElementChild.style.backgroundPosition = "18px 18px"
			}
			clickDispose()
			var spanId = navigation.lastElementChild.dataset.fileId
			var userData = {
	            'id' : arri,
	            'pid' : spanId,
	            'title' : divj.lastElementChild.value,
	            'type' : "file"
	        }
	        // 原数据添加一项
	        dataFiles.unshift(userData)
	        j = 0
			move()
			xuan()
			tree.innerHTML = treeHtml(dataFiles,-1);
			prevObj = treeTitle[0]
			var trees = getTreeById("divClass",spanId)
            tools.removeClass(prevObj,"acquiesce")
            tools.addClass(trees,"acquiesce")
            prevObj = trees
			treeClick()
			warning(5,185)

		}
		tools.removeEvent(document,"mousedown",fn)
	}
	tools.addEvent(document,"mousedown",fn)
})

//-----------------------移入移出div------------------------
function divMouseover(){
	if(this.firstElementChild.onOff){
		this.className = "active"
		this.firstElementChild.style.backgroundPosition = "-116px -36px"
	}
}
function divMouseout(){
	if(this.firstElementChild.onOff){
		this.className = ""
		this.firstElementChild.style.backgroundPosition = "18px 18px"
	}
}
function move(){
	for (var i = 0; i < divs.length; i++) {
		tools.addEvent(divs[i],"mouseover",divMouseover)
    	tools.addEvent(divs[i],"mouseout",divMouseout)
	}
}
move()
//----------------------点击了单个选中----------------------
var j = 0;
var sjy = null
function MultipleChoice(){
	for (var i = 0; i < divs.length; i++) {
		divs[i].firstElementChild.onOff = true;
		Multiple(divs[i])
	}
}
// 操作单个选中
function Multiple(divss){
	j = 0
	tools.addEvent(divss.firstElementChild,"click",function(ev){
		sjy = divss
		if(this.onOff){
			this.style.backgroundPosition = "-116px -56px"
    		j++
    		this.onOff = false
		}else{
			this.style.backgroundPosition = "-116px -36px"
    		j--
    		this.onOff = true
		}
		if(j === divs.length){
			allCheck.style.backgroundPosition = "-198px -26px"
			allCheck.onOff = false
		}else{
			allCheck.style.backgroundPosition = "-198px -12px"
			allCheck.onOff = true;
		}
		ev.stopPropagation()
	})
	tools.addEvent(divss.firstElementChild,"mousedown",function(ev){
		ev.stopPropagation()
	})
}
MultipleChoice()
//-----------------------点击全选按钮-------------------------
allCheck.onOff = true;
tools.addEvent(allCheck,"click",function(){
	if(this.onOff){
		allCheck.style.backgroundPosition = "-198px -26px"
		this.onOff = false
		for (var i = 0; i < divs.length; i++) {
			divs[i].className = "active"
			divs[i].firstElementChild.style.backgroundPosition = "-116px -56px"
			divs[i].firstElementChild.onOff = false;
		}
		j = divs.length
	}else{
		allCheck.style.backgroundPosition = "-198px -12px"
		this.onOff = true
		for (var i = 0; i < divs.length; i++) {
			divs[i].className = ""
			divs[i].firstElementChild.style.backgroundPosition = "18px 18px"
			divs[i].firstElementChild.onOff = true;
		}
		j = 0
	}
})
tools.addEvent(allCheck,"mousedown",function(ev){
	ev.stopPropagation()
})
//----------------------点击删除按钮--------------------------
var omit = tools.$("#omit")
omit.onclick = omitfn
function omitfn(){
	var classHQ = tools.$('.active')
	if(classHQ.length === 0){
		warning(3,161)
	}else{
		mobile = false
		omit.omit = true;
		var divg = document.createElement("div")
		divg.style.cssText = 'width:100%;height:100%;background:#ccc;opacity:.5;position:absolute;top:0;left:0;z-index: 100;'
		divg.setAttribute("id","tmc")
		document.body.appendChild(divg)
		dialog({
			title:"删除文件",
            content:frameConstruction(),
            okFn:function(){
            	var idArr = [];
				for (var i = 0; i < divs.length; i++) {
					if(divs[i].className === "active"){
						for (var k = 0; k < dataFiles.length; k++) {
							if(dataFiles[k].id == divs[i].dataset.fileId){
								idArr.push(dataFiles[k].id);
							}
						}
						details.removeChild(divs[i])
						allCheck.onOff = true
						allCheck.style.backgroundPosition = "-198px -12px"
						i--
					}
				}
				pure.batchDelect(dataFiles,idArr);
				spanId = navigation.lastElementChild.dataset.fileId
				j = 0
				tree.innerHTML = treeHtml(dataFiles,-1)
				prevObj = treeTitle[0]
				var trees = getTreeById("divClass",spanId)
		        tools.removeClass(prevObj,"acquiesce")
		        tools.addClass(trees,"acquiesce")
		        prevObj = trees
				treeClick()
				omit.omit = false;
				warning(6,161)
				if(divs.length === 0){
					empty()
				}
				mobile = true;
            }
		})
	}
}
//------删除时的弹框结构-------
function frameConstruction(){
	var html
	html = '<div style="position: relative;width: 100%;height: 110px">\
			<span style="width: 32px;height: 32px;position: absolute;top: 33px;left: 33px;background: url(img/img.png);background-position:-135px -46px;"></span>\
			<p style="color: #000;font-size: 16px;padding: 38px 0 0 78px;">确定要删除这些文件夹吗？</p>\
			<p style="color: #868686;padding: 5px 0 0 78px;">已删除的文件可以在回收站找到</p>\
			</div>'
	return html
}
//----------------------更改名字-------------------------------
var ren = tools.$("#ren")
tools.addEvent(ren,"click",renF)
function renF(){
	var classHQ = tools.$('.active')
	if(classHQ.length === 0){
		warning(3,161)
	}else if(classHQ.length > 1){
		warning(4,221)
	}else{
		sjy = classHQ[0]
		classHQ[0].lastElementChild.removeAttribute("readonly")
		classHQ[0].lastElementChild.focus()
		var valueZ = classHQ[0].lastElementChild.value
		classHQ[0].lastElementChild.setSelectionRange(0,valueZ.length);
		classHQ[0].lastElementChild.style.background = "#fff";
		document.onkeyup = function(ev){
			if(ev.keyCode === 13){
				fun()
			}
		}
		function fun(){
			sjy.lastElementChild.setAttribute("readonly","readonly")
			sjy.lastElementChild.style.background = "transparent"
			sjy.firstElementChild.style.backgroundPosition = "18px 18px"
			sjy.firstElementChild.onOff = true;
			allCheck.onOff = true
			allCheck.style.backgroundPosition = "-198px -12px"
			j = 0
			sjy.className = "";
			if(sjy.lastElementChild.value.trim() === "" || sjy.lastElementChild.value === valueZ){
				sjy.lastElementChild.value = valueZ
			}else if(pure.reName(dataFiles,navigation.lastElementChild.dataset.fileId,sjy.lastElementChild.value.trim())){
	            sjy.lastElementChild.value = valueZ
	            warning(8,257)
			}else{
				var spanId = navigation.lastElementChild.dataset.fileId
				for (var i = 0; i < dataFiles.length; i++) {
					if(dataFiles[i].id == sjy.dataset.fileId){
						dataFiles[i].title = sjy.lastElementChild.value
					}
				}
				tree.innerHTML = treeHtml(dataFiles,-1);
				prevObj = treeTitle[0]
				var trees = getTreeById("divClass",spanId)
	            tools.removeClass(prevObj,"acquiesce")
	            tools.addClass(trees,"acquiesce")
	            prevObj = trees
				treeClick()
				warning(7,149)
			}
			tools.removeEvent(document,"mousedown",fun)
		}
		tools.addEvent(document,"mousedown",fun)
	}
}

//----------------------拉选框---------------------------------
var allAs = tools.$('.allAs')
for (var i = 0; i < allAs.length; i++) {
	tools.addEvent(allAs[i],"mousedown",function(ev){
		if(morenOnOff){
			ev.stopPropagation()
		}
		ev.preventDefault()
	})
}
var mobile = true;
var off = true;
document.onmousedown = function (ev){
	if(!off)return
	if(ev.which === 3)return
	var target = ev.target;
	ev.preventDefault();
	var disX = ev.clientX;
	var disY = ev.clientY;
	//拖拽文件夹
	var tptDiv = tools.parents(target,"div")
	var p = 0
	if(tptDiv){
		if(!mobile)return
		for (var i = 0; i < divs.length; i++) {
			tools.removeEvent(divs[i],"mouseover",divMouseover)
			tools.removeEvent(divs[i],"mouseout",divMouseout)
		}
		var classDiv = tools.$('.active')
		var sign = null
		var signAs = null
		var pengObj = null;  //碰上的那个元素
		tools.addEvent(document,"mousemove",moveFileFn)
		function moveFileFn(ev){
			if( Math.abs(ev.clientX - disX) > 10 ||  Math.abs(ev.clientY - disY) > 10 ){
				if(classDiv.length === 1){
					tptDiv.className = "active"
					tptDiv.firstElementChild.style.backgroundPosition = '-116px -56px'
					tptDiv.firstElementChild.onOff = false;
					j = 1;
				}
				if(tools.$(".sketch1").length === 1 || tools.$(".sketch2").length === 1|| tools.$(".sketch3").length === 1 || tools.$(".sketch4").length === 1){
					document.body.removeChild(document.body.lastElementChild)
				}
				var sign = document.createElement("div")
				var signAs = document.createElement("div")
				signAs.className = "method"
				sign.appendChild(signAs)
				if(classDiv.length === 1){
					sign.className = "sketch1"
					p = 1
				}else if(classDiv.length === 2){
					sign.className = "sketch2"
					p = 2
				}else if(classDiv.length === 3){
					sign.className = "sketch3"
					p = 3
				}else if(classDiv.length > 3){
					sign.className = "sketch4"
					p = 4
				}
				sign.style.top = ev.clientY + 10 + "px"
				sign.style.left = ev.clientX + 10 + "px"
				document.body.appendChild(sign)
				for (var i = 0; i < divs.length; i++) {
					if( duang(signAs,divs[i]) ){
						if(divs[i].firstElementChild.onOff){
							divs[i].className = ""
							divs[i].style.backgroundColor = "#e0f0f0"
							divs[i].firstElementChild.style.backgroundPosition = "-116px -36px"
							pengObj = divs[i]
						}
					}else{
						if(divs[i].firstElementChild.onOff){
							divs[i].style.backgroundColor = ""
							divs[i].firstElementChild.style.backgroundPosition = ""
						}
						j = 0
					}
				}
			}
		}
		tools.addEvent(document,"mouseup",upFileFn)
		function upFileFn(ev){
			tools.removeEvent(document,"mousemove",moveFileFn)
			tools.removeEvent(document,"mouseup",upFileFn)
			var fiId = null
			for (var i = 0; i < divs.length; i++) {
				if(divs[i].className === "" && divs[i].style.backgroundColor === "rgb(224, 240, 240)"){
					fiId = pengObj.dataset.fileId
				}
			}
			if(fiId){
				var pitchOn = tools.$(".active")
				for (var i = 0; i < pitchOn.length; i++) {
					for (var j = 0; j < dataFiles.length; j++) {
						if(dataFiles[j].id == pitchOn[i].dataset.fileId){
							var shuJu = pure.passId(dataFiles,fiId)
							if(shuJu.length === 0){
								for (var l = 0; l < dataFiles.length; l++) {
									if(dataFiles[l].id == pitchOn[i].dataset.fileId){
										dataFiles[l].pid = fiId
										warning(11,173)
									}
								}
							}else{
								for (var w = 0; w < shuJu.length; w++) {
									if(dataFiles[j].title == shuJu[w].title){
										setTimeout(function(){
											warning(9,306)
										},16)
									}else{
										for (var l = 0; l < dataFiles.length; l++) {
											if(dataFiles[l].id == pitchOn[i].dataset.fileId){
												dataFiles[l].pid = fiId
												warning(11,173)
											}
										}
									}
								}
							}
						}
					}
				}
				var spanId = navigation.lastElementChild.dataset.fileId
				details.innerHTML = detailsHtml(dataFiles,spanId);
				clickDispose();
				MultipleChoice()
				tree.innerHTML = treeHtml(dataFiles,-1);
				prevObj = treeTitle[0]
				var trees = getTreeById("divClass",spanId)
	            tools.removeClass(prevObj,"acquiesce")
	            tools.addClass(trees,"acquiesce")
	            prevObj = trees
	            treeClick()
			}
			if(tools.$(".sketch"+p)[0]){
				tools.$(".sketch"+p)[0].removeChild(tools.$(".method")[0])
				document.body.removeChild(tools.$(".sketch"+p)[0])
			}
			for (var i = 0; i < divs.length; i++) {
				allCheck.style.backgroundPosition = "-198px -12px"
				allCheck.onOff = true;
				divs[i].className = ""
				divs[i].style.backgroundColor = ""
				divs[i].firstElementChild.style.backgroundPosition = ""
				divs[i].firstElementChild.onOff = true;
			}
			move()
			xuan()
		}
		return
	}
	if(seek.inda || omit.omit || moves.moves)return
	j = 0
	for (var i = divs.length - 1; i >= 0; i--) {
		divs[i].className = ""
		divs[i].firstElementChild.style.backgroundPosition = '18px 18px'
		divs[i].firstElementChild.onOff = true;
		allCheck.style.backgroundPosition = "-198px -12px"
		allCheck.onOff = true;
	}
	if(tools.parents(target,"#tree") || 
        tools.parents(target,"#sideBar")  ||
        tools.parents(target,".allAs")
      ){
        return;
    }
	var newDiv = null;
	document.onmousemove = function (ev){
		if( Math.abs(ev.clientX - disX) > 20 ||  Math.abs(ev.clientY - disY) > 20 ){
			if( !newDiv ){
				newDiv = document.createElement("div");
				newDiv.className = "dialog";
				newDiv.style.left = disX + "px";
				newDiv.style.top = disX + "px";
				document.body.appendChild(newDiv);
			}
			newDiv.style.width = Math.abs(ev.clientX - disX) + "px";
			newDiv.style.height = Math.abs(ev.clientY - disY) + "px";
			newDiv.style.left = Math.min(ev.clientX , disX)+1 + "px";
			newDiv.style.top = Math.min(ev.clientY , disY)+1 + "px";
			for( var i = 0; i < divs.length; i++ ){
				var divg = tools.$('.active',details)
				if( duang(newDiv,divs[i]) ){
					divs[i].className = "active"
					divs[i].firstElementChild.style.backgroundPosition = "-116px -56px"
					divs[i].firstElementChild.onOff = false;
					
					if(divg.length === divs.length){
						allCheck.onOff = false
						j = divs.length
						allCheck.style.backgroundPosition = "-198px -26px"
					}else{
						allCheck.onOff = true
						j = divg.length
						allCheck.style.backgroundPosition = "-198px -12px"
					}
				}else{
					divs[i].className = ""
					divs[i].firstElementChild.style.backgroundPosition = '18px 18px'
					divs[i].firstElementChild.onOff = true;
					allCheck.style.backgroundPosition = "-198px -12px"
					allCheck.onOff = true;
					j = divg.length
				}
			}
		}
	}
	document.onmouseup = function (){
		document.onmousemove = document.onmouseup = null;
		if( newDiv ){
			document.body.removeChild(newDiv);
		}
	}
}
//----------------------移动------------------------------------
var moves = tools.$("#move")
tools.addEvent(moves,"click",movesF)
function movesF(){
	var checkeds = tools.$('.active')
	if(checkeds.length === 0){
		warning(3,161)
	}else{
		mobile = false;
		moves.moves = true;
		moves.isMove = true;
        var moveId = 0;  //保存选择要移动文件的id
        var isMove = true;  //默认是不可以关闭
        var divg = document.createElement("div")
		divg.style.cssText = 'width:100%;height:100%;background:#ccc;opacity:.5;position:absolute;top:0;left:0;z-index: 100;'
		divg.setAttribute("id","tmc")
		document.body.appendChild(divg)
        dialog({
            title:"选择存储位置",
            content:moveDialogHtml(),
            okFn:function (){
                if( !isMove ){
            		mobile = true
                    var childsTitle = pure.passId(dataFiles,moveId);
                    var a = true;
                    for( var i = 0; i < checkeds.length; i++ ){
                        a = true;
                        var getData = pure.getDataById(dataFiles,checkeds[i].dataset.fileId);
                        for( var j = 0; j < childsTitle.length; j++ ){
                            if( childsTitle[j].title == getData.title ){
                                warning(9,306)
                                a = false;
                                break;
                            }
                        }
                        if( a ){
                             getData.pid = moveId;
                        }
                    }
                    //文件区域渲染
                    var spanId = navigation.lastElementChild.dataset.fileId
                    var cur = tools.$("span",navigation)[0].dataset.fileId;
                    details.innerHTML = detailsHtml(dataFiles,cur);
                    //菜单区域渲染
                    tree.innerHTML = treeHtml(dataFiles,-1);
                    //定位到某个菜单上
                    prevObj = treeTitle[0]
					var trees = getTreeById("divClass",spanId)
			        tools.removeClass(prevObj,"acquiesce")
			        tools.addClass(trees,"acquiesce")
			        prevObj = trees
                    moves.isMove = false;
                    moves.moves = false;
                    for (var i = 0; i < divs.length; i++) {
                    	divs[i].firstElementChild.onOff = true;
                    }
                    move()
                    xuan()
                    treeClick()
                    if(divs.length === 0){
						empty()
					}
					warning(11,173)
					allCheck.style.backgroundPosition = "-198px -12px"
					allCheck.onOff = true;
					clickDispose()
					MultipleChoice()
                }
                return isMove;
            }
        });
        var fullPop = tools.$(".full-pop")[0];
		var dirTree = tools.$(".dirTree",fullPop)[0];
        tools.addClass(dirTree,"tree-menu-comm");
        dirTree.innerHTML = treeHtml(dataFiles,-1);
        var fileName = tools.$(".file-name",fullPop)[0];
        var fileNum = tools.$(".file-num",fullPop)[0];
        var selectFirstId = checkeds[0].dataset.fileId;
        var error = tools.$(".error",fullPop)[0];
        fileName.innerHTML = pure.getDataById(dataFiles,selectFirstId).title;
        if( checkeds.length>1 ){
            fileNum.innerHTML = '等 '+checkeds.length+' 个文件 ';
        }
        var prevId = 0;
        tools.addEvent(dirTree,"mousedown",function (ev){
        	ev.stopPropagation()
        })
        tools.addEvent(dirTree,"click",function (ev){
            var target = ev.target;
            if( target = tools.parents(target,".divClass") ){
                isMove = false;
                var clickFileId = target.dataset.fileId;
                tools.removeClass(tools.getTreeById("divClass",prevId,dirTree),"acquiesce");
                tools.addClass(target,"acquiesce");
                prevId = clickFileId;
                error.innerHTML = "";
                var firstSelectId = checkeds[0].dataset.fileId;
                var parent = pure.getParent(dataFiles,firstSelectId);
                if( clickFileId == parent.id ){
                    error.innerHTML = "文件已经在当前文件夹下";
                    isMove = true;
                }
                for( var i = 0; i < checkeds.length; i++ ){
                    var selectId = checkeds[i].dataset.fileId;
                    var childs = pure.getChildsAll(dataFiles,selectId);
                    for( var j = 0; j < childs.length; j++ ){
                        if( childs[j].id == clickFileId ){
                            error.innerHTML = "不能移动到本身或子孙元素下";
                            isMove = true;
                            break;
                        }
                    }
                }
                moveId = clickFileId;
            }
        })
	}
}
//------------------------移动时候的弹框结构-------------------
function moveDialogHtml(){
    var html = '<p class="dir-file">\
        <span class="file-img"></span>\
        <span class="file-name"></span>\
        <span class="file-num"></span>\
    </p>\
    <div class="dir-box">\
        <div class="cur-dir">\
            <span>移动到：</span><span class="fileMovePathTo">111</span>\
        </div>\
        <div class="dirTree"></div>\
    </div> '
    return html;
}
//-----------------------当类容为空的时候----------------------
function empty(){
	details.innerHTML = '<img src="img/10.png" style="margin:137px auto 0;display:block;">'
	details.innerHTML += '<p style="margin:0 auto 0;font-size:22px;color:#afb5bf;width:100px;">暂无文件</p>'
	details.innerHTML += '<p style="margin:0 auto 0;font-size:16px;line-height:20px;color:#afb5bf;width:250px;">请点击左上角的“上传”按钮添加</p>'
}
if(divs.length === 0){
	empty()
}
//------------------------------鼠标右键-------------------------------
var uls = null;
tools.addEvent(details,"contextmenu",rightButton)
function rightButton(ev){
	off = false;
	var target = ev.target
	if(tools.parents(target,"div")){
		if (uls) {
			document.body.removeChild(uls);
		}
		if(tools.parents(target,"div").firstElementChild.onOff){
			for (var i = 0; i < divs.length; i++) {	
				divs[i].className = ""
				divs[i].firstElementChild.onOff = true;
				divs[i].firstElementChild.style.backgroundPosition = "18px 18px"
			}
			j = 1;
		}
		if(j === divs.length){
			allCheck.style.backgroundPosition = "-198px -26px"
			allCheck.onOff = false
		}else{
			allCheck.style.backgroundPosition = "-198px -12px"
			allCheck.onOff = true;
		}
		tools.parents(target,"div").className = "active"
		tools.parents(target,"div").firstElementChild.onOff = false;
		tools.parents(target,"div").firstElementChild.style.backgroundPosition = "-116px -56px"
		uls = document.createElement("ul")
		uls.className = "rightclass"
		uls.innerHTML = '<li>下载</li><li>删除</li><li>移动到</li><li>重命名</li><li>分享</li>'
		uls.style.top = ev.clientY + "px"
		uls.style.left = ev.clientX + "px"
		document.body.appendChild(uls)
		tools.addEvent(document,"mousedown",rightB)
		for (var i = 0; i < divs.length; i++) {
			tools.addEvent(divs[i].firstElementChild,"mousedown",rightB)
		}
		function rightB(ev){
			if(!tools.parents(ev.target,".rightclass")){
				tools.removeEvent(document,"mousedown",rightB)
				for (var i = 0; i < divs.length; i++) {
					tools.removeEvent(divs[i].firstElementChild,"mousedown",rightB)
				}
			}
			off = true;
		}
		var lis = uls.getElementsByTagName('li')
		document.onclick = function(ev){
				if(!tools.parents(ev.target,".rightclass")){
					document.body.removeChild(uls)
					off = true;
					document.onclick = null;
					uls = null;
				}
		}
		lis[0].onmousedown = function(ev){
			ev.stopPropagation();
		}
		lis[1].onclick = function(ev){
			document.body.removeChild(uls)
			omitfn()
			off = true;
			ev.stopPropagation()
			document.onclick = null;
			uls = null;
		}
		lis[2].onclick = function(ev){
			document.body.removeChild(uls)
			movesF()
			off = true;
			ev.stopPropagation()
			document.onclick = null;
			uls = null;
		}
		lis[3].onclick = function(ev){
			document.body.removeChild(uls)
			off = true;
			renF()
			ev.stopPropagation()
			uls = null;
			document.onclick = null;
		}
		lis[4].onmousedown = function(ev){
			ev.stopPropagation();
		}
	}
	ev.preventDefault()
}
tools.addEvent(document,"contextmenu",function(ev){
	ev.preventDefault()
})

function xuan(){
	var inputss = tools.$('input',details);
	for (var i = 0; i < inputss.length; i++) {
		tools.addEvent(inputss[i],"mousedown",function(ev){
			ev.stopPropagation();
		})
		tools.addEvent(inputss[i],"click",function(ev){
			ev.stopPropagation();
		})
	}	
}