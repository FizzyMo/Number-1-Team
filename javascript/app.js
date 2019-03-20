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

    //console.log("add article clicked");
    event.preventDefault;
    var url = "https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=496e966f5c324e3080abd07b9111c5c3"
     
    $.ajax({
      url: url,
      method: "GET"
    })


      .then(function (response) {
        //console.log(response)
        for (var i = 0; i <= response.articles.length; i++) {
          var url = response.articles[i].url;
          var description = response.articles[i].description;
          var content = response.articles[i]["content"];
          displayData(response.articles[i].url, response.articles[i]["content"])
        }
      })

  });

});

function displayData(url, content){
          var queryURL = "https://api-watson.herokuapp.com/api/watson/"         
          
          $.ajax(queryURL,
            {
              type: "POST",
              data: {
                        "url": url,
                        "features": {
                              "emotion": {
                              "document": [true]
                              }
                        }
              }
            }).done(function (response) {
            var tone = (Object.keys(response.emotion.document.emotion).reduce(function (a, b) { return response.emotion.document.emotion[a] > response.emotion.document.emotion[b] ? a : b }));
            var row = $("<tr>");
            var cols = '<td id="link"><a style="text-decoration: none" href="' + url + '" target = "_blank" > ' + content + '</a></td>' +
                       '<td id="tone">' + tone + '</td>';

              row.append(cols);
              $("#info tbody").append(row)
            })
}