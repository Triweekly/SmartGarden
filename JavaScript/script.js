const urlBase = 'http://www.smartgarden34.com/SmartGarden/LAMPAPI/';
const extension = 'php';

let currentName = "";
let currentMoisture = "";
let currentUV = "";
let currentHumidity = "";
let currentTemperature = "";

//JSON syntax: {"moisture": 35.6, "uv": 85.2, "humidity": 96.6, "temperature": 46.2}


function getSiteReady()
{
    addDroption();
    loadReadings();
    checkPrefs();
    getCustomFieldInfo();
}


function checkNameInput()       // alpha = 65-90 & 97-122       numeric = 48-57
{
        let nameString = document.getElementById("plantName").value + "";
        let limit = nameString.length;
        let spaceCount=0;
        let alertCheck = false;
        let validName = "";
        
        for (let k = 0 ; k < limit ; k++)
        {
                let validChar = true;
                let ter = nameString.charCodeAt(k);
                
                if(ter==32) spaceCount++;

                if(!(((ter)>=48&&(ter)<=57)||((ter)>=65&&(ter)<=90)||((ter)>=97&&(ter)<=122)||ter==32))
                {
                        // nameString.charAt(k).replace('');
                        ter=127;
                        alertCheck = true;
                        validChar = false;
                }
                if(ter==32 && spaceCount >  2)
                {
                        // nameString.charAt(k).replace('');
                        ter=127;
                        validChar = false;
                        alertCheck = true;
                }
                if(validChar)validName += String.fromCharCode(ter);
        }
        console.log(validName);
        document.getElementById("plantName").value=validName;
        if(alertCheck)alert("Please only use A-Z, a-z, and 0-9, and a maximum of 2 spaces.");   //FIXME replace with a visual popup and disable submit buutton?
        else{}//hide the popup and enable submit button
}

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

    //FIXME set cells that are a problematic reading as a 'bad' color

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
    //test

    let xhr = new XMLHttpRequest();
    
    let dropdown = document.getElementById("plantChoice").value;
    let comp = "custom";

    if(dropdown === comp)//custom
    {
        let custName = document.getElementById("plantName").value.toString();
        let custMoist = document.getElementById("plantMoisture").value.toString();
        let custLowTemp = document.getElementById("plantUV").value.toString();
        let custHighTemp = document.getElementById("plantTemperature").value.toString();
        let custHumidity = document.getElementById("plantHumidity").value.toString();




        let temp = {name:custName, prefmoisture:custMoist, prefuv:custLowTemp, prefhumidity:custHumidity, preftemperature:custHighTemp};
        let dataSent = JSON.stringify(temp);
        console.log("setting custom plant");
        console.log(dataSent);


        let url = urlBase + "setCustomPlant." + extension;
        xhr.open("POST", url, false);

        // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

        xhr.send(dataSent);
        alert("Custom plants not yet supported. Try again later!");
        console.log("WIP- account for custom plants");

        checkPrefs();
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
        console.log("does it reach here?");

        checkPrefs();
    }



    //PH for syntax:let tmp = {userID: userId, og_firstName: modified.firstName, og_lastname: modified.lastName, og_phoneNumber: modified.phoneNumber, og_email: modified.email,firstName: firstname, lastName: lastname, phoneNumber: pnum, email: email};


if(dropdown === comp)//custom
{
    let tableName = document.getElementById("plantName").value.toString();
    document.getElementById("ph1").innerHTML = tableName;
}
else//preset
{
    let chosenPlant = document.getElementById("plantChoice");
    let newName = chosenPlant.value.toString();
    console.log("new name is " + newName);
    

    document.getElementById("ph1").innerHTML = newName;
    console.log("called js setPlant(). Though not done at all yet, Planning to leave Custom considerations for last.");
}

}

function getCustomFieldInfo()
{
    let url = urlBase + "getCustomFieldInfo." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
   
    xhr.send();



    try
    {
        let customData = JSON.parse(xhr.response);
        document.getElementById("plantName").value=customData.name;
        document.getElementById("plantMoisture").value=customData.prefmoisture;
        document.getElementById("plantUV").value=customData.prefuv;
        document.getElementById("plantHumidity").value=customData.prefhumidity;
        document.getElementById("plantTemperature").value=customData.preftemperature;
        //   $plantPrefs = '"name":' . $row["name"] .',"prefmoisture":'. $row["prefmoisture"] .',"prefuv":'. $row["prefuv"] .',"prefhumidity":'. $row["prefhumidity"] .',"preftemperature":'. $row["preftemperature"];
    }
    catch(err)
    {
        console.log("Error encountered:");
        console.log(err);
    }
    
}

function setCustomPlant()
{

}

function addDroption()
{
    console.log("adding droptions...");
    let url = urlBase + "getPlantNames." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
   
    xhr.send();



    try
    {
        console.log(xhr.response);
        parseNames(xhr.response, false);  
        
    }
    catch(err)
    {
        console.log("Error encountered:");
        console.log(err);
    }

    url = urlBase + "getCustomNames." + extension;

    xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
   
    xhr.send();

    try
    {
        console.log(xhr.response);
        parseNames(xhr.response, true);  
        
    }
    catch(err)
    {
        console.log("Error encountered:");
        console.log(err);
    }
}



function parseNames(inString, customCheck)
{
    console.log(inString);

    let opValue = "";

    for(let i = 0 ; i < inString.length ; i++)
    {
        if(inString[i]==',')
        {
            console.log(opValue)
            addToSelect(opValue, customCheck);
            opValue = "";
            continue;
        } 
        opValue += inString[i];
    }



    
}




function addToSelect(optionValue, customCheck)
{

    let drop = document.getElementById("plantChoice");
    let newOp = document.createElement("option");
    newOp.value = optionValue;//give value
    
 
    let optionName = optionValue;
    
    optionName = titleCase(optionName);
    //now optionName should now be capitalized after spaces
    console.log("Name is " + optionName + ", value is " + optionValue);

    
   

    newOp.innerHTML = optionName;//give name

    if(customCheck==true)
    {
        newOp.value = "custom";                     //change custom value back
        newOp.innerHTML = optionName + " (Custom)";  //makes it extremly clear that it is custom
    }

    drop.appendChild(newOp);    //add to list
}

function titleCase(title)    //can handle up to three words (two spaces)
{
let lowTitle = title + "";
lowTitle = lowTitle.toLowerCase(); 
let firstWord;
let secondWord;
let thirdWord;
let words = lowTitle.split(' ');

firstWord=words[0];
if(words[1]!=null)secondWord = words[1];
if(words[2]!=null)thirdWord = words[2];

let titleWord1 = (firstWord.charAt(0).toUpperCase())+firstWord.substring(1);
let titleWord2 = "";
let titleWord3 = "";
if(words[1]!=null)
{
    titleWord2 = (secondWord.charAt(0).toUpperCase())+secondWord.substring(1);
}

if(words[2]!=null)
{
    titleWord3 = (thirdWord.charAt(0).toUpperCase())+thirdWord.substring(1);
}


let fullTitle = titleWord1+ " " + titleWord2 + " " + titleWord3;
fullTitle.trim();
return  fullTitle;
}
