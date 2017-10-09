function light() {
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "* { background: rgba(255,255,255, 0.6)!important; color: rgba(0,0,0, 0.8)!important;}";
	document.getElementsByTagName("head")[0].appendChild(css);
}
light();
