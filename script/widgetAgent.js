var widgets = [];
var WidgetAgent = (function() {

	var $createButton = null,
		$cancelButton = null,
		$overlayDialog = null,
		$WAdialog = null,
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
		$WAdialog.hide();
		$overlayDialog.hide();
	},

	getWidgetData = function() {
		WidgetContent.title = $('#widget_title').val() || AJAX.getTitle();
		WidgetContent.content = $('#widget_body').val() || AJAX.getContent();
		column = $('#column option:selected').attr('value');
	},

	addEvents = function(){
		$createButton.click(function() {
			addWidget();
			closeWA();
		});
		$cancelButton.click(function() {
			closeWA();
		});
	},

	addWidget = function() {
		getWidgetData();
		var w = new Widget(WidgetContent);
		widgets.push(w);
		$('#'+column).append(w.widget);
		wm.showButtons();
		createCookie(WidgetContent);
	},

	prepare = function() {
		var getElement = function(id) {
			return $($('#'+id).get(0)); 
		};
		$overlayDialog = getElement('overlay');
		$WAdialog = getElement('widget_dialog')
		$createButton = getElement('create_widget');
		$cancelButton = getElement('cancel');
		addEvents();
	}();

	return {
		showWidgetDialog : function() {
			$overlayDialog.show();
			$WAdialog.show();
		}
	};
})();
