<?php
// Routes to "/?"
$this->respond('GET', '/?', function ($request, $response, $service, $apps) {  
  $service->render('../app/modules/home/views/index/index.php');
});

$this->respond('POST', '/?', function ($request, $response, $service, $apps) {  
	
});

?>