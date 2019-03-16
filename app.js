$("#cat-button").on("click", function () {
    //alert("you clicked me")
    var queryURL = "https://api-watson.herokuapp.com/api/watson/"
    // var data = {
    //         "url": "nytimes.com",
    //         "features": {
    //             "entities": {
    //                 "emotion": "true",
    //                 "sentiment": "true"
    //                 },
    //             "keywords": {
    //                 "emotion": "true",
    //                 "sentiment": "true"
    //             }
    //         }
    //       }
    var data = {
        "url": "https://www.nytimes.com/2019/03/16/world/africa/tunisia-health-care-babies-infections.html",
        "features": {
            "emotion": {
                "document": [true
                ]
            }
        }
    }
    $.ajax(queryURL, {
        type: "POST", data: data

    }).done(function (data) {
        console.log(data)
    })
});