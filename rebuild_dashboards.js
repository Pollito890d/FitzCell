const fs = require('fs');

// ============================================================
// DASHBOARD ENCARGADO
// ============================================================
const encHtml = fs.readFileSync('./admin/dashboard_encargado.html', 'utf8');
const encBefore = encHtml.substring(0, encHtml.indexOf('<script>'));

const encScript = `<script>
    const r = localStorage.getItem('fitzcell_rol');
    if(r !== 'encargado' && r !== 'admin') { window.location.href = '../login.html'; }
    function logout() { localStorage.clear(); window.location.href = '../login.html'; }
    const fmt = (v) => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(v||0);

    function showSection(id) {
      document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));
      document.getElementById(id).classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-brand/10','text-brand','font-bold','border','border-brand/20');
        el.classList.add('text-gray-400','hover:bg-gray-800');
      });
      const a = document.getElementById('nav-'+id);
      if(a){ a.classList.remove('text-gray-400','hover:bg-gray-800'); a.classList.add('bg-brand/10','text-brand','font-bold','border','border-brand/20'); }
      const loaders = { 'sec-resumen':loadResumen,'sec-inventario':loadInventario,'sec-empleados':loadEmpleados,'sec-reparaciones':loadReparaciones,'sec-ventas':loadVentas };
      if(loaders[id]) loaders[id]();
    }

    let allInv = [];

    async function loadResumen(){
      try{
        const r1 = await fetch('/api/reparaciones');
        const r2 = await fetch('/api/crm/ingresos');
        if(r1.ok){
          const d = await r1.json();
          document.getElementById('res-reparaciones').innerText = d.length;
          let h = '';
          d.slice(0,3).forEach(rep => {
            h += '<div class="flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800"><p class="font-bold">' + (rep.codigo_seguimiento||'—') + '</p><span class="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full border border-brand/20">' + rep.estado + '</span></div>';
          });
          document.getElementById('res-ultimas-rep').innerHTML = h || '<p class="text-gray-500 text-sm">Sin reparaciones activas.</p>';
        }
        if(r2.ok){ const d = await r2.json(); document.getElementById('res-ingresos').innerText = fmt(d.total_ingresos); }
      }catch(e){ console.error(e); }
    }

    async function loadInventario(){
      try{
        const res = await fetch('/api/inventario');
        if(res.ok){
          allInv = await res.json();
          renderCats();
          renderInv(null);
          const al = allInv.filter(p => p.stock <= 5).length;
          document.getElementById('res-alertas').innerText = al + ' refacciones';
        }
      }catch(e){ console.error(e); }
    }

    function renderCats(){
      const cats = [...new Set(allInv.map(i => i.categoria))];
      let h = '<button onclick="renderInv(null)" class="whitespace-nowrap px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-bold transition">Todas</button>';
      cats.forEach(c => {
        if(c) h += '<button onclick="renderInv(\'' + c + '\')" class="whitespace-nowrap px-4 py-2 bg-gray-800 hover:bg-brand text-white rounded-lg text-sm font-bold transition">' + c + '</button>';
      });
      document.getElementById('inv-categorias').innerHTML = h;
    }

    function renderInv(cat){
      const data = cat ? allInv.filter(i => i.categoria === cat) : allInv;
      let h = '';
      data.forEach(it => {
        const sc = it.stock <= 5 ? 'bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-900/50' : '';
        h += '<tr class="hover:bg-gray-800/50 transition"><td class="p-4 font-medium">' + it.nombre_producto + '</td><td class="p-4 text-gray-400">' + (it.categoria||'—') + '</td><td class="p-4">' + fmt(it.precio_compra) + '</td><td class="p-4 font-bold text-brand">' + fmt(it.precio_venta) + '</td><td class="p-4 text-center"><span class="' + sc + '">' + it.stock + '</span></td></tr>';
      });
      document.getElementById('inv-tbody').innerHTML = h || '<tr><td colspan="5" class="p-4 text-center text-gray-500">Sin productos</td></tr>';
    }

    function loadEmpleados(){
      document.getElementById('emp-lista').innerHTML = '<div class="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4"><div class="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-xl">C</div><div class="flex-1"><h3 class="font-bold text-lg">Carlos</h3><p class="text-gray-400 text-sm">carlos@fitzcell.com</p></div><span class="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-bold rounded-full border border-blue-900/50">Técnico</span></div><div class="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4"><div class="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold text-xl">A</div><div class="flex-1"><h3 class="font-bold text-lg">Ana</h3><p class="text-gray-400 text-sm">ana@fitzcell.com</p></div><span class="px-3 py-1 bg-pink-900/30 text-pink-400 text-xs font-bold rounded-full border border-pink-900/50">Ventas</span></div>';
    }

    async function loadReparaciones(){
      try{
        const res = await fetch('/api/reparaciones');
        if(res.ok){
          const d = await res.json();
          let h = '';
          d.forEach(rep => {
            h += '<tr class="hover:bg-gray-800/50 transition"><td class="p-4 font-bold text-white">' + (rep.codigo_seguimiento||'—') + '</td><td class="p-4 text-gray-400">ID: ' + (rep.id_dispositivo||'—') + '</td><td class="p-4 text-gray-400 truncate max-w-xs">' + (rep.falla_reportada||'—') + '</td><td class="p-4 font-bold text-brand">' + fmt(rep.costo) + '</td><td class="p-4 text-center"><span class="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">' + rep.estado + '</span></td></tr>';
          });
          document.getElementById('rep-tbody').innerHTML = h || '<tr><td colspan="5" class="p-4 text-center text-gray-500">Sin órdenes</td></tr>';
        }
      }catch(e){ console.error(e); }
    }

    function loadVentas(){
      document.getElementById('ven-tbody').innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500">Sin historial disponible.</td></tr>';
    }

    showSection('sec-resumen');
  </script>
</body>
</html>`;

fs.writeFileSync('./admin/dashboard_encargado.html', encBefore + encScript, 'utf8');
console.log('Encargado OK');

// ============================================================
// DASHBOARD TÉCNICO
// ============================================================
const tecHtml = fs.readFileSync('./admin/dashboard_tecnico.html', 'utf8');
const tecBefore = tecHtml.substring(0, tecHtml.indexOf('<script>'));

const tecScript = `<script>
    const r = localStorage.getItem('fitzcell_rol');
    if(r !== 'tecnico' && r !== 'admin') { window.location.href = '../login.html'; }
    function logout() { localStorage.clear(); window.location.href = '../login.html'; }

    function showSection(id) {
      document.querySelectorAll('main > section').forEach(s => s.classList.add('hidden'));
      document.getElementById(id).classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-brand/10','text-brand','font-bold','border','border-brand/20');
        el.classList.add('text-gray-400','hover:bg-gray-800');
      });
      const a = document.getElementById('nav-'+id);
      if(a){ a.classList.remove('text-gray-400','hover:bg-gray-800'); a.classList.add('bg-brand/10','text-brand','font-bold','border','border-brand/20'); }
      if(id === 'sec-ordenes') loadOrdenes();
    }

    function irADiagnostico(folio, equipoId, falla, estado) {
      document.getElementById('folio-activo').innerText = folio;
      document.getElementById('dispositivo-activo').innerText = 'Equipo ID: ' + equipoId;
      document.getElementById('diag-texto').value = falla || '';
      const sel = document.getElementById('diag-estado');
      for(let i=0;i<sel.options.length;i++){ if(sel.options[i].value === estado){ sel.selectedIndex=i; break; } }
      showSection('sec-diagnostico');
    }

    async function loadOrdenes(){
      try{
        const res = await fetch('/api/reparaciones');
        if(res.ok){
          const data = await res.json();
          let h = '';
          data.forEach(rep => {
            const bc = rep.estado === 'Reparando' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
            const folio = (rep.codigo_seguimiento||'').replace(/'/g,"");
            const falla = (rep.falla_reportada||'Sin detalles').replace(/'/g,"").replace(/"/g,"");
            h += '<div class="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand/50 transition flex flex-col">' +
              '<div class="flex justify-between items-start mb-4"><div><span class="text-xs font-bold text-gray-400 tracking-wider">FOLIO</span><h3 class="text-xl font-bold text-white">' + folio + '</h3></div>' +
              '<span class="px-3 py-1 text-xs font-bold rounded-full ' + bc + '">' + rep.estado + '</span></div>' +
              '<div class="mb-6 flex-1"><p class="text-sm text-gray-300 font-bold mb-1">Dispositivo ID: ' + (rep.id_dispositivo||'—') + '</p><p class="text-sm text-gray-500 italic">"' + falla + '"</p></div>' +
              '<button onclick="irADiagnostico(\'' + folio + '\',\'' + rep.id_dispositivo + '\',\'' + falla + '\',\'' + rep.estado + '\')" class="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-bold transition">Atender Equipo</button>' +
              '</div>';
          });
          document.getElementById('lista-ordenes').innerHTML = h || '<p class="text-gray-500">No hay órdenes asignadas.</p>';
        }
      }catch(e){ console.error(e); }
    }

    const buscador = document.getElementById('buscador-refaccion');
    const resultadosBox = document.getElementById('resultados-refaccion');

    buscador.addEventListener('input', async function(e){
      const txt = e.target.value.toLowerCase();
      if(txt.length < 2){ resultadosBox.classList.add('hidden'); return; }
      try{
        const res = await fetch('/api/inventario');
        if(res.ok){
          const inv = await res.json();
          const matches = inv.filter(p => p.nombre_producto.toLowerCase().includes(txt) && p.stock > 0);
          if(matches.length > 0){
            let h = '';
            matches.forEach(m => {
              const nom = m.nombre_producto.replace(/'/g,"");
              h += '<div class="p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer flex justify-between" onclick="agregarPieza(\'' + nom + '\',' + m.id_producto + ')"><span class="text-sm font-medium">' + m.nombre_producto + '</span><span class="text-xs text-brand bg-brand/10 px-2 rounded">Stock: ' + m.stock + '</span></div>';
            });
            resultadosBox.innerHTML = h;
          } else {
            resultadosBox.innerHTML = '<div class="p-3 text-xs text-gray-500">Sin resultados en stock</div>';
          }
          resultadosBox.classList.remove('hidden');
        }
      }catch(err){}
    });

    function agregarPieza(nombre, id){
      resultadosBox.classList.add('hidden');
      buscador.value = '';
      const lista = document.getElementById('lista-piezas-usadas');
      if(lista.innerHTML.includes('No has seleccionado')) lista.innerHTML = '';
      const div = document.createElement('div');
      div.className = 'flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800';
      div.innerHTML = '<div><p class="font-bold text-sm">' + nombre + '</p><p class="text-xs text-gray-500">ID Producto: ' + id + '</p></div><div class="flex items-center gap-3"><span class="text-gray-400 text-sm">x1</span><button class="text-red-400 hover:text-red-300" onclick="this.parentElement.parentElement.remove()"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></div>';
      lista.appendChild(div);
    }

    showSection('sec-ordenes');
  </script>
</body>
</html>`;

fs.writeFileSync('./admin/dashboard_tecnico.html', tecBefore + tecScript, 'utf8');
console.log('Tecnico OK');

// ============================================================
// DASHBOARD VENTAS  - Fix categoria display bug
// ============================================================
const venHtml = fs.readFileSync('./admin/dashboard_ventas.html', 'utf8');
// Fix the broken +(p.categoria||'-')+ in renderCatalogo
const venFixed = venHtml.replace(
  /\+\(p\.categoria\|\|'-'\)\+/g,
  "' + (p.categoria||'-') + '"
).replace(
  /\+p\.categoria\|\|'-'\+/g,
  "' + (p.categoria||'-') + '"
);
fs.writeFileSync('./admin/dashboard_ventas.html', venFixed, 'utf8');
console.log('Ventas fixed');

// ============================================================
// FIX RASTREO.HTML - Consultar API en lugar de datos locales
// ============================================================
const rastreoHtml = fs.readFileSync('./rastreo.html', 'utf8');
const rastreoBefore = rastreoHtml.substring(0, rastreoHtml.indexOf('<script>'));
const rastreoAfter = rastreoHtml.substring(rastreoHtml.lastIndexOf('</script>') + 9);

const rastreoScript = `<script>
    function estadoBadge(estado){
      const colores = {
        'Pendiente':'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
        'Diagnosticando':'bg-purple-500/10 text-purple-400 border border-purple-500/30',
        'Reparando':'bg-blue-500/10 text-blue-400 border border-blue-500/30',
        'Esperando Refacción':'bg-orange-500/10 text-orange-400 border border-orange-500/30',
        'Listo para Entrega':'bg-green-500/10 text-green-400 border border-green-500/30',
        'Entregado':'bg-gray-500/10 text-gray-400 border border-gray-500/30',
      };
      const cls = colores[estado] || 'bg-gray-700 text-gray-300';
      return '<span class="inline-block px-3 py-1 rounded-full text-xs font-bold ' + cls + '">' + estado + '</span>';
    }

    async function buscarFolio(){
      const folio = document.getElementById('folioInput').value.trim().toUpperCase();
      const resultado = document.getElementById('resultado');
      const vacio = document.getElementById('estadoVacio');

      if(!folio){
        resultado.innerHTML = '';
        resultado.classList.add('hidden');
        vacio.classList.remove('hidden');
        return;
      }

      resultado.innerHTML = '<div class="text-center py-8 text-gray-400">Buscando...</div>';
      resultado.classList.remove('hidden');
      vacio.classList.add('hidden');

      try{
        const res = await fetch('/api/reparaciones/' + encodeURIComponent(folio));
        if(!res.ok){
          resultado.innerHTML = '<div class="bg-red-900/30 border border-red-700/50 rounded-2xl p-6 text-center fade-in"><div class="text-4xl mb-3">❌</div><h3 class="font-bold text-red-300 text-lg mb-1">Folio no encontrado</h3><p class="text-gray-400 text-sm">No encontramos ninguna reparación con el folio <strong class="text-white">' + folio + '</strong>. Verifica que lo escribiste correctamente o visítanos en el taller.</p></div>';
          return;
        }
        const rep = await res.json();
        const fmt = (v) => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(v||0);
        resultado.innerHTML =
          '<div class="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden fade-in">' +
            '<div class="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">' +
              '<div><div class="text-xs text-gray-500 mb-0.5">Folio de reparación</div><div class="font-black text-xl text-brand">' + rep.codigo_seguimiento + '</div></div>' +
              '<div>' + estadoBadge(rep.estado) + '</div>' +
            '</div>' +
            '<div class="p-6 space-y-4">' +
              '<div class="grid grid-cols-2 gap-4 text-sm">' +
                '<div><div class="text-gray-500 text-xs mb-1">Dispositivo</div><div class="font-semibold">ID: ' + (rep.id_dispositivo||'—') + '</div></div>' +
                '<div><div class="text-gray-500 text-xs mb-1">Falla Reportada</div><div class="font-semibold text-gray-300">' + (rep.falla_reportada||'—') + '</div></div>' +
              '</div>' +
              '<div class="bg-gray-800/60 rounded-xl p-4 grid grid-cols-2 gap-3 text-center text-sm border border-gray-700/50">' +
                '<div><div class="text-gray-500 text-xs mb-1">Costo Total</div><div class="font-bold text-white">' + fmt(rep.costo) + '</div></div>' +
                '<div><div class="text-gray-500 text-xs mb-1">Anticipo Pagado</div><div class="font-bold text-brand">' + fmt(rep.anticipo) + '</div></div>' +
              '</div>' +
              (rep.estado === 'Listo para Entrega' ? '<div class="bg-amber-900/20 border border-amber-700/40 rounded-xl p-4 text-center"><div class="text-amber-400 font-semibold mb-1">🎉 ¡Tu equipo ya está listo!</div><div class="text-xs text-gray-400">Pasa a recogerlo al taller con tu comprobante.</div></div>' : '') +
            '</div>' +
          '</div>';
      }catch(e){
        resultado.innerHTML = '<div class="bg-red-900/30 border border-red-700/50 rounded-2xl p-6 text-center"><div class="text-4xl mb-3">⚠️</div><h3 class="font-bold text-red-300 text-lg mb-1">Error de conexión</h3><p class="text-gray-400 text-sm">No se pudo contactar con el servidor. Intenta de nuevo en un momento.</p></div>';
      }
    }

    document.getElementById('folioInput').addEventListener('keydown', function(e){ if(e.key==='Enter') buscarFolio(); });
  </script>`;

fs.writeFileSync('./rastreo.html', rastreoBefore + rastreoScript + rastreoAfter, 'utf8');
console.log('Rastreo OK');

console.log('\nTodos los archivos reconstruidos correctamente.');
