
var restoreWidgets = function() {
		var cookies = unescape(unescape(Cookies.readCookie("widgets"))).split("}");
		if(cookies == "")
			return;
		for(i=0, len=cookies.length-1; i<len; i++) {
			var cookie = cookies[i].substring(1, cookies[i].length);
			var WidgetContent = {};
			WidgetContent.title = cookie.substring(cookie.indexOf(":")+1, cookie.indexOf(","));
			cookie = cookie.substring(cookie.indexOf(","), cookie.length);
			WidgetContent.content = cookie.substring(cookie.indexOf(":")+1, cookie.length);
			var w = new Widget(WidgetContent);
			widgets.push(w);
			var column = "column" + ((i%3)+1);
			document.getElementById(column).appendChild(w.widget);
		}
		wm.showButtons();
	},

	createCookie = function(index, WidgetContent) {
		var data = unescape(Cookies.readCookie("widgets"));
		var value = "{" + WidgetContent.toString() + "}";
		data = data + value;
		Cookies.createCookie("widgets", escape(data), 1);
		console.log("Cookies: " + document.cookie);
	};

window.onload = function() {
	wm = WidgetManager.getInstance();
	restoreWidgets();
	var addButton = document.getElementById("add_widget");
	registerEvent(addButton, "click", WidgetAgent.showWidgetDialog);
};

