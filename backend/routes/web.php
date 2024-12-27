<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\ResetPasswordController;
use \App\Http\Controllers\ForgotPasswordController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('reset-password/{token}',[ResetPasswordController::class,'showResetForm'])->name('password.reset');
Route::post('reset-password', [ResetPasswordController::class,'reset'])->name('password.update');
