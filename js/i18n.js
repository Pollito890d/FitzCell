/**
 * FitzCell — Multi-language System (i18n)
 */

const translations = {
    es: {
        // Nav & Sidebar
        nav_home: "Inicio",
        nav_store: "Tienda",
        nav_cart: "Carrito",
        nav_track: "Rastrear equipo",
        nav_policies: "Políticas",
        nav_search_btn: "Buscar mi equipo",
        
        // Admin Sidebar
        admin_dashboard: "Dashboard",
        admin_repairs: "Reparaciones",
        admin_pos: "Punto de Venta",
        admin_crm: "Clientes (CRM)",
        admin_inventory: "Inventario",
        admin_rma: "Garantías RMA",
        admin_settings: "Configuración",
        admin_logout: "Cerrar sesión",

        // Hero Public
        hero_badge: "Abiertos · Lun–Sáb 9 am – 7 pm",
        hero_title: "Tu celular reparado con garantía por escrito",
        hero_desc: "En FitzCell somos especialistas en reparación de smartphones y tablets. Diagnóstico gratuito y garantía documentada.",
        hero_track_btn: "🔍 Rastrear mi equipo",
        hero_warranty_btn: "📋 Ver garantías",

        // Settings Page
        settings_title: "Configuración del Sistema",
        settings_profile: "Mi Perfil",
        settings_security: "Seguridad",
        settings_business: "Información del Negocio",
        settings_preferences: "Preferencias",
        settings_language: "Idioma",
        settings_save: "Guardar cambios",
        
        // Common
        loading: "Cargando...",
        success: "Éxito",
        error: "Error"
    },
    en: {
        // Nav & Sidebar
        nav_home: "Home",
        nav_store: "Store",
        nav_cart: "Cart",
        nav_track: "Track Device",
        nav_policies: "Policies",
        nav_search_btn: "Find my device",

        // Admin Sidebar
        admin_dashboard: "Dashboard",
        admin_repairs: "Repairs",
        admin_pos: "Point of Sale",
        admin_crm: "Clients (CRM)",
        admin_inventory: "Inventory",
        admin_rma: "RMA Warranties",
        admin_settings: "Settings",
        admin_logout: "Log out",

        // Hero Public
        hero_badge: "Open · Mon–Sat 9 am – 7 pm",
        hero_title: "Your phone repaired with written warranty",
        hero_desc: "At FitzCell we are specialists in smartphone and tablet repair. Free diagnostics and documented warranty.",
        hero_track_btn: "🔍 Track my device",
        hero_warranty_btn: "📋 View warranties",

        // Settings Page
        settings_title: "System Settings",
        settings_profile: "My Profile",
        settings_security: "Security",
        settings_business: "Business Information",
        settings_preferences: "Preferences",
        settings_language: "Language",
        settings_save: "Save changes",

        // Common
        loading: "Loading...",
        success: "Success",
        error: "Error"
    }
};

const i18n = {
    currentLang: localStorage.getItem('fc_lang') || 'es',

    init() {
        this.applyTranslations();
    },

    get(key) {
        return translations[this.currentLang][key] || key;
    },

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('fc_lang', lang);
            this.applyTranslations();
            // Dispatch event for components that need to re-render
            window.dispatchEvent(new Event('languageChanged'));
        }
    },

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.get(key);
            
            if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'placeholder')) {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        });
        
        // Update language attribute on HTML tag
        document.documentElement.lang = this.currentLang;
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => i18n.init());
