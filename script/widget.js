var Widget = function(WidgetContent){

	this.widget = null;

	var	widgetBox =  null,
		widgetTitleBox =  null,
		widgetBody =  null,
		minimizeButton = null,
		closeButton = null,
		me = this,

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
		},

		addEvents = function() {
			var minMaxWidget = function(){
				var className = minimizeButton.attributes["class"].value;
				if(className == "minimize") {
					me.minimize();
				}
				else {
					me.maximize();	
				}
			};

			registerEvent(minimizeButton, "click", minMaxWidget);
			registerEvent(closeButton, "click", me.removeWidget);
		};

	this.createWidget = function() {
		this.widget = createElement("div", "widget-shadow");
		this.widget.appendChild(createWidgetBox(WidgetContent));
		addEvents();
	};

	this.minimize = function() {
		widgetBody.style.display = "none";
		minimizeButton.className = "maximize";	
	};

	this.maximize = function() {
		widgetBody.style.display = "block";
		minimizeButton.className = "minimize";
	};

	this.removeWidget = function() {
		me.widget.parentNode.removeChild(me.widget);
		me.widget = null;
	};
	this.createWidget();
};


