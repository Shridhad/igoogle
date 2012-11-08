var addListener = function(node, type, handler, flag) {
    if (typeof node.addEventListener == "function") {
        node.addEventListener(type, handler, flag);
        return;
    }
    node.attachEvent("on" + type, handler);
};

var registerEvent = function(node, type, handler, flag) {
    var wrappedHandler = function(event) {
		handler(event || window.event);   
    }
    addListener(node, type, wrappedHandler, flag);
};

var column = 0;

var Widget = (function(WidgetContent){

	this.widget = null;
	var	widgetBox =  null,
		widgetTitleBox =  null,
		widgetBody =  null,
		minimizeButton = null,
		closeButton = null,
	
		createElement = function(tag, className) {
			var element = document.createElement(tag);
			element.className = className;
			return element;
		},
		
		createWidgetSettingList = function() {
			var list = createElement("ul", "widget-setting-list");
			list.innerHTML = "<li>Edit Setting</li><li>Delete this widget</li><li>Share this widget</li><li>About this wdget</li><li>You might also like</li>";
			return list;
		},

		createWidgetTitleIcons = function() {
			var icons = createElement("ul", "icons");
			var widgetSettings = createElement("li", "widget-settings");
			widgetSettings.innerHTML = "<a></a>"
			widgetSettings.appendChild(createWidgetSettingList());
			minimizeButton = createElement("li", "minimize");
			closeButton = createElement("li", "close");
			icons.appendChild(widgetSettings);
			icons.appendChild(minimizeButton);
			icons.appendChild(closeButton);

			return icons;
		},

		createWidgetTitle = function(widget_title) {
			var logo = createElement("div", "logo");
			
			var title = document.createElement("h4");
			title.innerHTML = widget_title;

			widgetTitleBox = createElement("div", "widget-title clearfix");
			widgetTitleBox.appendChild(logo);
			widgetTitleBox.appendChild(title);
			widgetTitleBox.appendChild(createWidgetTitleIcons());
		},

		createWidgetBody = function(widget_body) {
			widgetBody = createElement("div", "widget-content");
			widgetBody.innerHTML = widget_body;
		},

		createWidgetBox = function(WidgetContent) {
			widgetBox = createElement("div", "widget-box");
			createWidgetTitle(WidgetContent.title);
			createWidgetBody(WidgetContent.content);
			widgetBox.appendChild(widgetTitleBox);
			widgetBox.appendChild(widgetBody);
			return widgetBox;
		};

		this.addEvents = function() {
			var me = this;
			registerEvent(minimizeButton, "click", function(){
				var className = minimizeButton.attributes["class"].value;
				if(className == "minimize") {
					me.minimize();
				}
				else {
					me.maximize();	
				}
			}, false);
			registerEvent(closeButton, "click", function(){
				me.close();
			}, false);
		};

		this.createWidget = function() {
			this.widget = createElement("div", "widget-shadow");
			this.widget.appendChild(createWidgetBox(WidgetContent));
			this.addEvents();
		};

		this.minimize = function() {
			widgetBody.style.display = "none";
			minimizeButton.className = "maximize";	
		};

		this.maximize = function() {
			widgetBody.style.display = "block";
			minimizeButton.className = "minimize";
		};

		this.close = function() {
			this.widget.parentNode.removeChild(this.widget);
		};

		this.createWidget();
});

var WidgetAgent = (function() {

	var createButton = null,
		cancelButton = null,
		overlay = null,
		dialog = null,
		column = null,

		WidgetContent = { };

	close = function() {
		dialog.style.display = "none";
		overlay.style.display = "none";
	},

	getWidgetData = function() {
		WidgetContent.title = document.getElementById("widget-title").value;
		WidgetContent.content = document.getElementById("widget-body").value;
		var select = document.getElementById("column");
		column = select.options[select.selectedIndex].value;
	},

	addEvents = function(){
		registerEvent(createButton, "click", function() {
			console.log("Created");
			addWidget();
			close();
		}, false);

		registerEvent(cancelButton, "click", function() {
			console.log("Cancel");
			close();
		}, false);
	},

	prepare = function() {
		overlay = document.getElementById("overlay");
		dialog = document.getElementById("widget-dialog");
		createButton = document.getElementById("create_widget");
		cancelButton = document.getElementById("cancel");
		addEvents();
	},

	addWidget = function() {
		getWidgetData();
		var w = new Widget(WidgetContent);
		document.getElementById(column).appendChild(w.widget);
	};

	this.showWidgetDialog = function() {
		overlay.style.display = "block";
		dialog.style.display = "block";
	}

	prepare();
});



window.onload = function() {
	var wa = new WidgetAgent();
	var addButton = document.getElementById("add_widget");
	registerEvent(addButton, "click", function() {
		console.log("Add Button");
		wa.showWidgetDialog();
	}, false);
};