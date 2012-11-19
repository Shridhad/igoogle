var addListener = function(node, type, handler, flag) {
    if (typeof node.addEventListener == "function") {
        node.addEventListener(type, handler, flag);
        return;
    }
    node.attachEvent("on" + type, handler);
};

var registerEvent = function(node, type, handler) {
    var wrappedHandler = function(event) {
		handler(event || window.event);   
    }
    addListener(node, type, wrappedHandler);
};
