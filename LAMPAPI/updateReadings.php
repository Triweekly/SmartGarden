<?php   //currrently an exact copy of loadreadings for a framework=

error_reporting(E_ALL);
ini_set('display_errors', 'on');

$passedData = json_decode(file_get_contents('php://input'), true);;

$moisture = $passedData["moisture"];
$uv = $passedData["uv"];
$humidity = $passedData["humidity"];
$temperature = $passedData["temperature"];


$con = mysqli_connect("localhost", "reader", "reader", "plantinfo");
if ($con->connect_error) 
	{
		returnWithError($con->connect_error);
	} 
else
{
    $stmt = $con->prepare("UPDATE currentreadings SET moisture = ?, uv = ?, humidity = ?, temperature = ?");
    $stmt->bind_param(dddd, $moisture, $uv, $humidity, $temperature);
	$stmt->execute();
	$stmt->close();
    $con->close();
	
	// $command = "SELECT * FROM 'currentplant'";

    // $result = $command->mysql_query();
	

    
    // returnWithError("");
}

function returnWithError( $err )
	{
		
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
		header('Access-Control-Allow-Origin: *');	//useful? needed?
		// header('Content-type: application/json');
		echo $obj;
		
	}
    
?>