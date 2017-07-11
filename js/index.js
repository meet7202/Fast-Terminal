/*
*Author - Meet Shah
*Institute - DAIICT
*Project - Fast-Terminal
*/
$(
	function(){
		$(document).keydown(
			function (event) { 
				Cursor.addText(event);
			}
		);
	}
);

var Cursor={
	accessCountimer:null,
	text: null,
	index:26,
	speed:3, 
	file:"",
	init: function(){
		accessCountimer=setInterval(function(){Cursor.blink();},500);
		$.get(Cursor.file,function(data){
			Cursor.text=data;
		});
	},
	
	content:function(){
		return $("#terminal").html();
	},
	
	write:function(str){
		$("#terminal").append(str);
		return false;
	},
	
	
	addText:function(key){
		 if(Cursor.text){ 
			var cont=Cursor.content(); 
			
			if(cont.substring(cont.length-1,cont.length)=="|") 
				$("#terminal").html($("#terminal").html().substring(0,cont.length-1)); 
			if(key.keyCode!=8){ 
				Cursor.index+=Cursor.speed;	
			}
			else{
				if(Cursor.index>0) 
					Cursor.index-=Cursor.speed;
			}
			var text=$("<div/>").text(Cursor.text.substring(0,Cursor.index)).html();
			var rtn= new RegExp("\n", "g"); 
			var rts= new RegExp("\\s", "g");
			var rtt= new RegExp("\\t", "g");
			$("#terminal").html(text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts,"&nbsp;"));
			window.scrollBy(0,50); 
		}
		
	},
	
	blink:function(){ 
		var cont=this.content();  
		if(cont.substring(cont.length-1,cont.length)!="|") 
			this.write("|");
		else
			this.write(" ");
	}
}
