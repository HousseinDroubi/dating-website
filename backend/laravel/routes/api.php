<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\BlockerController;
use App\Http\Controllers\HomeController;

Route::group(["prefix"=> "v0.1"], function(){
    // The below routes will require the token in order to be executed.
    Route::group(["middleware" => "auth:api"], function(){

        // Get all data about a specific user.
        Route::post("/me", [AuthController::class, "me"])->name("me");
        // Update a specific user data.
        Route::post("/update", [AuthController::class, "update"])->name("update");
        
        // Favorite Routes
        // Add user to favorite list.
        Route::post("/favorite/add", [FavoriteController::class, "setFavorite"]);
        // Delete user from favorite list.
        Route::post("/favorite/remove", [FavoriteController::class, "removeFavorite"]);
        // Get all favorite list.
        Route::post("/favorites", [FavoriteController::class, "getFavorites"]);

        // Chat Routes
        // Send message.
        Route::post("/chat/send", [ChatController::class, "sendMessage"]);
        // Get all messages between two users.
        Route::post("/chat", [ChatController::class, "getMessages"]);
        
        //Blocker Routes
        Route::post("/block", [BlockerController::class, "block"]);
        
        //Home Routes
        Route::post("/home", [HomeController::class, "getUsers"]);
   });

   // Register and login requests must not be at the abov middelware since the user doesn't have the token at theses stages.
   Route::post("/register", [AuthController::class, "register"])->name("register");
   Route::post("/login", [AuthController::class, "login"])->name("login");
});