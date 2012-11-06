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
}

var registerEvent = function(node, type, handler, flag) {
    function wrappedHandler() {
        handler(normalizeEvent(event || window.event));   
    }
    addListener(node, type, wrappedHandler, flag);
};

var WidgetContent = {
	title: "Widget Title",
	body: "Widget Body"
}

var createWidgetTitleIcons = function() {
	var icons = document.createElement("ul");
	icons.setAttribute("class", "icons");

	var widgetSettings = document.createElement("li");
	widgetSettings.setAttribute("class", "widget-settings");
	widgetSettings.innerHTML = "<a></a>"
	var minimize = document.createElement("li");
	minimize.innerHTML = "<a class='minimize'></a>";
	var close = document.createElement("li");
	close.innerHTML = "<a class='close'></a>";

	icons.appendChild(widgetSettings);
	icons.appendChild(minimize);
	icons.appendChild(close);


	//icons.appendChild("<li><a class='minimize'></a></li>");
	//icons.appendChild("<li><a class='close'></a></li>");

	return icons;
};

var createWidgetTitle = function(widget_title) {
	var logo = document.createElement("div");
	logo.setAttribute("class", "logo");

	var title = document.createElement("h4");
	title.innerHTML = widget_title;

	var icons = createWidgetTitleIcons();

	var title_box = document.createElement("div");
	title_box.setAttribute("class","widget-title clearfix");
	title_box.appendChild(logo);
	title_box.appendChild(title);
	title_box.appendChild(icons);

	return title_box;
};

var createWidgetBody = function(widget_body) {
	var content = document.createElement("div");
	content.setAttribute("class", "widget-content");
	content.innerHTML = widget_body;

	return content;
};

var createWidgetBox = function(WidgetContent) {
	var widgetBox = document.createElement("div");
	widgetBox.setAttribute("class", "widget-box");
	var widget_title = createWidgetTitle(WidgetContent.title);
	var widget_body = createWidgetBody(WidgetContent.body);
	widgetBox.appendChild(widget_title);
	widgetBox.appendChild(widget_body);
	return widgetBox;
};

var createWidget = function() {
	var widget = document.createElement("div");
	widget.setAttribute("class", "widget-shadow");
	widget.appendChild(createWidgetBox(WidgetContent));
	console.log(widget);

	return widget;
};

var addWidget = function() {
	var widget = createWidget();
	var column = document.getElementById("column1");
	console.log(column);
	column.appendChild(widget);
};

window.onload = function() {
	var addButton = document.getElementById("add_widget");
	registerEvent(addButton, "click", addWidget, false);
}
