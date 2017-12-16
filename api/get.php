<?php
/**
 * Get the data
 */
require 'connect.php';

$cars = [];
$sql = "SELECT id, unique_id, model, price FROM cars";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $cars[$cr]['id']        = $row['id'];
    $cars[$cr]['unique_id'] = $row['unique_id'];
    $cars[$cr]['model']     = $row['model'];
    $cars[$cr]['price']     = $row['price'];
    $cr++;
  }
}

$json = json_encode($cars);
echo $json;
exit;