<?php

use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AiController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AdminController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 认证相关路由
Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);
Route::get('profile', [AuthController::class, 'profile']);

// 管理员相关路由
Route::prefix('admin')->group(function () {
    // 用户管理
    Route::get('users', [AdminController::class, 'users']);

    // 商品管理
    Route::get('products', [AdminController::class, 'products']);              // 获取商品列表
    Route::post('products', [AdminController::class, 'createProduct']);        // 创建商品
    Route::get('products/{id}', [AdminController::class, 'showProduct']);      // 获取商品详情
    Route::put('products/{id}', [AdminController::class, 'updateProduct']);    // 更新商品
    Route::delete('products/{id}', [AdminController::class, 'deleteProduct']); // 删除商品
    Route::post('products/batch-delete', [AdminController::class, 'batchDeleteProducts']); // 批量删除
});

// AI相关路由
Route::post('ai/stream', [AiController::class, 'aiApi']); // 流式响应
Route::post('ai/sync', [AiController::class, 'aiApiSync']); // 同步响应

Route::post('san/product', [ProductsController::class, 'scan']);
Route::post('check/out', [ProductsController::class, 'checkout']);

// 支付相关路由
Route::prefix('alipay')->group(function () {
    Route::post('pay', [PaymentController::class, 'createPayment']);
    Route::get('reword/{reword}/{token}', [PaymentController::class, 'updateReword']);
});

Route::get('alipay/success', [PaymentController::class, 'paymentSuccess']);


