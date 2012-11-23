var Widget = function(WidgetContent){

	this.widget = null;
	this.WidgetContent = WidgetContent;

	var	$widgetBox =  null,
		$widgetTitleBox =  null,
		$widgetBody =  null,
		$minimizeButton = null,
		$closeButton = null,
		me = this,

		createElement = function(tag, className) {
			var $element = $(document.createElement(tag));
			$element.addClass(className);
			return $element;
		},
		
		createWidgetSettingList = function() {
			var $list = createElement("ul", "widget-setting-list");
			$list.html('<li>Edit Setting</li><li>Delete this widget</li><li>Share this widget</li><li>About this wdget</li><li>You might also like</li>');
			return $list;
		},

		createWidgetTitleIcons = function() {
			var $icons = createElement("ul", "icons");
			var $widgetSettings = createElement("li", "widget-settings");
			$widgetSettings.html('<a></a>');
			$widgetSettings.append(createWidgetSettingList());
			$minimizeButton = createElement("li", "minimize");
			$closeButton = createElement("li", "close");
			$icons.append($widgetSettings);
			$icons.append($minimizeButton);
			$icons.append($closeButton);

			return $icons;
		},

		createWidgetTitle = function(widget_title) {
			var $logo = createElement("div", "logo");
			
			var $title = createElement("h4");
			$title.html(widget_title);

			$widgetTitleBox = createElement("div", "widget-title clearfix");
			$widgetTitleBox.append($logo);
			$widgetTitleBox.append($title);
			$widgetTitleBox.append(createWidgetTitleIcons());
		},

		createWidgetBody = function(widget_body) {
			$widgetBody = createElement("div", "widget-content");
			$widgetBody.html(widget_body);
		},

		createWidgetBox = function(WidgetContent) {
			$widgetBox = createElement("div", "widget-box");
			createWidgetTitle(WidgetContent.title);
			createWidgetBody(WidgetContent.content);
			$widgetBox.append($widgetTitleBox);
			$widgetBox.append($widgetBody);
			return $widgetBox;
		},

		addEvents = function() {
			var minMaxWidget = function(){
				if($minimizeButton.attr('class') === "minimize") {
					me.minimize();
				}
				else {
					me.maximize();	
				}
			};
			$minimizeButton.click(minMaxWidget);
			$closeButton.click(me.removeWidget);
		};

	this.createWidget = function() {
		this.widget = createElement("div", "widget-shadow");
		this.widget.append(createWidgetBox(WidgetContent));
		addEvents();
	};

	this.minimize = function() {
		$widgetBody.hide();
		$minimizeButton.removeClass().addClass('maximize');	
	};

	this.maximize = function() {
		$widgetBody.show();
		$minimizeButton.removeClass().addClass('minimize');
	};

	this.removeWidget = function() {
		me.widget.remove();
		for(i=0, len=widgets.length; i<len; i++){
			if(widgets[i] === me){
				widgets.splice(i,1);
				break;
			}
		}
		deleteCookie();
	};

	this.WidgetContent.toString = function() {
		return "title:" + this.title + ",content:" + this.content;
	};
	this.createWidget();
};


