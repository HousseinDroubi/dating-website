<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(["prefix"=> "v0.1"], function(){
   
    Route::group(["middleware" => "auth:api"], function(){
        Route::post("/me", [AuthController::class, "me"])->name("me");
        Route::get("/logout", [AuthController::class, "logout"])->name("landing-user");
        Route::post("/store/{id?}", [LandingController::class, "addOrUpdateStore"])->name("add-user"); 
        Route::get("/categories/{id?}", [LandingController::class, "getCategories"])->name("landing-user");
   });
   
   Route::post("/register", [AuthController::class, "register"])->name("register");
   Route::post("/login", [AuthController::class, "login"])->name("login");
  
   Route::get("/not_found", [LandingController::class, "notFound"])->name("not-found");

});