
function search(){
    const keyword = document.getElementById("keyword").value;
    //alert (keyword)
    console.log(goodreadsApiKey);
    //Get results from API using fetch
    const endpoint = 'https://www.goodreads.com/search/index.xml'
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
    //url+ start of passing in parameters+APIkey+& identifies another paramenter + q as the keyword
    const url = corsAnywhere + endpoint + "?" + "key=" + goodreadsApiKey + "&q=" + keyword
    
    fetch(url)
    //whatever fetch gets back is passed through the function with response as the Indep. Variable
    .then(function (response){
        console.log(response)
    })
    
    //display result as a list
    
}