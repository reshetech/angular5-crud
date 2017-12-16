<?php
/**
 * Store the new data
 */
require 'utilis.php';
require 'connect.php';

$uploadDir = $_SERVER['DOCUMENT_ROOT'].'/assets/upload/img/';


// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    // Extract the data.
    $request = json_decode($postdata);
	
	
    // Validate.
    if(trim($request->unique_id) == '' || trim($request->model) == '' || (int)$request->price < 1)
    {
        return;
    }
    
	
    // Sanitize.
    $uid   = mysqli_real_escape_string($con, trim($request->unique_id));
    $model = mysqli_real_escape_string($con, trim($request->model));
    $price = mysqli_real_escape_string($con, trim($request->price));
  
  
    // Handle the image
    $imageData = isset($request->image)? $request->image : '';
    $imageName = storeImage($imageData);


    // Store.
    $sql = "INSERT INTO `cars`(`id`,`unique_id`,`model`,`price`,`image`) VALUES (null,'$uid', '$model','$price','$imageName')";

    mysqli_query($con,$sql);
}