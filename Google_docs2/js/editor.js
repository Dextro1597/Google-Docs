
window.addEventListener("load", function(){

	var editor = theArea.document;
	editor.designMode="on";
	var request = new XMLHttpRequest();
	var share_flag=false;
	ajax_load_editor();
	

	boldButton.addEventListener("click", function(){
		editor.execCommand("Bold", false, null);
		ajax();
	},false);

	italicButton.addEventListener("click", function(){
		editor.execCommand("Italic", false, null);
		ajax();
	},false);

	strikeButton.addEventListener("click", function(){
		editor.execCommand("Strikethrough", false, null);
		ajax();
	},false);

	supButton.addEventListener("click", function(){
		editor.execCommand("Superscript", false, null);
		ajax();
	},false);

	subButton.addEventListener("click", function(){
		editor.execCommand("Subscript", false, null);
		ajax();
	},false);

	olButton.addEventListener("click", function(){
		editor.execCommand("InsertOrderedList", false, "newOl"+Math.round(Math.random()*1000));
		ajax();
	},false);

	ulButton.addEventListener("click", function(){
		editor.execCommand("InsertunOrderedList", false, "newOl"+Math.round(Math.random()*1000));
		ajax();
	},false);

	fontcolorButton.addEventListener("change", function(event){
		editor.execCommand("Forecolor", false, event.target.value);
		ajax();
	}, false);

	backcolorButton.addEventListener("change", function(event){
		editor.execCommand("Backcolor", false, event.target.value);
		ajax();
	}, false);

	fontChanger.addEventListener("change", function(event){
		editor.execCommand("Fontname", false, event.target.value);
		ajax();
	}, false);

	fontsizeChanger.addEventListener("change", function(event){
		editor.execCommand("Fontsize", false, event.target.value);
		ajax();
	}, false);

	undoButton.addEventListener("click", function(){
		editor.execCommand("undo", false, null);
		ajax();
	}, false);	

	redoButton.addEventListener("click", function(){
		editor.execCommand("redo", false, null);
		ajax();
	}, false);

	sharebutton.addEventListener("click", function(){
		
		document.getElementById("shareform").submit();
		alert("Sharing Done");
		ajax_load_editor();
	}, false);

	save_update.addEventListener("click", ajax_save_update, false);
	load_update.addEventListener("click", ajax_load_update, false);

	document.getElementById("theArea").contentDocument.addEventListener("keyup", ajax, false);


	function ajax(){

		var  the_data = 'update='+document.getElementById('theArea').contentDocument.body.innerHTML+"&data=";
		request.open("POST", "php/editor.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(the_data);
		request.onreadystatechange = function() {
		if (request.readyState == 4) {
				}
			};

	}

	function ajax_load_editor(){

		var  the_data = 'update=1&data=';
		request.open("POST", "php/editor.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(the_data);
		request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var response=JSON.parse(request.responseText);
			document.getElementById('theArea').contentDocument.body.innerHTML = response.load_data;
			var sharer = response.load_data.trim();
			if(sharer!="no_share")
				init_datasync(sharer);
			}
		};
		

	}


	function init_datasync(x){
		
		var sharer=x.trim();
		if (sharer!="no_share"){
				setInterval(function(){
					ajax_datasync();
				}, 2000);
		}

	}

	function ajax_datasync(){
		
		var  the_data = 'update=12&data=';
		request.open("POST", "php/editor.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(the_data);
		var editor_data=document.getElementById('theArea').contentDocument.body.innerHTML;
		request.onreadystatechange = function() {
		if (request.readyState == 4) {
				var response = request.responseText;
					if (editor_data!=response) {
						document.getElementById('update_change').innerHTML = "1";
					}
				}
			};
		document.getElementById('update_change').innerHTML = "";

	}



	function ajax_load_update(){
		
		var  the_data = 'update=12&data=';
		request.open("POST", "php/editor.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(the_data);
		var editor_data=document.getElementById('theArea').contentDocument.body.innerHTML;
		request.onreadystatechange = function() {
		if (request.readyState == 4) {
				var response = String(request.responseText);
					document.getElementById('theArea').contentDocument.body.innerHTML=response;
				}
			};

	}

	function ajax_save_update(){
		
		var  the_data = 'update=123&data='+document.getElementById('theArea').contentDocument.body.innerHTML;
		request.open("POST", "php/editor.php", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(the_data);
		alert("Doc saved!");
	}

}, false);