<?php   //initially an exact copy of updateReadings for a framework=


header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 'on');

$passedData = json_decode(file_get_contents('php://input'), false);	//maybe stringify was the issue?

$name = $passedData["name"];

if(is_null($name))
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
    $stmt = $con->prepare("UPDATE currentplant SET currentplant.name = ?, currentplant.moisture = (select plantprefs.prefmoisture from plantprefs where plantprefs.name = ?), currentplant.uv = (select plantprefs.prefuv from plantprefs where plantprefs.name = ?), currentplant.humidity = (select plantprefs.prefhumidity from plantprefs where plantprefs.name = ?), currentplant.temperature = (select plantprefs.preftemperature from plantprefs where plantprefs.name = ?)");	//FIXME? deleted a semicolon
    $stmt->bind_param('sssss', $name, $name, $name, $name, $name);	//d is float. string would be s, integers would be i
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