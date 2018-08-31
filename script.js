
function search(){
    const keyword = document.getElementById("keyword").value;
    //alert (keyword)
    //console.log(goodreadsApiKey);
    //Get results from API using fetch
    const endpoint = 'https://www.goodreads.com/search/index.xml'
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
    //url+ start of passing in parameters+APIkey+& identifies another paramenter + q as the keyword
    const url = corsAnywhere + endpoint + "?" + "key=" + goodreadsApiKey + "&q=" + keyword
    
    fetch(url)
    //whatever fetch gets back is passed through the function with response as the Indep. Variable
    .then(function (response){
        console.log(response)
        return response.text();
    })//if you do not return anything from the first then, you will get undefined for the second
    
    .then(function(response){
        const parser = new DOMParser();//using constructor to create a new object 
        const parsedRes = parser.parseFromString(response, "text/xml") //using a parser to pass through the response to get intended output
        const parsedJson = xmlToJson(parsedRes);//turning object from xml to JSON
        //console.log(parsedJson)
        displayResults(parsedJson)
    })
    //display result as a list
    function displayResults(responseObj){
        //console.log("Calling inside display results",responseObj)
        const works = responseObj.GoodreadsResponse.search.results.work;
        
        document.getElementById("results").innerHTML=""
        
        works.forEach(function(work){
            //console.log(work)
            const author =work.best_book.author.name["#text"]
            const title= work.best_book.title["#text"]
            const imgUrl = work.best_book.image_url["#text"]
            console.log(title, author, imgUrl);
            
            const myListitem = document.createElement("li")
            myListitem.innerHTML = title + "by" + author;
            document.getElementById("results").appendChild(myListitem)
            
            const image = document.createElement("img")
            image.setAttribute("src", imgUrl)
            myListitem.appendChild(image)
        })
    }
}

//parsedJson is not defined outside of the function
// Changes XML to JSON
//Source:https://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};