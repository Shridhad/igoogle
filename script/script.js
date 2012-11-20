
window.onload = function() {
	wm = WidgetManager.getInstance();
	var addButton = document.getElementById("add_widget");
	registerEvent(addButton, "click", WidgetAgent.showWidgetDialog);

};

var createCookie = function(count) {
	document.cookie = "count=" + count ;
	var cookie = document.cookie;
	console.log(document.cookie );
	if(cookie == 1) {
		console.log("111");
	}
};