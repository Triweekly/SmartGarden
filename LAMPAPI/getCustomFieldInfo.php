<?php

header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

error_reporting(E_ALL);
ini_set('display_errors', 'on');


$con = mysqli_connect("localhost", "reader", "reader", "plantinfo");	//I created  a user, and this is their info
if ($con->connect_error) 
	{
		returnWithError($con->connect_error);
	} 
else
{
    $stmt = $con->prepare("SELECT name, prefmoisture, prefuv, prefhumidity, preftemperature FROM plantprefs where custom = \"T\"");
	$stmt->execute();
	$result = $stmt->get_result();


	while($row = $result->fetch_assoc())
    {
        $plantPrefs = '"name":"' . $row["name"] .'","prefmoisture":'. $row["prefmoisture"] .',"prefuv":'. $row["prefuv"] .',"prefhumidity":'. $row["prefhumidity"] .',"preftemperature":'. $row["preftemperature"];
    }
    returnWithInfo($plantPrefs);
}

function returnWithError( $err )
	{
		
		sendResultInfoAsJson( $err );
	}
	
function returnWithInfo( $foundData )
	{
		$retValue = '{' . $foundData . '}';
		// $retValue = $foundData ;
		sendResultInfoAsJson( $retValue );
	}
	
function sendResultInfoAsJson( $obj )
	{
		header('Access-Control-Allow-Origin: *');	//useful? needed?
		// header('Content-type: application/json');
		echo $obj;
		
	}
?>