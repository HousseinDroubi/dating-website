<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blocker;
use App\Models\Favorite;

class BlockerController extends Controller{
   public function block(Request $request){
        // The below syntax will add this user to blocking and the blocked one.
        $block = Blocker::create([
            'blocking' => $request->blocking,
            'blocked' => $request->blocked,
        ]);

        //The below two syntaxes will check if the user has added the other user to favorite list 
        // in order to be deleted later on since this funtion is to block a user. 
        $favorite = Favorite::where('favoriting',$request->blocking)->where('favorited',$request->blocked);
        $favorite1 = Favorite::where('favoriting',$request->blocked)->where('favorited',$request->blocking);
       
       if($favorite){
            $favorite->delete();
       }

       if($favorite1){
        $favorite1->delete();
       }
        // Retrun response blocked  if the above syntax has been executed.
        return response()->json([
            "status" => "blocked"
             ]);
    }
}
