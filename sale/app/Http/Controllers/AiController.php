<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AiController extends Controller
{
    /**
     * AI API - 流式响应
     */
    public function aiApi(Request $request)
    {
        // 兼容前端的message字段和原有的question字段
        $question = $request->input('message') ?: $request->input('question', '你是谁？');

        // 验证API密钥
        $apiKey = getenv('DASHSCOPE_API_KEY');
        if (!$apiKey) {
            return response()->json([
                'error' => 'API密钥未配置',
                'message' => '请在.env文件中配置DASHSCOPE_API_KEY'
            ], 500);
        }

        $url = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

        // 设置请求头
        $headers = [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json'
        ];

        // 设置请求体 - 使用用户实际输入的问题
        $data = [
            "model" => "qwen-plus",
            "messages" => [
                [
                    "role" => "system",
                    "content" => "You are limited to 15 words."
                ],
                [
                    "role" => "system",
                    "content" => "You are a helpful assistant."
                ],
                [
                  "role" => "system",
                  "content" => "Answer in English"
                ],
                [
                  "role" => "system",
                  "content" => "Your name is Eat Chicken AI Service"
                ],
                [
                    "role" => "user",
                    "content" => $question
                ]
            ]
        ];

        // 初始化cURL会话
        $ch = curl_init();

        // 设置cURL选项
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        // 禁用SSL证书验证（开发环境使用，生产环境应该正确配置证书）
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

        // 执行cURL会话
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // 检查是否有错误发生
        if (curl_errno($ch)) {
            curl_close($ch);
            return response()->json([
                'error' => 'cURL错误',
                'message' => curl_error($ch)
            ], 500);
        }

        // 关闭cURL资源
        curl_close($ch);

        // 检查HTTP状态码
        if ($httpCode !== 200) {
            return response()->json([
                'error' => 'API请求失败',
                'http_code' => $httpCode,
                'response' => $response
            ], $httpCode);
        }

        // 返回JSON响应
        return response()->json(json_decode($response, true));
    }

    /**
     * AI API - 同步响应
     */
    public function aiApiSync(Request $request)
    {
        // 同步响应与流式响应逻辑相同，这里复用aiApi方法
        return $this->aiApi($request);
    }
}
