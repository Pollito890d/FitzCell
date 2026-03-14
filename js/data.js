// ============================================================
//  FitzCell — Mock Data
//  Datos simulados compartidos por todas las páginas
// ============================================================

const FC = {

  // ── REPARACIONES ──────────────────────────────────────────
  reparaciones: [
    {
      folio: "FTZ-001",
      cliente: "María López",
      telefono: "871-234-5678",
      modelo: "iPhone 12 Pro",
      imei: "354678901234567",
      falla: "Pantalla rota y batería agotada",
      costo: 1800,
      anticipo: 900,
      deuda: 900,
      sellos: "Sello trasero esquina inferior derecha, sello SIM",
      estado: "En proceso",
      fechaIngreso: "2026-03-10",
      fechaEstimada: "2026-03-15",
      garantiaDias: 30,
      notas: "Cliente solicita pantalla original",
      tecnico: "Carlos R."
    },
    {
      folio: "FTZ-002",
      cliente: "Juan Pérez",
      telefono: "871-345-6789",
      modelo: "Samsung Galaxy S21",
      imei: "490001234567890",
      falla: "No carga, puerto USB-C dañado",
      costo: 650,
      anticipo: 650,
      deuda: 0,
      sellos: "Sello central espalda, dos sellos laterales",
      estado: "Listo",
      fechaIngreso: "2026-03-11",
      fechaEstimada: "2026-03-14",
      garantiaDias: 30,
      notas: "Puerto cambiado por refacción original Samsung",
      tecnico: "Ana M."
    },
    {
      folio: "FTZ-003",
      cliente: "Roberto Sánchez",
      telefono: "871-456-7890",
      modelo: "Motorola Moto G84",
      imei: "357112345678901",
      falla: "Micrófono no funciona en llamadas",
      costo: 450,
      anticipo: 200,
      deuda: 250,
      sellos: "Sello único en ranura de carga",
      estado: "Diagnóstico",
      fechaIngreso: "2026-03-13",
      fechaEstimada: "2026-03-16",
      garantiaDias: 15,
      notas: "Posible daño por humedad, se revisa internamente",
      tecnico: "Carlos R."
    },
    {
      folio: "FTZ-004",
      cliente: "Laura Martínez",
      telefono: "871-567-8901",
      modelo: "iPhone 11",
      imei: "356789012345678",
      falla: "Cámara trasera desenfocada, Face ID fallando",
      costo: 2100,
      anticipo: 1000,
      deuda: 1100,
      sellos: "Tres sellos espalda, sello tapa SIM",
      estado: "En proceso",
      fechaIngreso: "2026-03-09",
      fechaEstimada: "2026-03-17",
      garantiaDias: 30,
      notas: "Face ID requiere reprogramación en Apple",
      tecnico: "Ana M."
    },
    {
      folio: "FTZ-005",
      cliente: "Carlos Gómez",
      telefono: "871-678-9012",
      modelo: "Xiaomi Redmi Note 12",
      imei: "861234567890123",
      falla: "Sin señal, antena dañada",
      costo: 380,
      anticipo: 380,
      deuda: 0,
      sellos: "Sello central inferior",
      estado: "Entregado",
      fechaIngreso: "2026-03-05",
      fechaEstimada: "2026-03-08",
      garantiaDias: 15,
      notas: "Entregado y firmado",
      tecnico: "Carlos R."
    },
    {
      folio: "FTZ-006",
      cliente: "Patricia Ruiz",
      telefono: "871-789-0123",
      modelo: "Samsung Galaxy A54",
      imei: "352345678901234",
      falla: "Pantalla parpadeando, táctil muerto",
      costo: 950,
      anticipo: 500,
      deuda: 450,
      sellos: "Sello superior e inferior espalda",
      estado: "Listo",
      fechaIngreso: "2026-03-12",
      fechaEstimada: "2026-03-14",
      garantiaDias: 30,
      notas: "Pantalla cambiada, probar 24h antes de entregar",
      tecnico: "Ana M."
    },
    {
      folio: "FTZ-007",
      cliente: "Miguel Torres",
      telefono: "871-890-1234",
      modelo: "iPhone SE 2022",
      imei: "353456789012345",
      falla: "Batería al 62%, apagones repentinos",
      costo: 700,
      anticipo: 700,
      deuda: 0,
      sellos: "Sello parte trasera",
      estado: "Entregado",
      fechaIngreso: "2026-03-07",
      fechaEstimada: "2026-03-09",
      garantiaDias: 30,
      notas: "Batería original Apple instalada",
      tecnico: "Carlos R."
    },
    {
      folio: "FTZ-008",
      cliente: "María López",
      telefono: "871-234-5678",
      modelo: "iPad Air 4",
      imei: "359876543210123",
      falla: "Botón home no responde, conector roto",
      costo: 1200,
      anticipo: 600,
      deuda: 600,
      sellos: "Sello marco superior, sello conector",
      estado: "En proceso",
      fechaIngreso: "2026-03-13",
      fechaEstimada: "2026-03-18",
      garantiaDias: 30,
      notas: "En espera de refacción conector Lightning",
      tecnico: "Ana M."
    },
    {
      folio: "FTZ-009",
      cliente: "Elena Vargas",
      telefono: "871-901-2345",
      modelo: "Huawei P30 Lite",
      imei: "867901234567890",
      falla: "Altavoz roto, sin audio",
      costo: 320,
      anticipo: 320,
      deuda: 0,
      sellos: "Sello único interior",
      estado: "Listo",
      fechaIngreso: "2026-03-14",
      fechaEstimada: "2026-03-14",
      garantiaDias: 15,
      notas: "Altavoz reemplazado, listo para entrega hoy",
      tecnico: "Carlos R."
    },
    {
      folio: "FTZ-010",
      cliente: "Andrés Fuentes",
      telefono: "871-012-3456",
      modelo: "Motorola Edge 30",
      imei: "354321098765432",
      falla: "Pantalla rota sin partes internas dañadas",
      costo: 1100,
      anticipo: 0,
      deuda: 1100,
      sellos: "Sello izquierdo y derecho",
      estado: "Diagnóstico",
      fechaIngreso: "2026-03-14",
      fechaEstimada: "2026-03-19",
      garantiaDias: 30,
      notas: "Cliente aún no deja anticipo, pendiente confirmar",
      tecnico: "Ana M."
    }
  ],

  // ── INVENTARIO ────────────────────────────────────────────
  inventario: [
    { id: 1, nombre: "Pantalla iPhone 12 Pro (OLED)", cantidad: 3, minimo: 2, proveedor: "TechParts MX", precio: 850, categoria: "Pantalla" },
    { id: 2, nombre: "Batería iPhone 11", cantidad: 5, minimo: 3, proveedor: "TechParts MX", precio: 320, categoria: "Batería" },
    { id: 3, nombre: "Puerto USB-C Samsung S21", cantidad: 2, minimo: 3, proveedor: "RefaccionesPro", precio: 180, categoria: "Conector" },
    { id: 4, nombre: "Pantalla Samsung A54 (AMOLED)", cantidad: 4, minimo: 2, proveedor: "RefaccionesPro", precio: 620, categoria: "Pantalla" },
    { id: 5, nombre: "Batería Moto G84", cantidad: 1, minimo: 2, proveedor: "MotoParts", precio: 150, categoria: "Batería" },
    { id: 6, nombre: "Micrófono Moto G84", cantidad: 0, minimo: 1, proveedor: "MotoParts", precio: 80, categoria: "Audio" },
    { id: 7, nombre: "Altavoz Huawei P30 Lite", cantidad: 2, minimo: 1, proveedor: "HuaweiParts", precio: 95, categoria: "Audio" },
    { id: 8, nombre: "Pantalla iPhone SE 2022", cantidad: 3, minimo: 2, proveedor: "TechParts MX", precio: 480, categoria: "Pantalla" },
    { id: 9, nombre: "Batería iPhone 12 Pro", cantidad: 6, minimo: 3, proveedor: "TechParts MX", precio: 380, categoria: "Batería" },
    { id: 10, nombre: "Flex cámara trasera iPhone 11", cantidad: 1, minimo: 2, proveedor: "TechParts MX", precio: 550, categoria: "Cámara" },
    { id: 11, nombre: "Pantalla Xiaomi Redmi Note 12", cantidad: 4, minimo: 2, proveedor: "XiaomiParts", precio: 290, categoria: "Pantalla" },
    { id: 12, nombre: "Antena señal Xiaomi Redmi 12", cantidad: 2, minimo: 2, proveedor: "XiaomiParts", precio: 110, categoria: "Señal" },
    { id: 13, nombre: "Conector Lightning iPad Air 4", cantidad: 0, minimo: 1, proveedor: "TechParts MX", precio: 420, categoria: "Conector" },
    { id: 14, nombre: "Pantalla Motorola Edge 30", cantidad: 2, minimo: 2, proveedor: "MotoParts", precio: 750, categoria: "Pantalla" },
    { id: 15, nombre: "Sellos de seguridad (rollo 500u)", cantidad: 8, minimo: 2, proveedor: "Seguridad Total", precio: 45, categoria: "Insumo" },
    { id: 16, nombre: "Pasta térmica Arctic MX-4", cantidad: 3, minimo: 2, proveedor: "Insumos Tech", precio: 35, categoria: "Insumo" },
    { id: 17, nombre: "Batería Samsung Galaxy A54", cantidad: 1, minimo: 2, proveedor: "RefaccionesPro", precio: 210, categoria: "Batería" }
  ],

  // ── RMA — GARANTÍAS A PROVEEDOR ───────────────────────────
  rma: [
    {
      id: "RMA-001",
      pieza: "Puerto USB-C Samsung S21",
      proveedor: "RefaccionesPro",
      motivo: "Pieza defectuosa — el cliente regresó a los 3 días sin carga",
      fechaDevolucion: "2026-03-01",
      folio: "FTZ-002",
      estado: "Pendiente",
      monto: 180,
      notas: "Enviado por paquetería, número de guía 4892031"
    },
    {
      id: "RMA-002",
      pieza: "Batería iPhone 11 (lote B2025)",
      proveedor: "TechParts MX",
      motivo: "Batería hinchada a las 2 semanas de instalación",
      fechaDevolucion: "2026-02-20",
      folio: "FTZ-007",
      estado: "Cambiado",
      monto: 320,
      notas: "Proveedor envió batería nueva como reposición"
    },
    {
      id: "RMA-003",
      pieza: "Flex cámara trasera iPhone 11",
      proveedor: "TechParts MX",
      motivo: "Cámara con líneas verdes desde el primer día",
      fechaDevolucion: "2026-03-05",
      folio: "FTZ-004",
      estado: "Pendiente",
      monto: 550,
      notas: "Pendiente respuesta del proveedor"
    },
    {
      id: "RMA-004",
      pieza: "Pantalla iPhone SE 2022 (táctil muerto)",
      proveedor: "TechParts MX",
      motivo: "Pantalla entregada con táctil muerto en el empaque",
      fechaDevolucion: "2026-02-28",
      folio: "FTZ-007",
      estado: "Reembolsado",
      monto: 480,
      notas: "Crédito aplicado en siguiente pedido"
    },
    {
      id: "RMA-005",
      pieza: "Micrófono Moto G84",
      proveedor: "MotoParts",
      motivo: "Pieza incompatible — no funcionó en el modelo",
      fechaDevolucion: "2026-03-10",
      folio: "FTZ-003",
      estado: "Pendiente",
      monto: 80,
      notas: "Proveedor debe confirmar compatibilidad"
    }
  ],

  // ── MÉTRICA DASHBOARD ─────────────────────────────────────
  dashboard: {
    equiposHoy: 3,
    ventasHoy: 2450,
    porEntregar: 3,
    rmaPendientes: 3
  }
};

// Helper: obtener garantía activa (retorna true/false)
FC.garantiaActiva = function(rep) {
  if (rep.estado !== "Entregado") return false;
  const entrega = new Date(rep.fechaEstimada);
  const hoy = new Date("2026-03-14");
  const diff = (hoy - entrega) / (1000 * 60 * 60 * 24);
  return diff <= rep.garantiaDias;
};

// Helper: reparaciones por cliente
FC.repsByCliente = function(nombre) {
  return FC.reparaciones.filter(r =>
    r.cliente.toLowerCase().includes(nombre.toLowerCase())
  );
};
