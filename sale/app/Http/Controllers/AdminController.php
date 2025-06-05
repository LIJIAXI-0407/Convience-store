<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AdminController extends Controller
{
    /**
     * 获取用户列表
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function users(Request $request): JsonResponse
    {
        try {

            // 构建查询
            $users = User::all();
            return response()->json([
                'success' => true,
                'message' => '用户列表获取成功',
                'data' => [
                    'users' => $users,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '获取用户列表失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取商品列表
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function products(): JsonResponse
    {
        try {
            // 获取分页参数
            $products = Product::all();

            return response()->json([
                'success' => true,
                'message' => '商品列表获取成功',
                'data' => [
                    'products' => $products,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '获取商品列表失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 创建商品
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createProduct(Request $request): JsonResponse
    {
        try {

            $data = $request->only('product_name', 'bar_code', 'price', 'stock');

            $validate = $request->validate([
                'product_name' => 'required',
                'bar_code' => 'required',
                'price' => 'required',
                'stock' => 'required'
            ]);
            if (!$validate) {
                return response()->json([
                    'success' => false,
                    'message' => '数据验证失败',
                    'errors' => $validate
                ], 422);
            }

            // 创建商品
            $product = Product::create($data);

            return response()->json([
                'success' => true,
                'message' => '商品创建成功',
                'data' => $product
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => '数据验证失败',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '商品创建失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 更新商品
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateProduct(Request $request, $id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);

            $name = $request->input('product_name');
            $code = $request->input('bar_code');
            $price = $request->input('price');
            $stock = $request->input('stock');

            if ($name) {
                $product->product_name = $name;
            } else if ($code) {
                $product->bar_code = $code;
            } else if ($price) {
                $product->price = $price;
            } else if ($stock) {
                $product->stock = $stock;
            }

            $product->save();

            return response()->json([
                'success' => true,
                'message' => '商品更新成功',
                'data' => $product->fresh()
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => '商品不存在'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => '数据验证失败',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '商品更新失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 删除商品
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deleteProduct($id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);

            // 删除商品
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => '商品删除成功'
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => '商品不存在'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '商品删除失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
