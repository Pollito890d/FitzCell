// ============================================================
//  FitzCell Admin — Sidebar compartido
//  Llamar renderSidebar('dashboard') para marcar la página activa
// ============================================================
function renderSidebar(active) {
  const links = [
    { id: 'dashboard',   href: 'dashboard.html',   icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`, label: 'Dashboard' },
    { id: 'reparaciones',href: 'reparaciones.html', icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`, label: 'Reparaciones' },
    { id: 'crm',         href: 'crm.html',          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`, label: 'Clientes (CRM)' },
    { id: 'inventario',  href: 'inventario.html',   icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`, label: 'Inventario' },
    { id: 'rma',         href: 'rma.html',          icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`, label: 'Garantías RMA' },
  ];

  const html = `
    <aside id="sidebar" class="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transform -translate-x-full md:translate-x-0 transition-transform duration-300">
      <!-- Logo -->
      <div class="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center font-black text-gray-950 text-lg">F</div>
        <span class="font-bold text-lg tracking-tight">Fitz<span class="text-cyan-400">Cell</span></span>
        <span class="ml-auto text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full px-2 py-0.5">Admin</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        ${links.map(l => `
          <a href="${l.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${l.id === active
            ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'}">
            ${l.icon}
            ${l.label}
          </a>`).join('')}
      </nav>

      <!-- Footer sidebar -->
      <div class="px-4 py-4 border-t border-gray-800">
        <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Overlay móvil -->
    <div id="sidebarOverlay" onclick="closeSidebar()" class="hidden fixed inset-0 z-30 bg-black/60 md:hidden"></div>

    <!-- Topbar móvil -->
    <header class="md:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      <button onclick="openSidebar()" class="text-gray-400 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <span class="font-bold text-sm">Fitz<span class="text-cyan-400">Cell</span> Admin</span>
      <button onclick="logout()" class="text-gray-500 hover:text-red-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      </button>
    </header>`;

  document.body.insertAdjacentHTML('afterbegin', html);
}

function openSidebar() {
  document.getElementById('sidebar').style.transform = 'translateX(0)';
  document.getElementById('sidebarOverlay').classList.remove('hidden');
}
function closeSidebar() {
  document.getElementById('sidebar').style.transform = '';
  document.getElementById('sidebarOverlay').classList.add('hidden');
}
