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
        console.log(response);
        for (var i = 0; i <= response.articles.length; i++) {
          var url = response.articles[i].url;
          var description = response.articles[i].description;
          var content = response.articles[i]["content"];
          var publishedAt = response.articles[i].publishedAt;
          displayData(url, content, description, publishedAt )
        }
      })
 
  });
 
 });
 
 function displayData(url, content, description,publishedAt){
          
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
                  
                  //console.log(moment(publishedAt).fromNow());
                  var tone = (Object.keys(response.emotion.document.emotion).reduce(function (a, b) { return response.emotion.document.emotion[a] > response.emotion.document.emotion[b] ? a : b }));
                  tone = tone[0].toUpperCase() + tone.substring(1,tone.length)
                  var divCard = $("<div>");
                  divCard.addClass("card m-2")
                  divCard.attr("width","18rem" )

                  var divCardHeader = $("<div>");
                  divCardHeader.addClass("card-header text-right ");
                  divCardHeader.html("<a class='float-left' href=" + url + " target='_blank'><i class='far fa-newspaper'></i>View Article</a><strong>"+tone+"</strong>");
                  divCard.append(divCardHeader);

                  var divCardBody = $("<div>");
                  divCardBody.addClass("card-body font-weight-light");
                  
                  var cardDescripton  = $("<p>");
                  cardDescripton.html(description);

                  var cardContent = $("<p>");
                  cardContent.html(content);

                  var cardFooter = $("<div>");
                  cardFooter.addClass("card-footer text-muted");
                  cardFooter.html(moment(publishedAt).fromNow())

                  divCardBody.append(cardDescripton);
                  divCardBody.append(cardContent);
                  //divCardBody.append(articleLink);
                  divCard.append(divCardBody);
                  divCard.append(cardFooter)
                  $(".cardContainer").append(divCard);
            })
 }