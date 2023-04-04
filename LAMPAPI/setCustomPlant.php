<?php   //initially an exact copy of updateReadings for a framework=

header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 'on');

$passedData = json_decode(file_get_contents('php://input'), true);	//maybe stringify was the issue?


//incoming = {name:custName, prefmoisture:custMoist, prefuv:custLowTemp, prefhumidity:custHumidity, preftemperature:custHighTemp};
$custName = $passedData["name"];
$custMoist = $passedData["prefmoisture"];
$custUV =  $passedData["prefuv"];
$custHumidity = $passedData["prefhumidity"];
$custTemperature = $passedData["preftemperature"];

if(is_null($custName)||is_null($custMoist)||is_null($custUV)||is_null($custHumidity)||is_null($custTemperature))
{
    returnWithError("This is not the proper way to use this php file, try using the proper channels");//comment out this if() if you need to debug and see the error messages
}
else{
$con = mysqli_connect("localhost", "reader", "reader", "plantinfo");
if ($con->connect_error) 
	{
		returnWithError($con->connect_error);
	} 
else
{
	//update plantprefs
	$stmt = $con->prepare("UPDATE plantprefs SET name = ?, prefmoisture = ?, prefuv = ?, prefhumidity = ?, preftemperature = ? where custom = \"T\"");	//FIXME? deleted a semicolon
    $stmt->bind_param('sdddd', $custName, $custMoist, $custUV, $custHumidity, $custTemperature);	//d is float. string would be s, integers would be i
	$stmt->execute();
	$stmt->close();


	//update currentplant
    $stmt = $con->prepare("UPDATE currentplant SET currentplant.name = ?, currentplant.moisture = (select plantprefs.prefmoisture from plantprefs where plantprefs.name = ?), currentplant.uv = (select plantprefs.prefuv from plantprefs where plantprefs.name = ?), currentplant.humidity = (select plantprefs.prefhumidity from plantprefs where plantprefs.name = ?), currentplant.temperature = (select plantprefs.preftemperature from plantprefs where plantprefs.name = ?)");	//FIXME? deleted a semicolon
    $stmt->bind_param('sssss', $custName, $custName, $custName, $custName, $custName);	//d is float. string would be s, integers would be i
	$stmt->execute();
	$stmt->close();

	$stmt = $con->prepare("UPDATE currentreadings SET currentreadings.name = ?");
	$stmt->bind_param('s', $custName);
	$stmt->execute();


	$stmt->close();
    $con->close();
	

    // $result = $command->mysql_query();
	

    
    returnWithError("");
}
}

function returnWithError( $err )
	{
		header('Access-Control-Allow-Origin: *');	//useful? needed?
		sendResultInfoAsJson( $err );
	}
	
function returnWithInfo( $foundData )
	{
		// $retValue = '{"results":[' . $foundData . '],"error":""}';
		$retValue = $foundData ;
		sendResultInfoAsJson( $retValue );
	}
	
function sendResultInfoAsJson( $obj )
	{

        header('Access-Control-Allow-Origin: *');
		// header('Content-type: application/json');
		echo $obj;
		
	}
    
?>