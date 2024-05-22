# Instructions for Implementing Image Microservice (CS3561)
This Microservice uses HTTP to receive a title of a Wikipedia article and return the url to the main thumbnail image.

Article Titles must be entered exactly (e.g. 'Golden State Warriors" and not "warriors")

Example implementation below is in Node.js/Expresss.

## Setup
1. Install axios dependency:
   ```
   npm install axios
   ```
2. In app.js of main app, write:
   ```
   const axios = require('axios');
   ```
3. In HTML file of any page that will call this microservice, write:
   ```
   <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
   ```


## Example Request
The Querying Program should include a call to the base URL + the title of the Wikipedia article as a query parameter, with words separated by underscores.

The base URL is:
```https://img-microservice-a1ed942a20eb.herokuapp.com/```

So, a desired query to the "Golden State Warriors" Wikipedia page would append:
```Golden_State_Warriors```

and the final queryable URL would be:
```
https://img-microservice-a1ed942a20eb.herokuapp.com/Golden_State_Warriors
```

Example Call Below Querying "Golden State Warriors"

```
   // Initialize Search Parameters
    var params = {
        action: "query",
        prop: "pageimages", 
        titles: keyword,
        format: "json",
        pithumbsize: 250,
        pilicense: "any"
    };

    var main_url;
    var source_url = "https://en.wikipedia.org/w/api.php";
    url = source_url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    // Query the main image using MediaWikiAPI and pageimages extension
    
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

```


## Example Response
The Microservice Program will parse the Wikipedia article title from the request body, query the MediaWiki API, and send back a string containing the url of the primary image.

For example, the request containing the term "Golden State Warriors" will return the url to the image boxed in red below. 
![image](https://github.com/josh-tan77/imgMicroservice/assets/149540190/f1590ac2-0ee5-44ca-8d03-8c9e9d277b96)

Example Response from Query to "Golden State Warriors"

```

```

## UML Sequence Diagram
