<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\User;

class FavoriteController extends Controller{
    
    public function getFavorites(Request $request){
        // The below variable will get all the favories data of this user.
        $favorites = Favorite::where('favoriting',$request->favoriting)->get();
        // Define an array in order to fill it with favorited ones.
        $users = array();
        // Here, we are filling the favorited users' data into $users array
        foreach($favorites as $favorite){
            array_push($users,User::where('id',$favorite->favorited)->get());
        }
        // Retrun the $user array
        return response()->json([
            "status" => "done",
            "data" => $users
             ]);
    }

    public function setFavorite(Request $request){
        // Add a favorite id to table favorites into the DataBase.
        $favorite = Favorite::create([
            'favoriting' => $request->favoriting,
            'favorited' => $request->favorited,
        ]);
        // If the above systax will be executed, then, the response must be success.
        if($favorite->save()){
            return response()->json([
                "status" => "Success"
            ]);
        }

    }

    public function removeFavorite(Request $request){
        // Delete a favorite id from tale favorites into the DataBase.
        $favorite = Favorite::where('favoriting',$request->favoriting)
                              ->where('favorited',$request->favorited)->first();

        // If the above systax will be executed, then, the response must be deleted.                 
        if($favorite->delete()){
            return response()->json([
                "status" => "deleted"
            ]);
        }
    }
}
