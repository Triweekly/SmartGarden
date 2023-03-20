const urlBase = 'http://www.smartgarden34.com/SmartGarden/LAMPAPI/';
const extension = 'php';

let currentName = "";
let currentMoisture = "";
let currentUV = "";
let currentHumidity = "";
let currentTemperature = "";

//JSON syntax: {"moisture": 35.6, "uv": 85.2, "humidity": 96.6, "temperature": 46.2}



function loadReadings()
{
    // console.log("Trying to get sensor readings...");

let url = urlBase + "loadReadings." + extension;
// console.log(url);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    
    
    
    xhr.send();
    try
    {
        
        parseReadings(xhr.response);



        
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


function checkPrefs()
{


let url = urlBase + "checkPrefs." + extension;
// console.log(url);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    
   
    
    xhr.send();
    try
    {
        
        parsePrefs(xhr.response);    //make new one



        
    }
    catch(err)
    {
        console.log("Error encountered:");
        console.log(err);
    }
}




function parsePrefs(inString)
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
                            document.getElementById("pref1").innerHTML = temp;
                            // console.log(currentMoisture);
                            break;
                        case 2:
                            document.getElementById("pref2").innerHTML = temp;
                            // console.log(currentUV);
                            break;
                        case 3:
                            document.getElementById("pref3").innerHTML = temp;
                            // console.log(currentHumidity);
                            break;
                        case 4:
                            document.getElementById("pref4").innerHTML = temp;
                            // console.log(currentTemperature);
                            break;
                    }
                    temp = "";
                    caseVar++;


                }   

        }   
        // console.log("caseVar = " + caseVar);

        // document.getElementById("ph1").innerHTML = getName();
        // document.getElementById("ph2").innerHTML = getMoisture();
        // document.getElementById("ph3").innerHTML = getUV();
        // document.getElementById("ph4").innerHTML = getHumidity();
        // document.getElementById("ph5").innerHTML = getTemperature();
}





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
    

    let xhr = new XMLHttpRequest();
    
    let dropdown = document.getElementById("plantChoice").value;
    let comp = "custom";

    if(dropdown === comp)//custom
    {
        //doesn't currently try to update custom
        console.log("WIP- account for custom plants");
    }
    else    //preset
    {
       let temp = {name:dropdown};
       let dataSent = JSON.stringify(temp);
       console.log(dataSent);



        let url = urlBase + "setPlant." + extension;
        xhr.open("POST", url, false);

        // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

        xhr.send(dataSent);
        

        checkPrefs();
    }



    //PH for syntax:let tmp = {userID: userId, og_firstName: modified.firstName, og_lastname: modified.lastName, og_phoneNumber: modified.phoneNumber, og_email: modified.email,firstName: firstname, lastName: lastname, phoneNumber: pnum, email: email};



    let chosenPlant = document.getElementById("plantChoice");
    let newName = chosenPlant.value.toString();
    console.log("new name is " + newName);
    

    document.getElementById("ph1").innerHTML = newName;
    console.log("called js setPlant(). Though not done at all yet, Planning to leave Custom considerations for last.");



}
