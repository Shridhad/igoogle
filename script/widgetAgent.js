var widgets = [];
var WidgetAgent = (function() {

	var createButton = null,
		cancelButton = null,
		overlayDialog = null,
		WAdialog = null,
		column = null,

		WidgetContent = { 
			toString : function() {
				return "title:" + this.title + ",content:" + this.content;
			}
		},

		AJAX = (function(){
			var getData =function(url) {
				var xmlHttp = getXMLHttpRequestObject();
				xmlHttp.open("GET", url, false);
				xmlHttp.send(null);
				return xmlHttp.responseText;
			};
			return {
				getTitle : function() {
					return getData("data/title.txt");
				},
				getContent : function() {
					return getData("data/content.txt");
				}
			};
		})();

	closeWA = function() {
		WAdialog.style.display = "none";
		overlayDialog.style.display = "none";
	},

	getWidgetData = function() {
		WidgetContent.title = document.getElementById("widget_title").value || AJAX.getTitle();
		WidgetContent.content = document.getElementById("widget_body").value || AJAX.getContent();
		var select = document.getElementById("column");
		column = select.options[select.selectedIndex].value;
	},

	addEvents = function(){
		registerEvent(createButton, "click", function() {
			addWidget();
			closeWA();
		});

		registerEvent(cancelButton, "click", function() {
			closeWA();
		});
	},

	addWidget = function() {
		getWidgetData();
		var w = new Widget(WidgetContent);
		widgets.push(w);
		document.getElementById(column).appendChild(w.widget);
		wm.showButtons();
		createCookie(WidgetContent);
	},

	prepare = function() {
		overlayDialog = document.getElementById("overlay");
		WAdialog = document.getElementById("widget_dialog");
		createButton = document.getElementById("create_widget");
		cancelButton = document.getElementById("cancel");
		addEvents();
	}();

	return {
		showWidgetDialog : function() {
			overlayDialog.style.display = "block";
			WAdialog.style.display = "block";
		}
	};
})();
