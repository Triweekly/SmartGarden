const urlBase = 'http://www.smartgarden34.com';
const extension = 'php';

function loadReadings()
{
    console.log("getting sensor readings...");

let url = urlbase + "/loadReadings." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "applciation/json; charset=UTF-8");
    try
    {
        console.log(xhr.responseText);
        let jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);
        //in future, assign these to places on a table
    }
    catch(err)
    {
        console.log(err);
    }
}