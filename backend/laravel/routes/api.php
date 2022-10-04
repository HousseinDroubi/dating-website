<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(["prefix"=> "v0.1"], function(){
   
    Route::group(["middleware" => "auth:api"], function(){
        // The below routes will require the token in order to be executed.
        Route::post("/me", [AuthController::class, "me"])->name("me");
        Route::post("/update", [AuthController::class, "update"])->name("update");
        Route::post("/store/{id?}", [LandingController::class, "addOrUpdateStore"])->name("add-user"); 
        Route::get("/categories/{id?}", [LandingController::class, "getCategories"])->name("landing-user");
   });
   // Register and login requests must not be at the abov middelware since the user doesn't have the token at theses stages.
   Route::post("/register", [AuthController::class, "register"])->name("register");
   Route::post("/login", [AuthController::class, "login"])->name("login");
   

   Route::get("/not_found", [LandingController::class, "notFound"])->name("not-found");

});