<?php
$routers = parse_ini_file('../app/config/routers.ini');
define('_HOST_', $routers["host"]);
define('_STATIC_', _HOST_ . "/static");
define('_STATIC_ADMIN_', _HOST_ . "/static/admin");
define('_APP_', __DIR__ . './../app');
?>