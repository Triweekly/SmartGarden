const urlBase = 'http://www.smartgarden34.com/SmartGarden/LAMPAPI/';
const extension = 'php';

let currentName = "";
let currentMoisture = "";
let currentUV = "";
let currentHumidity = "";
let currentTemperature = "";

function tryingsomething(){console.log("So you can do onload = \"function1();function2;");}



function loadReadings()
{
    // console.log("Trying to get sensor readings...");

let url = urlBase + "loadReadings." + extension;
// console.log(url);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);    //FIXME trying Get instead of POST
    
    // xhr.setRequestHeader("Content-type", "applciation/json; charset=UTF-8");    //disabling prevents errors, but doesn't make content received.
    
    xhr.send();
    try
    {
        // console.log(xhr.response);  //responseText?
        // console.log("logged response text (might be an empty line), now will try to parse:");
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
    // console.log("inString is " + inString);
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
                            // console.log(currentName);
                            break;
                        case 2:
                            currentMoisture = temp;
                            // console.log(currentMoisture);
                            break;
                        case 3:
                            currentUV = temp;
                            // console.log(currentUV);
                            break;
                        case 4:
                            currentHumidity = temp.toString();
                            // console.log(currentHumidity);
                            break;
                        case 5:
                            currentTemperature = temp;
                            // console.log(currentTemperature);
                            break;
                    }
                    temp = "";
                    caseVar++;


                }   

        }   
        // console.log("caseVar = " + caseVar);

        document.getElementById("ph1").innerHTML = getName();
        document.getElementById("ph2").innerHTML = getMoisture();
        document.getElementById("ph3").innerHTML = getUV();
        document.getElementById("ph4").innerHTML = getHumidity();
        document.getElementById("ph5").innerHTML = getTemperature();
}

//getters for table
function getName(){return currentName;}
function getMoisture(){return currentMoisture;}
function getUV(){return currentUV;}
function getHumidity(){return currentHumidity;}
function getTemperature(){return currentTemperature;}

function customShowHide()
{
    let comp = "custom";
    let opt = document.getElementById("plantChoice").value;

    if(opt===comp)
        {
            document.getElementById("label1").hidden = false;
            document.getElementById("label2").hidden = false;
            document.getElementById("label3").hidden = false;
            document.getElementById("label4").hidden = false;
            document.getElementById("label5").hidden = false;
            document.getElementById("plantName").hidden = false;
            document.getElementById("plantMoisture").hidden = false;
            document.getElementById("plantUV").hidden = false;
            document.getElementById("plantHumidity").hidden = false;
            document.getElementById("plantTemperature").hidden = false;

        }
    else  
        {
            document.getElementById("label1").hidden = true;
            document.getElementById("label2").hidden = true;
            document.getElementById("label3").hidden = true;
            document.getElementById("label4").hidden = true;
            document.getElementById("label5").hidden = true;
            document.getElementById("plantName").hidden = true;
            document.getElementById("plantMoisture").hidden = true;
            document.getElementById("plantUV").hidden = true;
            document.getElementById("plantHumidity").hidden = true;
            document.getElementById("plantTemperature").hidden = true;
        }
}


function setPlant()
{
    let url = urlBase + "setPlant." + extension;


    let chosenPlant = document.getElementById("plantChoice");
    let newName = chosenPlant.value.toString();
    console.log("new name is " + newName);
    

    document.getElementById("line").innerHTML = newName;
    console.log("called js setPlant(). Though not done at all yet, Planning to leave Custom considerations for last.");



}
