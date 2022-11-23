<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'attachments',
], function (Router $router) {
    $router->post('/', [EmployeeController::class, 'createAttachment']);
});

Route::group([
    'prefix' => 'employees',
], function (Router $router) {
    $router->get('/', [EmployeeController::class, 'getEmployeesStatistic']);
});
