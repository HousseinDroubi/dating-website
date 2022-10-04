<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Interester;
use App\Models\Blocker;


class HomeController extends Controller{
    
    public function getUsers(Request $request){
        $user = User::where('id',$request->id)->first();


        $users = array();

        $data = [
            'woman' => 'F',
            'man' => 'M',
            'woman and man' => 'M,F'
        ];

        $interested = Interester::where('id',$user->interested)->first();

        $blocking = Blocker::where('blocking',$user->id)->pluck('blocked');
        $blocked = Blocker::where('blocked',$user->id)->pluck('blocking');

        $locations = User::all()->pluck('location');

        $locations_filter = $locations->unique()->values()->all(); 

        foreach($locations_filter as $location_filter){
            if($data[$interested->interested_in] === 'M,F'){
            $users[$location_filter] = User::where('incognito','0')
                                             ->where('id','!=',$user->id)
                                             ->whereNotIn('id', $blocked)
                                             ->whereNotIn('id', $blocking)
                                             ->where('location',$location_filter)->get();
            }
            else{
            $users[$location_filter] = User::where('gender',$data[$interested->interested_in])
                                            ->where('id','!=',$user->id)
                                            ->where('incognito','0')
                                            ->whereNotIn('id', $blocked)
                                            ->whereNotIn('id', $blocking)
                                            ->where('location',$location_filter)->get();
            }
        }
        return $users;
    }
}
