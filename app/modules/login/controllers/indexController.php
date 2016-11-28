<?php
$this->respond('POST', '/authenticate', function ($request, $response, $service, $apps) {  

  $username = $request->param('username');
  $password = $request->param('password');
  echo "username : " .  $username . "<br/>";
  echo "password : " .  $password . "<br/>";
  //echo "<pre>";
  //echo json_encode($username);
  //print_r($username);
  //echo $password;
  //print_r($send);
  //print_r(unserialize($send));
  /*$params = array();
	$parse = parse_str($send, $params);
	print_r($parse);*/
  /*$send = $request;
  $service->json = function ($object) {
  	print_r($object);

  };*/
  /*echo $request->username;
  echo $request->password;*/
});

?>