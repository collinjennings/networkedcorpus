$(function () {
   $(document).mousemove(function (e) {
       pageX = e.pageX;
       pageY = e.pageY;
   }); 
});

function remove_tooltip()
{
    $("#tooltip").remove();
}

function create_tooltip(html, x, y)
{
    remove_tooltip();
    $("<div id='tooltip' class='tooltip' style='position: absolute; left: "
      + x + "px; top: " + y + "px'><div class='tooltipcontents'>"
      + html + "</div></div>")
	.appendTo("body");
    $("#tooltip").mouseup(function () {return false;});
    $(document).one("mouseup", remove_tooltip);
}

function popup_seealso(topic, exclude_doc)
{
    var html = [topic_names[topic], ":<hr />"];
    var ndocs = 10;
    if (docs_by_topic[topic].length < 3)
	ndocs = docs_by_topic[topic].length;
    for (var i = 0; i < ndocs; i++) {
	var doc = docs_by_topic[topic][i];
	if (doc == exclude_doc) {
	    ndocs++;
	    continue;
	}
	html.push("<a href='" + doc + ".html#topic" + topic + "'>");
	html.push(doc);
	html.push("</a>: ...");
	html.push(extracts[doc][topic]);
	html.push("...<br />");
    }
    create_tooltip(html.join(""), pageX, pageY);
}
