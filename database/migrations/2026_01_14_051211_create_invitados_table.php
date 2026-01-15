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
        Schema::create('invitados', function (Blueprint $table) {
            $table->id();
            $table->string('nombres_completos');
            $table->integer('cantidad_adultos')->default(1);
            $table->integer('cantidad_ninos')->default(0);
            $table->json('edades_ninos')->nullable();
            $table->boolean('requiere_cochera')->default(false);
            $table->string('ip_address', 45);
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index('ip_address');
            $table->index('nombres_completos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitados');
    }
};
