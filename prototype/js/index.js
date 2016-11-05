function Tab_Fn(obj){
	this.allInput = obj.getElementsByTagName('input');
	this.allP = obj.getElementsByTagName('p');
	this.len = this.allInput.length;
	this.timer = null;
	this.n = 0;
};
// 主干操作
Tab_Fn.prototype.init = function(){
	var _this = this;
	for( var i = 0; i < this.len; i++ ){
		this.allInput[i].index = i;
		this.allInput[i].onclick = function(){
			_this.play(this.index);
		}
	}
};
//播放
Tab_Fn.prototype.play = function (index){
	for( var i = 0; i < this.len; i++ ){
		this.allP[i].style.display = "none";
		this.allInput[i].style.background = "";
	}
	this.allP[index].style.display = "block";
	this.allInput[index].style.background = "blue";
	this.n = index;		
};

//自动播放
Tab_Fn.prototype.autoPlay = function(){
	var _this = this;
	this.timer = setInterval(function(){
		_this.n++;
		if ( _this.n > _this.len - 1) {
			_this.n = 0;
		}
		_this.play(_this.n);
	},1000)
}

//停止
Tab_Fn.prototype.stop = function(){
	clearInterval(this.timer);
	this.timer = null;
};

//运动状态
Tab_Fn.prototype.playStatus = function(){
	return !!this.timer;
}
//获取元素
var div1 = document.getElementById('div1');
var div2 = document.getElementById('div2');
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
//第一个运动
var tab1 = new Tab_Fn(div1);
tab1.init();
//第二个运动
var tab2 = new Tab_Fn(div2);
tab2.init();
tab2.autoPlay();
// 第一个自动播放
btn1.onclick = function(){
	tab1.autoPlay();	
};
// 第二个停止自动播放
btn2.onclick = function(){
	tab2.stop();
};
//反转
btn3.onclick = function(){
	if( tab1.playStatus() ){
		tab1.stop();
	}else{
		tab1.autoPlay();
	}
	if( tab2.playStatus() ){
		tab2.stop();
	}else{
		tab2.autoPlay();
	}
}