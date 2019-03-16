var config = {
  apiKey: "AIzaSyCofRVed4C8xXIJYm9s4p_qTNFUu8UR1PA",
  authDomain: "number-1-team.firebaseapp.com",
  databaseURL: "https://number-1-team.firebaseio.com",
  projectId: "number-1-team",
  storageBucket: "",
  messagingSenderId: "1024556041499"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
  //console.log(config);
  $('#add-article').on('click', function (event) {

    console.log("add article clicked'")

    event.preventDefault;

    // var linkName = $("#link").val().trim();

    // var sourceName = $("#source").val().trim();

    // var toneName = $("#tone").val().trim();

    // var articleName = $("#article").val().trim();

    // database.ref().push({

    //   url: "https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=496e966f5c324e3080abd07b9111c5c3"

    // })

    var url = "https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=496e966f5c324e3080abd07b9111c5c3"

    // var req = new Request(url);

    // fetch(req)

    //   .then(function (response) {
    //   })

    var queryURL = "https://api-watson.herokuapp.com/api/watson/"
     
    $.ajax({

      url: url,

      method: "GET"
    })

      .then(function (response) {

        console.log(response)

        // var newsDiv = $("<div class=''>");

        // var description = response.articles[0].description;

        // var content = $("<p>").text("description" + description);
        // var url = response.articles[0].url;
        // newsDiv.append(content);

        for (var i = 0; i <= response.articles.length; i++) {

          var url = response.articles[i].url;
          var description = response.articles[i].description;

          var data = {
            "url": url,
            "features": {
              "emotion": {
                "document": [
                  true
                ]
              }
            }
          }
    
          $.ajax(queryURL,
            {
              type: "POST",
              data: data
            }).done(function (data) {
              console.log(data);
              var tone =  (Object.keys(data.emotion.document.emotion).reduce(function (a, b) { return data.emotion.document.emotion[a] > data.emotion.document.emotion[b] ? a : b }));
        
          var row = $("<tr>");
          var cols = '<td id="source">' + description + '</td>' +
            '<td id="link">' + "<a href=" + url + ">" + url+ "</a>" + '</td>' +
            '<td id="tone">' + tone + '</td>';

          row.append(cols);
          $("#info tbody").append(row)
            })
        }


      })

  });

});
