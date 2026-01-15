<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InvitadoController;

Route::prefix('v1')->group(function () {
    Route::post('/invitados', [InvitadoController::class, 'store']);
    Route::get('/settings', [App\Http\Controllers\Api\SettingController::class, 'index']);
    Route::post('/settings', [App\Http\Controllers\Api\SettingController::class, 'store']);
});

