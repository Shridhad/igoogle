
var normalizeEvent = function(event) {
    if(!event.stopPropagation) {
        event.stopPropagation = function() { event.cancelBubble = true; };
    }
    if(!event.preventDefault) {
        event.preventDefault = function() { event.returnValue = false; };
    }
    if(!event.stop) {
        event.stop = function() {
            this.stopPropagation();
            this.preventDefault();
        };                    
    }
    return event;
};

var addListener = function(node, type, handler, flag) {
    if (typeof node.addEventListener == "function") {
        node.addEventListener(type, handler, flag);
        return;
    }
    node.attachEvent("on" + type, handler);
};

var registerEvent = function(node, type, handler, flag) {
    function wrappedHandler() {
        handler((event || window.event));   
    }
    addListener(node, type, wrappedHandler, flag);
};

var Widget = (function(){

	var column = 0,
		widgetBox =  null,
		widgetTitleBox =  null,
		widgetBody =  null,
		minimize =  null,
		close =  null;
	
	var WidgetContent = {
		title: "Widget Title",
		body: "Widget Body"
	};

	return {
		
		createWidgetSettingList : function() {
			var list = document.createElement("ul");
			list.setAttribute("class", "widget-setting-list");
			list.innerHTML = "<li>Edit Setting</li><li>Delete this widget</li><li>Share this widget</li><li>About this wdget</li><li>You might also like</li>";
			return list;
		},

		createWidgetTitleIcons : function() {
			var icons = document.createElement("ul");
			icons.setAttribute("class", "icons");

			var widgetSettings = document.createElement("li");
			widgetSettings.setAttribute("class", "widget-settings");
			widgetSettings.innerHTML = "<a></a>"
			widgetSettings.appendChild(this.createWidgetSettingList());
			var widgetSettingList = this.createWidgetSettingList();
			minimize = document.createElement("li");
			minimize.setAttribute("id", "minimize");
			minimize.setAttribute("class", "minimize");
			close = document.createElement("li");
			close.setAttribute("class", "close");
			icons.appendChild(widgetSettings);
			icons.appendChild(minimize);
			icons.appendChild(close);

			return icons;
		},

		createWidgetTitle : function(widget_title) {
			var logo = document.createElement("div");
			logo.setAttribute("class", "logo");

			var title = document.createElement("h4");
			title.innerHTML = widget_title;

			var icons = this.createWidgetTitleIcons();

			widgetTitleBox = document.createElement("div");
			widgetTitleBox.setAttribute("class","widget-title clearfix");
			widgetTitleBox.appendChild(logo);
			widgetTitleBox.appendChild(title);
			widgetTitleBox.appendChild(icons);
		},

		createWidgetBody : function(widget_body) {
			widgetBody = document.createElement("div");
			widgetBody.setAttribute("class", "widget-content");
			widgetBody.innerHTML = widget_body;
		},

		createWidgetBox : function(WidgetContent) {
			widgetBox = document.createElement("div");
			widgetBox.setAttribute("class", "widget-box");
			this.createWidgetTitle(WidgetContent.title);
			this.createWidgetBody(WidgetContent.body);
			widgetBox.appendChild(widgetTitleBox);
			widgetBox.appendChild(widgetBody);
			return widgetBox;
		},

		addEvents : function() {
			registerEvent(minimize, "click", function(){
				console.log(widgetBody);
				widgetBody.style.display = "none";
			}, false);
		},

		createWidget : function() {
			var widget = document.createElement("div");
			widget.setAttribute("class", "widget-shadow");
			widget.appendChild(this.createWidgetBox(WidgetContent));
			return widget;
		},

		addWidget : function() {
			var col = "column" + ((column++)%3+1);
			document.getElementById(col).appendChild(this.createWidget());
			this.addEvents();
		}
	};
})();

window.onload = function() {
	var addButton = document.getElementById("add_widget");
	registerEvent(addButton, "click", function(){
		Widget.addWidget();
	}, false);
}
