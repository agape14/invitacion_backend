<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReporteInvitadosController;

Route::get('/', function () {
    return view('welcome');
});

// Reporte de invitados (solo admin con token). Ejemplo: /reporte-invitados?token=tu-token
Route::get('/reporte-invitados', [ReporteInvitadosController::class, 'index'])->name('reporte.invitados');
Route::post('/reporte-invitados', [ReporteInvitadosController::class, 'store'])->name('reporte.invitados.store');
Route::put('/reporte-invitados/{invitado}', [ReporteInvitadosController::class, 'update'])->name('reporte.invitados.update');
Route::get('/reporte-invitados/exportar-excel', [ReporteInvitadosController::class, 'exportarExcel'])->name('reporte.invitados.excel');
Route::delete('/reporte-invitados/{invitado}', [ReporteInvitadosController::class, 'destroy'])->name('reporte.invitados.destroy');
