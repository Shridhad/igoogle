var addListener = function(node, type, handler, flag) {
    if (typeof node.addEventListener === "function") {
        node.addEventListener(type, handler, flag);
        return;
    }
    node.attachEvent("on" + type, handler);
},

registerEvent = function(node, type, handler) {
    var wrappedHandler = function(event) {
		handler(event || window.event);   
    }
    addListener(node, type, wrappedHandler);
},

getXMLHttpRequestObject = function() {
	var ref = null;
	if(window.XMLHttpRequest) {
		ref = new XMLHttpRequest();
	}
	else if(window.ActiveXObject){
		ref = new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
	return ref;
};
