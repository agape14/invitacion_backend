<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de invitados - Admin</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 1rem; background: #f5f5f5; }
        h1 { color: #333; margin-bottom: 1rem; }
        .meta { color: #666; margin-bottom: 0.5rem; font-size: 0.9rem; }
        .toolbar { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; align-items: center; }
        .btn { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.9rem; font-weight: 500; text-decoration: none; border: none; cursor: pointer; }
        .btn-pdf { background: #dc2626; color: #fff; }
        .btn-pdf:hover { background: #b91c1c; }
        .btn-excel { background: #16a34a; color: #fff; }
        .btn-excel:hover { background: #15803d; }
        .btn-print { background: #2563eb; color: #fff; }
        .btn-print:hover { background: #1d4ed8; }
        .btn-delete { background: #dc2626; color: #fff; padding: 0.35rem 0.65rem; font-size: 0.8rem; }
        .btn-delete:hover { background: #b91c1c; }
        @media print { .toolbar, .btn-delete, .no-print { display: none !important; } }
        table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
        th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #FFD93D; color: #333; font-weight: 600; }
        tr:hover { background: #fafafa; }
        .total { margin-top: 1rem; font-weight: 600; color: #333; }
        .no-data { padding: 2rem; text-align: center; color: #666; }
        .success { background: #dcfce7; color: #166534; padding: 0.5rem 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
        @media (max-width: 768px) {
            table, thead, tbody, th, td, tr { display: block; }
            thead tr { position: absolute; top: -9999px; left: -9999px; }
            tr { margin-bottom: 1rem; border: 1px solid #eee; border-radius: 8px; padding: 0.5rem; }
            td { padding-left: 50%; position: relative; border: none; }
            td::before { content: attr(data-label); position: absolute; left: 0.5rem; font-weight: 600; }
        }
    </style>
</head>
<body>
    <h1>Reporte de invitados</h1>
    <p class="meta">Total: {{ $invitados->count() }} invitado(s) confirmado(s)</p>

    <div class="toolbar no-print">
        <a href="{{ route('reporte.invitados.excel', ['token' => $token]) }}" class="btn btn-excel">Exportar Excel</a>
        <button type="button" class="btn btn-pdf" onclick="window.print();">Exportar PDF</button>
        <button type="button" class="btn btn-print" onclick="window.print();">Imprimir</button>
    </div>

    @if(session('success'))
        <p class="success">{{ session('success') }}</p>
    @endif

    @if($invitados->isEmpty())
        <p class="no-data">Aún no hay invitados confirmados.</p>
    @else
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombres</th>
                    <th>Adultos</th>
                    <th>Niños</th>
                    <th>Niñas</th>
                    <th>Edades niños</th>
                    <th>Edades niñas</th>
                    <th>IP</th>
                    <th>Fecha</th>
                    <th class="no-print">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach($invitados as $i => $inv)
                <tr>
                    <td data-label="#">{{ $i + 1 }}</td>
                    <td data-label="Nombres">{{ $inv->nombres_completos }}</td>
                    <td data-label="Adultos">{{ $inv->cantidad_adultos }}</td>
                    <td data-label="Niños">{{ $inv->cantidad_ninos }}</td>
                    <td data-label="Niñas">{{ $inv->cantidad_ninas ?? 0 }}</td>
                    <td data-label="Edades niños">
                        @php
                            $edadesNinosStr = '';
                            if (is_array($inv->edades_ninos) && count($inv->edades_ninos) > 0) {
                                $parts = [];
                                foreach ($inv->edades_ninos as $e) {
                                    $valor = is_array($e) ? ($e['valor'] ?? null) : ($e->valor ?? null);
                                    $unidad = is_array($e) ? ($e['unidad'] ?? 'años') : ($e->unidad ?? 'años');
                                    if ($valor !== null && $valor !== '') {
                                        $num = (int) $valor;
                                        if ($unidad === 'meses') {
                                            $parts[] = $num . ' ' . ($num === 1 ? 'mes' : 'meses');
                                        } else {
                                            $parts[] = $num . ' ' . ($num === 1 ? 'año' : 'años');
                                        }
                                    } elseif (is_numeric($e)) {
                                        $parts[] = (int)$e . ' años';
                                    }
                                }
                                $edadesNinosStr = implode(', ', $parts);
                            }
                        @endphp
                        {{ $edadesNinosStr ?: '-' }}
                    </td>
                    <td data-label="Edades niñas">
                        @php
                            $edadesNinasStr = '';
                            if (is_array($inv->edades_ninas) && count($inv->edades_ninas) > 0) {
                                $parts = [];
                                foreach ($inv->edades_ninas as $e) {
                                    $valor = is_array($e) ? ($e['valor'] ?? null) : ($e->valor ?? null);
                                    $unidad = is_array($e) ? ($e['unidad'] ?? 'años') : ($e->unidad ?? 'años');
                                    if ($valor !== null && $valor !== '') {
                                        $num = (int) $valor;
                                        if ($unidad === 'meses') {
                                            $parts[] = $num . ' ' . ($num === 1 ? 'mes' : 'meses');
                                        } else {
                                            $parts[] = $num . ' ' . ($num === 1 ? 'año' : 'años');
                                        }
                                    } elseif (is_numeric($e)) {
                                        $parts[] = (int)$e . ' años';
                                    }
                                }
                                $edadesNinasStr = implode(', ', $parts);
                            }
                        @endphp
                        {{ $edadesNinasStr ?: '-' }}
                    </td>
                    <td data-label="IP">{{ $inv->ip_address }}</td>
                    <td data-label="Fecha">{{ $inv->created_at->format('d/m/Y H:i') }}</td>
                    <td data-label="Acciones" class="no-print">
                        <form action="{{ route('reporte.invitados.destroy', ['invitado' => $inv, 'token' => $token]) }}" method="post" style="display:inline;" onsubmit="return confirm('¿Eliminar a {{ addslashes($inv->nombres_completos) }}?');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-delete">Eliminar</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @php
            $totalAdultos = $invitados->sum('cantidad_adultos');
            $totalNinos = $invitados->sum('cantidad_ninos');
            $totalNinas = $invitados->sum('cantidad_ninas');
        @endphp
        <p class="total">
            Resumen: {{ $totalAdultos }} adulto(s), {{ $totalNinos }} niño(s), {{ $totalNinas }} niña(s).
            Total personas: {{ $totalAdultos + $totalNinos + $totalNinas }}.
        </p>
    @endif
</body>
</html>
