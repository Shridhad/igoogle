
var wm = WidgetManager.getInstance();
window.onload = function() {
	var addButton = document.getElementById("add_widget");
	registerEvent(addButton, "click", function() {
		WidgetAgent.showWidgetDialog();
	});
};
