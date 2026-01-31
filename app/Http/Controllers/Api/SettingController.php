<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'lugar' => 'nullable|string',
            'direccion' => 'nullable|string',
            'referencia' => 'nullable|string',
            'latitud' => 'nullable|string',
            'longitud' => 'nullable|string',
            'mapLink' => 'nullable|string',
        ]);

        foreach ($data as $key => $value) {
            if ($value !== null) {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
        }

        return response()->json(['success' => true, 'message' => 'Settings updated successfully']);
    }
}
