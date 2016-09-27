var renderResults = function(list, titles, urls) {
    for(var i = 0; i<titles.length; i++) {
        var listItem = document.createElement('li');
        listItem.style = "list-style: none;margin: 1em 0;padding: 0;";
        var link = document.createElement('a');
        listItem.appendChild(link);
        link.innerHTML=titles[i];
        link.href = updateURL(urls[i]);
        list.appendChild(listItem);
    }
};

var updateURL = function(url) {
    url = url.replaceAll('https://', '');
    url = url.replaceAll('/','-');
    url = '/' + url;
    return url;
};

var clearList = function(resultsDomNode) {
    while (resultsDomNode.firstChild) {
        resultsDomNode.removeChild(resultsDomNode.firstChild);
    }
};

var getResults = function(value) {
	if(!value)
		return;

	var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+value+'&format=json&callback=spellcheck';

	$.ajax({
        url: url,
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            var resultsDomNode = document.getElementById('searchresults');

            clearList(resultsDomNode);

            var list = document.createElement('ul');
            resultsDomNode.appendChild(list);

            renderResults(list, data[1], data[3]);
        }
	});
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
