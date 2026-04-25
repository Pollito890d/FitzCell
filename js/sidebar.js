// ============================================================
//  FitzCell Admin — Sidebar compartido
//  Llamar renderSidebar('dashboard') para marcar la página activa
// ============================================================

// Theme Management System
(function initTheme() {
  const theme = localStorage.getItem('fc_theme') || 'dark';
  if (theme === 'light') {
    document.documentElement.classList.add('light-mode');
  } else {
    document.documentElement.classList.remove('light-mode');
  }
})();

function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light-mode');
  localStorage.setItem('fc_theme', isLight ? 'light' : 'dark');
  return isLight;
}

function renderSidebar(active) {
  const links = [
    { id: 'dashboard', href: 'dashboard.html', icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`, label: 'Dashboard', key: 'admin_dashboard' },
    { id: 'reparaciones', href: 'reparaciones.html', icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.7 6.3l-3.77 3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77zM14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77z"/></svg>`, label: 'Reparaciones', key: 'admin_repairs' },
    { id: 'ventas', href: 'ventas.html', icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`, label: 'Punto de Venta', key: 'admin_pos' },
    { id: 'crm', href: 'crm.html', icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`, label: 'Clientes (CRM)', key: 'admin_crm' },
    { id: 'inventario', href: 'inventario.html', icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`, label: 'Inventario', key: 'admin_inventory' },
    { id: 'rma', href: 'rma.html', icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`, label: 'Garantías RMA', key: 'admin_rma' },
    { id: 'configuracion', href: 'configuracion.html', icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`, label: 'Configuración', key: 'admin_settings' },
  ];

  const html = `
    <aside id="sidebar" class="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transform -translate-x-full md:translate-x-0 transition-transform duration-300">
      <!-- Logo -->
      <div class="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
        <img src="../media/images/fitzcell_logo.svg" alt="FitzCell" class="w-9 h-9">
        <span class="font-bold text-lg tracking-tight">Fitz<span class="text-brand">Cell</span></span>
        <span class="ml-auto text-[10px] bg-brand/10 text-brand border border-brand/20 rounded-full px-2.5 py-1 font-bold uppercase tracking-wider">Admin</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        ${links.map(l => `
          <a href="${l.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${l.id === active
      ? 'bg-brand/10 text-brand border border-brand/20 shadow-lg shadow-brand/5'
      : 'text-gray-400 hover:text-white hover:bg-gray-800'}">
            ${l.icon}
            <span data-i18n="${l.key}">${typeof i18n !== 'undefined' ? i18n.get(l.key) : l.label}</span>
          </a>`).join('')}
      </nav>

      <!-- Footer sidebar -->
      <div class="px-4 py-4 border-t border-gray-800">
        <button onclick="showLogoutModal()" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          <span data-i18n="admin_logout">${typeof i18n !== 'undefined' ? i18n.get('admin_logout') : 'Cerrar sesión'}</span>
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
      <span class="font-bold text-sm">Fitz<span class="text-brand">Cell</span> Admin</span>
      <button onclick="showLogoutModal()" class="text-gray-500 hover:text-red-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      </button>
    </header>

    <!-- Modal de confirmación de logout -->
    <div id="logoutModal" class="hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="bg-gray-900 border border-gray-800 w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center">
        <div class="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          ⚠️
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Cerrar Sesión</h3>
        <p class="text-gray-400 mb-8">¿Estás seguro de que deseas salir del sistema?</p>
        
        <div class="flex flex-col gap-3">
          <button onclick="logout()" class="w-full py-3 rounded-xl font-bold btn-neon-red">
            Sí, salir ahora
          </button>
          <button onclick="closeLogoutModal()" class="w-full py-3 rounded-xl font-bold btn-neon-gray text-sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>`;

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

// LOGOUT MODAL
function showLogoutModal() {
  const modal = document.getElementById('logoutModal');
  modal.classList.remove('hidden');
  modal.classList.add('fade-in');
}

function closeLogoutModal() {
  const modal = document.getElementById('logoutModal');
  modal.classList.add('hidden');
}
