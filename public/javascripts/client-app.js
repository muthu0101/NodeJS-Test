var main = function () {
    $.getJSON("/counts.json", function (response) {
        $("body").append("<p>Google:"+response.awesome+"</p>");
    });
};

$(document).ready(main);