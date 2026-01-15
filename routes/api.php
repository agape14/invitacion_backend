<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InvitadoController;

Route::prefix('v1')->group(function () {
    Route::post('/invitados', [InvitadoController::class, 'store']);
});

