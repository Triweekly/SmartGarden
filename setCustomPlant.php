<?php   //initially an exact copy of updateReadings for a framework=
	$inData = getRequestInfo();

	$newPlantName = $inData["newPlantName"];
    $newMoisture = $inData["newMoisture"];
    $newUV = $inData["newUV"];
    $newHumid = $inData["newHumid"];
	$newTemp = $inData["newHumid"];
    $newCustomStatus = $inData["newCustomStatus"];

	 $plantName = $inData["name"];
     $custStat = $inData["custom"];

	// Connect to database
    $serverName = "localhost";
    $dBUsername = "root";
    $dBPassword = "qh@X$R-4*$%EaP";
    $dbName = "plantprefs";

	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dbName);

header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 'on');

$passedData = json_decode(file_get_contents('php://input'), true);	//maybe stringify was the issue?

$name = $passedData["name"];

if(is_null($name))
{
    returnWithError("This is not the proper way to use this php file, try using the proper channels");//comment out this if() if you need to debug and see the error messages
}
else
{
	//check that entry exists 
	 $sql = "SELECT * FROM plantprefs WHERE name = '$plantName' AND USERID = '$custStat'";
       $result = $conn->query($sql);

	   if ($result->num_rows != 1)
       {
           returnWithError("Entry not found for $inData");
       }
        else
        {
            // Update SQL entry
            $sql = "UPDATE SET
                    name='$newPlantName',
                    prefmoisture='$newPrefMoisture',
                    prefuv= 'newPrefUV',
					prefhumidity= 'newPrefHumidity',
					preftemperature = 'newPrefTemperature'
					custom = 'newCustomStatus'

       if ($result->num_rows != 1)
       {
           returnWithError("Entry not found for $inData");
       }

	$sql = "SELECT * FROM plantprefs WHERE name = '$contactId' AND USERID = '$userId'";
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

	$stmt = $con->prepare("UPDATE currentreadings SET currentreadings.name = ?");
	$stmt->bind_param('s', $name);
	$stmt->execute();


	$stmt->close();
    $con->close();
	

    // $result = $command->mysql_query();
	

    
    returnWithError("");
}
}

 $conn->close();

function returnWithError( $err )
	{
		header('Access-Control-Allow-Origin: *');	//useful? needed?
		sendResultInfoAsJson( $err );
	}

function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
     
    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
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