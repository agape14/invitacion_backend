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
        Schema::table('invitados', function (Blueprint $table) {
            $table->integer('cantidad_ninas')->default(0)->after('cantidad_ninos');
            $table->json('edades_ninas')->nullable()->after('edades_ninos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitados', function (Blueprint $table) {
            $table->dropColumn(['cantidad_ninas', 'edades_ninas']);
        });
    }
};
