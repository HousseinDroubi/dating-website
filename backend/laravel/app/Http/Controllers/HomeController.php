<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Interester;
use App\Models\Blocker;


class HomeController extends Controller{
    
    public function getUsers(Request $request){
        // Here, we are getting the specific user
        $user = User::where('id',$request->id)->first();
        // Here, we are creating an array in order to fill it with interested users
        $users = array();

        $data = [
            'woman' => 'F',
            'man' => 'M',
            'woman and man' => 'M,F'
        ];
        // Here we are getting what exactly this user might interest as real genders
        $interested = Interester::where('id',$user->interested)->first();

        // In the below two syntaxes, we are fetching who are the users that are blocking this user
        // or that are blocked by this user.
        $blocking = Blocker::where('blocking',$user->id)->pluck('blocked');
        $blocked = Blocker::where('blocked',$user->id)->pluck('blocking');
        
        // Get all location in the DataBase.
        $locations = User::all()->pluck('location');
        // Filter the location and remove the duplicates rows
        $locations_filter = $locations->unique()->values()->all(); 

        // Here, we are filtering the users depending on their locations.
        foreach($locations_filter as $location_filter){
            // Getting the users interests depending on both genders.
            if($data[$interested->interested_in] === 'M,F'){
            $users[$location_filter] = User::where('incognito','0')
                                             ->where('id','!=',$user->id)
                                             ->whereNotIn('id', $blocked)
                                             ->whereNotIn('id', $blocking)
                                             ->where('location',$location_filter)->get();
            }
            else{
                 // Getting the users interests depending on specific gender.
            $users[$location_filter] = User::where('gender',$data[$interested->interested_in])
                                            ->where('id','!=',$user->id)
                                            ->where('incognito','0')
                                            ->whereNotIn('id', $blocked)
                                            ->whereNotIn('id', $blocking)
                                            ->where('location',$location_filter)->get();
            }
        }
        
            return response()->json([
                "status" => "done",
                "data" => $users
            ]);
        
    }
}