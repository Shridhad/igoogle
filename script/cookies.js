var Cookies = (function() {
	return {
		createCookie : function(name, value, days, path) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else {
				var expires = ";"
			}
			path = path || '/';
			console.log(name);
			document.cookie = name + "=" + value + expires + "; path=" + path;
		},

		readCookie : function(name) {
			name = name + "=";
			var cookies = document.cookie.split(";");
			for(i=0, len=cookies.length; i<len; i++) {
				var cookie = cookies[i];
				while(cookie.charAt(0) == " "){ 
					cookie = cookie.substring(1, cookie.length);
				}
				if(cookie.indexOf(name) == 0) {
					return cookie.substring(name.length, cookie.length);
				}
			}
			return "";
		},

		deleteCookie : function(name) {
			this.createCookie(name,"",-1);
		}

	};	
})();