<?php 
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: http://smartgarden34.com');
error_reporting(E_ALL);
ini_set('display_errors', 'on');

$passedData = json_decode(file_get_contents('php://input'), true);

$moisture = $passedData["moisture"]-200;
$uv = $passedData["uv"]-200;
$humidity = $passedData["humidity"]-200;
$temperature = $passedData["temperature"]-200;

if(is_null($moisture)||is_null($uv)||is_null($humidity)||is_null($temperature))
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
    $stmt = $con->prepare("UPDATE currentreadings SET moisture = ?, uv = ?, humidity = ?, temperature = ?");	//doesn't need to worry about the name, because that has nothing to do with the readings.
    $stmt->bind_param('dddd', $moisture, $uv, $humidity, $temperature);	//d is float. string would be s, integers would be i
	$stmt->execute();
	$stmt->close();
    $con->close();
	
	// $command = "SELECT * FROM 'currentplant'";

    // $result = $command->mysql_query();
	

    
    // returnWithError("");
}
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