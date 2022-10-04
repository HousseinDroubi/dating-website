<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller{
    // Get all parameters using POST method and put our validations which are the same as js side.
    public function register(Request $request){
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
        // If one of the validations didn't executed, the response will be error '400
        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        // Otherewise, this user will be created into the users table.
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
        // Return the data of this user that has just been created.
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }
    // Login user function and get the token which will return a token.
    public function login(){
        $credentials = request(['email', 'password']);
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['status' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }
    // The below function will return all '$fillable' putted into User model.
    public function me(){
        return response()->json(auth()->user());
    }
    // Return the token and status done.
    protected function respondWithToken($token){
        return response()->json([
            'status' => 'done',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
    // Update profile
    public function update(Request $request){
        if($request){
            // Get all parameters using POST method
            $user = User::find($request->id);
            $user->username = $request->username ;
            $user->bio = $request->bio ;
            $user->location = $request->location ;
            $user->gender = $request->gender ;
            $user->incognito = $request->incognito ;
            $user->interested = $request->interested ;
            $user->age = $request->age ;
            // Here, if the image was 'na' from js, that means the user hasn't changed his profile image,
            // otherwise, the response will be about a base64 image encoded
            if($request->image!="na"){
                // Path of all images
                $path_image=str_replace("laravel","users",base_path());
                date_default_timezone_set('Asia/Beirut');
                $current_time = date ("Y-m-d H:i:s");
                // Decode the image
                $image_decoded =base64_decode($request->image);
                // Rename the image to a unique name into users images folder.
                $path_image=$path_image."/".strtotime($current_time).".png";
                file_put_contents($path_image, $image_decoded);
                // In order to show the image at js side, we've to change the name from c\\xampp... to http://localhost
                $path_image=str_replace("C:\\xampp\htdocs","http://localhost",$path_image);
                $user->image = $path_image ;
            }
            // If the parameters have been changed, the satus must be 'Success'.
            if($user->save()){
                return response()->json([
                    "status" => "Success",
                    "data" => $user
                ]);
            }
            // If the parameters have not been changed, the satus must be 'Error'.
            return response()->json([
                "status" => "Error",
                "data" => "Error updating data"
            ]);

        }
        // If the parameters have not been sent, the satus must be 'Error' also.
        return response()->json([
        "status" => "error",
        "data" => "missed data"
         ]);
    }
}
