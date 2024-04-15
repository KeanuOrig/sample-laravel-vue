<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Maintenance\ProductController;
use App\Http\Controllers\Maintenance\UserController;

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

// Normal Login
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);

// Google Login
// Route::get('login/google', [GoogleController::class, 'redirectToGoogle']);
// Route::get('callback/google', [GoogleController::class, 'handleGoogleCallback']);

Route::middleware(['cors', 'auth:sanctum'])->group( function () {

    // PHP Info
    Route::get('/phpinfo', function () {
        phpinfo();
    });

    // Auth
    Route::post('refresh-token', [LoginController::class, 'refreshToken']);
    Route::post('logout', [LoginController::class, 'logout']);

    Route::group(['prefix' => 'maintenance'], function () {

        // User Maintenance
        Route::resource('user', UserController::class);

        // Other Maintenance
        Route::resource('product', ProductController::class);
    });
});