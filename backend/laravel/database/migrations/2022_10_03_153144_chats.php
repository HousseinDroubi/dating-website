<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Chats extends Migration
{
    public function up(){
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->integer("sender");
            $table->integer("receiver");
            $table->string("text");
            $table->timestamps();
        });
    }

    public function down(){
        //
    }
}
