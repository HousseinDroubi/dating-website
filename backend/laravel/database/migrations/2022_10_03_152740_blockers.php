<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Blockers extends Migration{

    public function up(){
        Schema::create('blockers', function (Blueprint $table) {
            $table->integer("blocking");
            $table->integer("blocked");
            $table->timestamps();
            $table->primary(['blocking','blocked']);
        });
    }

    public function down(){
        //
    }
}
