<?php
/** 
 * Set the headers	
 */
header("Access-Control-Allow-Origin: http://localhost:4200"); // *
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET,POST"); // HEAD,OPTIONS
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");		
	
/** 
 * Handle the database
 */	
// db credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'angular2_tutorial');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect))
  {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");


  return $connect;
}

$con = connect();