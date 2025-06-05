<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function scan(Request $request)
    {
        $code = $request->input('barcode');
        $product = Product::where('bar_code', $code)->first();
        return response()->json([
            'success' => true,
            'message' => [
                'product' => $product
            ]
        ], 200);
    }

    public function checkout(Request $request)
    {
        try {
            $request->validate([
                'products' => 'required|array',
                'products.*.id' => 'required|integer',
                'products.*.quantity' => 'required|integer|min:1'
            ]);

            $products = $request->input('products');
            $totalAmount = 0;
            $orderItems = [];

            // 计算总金额和订单项
            foreach ($products as $item) {
                $product = Product::find($item['id']);
                if (!$product) {
                    return response()->json([
                        'success' => false,
                        'message' => '商品不存在: ' . $item['id']
                    ], 400);
                }

                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $product->price,
                    'quantity' => $item['quantity'],
                    'subtotal' => $subtotal
                ];
            }

            // 生成订单号
            $orderId = 'ORDER_' . date('YmdHis') . '_' . rand(1000, 9999);

            // 这里可以保存订单到数据库
            // Order::create([
            //     'order_id' => $orderId,
            //     'total_amount' => $totalAmount,
            //     'items' => json_encode($orderItems),
            //     'status' => 'pending'
            // ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'order_id' => $orderId,
                    'total_amount' => $totalAmount,
                    'items' => $orderItems
                ],
                'message' => '订单创建成功'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '结账失败: ' . $e->getMessage()
            ], 500);
        }
    }
}
