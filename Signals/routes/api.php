<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExternalSignalsController;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\RedirectController;

use App\Http\Controllers\SignalController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/login', [AuthController::class, 'Login']);
Route::get('/logout', [AuthController::class, 'Logout']);
Route::post('/externalSignalCreate', [ExternalSignalsController::class, 'create']);








Route::get('/dashboardData', [DashboardController::class, 'dashboardData'])->middleware('jwt');



Route::get('/getFiles/{id}', [FilesController::class, 'getFile'])->middleware('jwt');


Route::get('/signals', [SignalController::class, 'getAllSignals'])->middleware('jwt');
Route::get('/signal/{id}', [SignalController::class, 'signalDetails'])->middleware('jwt');
Route::get('/addSignal', [SignalController::class, 'addSignal'])->middleware('jwt');
Route::get('/editSignal', [SignalController::class, 'editSignal'])->middleware('jwt');
Route::get('/redirectSignal', [SignalController::class, 'redirectSignal'])->middleware('jwt');
Route::post('/updateSignal', [SignalController::class, 'updateSignal'])->middleware('jwt');
Route::post('/updateSignalCount', [SignalController::class, 'updateSignalCount'])->middleware('jwt');




Route::get('/getRedirects/{id}', [RedirectController::class, 'getRedirects'])->middleware('jwt');


#region Groups

Route::get('/groups', [GroupsController::class, 'getAllGroups'])->middleware('jwt');
Route::post('/createGroup', [GroupsController::class, 'createGroup'])->middleware('jwt');
Route::put('/updateGroup/{id}', [GroupsController::class, 'updateGroup'])->middleware('jwt');


#endregion Groups

#region Users

Route::get('/users', [UserController::class, 'getAllUsers'])->middleware('jwt');
Route::post('/createUser', [UserController::class, 'createUser'])->middleware('jwt');
Route::put('/updateUser/{id}', [UserController::class, 'updateUser'])->middleware('jwt');

#endregion Users


#region Categories

Route::get('/categories', [CategoriesController::class, 'getAllCategories']);
Route::post('/createCategory', [CategoriesController::class, 'createCategory'])->middleware('jwt');
Route::put('/updateCategory/{id}', [CategoriesController::class, 'updateCategory'])->middleware('jwt');

#endregion Categories
