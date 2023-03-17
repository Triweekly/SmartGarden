const urlBase = 'http://www.smartgarden34.com/SmartGarden/LAMPAPI/';
const extension = 'php';

function loadReadings()
{
    console.log("Trying to get sensor readings...");

let url = urlBase + "loadReadings." + extension;
console.log(url);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);    //FIXME trying Get instead of POST
    
    xhr.setRequestHeader("Content-type", "applciation/json; charset=UTF-8");    //disabling prevents errors, but doesn't make content received.
    
    xhr.send();
    try
    {
        console.log(xhr.response);  //responseText?
        console.log("logged response text (might be an empty line), now will try to parse:");
        // let jsonObject = JSON.parse(xhr.responseText);
        // console.log("Next print SHOULD be the returned object from http://www.smartgarden34.com/SmartGarden/LAMPAPI/loadReadings.php");
        // console.log(jsonObject);
        //in future, assign these to places on a table
    }
    catch(err)
    {
        console.log("Error encountered:");
        console.log(err);
    }
}

