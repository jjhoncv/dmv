<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/../app/core/core.php';

$klein = new \Klein\Klein();

$klein->with('/', function () use ($klein) {

    $klein->respond('GET', '/?', function ($request, $response) {
      
    });

    $klein->respond('POST', '/?', function ($request, $response) {
      echo "hola POST home"; 
    });

});

$klein->with('/admin', function () use ($klein) {

  $klein->respond('GET', '/?', function ($request, $response, $service, $apps) {  
  	$service->render('../app/admin/modules/dashboard/view/index/index.php');
  });

  $klein->respond('POST', '/?', function ($request, $response) {
    echo "hola POST home"; 
  });

});


/* home 
$klein->with("/", "../app/modules/home/controllers/indexController.php");

 search 
$klein->with("/search", "../app/modules/search/controllers/indexController.php");

login
$klein->with("/login", "../app/modules/login/controllers/indexController.php");*/

$klein->dispatch();
?>