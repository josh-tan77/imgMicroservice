var express = require('express');
var app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


// get request to index page
app.get('/:keyword', async (req, res) => {

    var keyword = req.params.keyword;

    // handle case conversion
    keyword = keyword.split('_')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join('_');

    var source_url = "https://en.wikipedia.org/w/api.php"; 
    var main_url;

    var params = {
        action: "query",
        prop: "pageimages", 
        titles: keyword,
        format: "json",
        pithumbsize: 250,
        pilicense: "any"
    };
    
    url = source_url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    // Query the main image using pageimages extension
    
    await fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.pages;
            console.log(pages);
            
            for (var page in pages) {
                main_url = pages[page].thumbnail.source;
            }
        })
        .catch(function(error){console.log(error);});

    res.send(main_url);
})

/*
    LISTENER
*/
app.listen(port, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.')
});