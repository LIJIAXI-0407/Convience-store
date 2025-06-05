<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // 注册
    public function signup(Request $request)
    {
        $data = $request->only('email', 'username', 'password', 'career', 'birthday');

        $request->validate([
            'email' => 'required|email|unique:users,email',
            'username' => 'required|string|min:3|max:20|unique:users,username',
            'password' => 'required|string|min:6',
            'career' => 'required|string|max:50',
            'birthday' => 'required|date'
        ], [
            'email.required' => '邮箱不能为空',
            'email.email' => '邮箱格式不正确',
            'email.unique' => '邮箱已被注册',
            'username.required' => '用户名不能为空',
            'username.unique' => '用户名已被使用',
            'username.min' => '用户名至少3个字符',
            'username.max' => '用户名最多20个字符',
            'password.required' => '密码不能为空',
            'password.min' => '密码至少6个字符',
            'career.required' => '职业不能为空',
            'birthday.required' => '生日不能为空',
            'birthday.date' => '生日格式不正确'
        ]);

        try {
            $user = User::create([
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'occupation' => $data['career'],
                'birthday' => $data['birthday'],
                'reword' => 0,
                'token' => Str::random(60)
            ]);

            return response()->json([
                'success' => true,
                'message' => '注册成功',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'username' => $user->username,
                        'email' => $user->email,
                        'occupation' => $user->occupation,
                        'birthday' => $user->birthday,
                        'reword' => $user->reword
                    ],
                    'token' => $user->token
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '注册失败，请重试',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // 登录
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email', // 只接受邮箱
            'password' => 'required|string'
        ], [
            'email.required' => '邮箱不能为空',
            'email.email' => '邮箱格式不正确',
            'password.required' => '密码不能为空'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => '邮箱或密码错误'
            ], 401);
        }

        // 更新token
        $user->token = Str::random(60);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => '登录成功',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                    'occupation' => $user->occupation,
                    'birthday' => $user->birthday,
                    'reword' => $user->reword
                ],
                'token' => $user->token
            ]
        ]);
    }

    // 退出登录
    public function logout(Request $request)
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => '未提供token'
            ], 401);
        }

        $user = User::where('token', str_replace('Bearer ', '', $token))->first();

        if ($user) {
            $user->token = null;
            $user->save();
        }

        return response()->json([
            'success' => true,
            'message' => '退出登录成功'
        ]);
    }

    // 获取用户信息
    public function profile(Request $request)
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => '未提供token'
            ], 401);
        }

        $user = User::where('token', str_replace('Bearer ', '', $token))->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'token无效'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                    'occupation' => $user->occupation,
                    'birthday' => $user->birthday
                ]
            ]
        ]);
    }
}
