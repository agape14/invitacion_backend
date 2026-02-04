<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invitado;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class InvitadoController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombres_completos' => 'required|string|max:255',
            'cantidad_adultos' => 'required|integer|min:1',
            'cantidad_ninos' => 'required|integer|min:0',
            'cantidad_ninas' => 'required|integer|min:0',
            'edades_ninos' => 'nullable|array',
            'edades_ninos.*.valor' => 'required|integer|min:0|max:36',
            'edades_ninos.*.unidad' => 'required|in:años,meses',
            'edades_ninas' => 'nullable|array',
            'edades_ninas.*.valor' => 'required|integer|min:0|max:36',
            'edades_ninas.*.unidad' => 'required|in:años,meses',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();

        // Validar que no exista un registro con el mismo nombre completo
        $existeNombre = Invitado::where('nombres_completos', $request->nombres_completos)->exists();
        if ($existeNombre) {
            return response()->json([
                'success' => false,
                'message' => 'Ya existe un registro con este nombre completo.'
            ], 409);
        }

        // Validar que no exista un registro con la misma IP
        $existeIp = Invitado::where('ip_address', $ipAddress)->exists();
        if ($existeIp) {
            return response()->json([
                'success' => false,
                'message' => 'Solo se permite un registro por dirección IP.'
            ], 409);
        }

        // Validar que las edades coincidan con la cantidad de niños
        if ($request->cantidad_ninos > 0) {
            $edadesNinos = $request->edades_ninos ?? [];
            if (count($edadesNinos) !== $request->cantidad_ninos) {
                return response()->json([
                    'success' => false,
                    'message' => 'La cantidad de edades debe coincidir con la cantidad de niños.'
                ], 422);
            }
        }
        if ($request->cantidad_ninas > 0) {
            $edadesNinas = $request->edades_ninas ?? [];
            if (count($edadesNinas) !== $request->cantidad_ninas) {
                return response()->json([
                    'success' => false,
                    'message' => 'La cantidad de edades debe coincidir con la cantidad de niñas.'
                ], 422);
            }
        }

        try {
            $invitado = Invitado::create([
                'nombres_completos' => $request->nombres_completos,
                'cantidad_adultos' => $request->cantidad_adultos,
                'cantidad_ninos' => $request->cantidad_ninos,
                'cantidad_ninas' => $request->cantidad_ninas,
                'edades_ninos' => $request->edades_ninos ?? [],
                'edades_ninas' => $request->edades_ninas ?? [],
                'requiere_cochera' => false,
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
            ]);

            return response()->json([
                'success' => true,
                'message' => '¡Confirmación registrada exitosamente!',
                'data' => $invitado
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar la confirmación.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
