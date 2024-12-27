<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->String('nom_pr');
            $table->String('marque_pr');
            $table->String('category_pr');
            $table->Text('description_pr');
            $table->Float('prix_pr');
            $table->Integer('stock_pr');
            $table->String('image_pr');
            $table->String('image2')->nullable();
            $table->String('image3')->nullable();
            $table->String('image4')->nullable();
            $table->String('image5')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
