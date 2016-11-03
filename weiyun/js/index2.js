//------------------div的渲染和点击-------------------
var dataFiles = data.files;//获得数据
var initialId = 0;	////初始第一层的id
//找到这些数据中那些数据的pid为0
var childs = pure.passId(dataFiles,initialId);
//根据数据，生成结构
function generatingStructure(item){
	var html = '<div data-file-id='+item.id+'><span></span><input type="text" value="'+item.title+'" readonly></div>'
	return html;
}
//循环数据，拼写结构放在文件区域

function detailsHtml(datas,id){
    var childs = pure.passId(datas,id);
    var str = '';
    for( var i = 0; i < childs.length; i++ ){
        str += generatingStructure(childs[i]);
    }
  return str;
}

//文件区域的容器
var details = tools.$("#details");
//放入容器中
details.innerHTML = detailsHtml(dataFiles,initialId);

//找到所有的div，添加点击处理
var divs = details.getElementsByTagName('div')
clickDispose();
//添加点击处理
function clickDispose(){
	for (var i = 0; i < divs.length; i++) {
		tools.addEvent(divs[i],"click",function (ev){
			var fileIds = this.dataset.fileId;  //找到这个文件的id
			var childs = pure.passId(dataFiles,fileIds);//获取pid为fileId的数据
			details.innerHTML = detailsHtml(dataFiles,fileIds);
            navigation.innerHTML = drawingNav(dataFiles,fileIds);
            var tree = getTreeById("divClass",fileIds);
            tools.removeClass(prevObj,"acquiesce");
            tools.addClass(tree,"acquiesce");
            prevObj = tree;
            clickDispose()
            for (var i = 0; i < divs.length; i++) {
                divs[i].firstElementChild.onOff = true;
            }
            move()
            MultipleChoice()
            if(divs.length === 0){
                empty()
            }
            xuan();
		})
	}
}
//------------------导航区的渲染--------------------
function drawingNav(dataFiles,id){
    var parents = pure.sgetId(dataFiles,id).reverse();
    var str = '';
    var zIndex = parents.length+10;
    for( var i = 0; i < parents.length-1; i++ ){
       str += '<a href="javascript:;"'
       +' style="z-index:'+(zIndex--)+'" data-file-id="'+parents[i].id+'">'+parents[i].title+'</a>';                         
    }
    str += '<span style="z-index:'+zIndex+'" data-file-id="'+parents[i].id+'">'+parents[parents.length-1].title+'</span>';   
    return str;
}
var navigation = tools.$(".navigation")[0];
navigation.innerHTML = drawingNav(dataFiles,initialId);
navigation.firstElementChild.style.cssText = "margin: 0;border-left: 1px solid #d8dce5;padding-left: 11px;z-index:100;"
//------------------导航区的点击--------------------
tools.addEvent(navigation,"click",function (ev){
    var target = ev.target;
    if( target.nodeName === "A" ){
        var fileIds = target.dataset.fileId;  //找到这个文件的id
        var childs = pure.passId(dataFiles,fileIds);//获取pid为fileId的数据
        navigation.innerHTML = drawingNav(dataFiles,fileIds);
        navigation.firstElementChild.style.cssText = "margin: 0;border-left: 1px solid #d8dce5;padding-left: 11px;z-index:100;"
        details.innerHTML = detailsHtml(dataFiles,fileIds);
        var tree = getTreeById("divClass",fileIds);
        tools.removeClass(prevObj,"acquiesce");
        tools.addClass(tree,"acquiesce");
        prevObj = tree;
        clickDispose()
        for (var i = 0; i < divs.length; i++) {
            divs[i].firstElementChild.onOff = true;
        }
        move()
        xuan();
        MultipleChoice()
    }
})
//--------------------------------树形菜单的渲染-------------------------
var tree = tools.$('#tree')
function treeHtml(datas,id){
    var treeChilds = pure.passId(datas,id);
    var html =   '<ul>';
    for( var i = 0; i < treeChilds.length; i++ ){
        var level = pure.getLevel(datas,treeChilds[i].id);
        var treeNav = id === -1 ? "acquiesce" : "";
        //判断某个id下是否有子级
        var hasChild = pure.hasChilds(datas,treeChilds[i].id);
        var treeContro = hasChild ? "divClassZ" : "divClassZNone";
        html += '<li>'
            +'<div data-file-id="'+treeChilds[i].id+'" class="divClass '+treeNav+' '+treeContro+'" style="padding-left:'+level*14+'px;">'
                +'<span>'
                    +'<strong>'+treeChilds[i].title+'</strong>'
                    +'<i class="ico"></i>'
                +'</span>'
            +'</div>'
        html += treeHtml(datas,treeChilds[i].id);
        html += '</li>'
    }
    html += '</ul>'
    return html;
}
tree.innerHTML = treeHtml(dataFiles,-1);
//---------------------------树形菜单点击-------------------------------------------
var treeTitle = tools.$(".divClass");
var prevObj = treeTitle[0]
function treeClick(){
    for( var i = 0; i < treeTitle.length; i++ ){
        tools.addEvent(treeTitle[i],"click",function (){
            var fileId = this.dataset.fileId;
            //点击导航区域渲染文件区域的内容
            details.innerHTML = detailsHtml(dataFiles,fileId);
            //添加点击事件
            clickDispose()
            //点击导航区域渲染点击导航区域
            navigation.innerHTML = drawingNav(dataFiles,fileId);
            var tree = getTreeById("divClass",fileId)
            tools.removeClass(prevObj,"acquiesce")
            tools.addClass(tree,"acquiesce")
            prevObj = tree
            navigation.firstElementChild.style.cssText = "margin: 0;border-left: 1px solid #d8dce5;padding-left: 11px;z-index:100;"
            for (var i = 0; i < divs.length; i++) {
                divs[i].firstElementChild.onOff = true;
            }
            move()
            xuan();
            MultipleChoice()
            if(divs.length === 0){
                empty()
            }
        })
    }
}
treeClick()
//找到lass的元素，身上自定属性为参数二的元素
function getTreeById(classNams,id){
   var classElement = tools.$("."+classNams);
   for( var i = 0; i < classElement.length; i++ ){
     if( classElement[i].dataset.fileId == id ){
        return  classElement[i];
     }
   }
   return null;
}