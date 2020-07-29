<?php

include 'model/Route.php';
include 'config/config.php';
require_once './controller/VehicleController.php';

GLOBAL $vehicleController;

$vehicleController = new VehicleController();

// Add base route (startpage)
Route::add('/', function() {
  ob_start();
  require DIR . "/site/views/index.php";
  $html = ob_get_contents();
  ob_end_clean();
  echo $html;
});

Route::add('/api/veiculos', function() {
    $result = $GLOBALS['vehicleController']->findAll($_GET['page'],$_GET['q']);
    echo $result;
}, "get");

Route::add('/api/veiculos/(.*)', function($id) {
  $result = $GLOBALS['vehicleController']->find($id);
  echo $result;
});
Route::add('/api/veiculos/(.*)', function($id) {
  parse_str(file_get_contents('php://input'), $_PUT);
  $result = $GLOBALS['vehicleController']->update($_PUT,$id);
  echo $result;
},"put");

Route::add('/api/veiculos/(.*)', function($id) {
  $result = $GLOBALS['vehicleController']->delete($id);
  echo $result;
},"delete");

Route::add('/api/veiculos', function() {
  $result = $GLOBALS['vehicleController']->insert($_POST);
  echo $result;
},"post");

Route::pathNotFound(function($path) {
  header('HTTP/1.0 404 Not Found');
  echo 'Error 404 :-(<br>';
  echo 'The requested path "'.$path.'" was not found!';
});

Route::methodNotAllowed(function($path, $method) {
  header('HTTP/1.0 405 Method Not Allowed');
  echo 'Error 405 :-(<br>';
  echo 'The requested path "'.$path.'" exists. But the request method "'.$method.'" is not allowed on this path!';
});

Route::run(BASEPATH);

