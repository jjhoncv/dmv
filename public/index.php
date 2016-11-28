<?php

require_once __DIR__ . '/vendor/autoload.php';

$klein = new \Klein\Klein();

$klein->respond('GET', '/', function () {
	include('../app/modules/home/views/index/index.php');
});

$klein->respond('GET', '/ficha/nuevo', function () {
	include( __DIR__ .  '/../app/config/routers.php');
	include('../app/modules/ficha/views/index/nuevo.php');
});

$klein->dispatch();
?>