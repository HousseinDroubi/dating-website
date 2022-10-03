<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Interesters extends Migration{
     public function up(){
        Schema::create('interesters', function (Blueprint $table) {
            $table->id();
            $table->string("gender");
            $table->string("interested_in");
            $table->timestamps();
        });
    }

    public function down()
    {
        //
    }
}
