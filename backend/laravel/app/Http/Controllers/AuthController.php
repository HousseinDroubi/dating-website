<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3|max:20',
            'email' => 'required|string|email|min:5|max:30|unique:users',
            'password' => 'required|string|min:5|max:30',
            'gender' => 'required|string|min:1|max:1',
            'age' => 'required|integer|min:2|max:99',
            'location' => 'required|string|min:5|max:20',
            'bio' => 'required|string|min:3|max:50',
            'image' => 'string',
            'interested' => 'required|integer|min:1|max:6',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'gender' => $request->gender,
                'age' => $request->age,
                'bio' => $request->bio,
                'location' => $request->location,
                'image' => $request->image,
                'interested' => $request->interested,
            ]);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function login(){
        $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['status' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function me(){
        return response()->json(auth()->user());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'status' => 'done',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
