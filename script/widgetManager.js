var WidgetManager = (function() {
	var instance,
		$min_max,
		$close_all,

	addEvents = function() {
		$min_max = $($('#min_max').get(0));
		$close_all = $($('#close_all').get(0));

		$min_max.click(minMaxAll);
		$close_all.click(instance.removeAll);
	},

	minMaxAll = function() {
		if($min_max.attr('class') === "minAll") {
			instance.minimizeAll();
		}
		else {
			instance.maximizeAll();	
		}
	},

	init = function() {
		return {
			minimizeAll : function() {
				for (var i=0, len=widgets.length; i<len; i++) {
					widgets[i].minimize();
				};
				$min_max.removeClass().addClass('maxAll');
				$min_max.text('^');
			},

			maximizeAll : function() {
				for (var i=0, len=widgets.length; i<len; i++) {
					widgets[i].maximize();
				};
				$min_max.removeClass().addClass('minAll');
				$min_max.text('v');
			},

			hideButtons : function() {
				$min_max.hide();
				$close_all.hide();
			},

			showButtons : function() {
				$min_max.css('display', 'block');
				$close_all.css('display', 'block');
			},

			removeAll : function() {
				for (var i=widgets.length-1; i>=0; i--) {
					if(widgets[i].widget != null)
						widgets[i].removeWidget();
				}
				instance.hideButtons();
			}	
		};
	};

	return {
		getInstance : function() {
			if(!instance) {
				instance = init();
				addEvents();
			}
			return instance;
		}
	};
	
})();