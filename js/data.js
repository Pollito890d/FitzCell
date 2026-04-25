// ============================================================
//  FitzCell — API Wrapper
//  Reemplaza los datos simulados por peticiones reales al backend
// ============================================================

const API_BASE = 'http://localhost:3000/api';

const FC = {
  reparaciones: [],
  inventario: [],
  rma: [],
  clientes: [],
  productos: [],
  dashboard: {
    equiposHoy: 0,
    ventasHoy: 0,
    porEntregar: 0,
    rmaPendientes: 0
  },

  // Inicializa todos los datos necesarios para la sesión actual
  loadData: async function() {
    try {
      const [repRes, invRes, rmaRes, crmRes, prodRes] = await Promise.all([
        fetch(`${API_BASE}/reparaciones`),
        fetch(`${API_BASE}/inventario`),
        fetch(`${API_BASE}/rma`),
        fetch(`${API_BASE}/crm`),
        fetch(`${API_BASE}/productos/admin`)
      ]);

      if (repRes.ok) this.reparaciones = await repRes.json();
      if (invRes.ok) this.inventario = await invRes.json();
      if (rmaRes.ok) this.rma = await rmaRes.json();
      if (crmRes.ok) this.clientes = await crmRes.json();
      if (prodRes.ok) this.productos = await prodRes.json();

      this.calcularMetricas();
    } catch (error) {
      console.error("Error al cargar datos desde el backend:", error);
    }
  },

  calcularMetricas: function() {
    // Calculamos métricas básicas del dashboard
    const hoyStr = new Date().toISOString().split('T')[0];
    
    this.dashboard.equiposHoy = this.reparaciones.filter(r => r.fecha_ingreso && r.fecha_ingreso.startsWith(hoyStr)).length;
    this.dashboard.ventasHoy = this.reparaciones
        .filter(r => r.fecha_ingreso && r.fecha_ingreso.startsWith(hoyStr))
        .reduce((sum, r) => sum + Number(r.anticipo || 0), 0);
        
    this.dashboard.porEntregar = this.reparaciones.filter(r => r.estado === 'Listo').length;
    this.dashboard.rmaPendientes = this.rma.filter(r => r.estado === 'Pendiente').length;
  },

  // Métodos API para escribir
  crearReparacion: async function(data) {
    const res = await fetch(`${API_BASE}/reparaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error("Error al crear reparación");
    return res.json();
  },

  actualizarReparacion: async function(folio, data) {
    const res = await fetch(`${API_BASE}/reparaciones/${folio}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error("Error al actualizar reparación");
    return res.json();
  },

  crearRMA: async function(data) {
    const res = await fetch(`${API_BASE}/rma`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error("Error al crear RMA");
    return res.json();
  },

  actualizarRMA: async function(id, data) {
    const res = await fetch(`${API_BASE}/rma/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error("Error al actualizar RMA");
    return res.json();
  },

  crearCliente: async function(data) {
    const res = await fetch(`${API_BASE}/crm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error("Error al crear cliente");
    return res.json();
  },

  // Helpers legacy
  garantiaActiva: function(rep) {
    if (rep.estado !== "Entregado") return false;
    const entrega = new Date(rep.fecha_estimada);
    const hoy = new Date();
    const diff = (hoy - entrega) / (1000 * 60 * 60 * 24);
    return diff <= (rep.garantia_dias || 30);
  },

  repsByCliente: function(nombre) {
    return this.reparaciones.filter(r =>
      r.cliente_id && this.clientes.find(c => c.id === r.cliente_id)?.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }
};
