<?php
/**
 * Store the new data
 */
require 'utilis.php';
require 'connect.php';

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


    // Update.
    $sql = "UPDATE `cars` SET ";
	
	if($imageName !== ''):
	    $sql.= " `image`='$imageName',";
	endif;
	
	$sql.= "`model`='$model',`price`='$price' ";
	$sql.= "WHERE `unique_id` = '{$uid}' LIMIT 1";

    mysqli_query($con,$sql);
}