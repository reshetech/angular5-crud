<?php

function makeRandomString($length=30)
{
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	$charactersLength = strlen($characters);

	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}


	return $randomString;
}

function storeImage($imageData)
{
	$imageName = '';
	
	$uploadDir = $_SERVER['DOCUMENT_ROOT'].'/assets/upload/img/';
	
	if(isset($imageData->filename) && $imageData->filename !== '' 
	   && isset($imageData->filetype) && $imageData->filetype !== ''
	   && isset($imageData->value) && $imageData->value !== '')
    {
		if($imageData->filetype == 'image/jpeg')
            $ext = '.jpg';
        elseif($imageData->filetype == 'image/png')
            $ext = '.png';
		else
            return $imageName;

        $img = str_replace('data:image/png;base64,', '',  $imageData->value);
        $img = str_replace('data:image/jpeg;base64,', '', $img);

        $img = str_replace(' ', '+', $img);
        $img = base64_decode($img);
        
        if(!file_exists($uploadDir)) mkdir ( $uploadDir, 0775 );

        $filename = date("d_m_Y_H_i_s")."-".time().'-'.makeRandomString().$ext;
		
        $destinationPath = "$uploadDir$filename";

        $success = file_put_contents($destinationPath, $img);
        
        $pathToImg = str_replace($_SERVER['DOCUMENT_ROOT'],'',$destinationPath);
	
	    $imageName = $pathToImg;
    }
	
	return $imageName;
}