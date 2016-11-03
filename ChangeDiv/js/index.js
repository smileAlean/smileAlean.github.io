(function($){
	var btn = $('#btn');
	var bg = $("#bg");
	var box = $("#box");
	var charge = $('#charge');
	var red = $('#red');
	var blue = $("#blue");
	var yellow = $("#yellow");
	// 点击设置
	btn.on("click",function(){
		// bg.css("display","block");
		bg.show("slow");
		// charge.css("display","block");
		charge.show("slow");
	});
	red.on("click",function(){
		box.css("background","red");
	});
	yellow.on("click",function(){
		box.css("background","yellow");
	});
	blue.on("click",function(){
		box.css("background","blue");
	});
	$('#w200').on("click",function(){
		box.css("width","200px");
	})
	$('#w300').on("click",function(){
		box.css("width","300px");
	})
	$('#w400').on("click",function(){
		box.css("width","400px");
	})
	$('#h200').on("click",function(){
		box.css("height","200px");
	})
	$('#h300').on("click",function(){
		box.css("height","300px");
	})
	$('#h400').on("click",function(){
		box.css("height","400px");
	})

	$('#ok').on("click",function(){
		bg.hide("slow");
		charge.hide("slow");
	})
	$('#reset').on("click",function(){
		box.css({"width":"100px","height":"100px","border":"2px solid #000","background":"none"})
		bg.hide("slow");
		charge.hide("slow");
	})
})(jQuery)