function getRect(obj){
	return obj.getBoundingClientRect();
}
//参数  1自己的框   2需要碰撞的元素
function duang(obj1,obj2){
	var obj1Info = getRect(obj1);	
	var obj2Info = getRect(obj2);	

	//obj1的上下左右

	var obj1L = obj1Info.left;
	var obj1R = obj1Info.right;
	var obj1T = obj1Info.top;
	var obj1B = obj1Info.bottom;

	//obj2的上下左右
	var obj2L = obj2Info.left;
	var obj2R = obj2Info.right;
	var obj2T = obj2Info.top;
	var obj2B = obj2Info.bottom;

	//排除掉没碰上的区域

	if( obj1R < obj2L || obj1L > obj2R || obj1B < obj2T || obj1T > obj2B){
		return false;
	}else{
		return true;
	}
}