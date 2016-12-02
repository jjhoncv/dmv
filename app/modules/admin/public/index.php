<?php
$this->respond('GET', '/?', function ($request, $response, $service, $app) {
	$this->with("/", "../app/modules/admin/views/index.phtml");
});