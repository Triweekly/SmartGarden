<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');


$con = mysqli_connect("localhost", "reader", "reader", "plantinfo");	//I created  a user, and this is their info
if ($con->connect_error) 
	{
		returnWithError($con->connect_error);
	} 
else
{
    $stmt = $con->prepare("SELECT name, moisture, uv, humidity, temperature FROM currentplant");
	$stmt->execute();
	$result = $stmt->get_result();

    // $name = $row["name"];
    // $moisture = $row["moisture"];
    // $uv = $row["uv"];
    // $humidity = $row["humidity"];
    // $temperature = $row["temperature"];


    // //              {"moisture": 35.6, "uv": 85.2, "humidity": 96.6, "temperature": 46.2}
    // $jsonResponse = "{\"moisture\":" . $name . ", \"uv\":" . $uv . ", \"humidity\":" . $humidity . ", \"temperature\":" . $temperature . "}";



    $jsonResponse="";

	while($row = $result->fetch_assoc())
    {
        $jsonResponse = "{\"name\":" . $row["name"] . ",\"moisture\":" . $row["moisture"] . ", \"uv\":" . $row["uv"] . ", \"humidity\":" . $row["humidity"] . ", \"temperature\":" . $row["temperature"] . "}";
    }
    returnWithInfo($jsonResponse);
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