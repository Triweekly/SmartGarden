<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');

// $plantReadings = "";

$user = "root";
// $pass = "qh@X$"."R-4*$%EaP";//attempted to mitigate the $ in the string
$pass = "840a3a94d50dc378d14deb6874a69626e432dec1146cf9b4";

// $con = new mysqli_connect("localhost", $user, $pass, "plantinfo");
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
	
	// $command = "SELECT * FROM 'currentplant'";

    // $result = $command->mysql_query();
	

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