<?php
// Routes to "/?"
$this->respond('GET', '/?', function ($request, $response, $service, $apps) {  
  $service->render('../app/modules/home/views/index/index.php');
});

$this->respond('POST', '/?', function ($request, $response, $service, $apps) {  
	$username = $request->param('username');
	$password = $request->param('password');
	echo "username : " .  $username . "<br/>";
	echo "password : " .  $password . "<br/>";
	//echo "<pre>";
});

?>