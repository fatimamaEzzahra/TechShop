<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use \App\Http\Controllers\OrderController;
use \App\Http\Controllers\ForgotPasswordController;
use \App\Http\Controllers\ResetPasswordController;
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
Route::middleware(['auth:sanctum'])->group(
    function(){
        Route::get('user',[\App\Http\Controllers\AuthController::class,'user']);
        Route::post('logout',[\App\Http\Controllers\AuthController::class,'logout']);
        Route::get('role',[\App\Http\Controllers\AuthController::class,'roles']);
        Route::post('AddToCart',[\App\Http\Controllers\CartItemController::class,'store']);
        Route::post('verifAdded',[\App\Http\Controllers\CartItemController::class,'verifAdded']);
        Route::get('Cart',[\App\Http\Controllers\CartItemController::class,'show']);
        Route::get('productAmount',[\App\Http\Controllers\CartItemController::class,'productAmount']);
        Route::post('updateQty',[\App\Http\Controllers\CartItemController::class,'updateQty']);
        Route::post('deletePrfromCart',[\App\Http\Controllers\CartItemController::class,'deleteItem']);
        Route::get('/show-user-orders',[OrderController::class,'showUserOrders']);
        Route::post('placeOrder',[OrderController::class,'placeorder']);
        Route::post('validate-order',[OrderController::class,'validateOrder']);
        Route::post('order',[OrderController::class,'show']);
        Route::get('generateOrderPDF/{id}',[OrderController::class,'generateOrderPDF']);
        Route::post('updateStatus',[OrderController::class,'updateStatus']);

        Route::middleware('admin')->group(function(){
            Route::get('countProducts',[ProductController::class,'count']);
            Route::get('countClients',[\App\Http\Controllers\UserController::class,'countClient']);
            Route::get('sales-statistic',[\App\Http\Controllers\DashboardController::class,'salesStatistics']);
            Route::get('customers-data',[\App\Http\Controllers\UserController::class,'index']);
            Route::get('orders',[OrderController::class,'index']);
            Route::get('amountOrders',[OrderController::class,'count']);
            Route::post('/ajouter',[ProductController::class,'store']);

        });
    
    }
);
Route::post('register',[\App\Http\Controllers\AuthController::class,'register']);
Route::post('login',[\App\Http\Controllers\AuthController::class,'login']);
Route::post('/oneProduct',[ProductController::class,'show']);
Route::resource('produits',ProductController::class);
Route::get('bestSellers',[ProductController::class,'bestSellers']);
Route::post('/oneProduct',[ProductController::class,'oneProduct']);
Route::post('/searchProduct',[ProductController::class,'search']);

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password',[ResetPasswordController::class,'reset']);
