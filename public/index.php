<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/../app/core/core.php';

$klein = new \Klein\Klein();

/* home */
$klein->with("/", "../app/modules/home/controllers/indexController.php");

/* search */
$klein->with("/search", "../app/modules/search/controllers/indexController.php");

/*login*/
$klein->with("/login", "../app/modules/login/controllers/indexController.php");

$klein->dispatch();
?>