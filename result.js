/**
 * Created by benjaminmeeder on 11/22/16.
 */
$( document ).ready(function() {
    main();
});

function main() {
    var title = getParameterByName('title');

    $('#head').text('Path from ' + title + ' to Hitler');

    $.ajax({
        url: 'neo4jConnect.php',
        data: {title:title},
        success: function (data) {
            var input = JSON.parse(data);
            console.log(input);

            var pathCards = [];
            for(var i = input.length-1; i>-1; i--) {
                var nodeTitle = input[i];
                pathCards.push(new PathCard(nodeTitle));
            }
        }
    });
}

function getParameterByName(name) {
    var url = document.location;
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class PathCard {
    constructor(title) {
        this.title = title;
        this.url = this.getURLByArticleName();
        this.render();
    }

    getURLByArticleName() {
        //this.title ajax REST api query to WIKIPEDIA
        return 'https://en.wikipedia.org/wiki/' + this.title;
    }

    render() {
        var card = '<section id="intro" class="main"> <h2>' + this.title + '</h2> <ul class="actions"> <li><a target="_blank" href="' + this.url + '" class="button big">Link to Article</a></li></ul> </section>';
        if(this.title != "Adolf Hitler") {
            card += '<div style="text-align: center;" class="icon fa-link fa-3x"></div>';
        }
        var cardNode = $.parseHTML(card);
        $('#cta').after(cardNode);
    }
}