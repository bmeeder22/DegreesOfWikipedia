var renderResults = function(listNode, titles, urls) {
    for(var i = 0; i<titles.length; i++) {
        var listItem = document.createElement('li');
        var link = document.createElement('a');

        listItem.style = "list-style: none;margin: 1em 0;padding: 0;";

        listItem.appendChild(link);
        link.innerHTML=titles[i];
        link.href = 'result.html?title=' + titles[i];

        listNode.appendChild(listItem);
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

            var results = data[1];
            var links = data[3];

            var resultsDomNode = document.getElementById('searchresults');

            clearList(resultsDomNode);

            var listNode = document.createElement('ul');
            resultsDomNode.appendChild(listNode);

            renderResults(listNode, results, links);
        }
	});
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
