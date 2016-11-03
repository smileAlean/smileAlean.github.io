var pure = (function(){
	return{
		//通过id找到下面所有的子数据
		passId:function (data,id){ 
			var arr = [];
			for( var i = 0; i < data.length; i++ ){
				if( data[i].pid == id){
					arr.push(data[i]);
				}
			}
			return arr;
		},
		//通过id找到父级id
		sgetId:function (data,id){
	        var arr = [];
	        for( var i = 0; i < data.length; i++ ){
	            if( data[i].id == id ){
	                arr.push(data[i]);
	                arr = arr.concat(pure.sgetId(data,data[i].pid));
	            }        
	        }
	        return arr;
	    },
	    //找到指定id是在数据中是第几层
	    getLevel:function (datas,id){  
	    	return pure.sgetId(datas,id).length;
	    },
	    //判断指定id下是否有子级
	    hasChilds:function (datas,id){
	    	return !!pure.passId(datas,id).length;
	    },
	    //用来判断同级的文件夹是否重名
	    reName:function (datas,pid,title){
	    	//同级
	    	var childs = pure.passId(datas,pid);

	    	for( var i = 0; i < childs.length; i++ ){
	    		if( childs[i].title === title ){
	    			return true;
	    		}
	    	}

	    	return false;
	    },
	    //找到当前元素的所有子集
	    getChildsAll:function (datas,id){
            //通过循环数据，找到指定id的那条数据
            var arr = [];
            for( var i = 0; i < datas.length; i++ ){
                if( datas[i].id == id ){
                    arr.push(datas[i]);
                    var childs = pure.passId(datas,datas[i].id);

                    for( var j = 0; j < childs.length; j++ ){
                       arr = arr.concat(pure.getChildsAll(datas,childs[j].id));
                    }
                }
            }
            return arr;
        },
        //批量删除指定id下面的所有的子级  [1,2,3,4]
        //idArr 是一个数组，指定了要删除的id
        batchDelect:function (datas,idArr){
            for( var i = 0; i < idArr.length; i++ ){
                var childsAll = pure.getChildsAll(datas,idArr[i]);
                for( var j = 0; j < childsAll.length; j++ ){
                    for( var k = 0; k < datas.length; k++ ){
                        if( datas[k].id == childsAll[j].id ){
                            datas.splice(k,1);
                            break;
                        }
                    }
                }

            } 
        },
        getDataById:function (datas,id){
        	for( var i = 0; i < datas.length; i++ ){
        		if( datas[i].id == id ){
        			return datas[i];
        		}
        	}
        	return null;
        },
        getParent:function (datas,id){
        	var parents = pure.sgetId(datas,id);

        	return parents[1];
        }
	}
}())