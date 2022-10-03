<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Favorites extends Migration
{
    public function up(){
        Schema::create('favorites', function (Blueprint $table) {
            $table->integer("id");
            $table->integer("favorite");
            $table->timestamps();
            $table->primary(['id','favorite']);
        });
    }

    public function down(){
        //
    }
}
