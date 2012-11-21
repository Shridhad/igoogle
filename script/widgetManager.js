var WidgetManager = (function() {
	var instance,
		min_max,
		close_all,

		addEvents = function() {
			min_max = document.getElementById("min_max"),
			close_all = document.getElementById("close_all");

			registerEvent(min_max, "click", minMaxAll);
			registerEvent(close_all, "click", instance.removeAll);
		},

		minMaxAll = function() {
			var className = min_max.attributes["class"].value;
				if(className == "minAll") {
					instance.minimizeAll();
				}
				else {
					instance.maximizeAll();	
				}
		}

	function init() {
		return {
			minimizeAll : function() {
				for (var i=0, len=widgets.length; i<len; i++) {
					widgets[i].minimize();
				};
				min_max.className = "maxAll";
				min_max.innerHTML = "^";
			},

			maximizeAll : function() {
				for (var i=0, len=widgets.length; i<len; i++) {
					widgets[i].maximize();
				};
				min_max.className = "minAll";
				min_max.innerHTML = "v";
			},

			hideButtons : function() {
				min_max.style.display = "none";
				close_all.style.display = "none";
			},

			showButtons : function() {
				min_max.style.display = "block";
				close_all.style.display = "block";
			},

			removeAll : function() {
				for (var i=widgets.length-1; i>=0; i--) {
					if(widgets[i].widget != null)
						widgets[i].removeWidget();
				}
				instance.hideButtons();
			}	
		}
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