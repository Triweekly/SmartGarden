<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');


$con = mysqli_connect("localhost", "reader", "reader", "plantinfo");	//I created  a user I think, so this is their info
if ($con->connect_error) 
	{
		returnWithError($con->connect_error);
	} 
else
{
    $stmt = $con->prepare("SELECT * FROM currentreadings");
	$stmt->execute();
	$result = $stmt->get_result();


	while($row = $result->fetch_assoc())
    {
        $plantReadings = $row["name"] .','. $row["moisture"] .','. $row["uv"] .','. $row["humidity"] .','. $row["temperature"] . ',';
    }
    returnWithInfo($plantReadings);
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