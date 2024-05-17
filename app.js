var express = require('express');
var app = express();
app.use(express.json());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}



// get request to index page
app.get('/', (req, res) => {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        prop: "images",
        titles: "Albert Einstein",
        format: "json"
    };
    
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    
    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.pages;
            for (var page in pages) {
                for (var img of pages[page].images) {
                    console.log(img.title);
                }
            }
        })
        .catch(function(error){console.log(error);});
})

// check if it contains search term

// if yes send response


// otherwise send nothing