<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

// $plantReadings = "";

$user = "root";
$pass = "qh@X$"."R-4*$%EaP";//attempted to mitigate the $ in the string

$con = new mysqli_connect("localhost", $user, $pass, "plantinfo");
if ($con->connect_error) 
	{
		returnWithError($con->connect_error);
	} 
else
{
    //$stmt = $con->prepare("SELECT * FROM 'currentplant'");
	//$stmt->execute();
	//$result = stmt->getResult();
	$command = "SELECT * FROM 'currentplant'";
    $result = mysql_query($command);
	

    while($row = $result->fetch_assoc())
    {
        $plantReadings ='"' . $row["name"] .','. $row["moisture"] .','. $row["uv"] .','. $row[humidity] .','. $row[temperature] . '"';
    }
    returnWithInfo($plantReadings);
}

function returnWithError( $err )
	{
		
		sendResultInfoAsJson( $err );
	}
	
function returnWithInfo( $foundData )
	{
		$retValue = '{"results":[' . $foundData . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
?>