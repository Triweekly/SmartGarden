const urlBase = 'http://www.smartgarden34.com/SmartGarden/LAMPAPI/';
const extension = 'php';

let currentName;
let currentMoisture;
let currentUV;
let currentHumidity;
let currentTemperature;

function loadReadings()
{
    console.log("Trying to get sensor readings...");

let url = urlBase + "loadReadings." + extension;
console.log(url);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);    //FIXME trying Get instead of POST
    
    // xhr.setRequestHeader("Content-type", "applciation/json; charset=UTF-8");    //disabling prevents errors, but doesn't make content received.
    
    xhr.send();
    try
    {
        console.log(xhr.response);  //responseText?
        console.log("logged response text (might be an empty line), now will try to parse:");
        parseReadings(xhr.response);



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


function parseReadings(inString)
{
    let temp = "";
    let caseVar = 1;
    for(let i = 0 ; i < inString.length ; i++)
        {
            if(inString.charAt(i)!=',')
                {
                    temp += inString.charAt(i);
                }
            else
                {
                    switch(caseVar) {
                        case 1:
                            currentName = temp;
                            break;
                        case 2:
                            currentMoisture = temp;
                            break;
                        case 3:
                            currentUV = temp;
                            break;
                        case 4:
                            currentHumidity = temp;
                            break;
                        case 5:
                            currentTemperature = temp;
                            break;
                    }
                    temp = "";
                    caseVar++;


                }   

        }   
}

//getters for table
function getName(){return currentName;}
function getMoisture(){return currentMoisture;}
function getUV(){return currentUV;}
function getHumidity(){return currentHumidity;}
function getTemperature(){return currentTemperature;}
