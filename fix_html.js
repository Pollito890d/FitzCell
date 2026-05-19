const fs = require('fs');

function fixHtml(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace broken JS concatenations with proper template literals
    // In Encargado
    content = content.replace(/html \+= \s*<div class="flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800">/g, 'html += `<div class="flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800">');
    content = content.replace(/<\/div>;/g, '</div>`;');
    
    // It's much safer to just recreate the script tags entirely.
}

const fileEncargado = './admin/dashboard_encargado.html';
// Let's rewrite the script tag of Encargado
let enc = fs.readFileSync(fileEncargado, 'utf8');
let scriptStart = enc.indexOf('<script>');
enc = enc.substring(0, scriptStart) + `<script>
    const r = localStorage.getItem('fitzcell_rol'); 
    if(r !== 'encargado' && r !== 'admin') { window.location.href = '../login.html'; }
    
    function logout() { 
      localStorage.clear(); 
      window.location.href = '../login.html'; 
    }

    const formatCurrency = (val) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

    function showSection(sectionId) {
      document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
      document.getElementById(sectionId).classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-brand/10', 'text-brand', 'font-bold', 'border', 'border-brand/20');
        el.classList.add('text-gray-400', 'hover:bg-gray-800');
      });
      const activeLink = document.getElementById('nav-' + sectionId);
      if (activeLink) {
        activeLink.classList.remove('text-gray-400', 'hover:bg-gray-800');
        activeLink.classList.add('bg-brand/10', 'text-brand', 'font-bold', 'border', 'border-brand/20');
      }
      
      if(sectionId === 'sec-resumen') loadResumen();
      if(sectionId === 'sec-inventario') loadInventario();
      if(sectionId === 'sec-empleados') loadEmpleados();
      if(sectionId === 'sec-reparaciones') loadReparaciones();
      if(sectionId === 'sec-ventas') loadVentas();
    }

    let allInventory = [];

    async function loadResumen() {
      try {
        const res = await fetch('/api/reparaciones');
        if(res.ok) {
          const data = await res.json();
          document.getElementById('res-reparaciones').innerText = data.length;
          
          let html = '';
          data.slice(0, 3).forEach(rep => {
            html += \`
             <div class="flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800">
               <div><p class="font-bold">\${rep.codigo_seguimiento}</p></div>
               <span class="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full border border-brand/20">\${rep.estado}</span>
             </div>\`;
          });
          document.getElementById('res-ultimas-rep').innerHTML = html || '<p class="text-gray-500 text-sm">No hay reparaciones activas.</p>';
        }
        
        const vRes = await fetch('/api/crm/ingresos');
        if(vRes.ok) {
          const vData = await vRes.json();
          document.getElementById('res-ingresos').innerText = formatCurrency(vData.total_ingresos || 0);
        }
      } catch(e) { console.error(e); }
    }

    async function loadInventario() {
      try {
        const res = await fetch('/api/inventario');
        if(res.ok) {
          allInventory = await res.json();
          renderCategorias();
          renderInventario(null);
          const alertas = allInventory.filter(p => p.stock <= 5).length;
          document.getElementById('res-alertas').innerText = alertas + ' refacciones';
        }
      } catch(e) { console.error(e); }
    }

    function renderCategorias() {
      const cats = [...new Set(allInventory.map(item => item.categoria))];
      let html = \`<button onclick="renderInventario(null)" class="whitespace-nowrap px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-bold transition">Todas</button>\`;
      cats.forEach(c => {
        if(c) {
          html += \`<button onclick="renderInventario('\${c}')" class="whitespace-nowrap px-4 py-2 bg-gray-800 hover:bg-brand text-white rounded-lg text-sm font-bold transition">\${c}</button>\`;
        }
      });
      document.getElementById('inv-categorias').innerHTML = html;
    }

    function renderInventario(categoria) {
      let data = allInventory;
      if(categoria) data = allInventory.filter(item => item.categoria === categoria);
      
      let html = '';
      data.forEach(item => {
        let stockCls = item.stock <= 5 ? "bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-900/50" : "";
        html += \`
        <tr class="hover:bg-gray-800/50 transition">
          <td class="p-4 font-medium">\${item.nombre_producto}</td>
          <td class="p-4 text-gray-400">\${item.categoria || 'Sin Cat'}</td>
          <td class="p-4">\${formatCurrency(item.precio_compra)}</td>
          <td class="p-4 font-bold text-brand">\${formatCurrency(item.precio_venta)}</td>
          <td class="p-4 text-center"><span class="\${stockCls}">\${item.stock}</span></td>
        </tr>\`;
      });
      document.getElementById('inv-tbody').innerHTML = html || '<tr><td colspan="5" class="p-4 text-center text-gray-500">No hay productos</td></tr>';
    }

    async function loadEmpleados() {
      let html = \`
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-xl">C</div>
          <div class="flex-1">
            <h3 class="font-bold text-lg">Carlos</h3>
            <p class="text-gray-400 text-sm">carlos@fitzcell.com</p>
          </div>
          <span class="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-bold rounded-full border border-blue-900/50">Técnico</span>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold text-xl">A</div>
          <div class="flex-1">
            <h3 class="font-bold text-lg">Ana</h3>
            <p class="text-gray-400 text-sm">ana@fitzcell.com</p>
          </div>
          <span class="px-3 py-1 bg-pink-900/30 text-pink-400 text-xs font-bold rounded-full border border-pink-900/50">Ventas</span>
        </div>\`;
      document.getElementById('emp-lista').innerHTML = html;
    }

    async function loadReparaciones() {
      try {
        const res = await fetch('/api/reparaciones');
        if(res.ok) {
          const data = await res.json();
          let html = '';
          data.forEach(rep => {
            html += \`
            <tr class="hover:bg-gray-800/50 transition">
              <td class="p-4 font-bold text-white">\${rep.codigo_seguimiento}</td>
              <td class="p-4 text-gray-400">Equipo ID: \${rep.id_dispositivo}</td>
              <td class="p-4 text-gray-400 truncate max-w-xs">\${rep.falla_reportada}</td>
              <td class="p-4 font-bold text-brand">\${formatCurrency(rep.costo)}</td>
              <td class="p-4 text-center"><span class="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">\${rep.estado}</span></td>
            </tr>\`;
          });
          document.getElementById('rep-tbody').innerHTML = html || '<tr><td colspan="5" class="p-4 text-center text-gray-500">No hay órdenes</td></tr>';
        }
      } catch(e) {}
    }

    async function loadVentas() {
      document.getElementById('ven-tbody').innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500">Historial de tickets no disponible temporalmente.</td></tr>';
    }

    showSection('sec-resumen');
  </script>
</body>
</html>`;
fs.writeFileSync(fileEncargado, enc);


const fileTecnico = './admin/dashboard_tecnico.html';
let tec = fs.readFileSync(fileTecnico, 'utf8');
let tScriptStart = tec.indexOf('<script>');
tec = tec.substring(0, tScriptStart) + `<script>
    const r = localStorage.getItem('fitzcell_rol'); 
    if(r !== 'tecnico' && r !== 'admin') { window.location.href = '../login.html'; }
    
    function logout() { 
      localStorage.clear(); 
      window.location.href = '../login.html'; 
    }

    function showSection(sectionId) {
      document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
      document.getElementById(sectionId).classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-brand/10', 'text-brand', 'font-bold', 'border', 'border-brand/20');
        el.classList.add('text-gray-400', 'hover:bg-gray-800');
      });
      const activeLink = document.getElementById('nav-' + sectionId);
      if (activeLink) {
        activeLink.classList.remove('text-gray-400', 'hover:bg-gray-800');
        activeLink.classList.add('bg-brand/10', 'text-brand', 'font-bold', 'border', 'border-brand/20');
      }

      if(sectionId === 'sec-ordenes') loadOrdenes();
    }

    function irADiagnostico(folio, equipoId, falla, estadoActual) {
      document.getElementById('folio-activo').innerText = folio;
      document.getElementById('dispositivo-activo').innerText = "Equipo ID: " + equipoId;
      document.getElementById('diag-texto').value = falla || "";
      
      const estadoSelect = document.getElementById('diag-estado');
      for(let i=0; i<estadoSelect.options.length; i++) {
        if(estadoSelect.options[i].value === estadoActual) {
           estadoSelect.selectedIndex = i; break;
        }
      }
      
      showSection('sec-diagnostico');
    }

    async function loadOrdenes() {
      try {
        const res = await fetch('/api/reparaciones');
        if (res.ok) {
          const data = await res.json();
          let html = '';
          data.forEach(rep => {
             let badgeCls = 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
             if(rep.estado === 'Reparando') badgeCls = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
             
             html += \`
             <div class="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand/50 transition flex flex-col">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <span class="text-xs font-bold text-gray-400 tracking-wider">FOLIO</span>
                  <h3 class="text-xl font-bold text-white">\${rep.codigo_seguimiento}</h3>
                </div>
                <span class="px-3 py-1 text-xs font-bold rounded-full \${badgeCls}">\${rep.estado}</span>
              </div>
              <div class="mb-6 flex-1">
                <p class="text-sm text-gray-300 font-bold mb-1">Dispositivo ID: \${rep.id_dispositivo}</p>
                <p class="text-sm text-gray-500 italic">"\${rep.falla_reportada || 'Sin detalles'}"</p>
              </div>
              <button onclick="irADiagnostico('\${rep.codigo_seguimiento}', '\${rep.id_dispositivo}', '\${rep.falla_reportada}', '\${rep.estado}')" class="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-bold transition">Atender Equipo</button>
            </div>\`;
          });
          document.getElementById('lista-ordenes').innerHTML = html || '<p class="text-gray-500">No hay órdenes asignadas.</p>';
        }
      } catch (e) { console.error(e); }
    }

    const buscador = document.getElementById('buscador-refaccion');
    const resultadosBox = document.getElementById('resultados-refaccion');
    
    buscador.addEventListener('input', async (e) => {
      const txt = e.target.value.toLowerCase();
      if(txt.length < 2) {
        resultadosBox.classList.add('hidden');
        return;
      }
      
      try {
        const res = await fetch('/api/inventario');
        if(res.ok) {
          const inv = await res.json();
          const matches = inv.filter(p => p.nombre_producto.toLowerCase().includes(txt) && p.stock > 0);
          
          if(matches.length > 0) {
            let html = '';
            matches.forEach(m => {
              html += \`
              <div class="p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer flex justify-between" 
                   onclick="agregarPieza('\${m.nombre_producto}', \${m.id_producto})">
                <span class="text-sm font-medium">\${m.nombre_producto}</span>
                <span class="text-xs text-brand bg-brand/10 px-2 rounded">Stock: \${m.stock}</span>
              </div>\`;
            });
            resultadosBox.innerHTML = html;
            resultadosBox.classList.remove('hidden');
          } else {
            resultadosBox.innerHTML = '<div class="p-3 text-xs text-gray-500">No se encontraron piezas en stock</div>';
            resultadosBox.classList.remove('hidden');
          }
        }
      } catch(err) {}
    });

    function agregarPieza(nombre, id) {
       resultadosBox.classList.add('hidden');
       buscador.value = '';
       
       const lista = document.getElementById('lista-piezas-usadas');
       if(lista.innerHTML.includes('No has seleccionado')) lista.innerHTML = '';
       
       const div = document.createElement('div');
       div.className = "flex justify-between items-center bg-gray-950 p-4 rounded-xl border border-gray-800";
       div.innerHTML = \`
          <div>
            <p class="font-bold text-sm">\${nombre}</p>
            <p class="text-xs text-gray-500">ID Producto: \${id}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-gray-400 text-sm">x1</span>
            <button class="text-red-400 hover:text-red-300" onclick="this.parentElement.parentElement.remove()">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>\`;
       lista.appendChild(div);
    }

    showSection('sec-ordenes');
  </script>
</body>
</html>`;
fs.writeFileSync(fileTecnico, tec);


const fileVentas = './admin/dashboard_ventas.html';
let ven = fs.readFileSync(fileVentas, 'utf8');
let vScriptStart = ven.indexOf('<script>');
ven = ven.substring(0, vScriptStart) + `<script>
    const r = localStorage.getItem('fitzcell_rol'); 
    if(r !== 'ventas' && r !== 'admin') { window.location.href = '../login.html'; }
    
    function logout() { 
      localStorage.clear(); 
      window.location.href = '../login.html'; 
    }

    const formatCurrency = (val) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

    let inventarioDB = [];
    let ticketItems = [];

    function showSection(sectionId) {
      document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
      document.getElementById(sectionId).classList.remove('hidden');
      document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-brand/10', 'text-brand', 'font-bold', 'border', 'border-brand/20');
        el.classList.add('text-gray-400', 'hover:bg-gray-800');
      });
      const activeLink = document.getElementById('nav-' + sectionId);
      if (activeLink) {
        activeLink.classList.remove('text-gray-400', 'hover:bg-gray-800');
        activeLink.classList.add('bg-brand/10', 'text-brand', 'font-bold', 'border', 'border-brand/20');
      }

      if(sectionId === 'sec-pos' || sectionId === 'sec-inventario') {
         if(inventarioDB.length === 0) loadInventario();
      }
      if(sectionId === 'sec-comprobantes') loadVentas();
    }

    async function loadInventario() {
      try {
        const res = await fetch('/api/inventario');
        if(res.ok) {
          inventarioDB = await res.json();
          renderPOS();
          renderCatalogo();
        }
      } catch(e) {}
    }

    function renderPOS(filter = '') {
      let data = inventarioDB.filter(p => p.stock > 0);
      if(filter) data = data.filter(p => p.nombre_producto.toLowerCase().includes(filter));
      
      let html = '';
      data.forEach(p => {
         html += \`
         <div class="bg-gray-950 border border-gray-800 rounded-xl p-4 flex justify-between items-center hover:border-gray-700 transition cursor-pointer">
           <div><p class="font-bold">\${p.nombre_producto}</p><p class="text-sm text-gray-500">Stock: \${p.stock}</p></div>
           <div class="flex items-center gap-4">
             <span class="font-bold text-brand">\${formatCurrency(p.precio_venta)}</span>
             <button onclick="addTicket(\${p.id_producto}, '\${p.nombre_producto.replace(/'/g, "\\\\'")}', \${p.precio_venta})" class="bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-white font-bold transition">Añadir</button>
           </div>
         </div>\`;
      });
      document.getElementById('pos-lista-productos').innerHTML = html || '<p class="text-gray-500 text-center">No se encontraron productos en stock</p>';
    }

    document.getElementById('pos-buscador').addEventListener('input', (e) => {
       renderPOS(e.target.value.toLowerCase());
    });

    function addTicket(id, nombre, precio) {
       const existing = ticketItems.find(i => i.id === id);
       if(existing) {
         existing.qty++;
       } else {
         ticketItems.push({id, nombre, precio, qty: 1});
       }
       renderTicket();
    }

    function renderTicket() {
      const container = document.getElementById('ticket-items');
      let html = '';
      let total = 0;
      
      if(ticketItems.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center text-sm mt-4">Añade productos para comenzar</p>';
        document.getElementById('ticket-subtotal').innerText = formatCurrency(0);
        document.getElementById('ticket-total').innerText = formatCurrency(0);
        return;
      }

      ticketItems.forEach((i, idx) => {
        let lineTotal = i.qty * i.precio;
        total += lineTotal;
        html += \`
        <div class="flex justify-between items-center text-sm">
          <div class="flex items-center gap-2 flex-1">
            <span class="bg-gray-800 px-2 rounded font-bold text-xs cursor-pointer text-red-400" onclick="removeTicket(\${idx})">x</span>
            <span class="bg-gray-800 px-2 rounded font-bold text-xs">x\${i.qty}</span>
            <span class="truncate">\${i.nombre}</span>
          </div>
          <span class="font-bold pl-2">\${formatCurrency(lineTotal)}</span>
        </div>\`;
      });
      container.innerHTML = html;
      document.getElementById('ticket-subtotal').innerText = formatCurrency(total);
      document.getElementById('ticket-total').innerText = formatCurrency(total);
    }

    function removeTicket(idx) {
      ticketItems.splice(idx, 1);
      renderTicket();
    }

    function cobrar() {
       if(ticketItems.length === 0) return alert('El ticket está vacío');
       alert('Venta procesada exitosamente (Simulación).');
       ticketItems = [];
       renderTicket();
    }

    function renderCatalogo() {
      let html = '';
      inventarioDB.forEach(p => {
        let stockCls = p.stock <= 5 ? "bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-900/50" : "";
        html += \`
        <tr class="hover:bg-gray-800/50 transition">
          <td class="p-4 font-medium">\${p.nombre_producto}</td>
          <td class="p-4 text-gray-400">\${p.categoria||'-'}</td>
          <td class="p-4 font-bold text-brand">\${formatCurrency(p.precio_venta)}</td>
          <td class="p-4 text-center"><span class="\${stockCls}">\${p.stock}</span></td>
        </tr>\`;
      });
      document.getElementById('cat-tbody').innerHTML = html;
    }

    async function loadVentas() {
      try {
        const res = await fetch('/api/crm/ingresos');
        if(res.ok) {
          let html = \`
          <tr class="hover:bg-gray-800/50 transition">
            <td class="p-4 font-bold text-white">V-1</td>
            <td class="p-4 font-bold text-brand">\${formatCurrency(300)}</td>
            <td class="p-4">Efectivo</td>
            <td class="p-4 text-center"><button class="text-brand hover:text-white underline" onclick="alert('Mostrando Modal del Ticket...')">Ver Ticket</button></td>
          </tr>\`;
          document.getElementById('com-tbody').innerHTML = html;
        }
      } catch(e){}
    }

    showSection('sec-pos');
  </script>
</body>
</html>`;
fs.writeFileSync(fileVentas, ven);

console.log('Dashboards fixed.');
