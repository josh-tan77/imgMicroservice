var express = require('express');
var app = express();
app.use(express.json());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


// get request to index page
app.get('/:keyword', async (req, res) => {

    console.log(req.params);
    var keyword = req.params.keyword;

    var source_url = "https://en.wikipedia.org/w/api.php"; 
    var titles = [];
    var data = {};

    var params = {
        action: "query",
        prop: "pageimages", 
        titles: keyword,
        format: "json",
        imlimit: 500
    };
    
    url = source_url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    // First, get a list of all iamge titles on the page
    
    await fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.pages;
            console.log(pages);
            
            for (var page in pages) {
                console.log("test")
                console.log(pages[page].thumbnail);
                for (var img of pages[page].images) {
                    console.log(img.title);
                    var title = img.title;
                    titles.push(title);

                }
            }
        })
        .catch(function(error){console.log(error);});
    console.log(titles);

    // Then, get the url for each image by title
    for (let i = 0; i < titles.length; i++) {
        console.log(titles[i]);
        var params2 = {
            action: "query",
            prop: "imageinfo", 
            titles: titles[i],
            format: "json",
            iiprop: "url"
        };


        url2 = source_url + "?origin=*";
        Object.keys(params2).forEach(function(key){url2 += "&" + key + "=" + params2[key];});

        await fetch(url2)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.pages;
            for (var p in pages) {
                data[titles[i]] = pages[p].imageinfo[0].url;
            }
        })
        .catch(function(error){console.log(error);});
    }

    console.log(data);
    res.send(JSON.stringify(data));
})

/*
    LISTENER
*/
app.listen(port, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.')
});