function nightly(){
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "* { background: rgba(0,0,0, 0.8)!important; color: rgba(255,255,255, 0.6)!important;}";
	document.getElementsByTagName("head")[0].appendChild(css);
}
nightly();
