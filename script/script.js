
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
    var wrappedHandler = function(event) {
		handler(normalizeEvent(event || window.event));   
    }
    addListener(node, type, wrappedHandler, flag);
};

var column = 0;

var Widget = (function(){

	var	widget = null,
		widgetBox =  null,
		widgetTitleBox =  null,
		widgetBody =  null,
		minimize = null,
		close = null,
		
		WidgetContent = {
			title: "Widget Title",
			body: "Widget Body"
		},
	
		createElement = function(tag, className) {
			var element = document.createElement(tag);
			element.className = className;
			return element;
		};

	return {
		
		createWidgetSettingList : function() {
			var list = createElement("ul", "widget-setting-list");
			list.innerHTML = "<li>Edit Setting</li><li>Delete this widget</li><li>Share this widget</li><li>About this wdget</li><li>You might also like</li>";
			return list;
		},

		createWidgetTitleIcons : function() {
			var icons = createElement("ul", "icons");
			var widgetSettings = createElement("li", "widget-settings");
			widgetSettings.innerHTML = "<a></a>"
			widgetSettings.appendChild(this.createWidgetSettingList());
			minimize = createElement("li", "minimize");
			close = createElement("li", "close");
			icons.appendChild(widgetSettings);
			icons.appendChild(minimize);
			icons.appendChild(close);

			return icons;
		},

		createWidgetTitle : function(widget_title) {
			var logo = createElement("div", "logo");
			
			var title = document.createElement("h4");
			title.innerHTML = widget_title;

			widgetTitleBox = createElement("div", "widget-title clearfix");
			widgetTitleBox.appendChild(logo);
			widgetTitleBox.appendChild(title);
			widgetTitleBox.appendChild(this.createWidgetTitleIcons());
		},

		createWidgetBody : function(widget_body) {
			widgetBody = createElement("div", "widget-content");
			widgetBody.innerHTML = widget_body;
		},

		createWidgetBox : function(WidgetContent) {
			widgetBox = createElement("div", "widget-box");
			this.createWidgetTitle(WidgetContent.title);
			this.createWidgetBody(WidgetContent.body);
			widgetBox.appendChild(widgetTitleBox);
			widgetBox.appendChild(widgetBody);
			return widgetBox;
		},

		addEvents : function() {
			registerEvent(minimize, "click", function(){
				var className = minimize.attributes["class"].value;
				if(className == "minimize") {
					widgetBody.style.display = "none";
					minimize.className = "maximize";
				}
				else {
					widgetBody.style.display = "block";
					minimize.className = "minimize";
				}
			}, false);
			registerEvent(close, "click", function(){
				widget.parentNode.removeChild(widget);
			}, false);
		},

		createWidget : function() {
			widget = createElement("div", "widget-shadow");
			widget.appendChild(this.createWidgetBox(WidgetContent));
			return widget;
		},

		addWidget : function() {
			var col = "column" + ((column++)%3+1);
			document.getElementById(col).appendChild(this.createWidget());
			this.addEvents();
		}
	};
});

window.onload = function() {
	var addButton = document.getElementById("add_widget");
	registerEvent(addButton, "click", function(){
		var w = new Widget();
		w.addWidget();
		//Widget.addWidget();
	}, false);
}
