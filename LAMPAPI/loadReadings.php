<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

// $plantReadings = "";

$con = new mysqli("localhost", "root", ("qh@X$"."R-4*$%EaP"), "plantinfo");//attempted to mitigate the $ in the string
if ($con->connect_error) 
	{
		returnWithError($con->connect_error);
	} 
else
{
    $stmt = $con->prepare("select * from currentplant");
    $stmt->execute();
    $result = stmt->getResult();

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
?>