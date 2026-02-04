<?php

namespace App\Http\Controllers;

use App\Models\Invitado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReporteInvitadosController extends Controller
{
    private function validateToken(Request $request): string
    {
        $token = config('app.admin_report_token');
        $requestToken = $request->query('token');

        if (empty($token) || $requestToken !== $token) {
            abort(403, 'No autorizado para ver este reporte.');
        }

        return $requestToken;
    }

    /**
     * Muestra el reporte de invitados. Solo accesible con el token de admin.
     */
    public function index(Request $request)
    {
        $token = $this->validateToken($request);
        $invitados = Invitado::orderBy('created_at', 'desc')->get();

        return view('reporte-invitados', compact('invitados', 'token'));
    }

    /**
     * Exporta el reporte a CSV (abre en Excel).
     */
    public function exportarExcel(Request $request): StreamedResponse
    {
        $this->validateToken($request);
        $invitados = Invitado::orderBy('created_at', 'desc')->get();

        $filename = 'reporte-invitados-' . date('Y-m-d-His') . '.csv';

        return Response::streamDownload(function () use ($invitados) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['#', 'Nombres', 'Adultos', 'Niños', 'Niñas', 'Edades niños', 'Edades niñas', 'IP', 'Fecha'], ';');
            foreach ($invitados as $i => $inv) {
                $edadesNinos = $this->formatearEdades($inv->edades_ninos);
                $edadesNinas = $this->formatearEdades($inv->edades_ninas);
                fputcsv($out, [
                    $i + 1,
                    $inv->nombres_completos,
                    $inv->cantidad_adultos,
                    $inv->cantidad_ninos,
                    $inv->cantidad_ninas ?? 0,
                    $edadesNinos,
                    $edadesNinas,
                    $inv->ip_address,
                    $inv->created_at->format('d/m/Y H:i'),
                ], ';');
            }
            fclose($out);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    private function formatearEdades(?array $edades): string
    {
        if (!is_array($edades) || count($edades) === 0) {
            return '-';
        }
        $parts = [];
        foreach ($edades as $e) {
            $valor = is_array($e) ? ($e['valor'] ?? null) : ($e->valor ?? null);
            $unidad = is_array($e) ? ($e['unidad'] ?? 'años') : ($e->unidad ?? 'años');
            if ($valor !== null && $valor !== '') {
                $num = (int) $valor;
                $parts[] = $num . ($unidad === 'meses' ? ' mes(es)' : ' año(s)');
            } elseif (is_numeric($e)) {
                $parts[] = (int) $e . ' años';
            }
        }
        return implode(', ', $parts) ?: '-';
    }

    /**
     * Elimina un invitado. Solo accesible con el token de admin.
     */
    public function destroy(Request $request, Invitado $invitado)
    {
        $token = $this->validateToken($request);
        $invitado->delete();

        return redirect()->route('reporte.invitados', ['token' => $token])
            ->with('success', 'Invitado eliminado correctamente.');
    }
}
