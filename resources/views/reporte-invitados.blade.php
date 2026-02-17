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
        .btn-add { background: #16a34a; color: #fff; }
        .btn-add:hover { background: #15803d; }
        .btn-edit { background: #2563eb; color: #fff; padding: 0.35rem 0.65rem; font-size: 0.8rem; margin-right: 0.25rem; }
        .btn-edit:hover { background: #1d4ed8; }
        @media print { .toolbar, .btn-delete, .btn-edit, .no-print { display: none !important; } }
        .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center; }
        .modal-overlay.open { display: flex; }
        .modal-box { background: #fff; border-radius: 12px; max-width: 500px; width: 95%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .modal-box h2 { margin: 0 0 1rem; font-size: 1.25rem; color: #333; }
        .modal-box label { display: block; font-weight: 600; margin-bottom: 0.25rem; font-size: 0.9rem; color: #374151; }
        .modal-box input, .modal-box select { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.9rem; margin-bottom: 1rem; }
        .modal-box .form-row { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
        .modal-box .form-row input { flex: 1; margin-bottom: 0; }
        .modal-box .form-row select { width: auto; min-width: 90px; margin-bottom: 0; }
        .modal-box .modal-actions { display: flex; gap: 0.5rem; margin-top: 1.5rem; justify-content: flex-end; }
        table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
        th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #FFD93D; color: #333; font-weight: 600; }
        tr:hover { background: #fafafa; }
        .total { margin-top: 1rem; font-weight: 600; color: #333; }
        .no-data { padding: 2rem; text-align: center; color: #666; }
        .success { background: #dcfce7; color: #166534; padding: 0.5rem 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
        .error { background: #fee2e2; color: #991b1b; padding: 0.5rem 1rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
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
        <button type="button" class="btn btn-add" onclick="abrirModalAgregar()">AGREGAR</button>
        <a href="{{ route('reporte.invitados.excel', ['token' => $token]) }}" class="btn btn-excel">Exportar Excel</a>
        <button type="button" class="btn btn-pdf" onclick="window.print();">Exportar PDF</button>
        <button type="button" class="btn btn-print" onclick="window.print();">Imprimir</button>
    </div>

    @if(session('success'))
        <p class="success">{{ session('success') }}</p>
    @endif

    @if($errors->any())
        <p class="error">{{ $errors->first() }}</p>
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
                        <button type="button" class="btn btn-edit" onclick='abrirModalEditar({{ json_encode([
                            "id" => $inv->id,
                            "nombres_completos" => $inv->nombres_completos,
                            "cantidad_adultos" => $inv->cantidad_adultos,
                            "cantidad_ninos" => $inv->cantidad_ninos,
                            "cantidad_ninas" => $inv->cantidad_ninas ?? 0,
                            "edades_ninos" => $inv->edades_ninos ?? [],
                            "edades_ninas" => $inv->edades_ninas ?? [],
                        ]) }})'>Editar</button>
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

    {{-- Modal para agregar / editar invitado --}}
    <div id="modalInvitado" class="modal-overlay" onclick="if(event.target===this) cerrarModal()">
        <div class="modal-box" onclick="event.stopPropagation()">
            <h2 id="modalTitulo">Agregar invitado</h2>
            <form id="formInvitado" method="post" action="{{ route('reporte.invitados.store', ['token' => $token]) }}">
                @csrf
                <input type="hidden" name="token" value="{{ $token }}">
                <div id="formMethod"></div>
                <div>
                    <label for="nombres_completos">Nombres completos *</label>
                    <input type="text" id="nombres_completos" name="nombres_completos" required placeholder="Ej: Juan Pérez">
                </div>
                <div>
                    <label for="cantidad_adultos">Cantidad de adultos *</label>
                    <input type="number" id="cantidad_adultos" name="cantidad_adultos" min="1" value="1" required>
                </div>
                <div>
                    <label for="cantidad_ninos">Cantidad de niños (masculino)</label>
                    <input type="number" id="cantidad_ninos" name="cantidad_ninos" min="0" value="0" placeholder="0">
                </div>
                <div id="contenedorEdadesNinos" style="display:none;">
                    <label>Edades de los niños</label>
                    <div id="edadesNinosLista"></div>
                </div>
                <div>
                    <label for="cantidad_ninas">Cantidad de niñas (femenino)</label>
                    <input type="number" id="cantidad_ninas" name="cantidad_ninas" min="0" value="0" placeholder="0">
                </div>
                <div id="contenedorEdadesNinas" style="display:none;">
                    <label>Edades de las niñas</label>
                    <div id="edadesNinasLista"></div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn" style="background:#6b7280;color:#fff;" onclick="cerrarModal()">Cancelar</button>
                    <button type="submit" class="btn btn-add">Guardar</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const token = '{{ $token }}';
        const modal = document.getElementById('modalInvitado');
        const form = document.getElementById('formInvitado');
        const formMethod = document.getElementById('formMethod');
        const modalTitulo = document.getElementById('modalTitulo');
        const nombresInput = document.getElementById('nombres_completos');
        const cantidadAdultosInput = document.getElementById('cantidad_adultos');
        const cantidadNinosInput = document.getElementById('cantidad_ninos');
        const cantidadNinasInput = document.getElementById('cantidad_ninas');
        const contenedorEdadesNinos = document.getElementById('contenedorEdadesNinos');
        const contenedorEdadesNinas = document.getElementById('contenedorEdadesNinas');
        const edadesNinosLista = document.getElementById('edadesNinosLista');
        const edadesNinasLista = document.getElementById('edadesNinasLista');

        function abrirModalAgregar() {
            modalTitulo.textContent = 'Agregar invitado';
            form.action = '{{ url("reporte-invitados") }}?token=' + token;
            formMethod.innerHTML = '';
            nombresInput.value = '';
            cantidadAdultosInput.value = '1';
            cantidadNinosInput.value = '0';
            cantidadNinasInput.value = '0';
            actualizarEdades(0, 0);
            modal.classList.add('open');
        }

        function abrirModalEditar(datos) {
            modalTitulo.textContent = 'Editar invitado';
            form.action = '{{ url("reporte-invitados") }}/' + datos.id + '?token=' + token;
            formMethod.innerHTML = '<input type="hidden" name="_method" value="PUT">';
            nombresInput.value = datos.nombres_completos || '';
            cantidadAdultosInput.value = datos.cantidad_adultos || 1;
            cantidadNinosInput.value = datos.cantidad_ninos || 0;
            cantidadNinasInput.value = datos.cantidad_ninas || 0;
            actualizarEdades(datos.cantidad_ninos || 0, datos.cantidad_ninas || 0, datos.edades_ninos || [], datos.edades_ninas || []);
            modal.classList.add('open');
        }

        function cerrarModal() {
            modal.classList.remove('open');
        }

        function initEdad(edades, i) {
            if (edades && edades[i]) {
                const e = edades[i];
                const v = typeof e === 'object' ? (e.valor ?? e) : e;
                const u = (typeof e === 'object' && e.unidad === 'meses') ? 'meses' : 'años';
                return { valor: parseInt(v, 10) || 0, unidad: u };
            }
            return { valor: 0, unidad: 'años' };
        }

        function leerEdadesActuales() {
            const ninos = [];
            edadesNinosLista.querySelectorAll('input[name^="edades_ninos"]').forEach(function(inp) {
                const name = inp.getAttribute('name');
                const idx = name.match(/\[(\d+)\]/)?.[1];
                if (idx !== undefined) {
                    const row = inp.closest('.form-row');
                    const select = row?.querySelector('select[name^="edades_ninos"]');
                    ninos[parseInt(idx, 10)] = {
                        valor: parseInt(inp.value, 10) || 0,
                        unidad: select?.value === 'meses' ? 'meses' : 'años'
                    };
                }
            });
            const ninas = [];
            edadesNinasLista.querySelectorAll('input[name^="edades_ninas"]').forEach(function(inp) {
                const name = inp.getAttribute('name');
                const idx = name.match(/\[(\d+)\]/)?.[1];
                if (idx !== undefined) {
                    const row = inp.closest('.form-row');
                    const select = row?.querySelector('select[name^="edades_ninas"]');
                    ninas[parseInt(idx, 10)] = {
                        valor: parseInt(inp.value, 10) || 0,
                        unidad: select?.value === 'meses' ? 'meses' : 'años'
                    };
                }
            });
            return { ninos, ninas };
        }

        function actualizarEdades(cantNinos, cantNinas, edadesNinosData, edadesNinasData) {
            const actuales = leerEdadesActuales();
            edadesNinosData = edadesNinosData ?? actuales.ninos;
            edadesNinasData = edadesNinasData ?? actuales.ninas;

            contenedorEdadesNinos.style.display = cantNinos > 0 ? 'block' : 'none';
            edadesNinosLista.innerHTML = '';
            for (let i = 0; i < cantNinos; i++) {
                const e = initEdad(edadesNinosData, i);
                edadesNinosLista.innerHTML += '<div class="form-row"><label style="min-width:100px;">Niño ' + (i+1) + '</label><input type="number" name="edades_ninos[' + i + '][valor]" min="0" max="36" value="' + e.valor + '"><select name="edades_ninos[' + i + '][unidad]"><option value="meses"' + (e.unidad === 'meses' ? ' selected' : '') + '>mes(es)</option><option value="años"' + (e.unidad === 'años' ? ' selected' : '') + '>año(s)</option></select></div>';
            }

            contenedorEdadesNinas.style.display = cantNinas > 0 ? 'block' : 'none';
            edadesNinasLista.innerHTML = '';
            for (let i = 0; i < cantNinas; i++) {
                const e = initEdad(edadesNinasData, i);
                edadesNinasLista.innerHTML += '<div class="form-row"><label style="min-width:100px;">Niña ' + (i+1) + '</label><input type="number" name="edades_ninas[' + i + '][valor]" min="0" max="36" value="' + e.valor + '"><select name="edades_ninas[' + i + '][unidad]"><option value="meses"' + (e.unidad === 'meses' ? ' selected' : '') + '>mes(es)</option><option value="años"' + (e.unidad === 'años' ? ' selected' : '') + '>año(s)</option></select></div>';
            }
        }

        function onCantidadChange() {
            const nNinos = parseInt(cantidadNinosInput.value, 10) || 0;
            const nNinas = parseInt(cantidadNinasInput.value, 10) || 0;
            actualizarEdades(nNinos, nNinas);
        }
        cantidadNinosInput.addEventListener('change', onCantidadChange);
        cantidadNinosInput.addEventListener('input', onCantidadChange);
        cantidadNinasInput.addEventListener('change', onCantidadChange);
        cantidadNinasInput.addEventListener('input', onCantidadChange);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') cerrarModal();
        });
    </script>
</body>
</html>
