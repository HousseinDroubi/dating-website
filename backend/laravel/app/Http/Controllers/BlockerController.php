<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blocker;

class BlockerController extends Controller{
   public function block(Request $request){
        // The below syntax will add this user to blocking and the blocked one.
        $block = Blocker::create([
            'blocking' => $request->blocking,
            'blocked' => $request->blocked,
        ]);

        // Retrun response blocked  if the above syntax has been executed.
        return response()->json([
            "status" => "blocked"
             ]);
    }
}
