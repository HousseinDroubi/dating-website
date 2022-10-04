<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\User;

class ChatController extends Controller{
    public function getMessages(Request $request){
        // The below syntax is to get all messages from sender and receiver.
        $messages = Chat::where('sender',$request->sender)
                        ->where('receiver',$request->receiver)
                        ->orWhere('sender',$request->receiver)
                        ->where('receiver',$request->sender)
                        ->orderBy('created_at', 'DESC')->get();
        
        // Retrun response done and all the messages if the above syntax has been executed.
        return response()->json([
            "status" => "done",
            'data'=>$messages
             ]);
    }

    public function sendMessage(Request $request){
        // The below syntax will add a message from sender to receiver.
        $message = Chat::create([
            'sender' => $request->sender,
            'receiver' => $request->receiver,
            'text' => $request->text,
        ]);

        // Retrun response done if the above syntax has been executed.
        return response()->json([
            "status" => "done",
             ]);
    }
}
