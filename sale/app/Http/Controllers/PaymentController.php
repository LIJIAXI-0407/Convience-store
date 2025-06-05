<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Alipay\EasySDK\Kernel\Factory;
use Alipay\EasySDK\Kernel\Config;
use Illuminate\Support\Facades\Log;
use App\Models\Order;

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->initAlipay();
    }

    /**
     * 初始化支付宝配置
     */
    private function initAlipay()
    {
        $options = new Config();
        $options->protocol = 'https';
        $options->gatewayHost = 'openapi-sandbox.dl.alipaydev.com'; // 正确的沙箱环境网关
        $options->signType = 'RSA2';

        $options->appId = env('ALIPAY_APP_ID');
        $options->merchantPrivateKey = env('ALIPAY_PRIVATE_KEY');
        $options->alipayPublicKey = env('ALIPAY_PUBLIC_KEY');

        $options->notifyUrl = env('ALIPAY_NOTIFY_URL');
        $options->encryptKey = null;

        Factory::setOptions($options);
    }

    /**
     * 创建支付订单
     */
    public function createPayment(Request $request)
    {
        try {
            $request->validate([
                'order_id' => 'required|string',
                'amount' => 'required|numeric|min:0.01',
                'subject' => 'required|string',
                'body' => 'nullable|string'
            ]);

            $orderId = $request->input('order_id');
            $amount = $request->input('amount');
            $subject = $request->input('subject');
            $body = $request->input('body', $subject);

            // 调用支付宝手机网站支付API
            $result = Factory::payment()->wap()->pay(
                $subject,
                $orderId,
                $amount,
                env('ALIPAY_RETURN_URL'),
                $body
            );

            return response()->json([
                'success' => true,
                'data' => [
                    'payment_url' => $result->body,
                    'order_id' => $orderId
                ],
                'message' => '支付订单创建成功'
            ]);

        } catch (\Exception $e) {
            Log::error('支付宝支付创建失败: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => '支付订单创建失败: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateReword($reword, $token) {

        $user = User::where('token', $token)->first();

        $user->reword += $reword;
        $user->save();

        return response()->json([
          'success' => true,
          'message' => $user->reword
        ]);
    }
}
