const fs = require("fs");

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");
    
    // Replace the broken JS template literal concatenations caused by the previous Powershell escape
    // Example: html += \n <div class="bg-gray-900 border... -> html += `\n <div class="bg-gray-900 border...
    
    content = content.replace(/html \+= \s*<div/g, 'html += `<div');
    content = content.replace(/html \+= \s*<tr/g, 'html += `<tr');
    content = content.replace(/<\/div>;/g, '</div>`;');
    content = content.replace(/<\/tr>;/g, '</tr>`;');
    
    // In Dashboard Ventas:
    content = content.replace(/let html = \s*<div/g, 'let html = `<div');
    content = content.replace(/let html = \s*<tr/g, 'let html = `<tr');
    
    // Fix string concatenations that lost their backticks
    // +rep.codigo_seguimiento+ -> ${rep.codigo_seguimiento}
    content = content.replace(/\+([a-zA-Z0-9_.]+)\+/g, "$${$1}");
    content = content.replace(/\+formatCurrency\(([^)]+)\)\+/g, "$${formatCurrency($1)}");
    content = content.replace(/\+\(rep\.falla_reportada \|\| 'Sin detalles'\) \+/g, "$${rep.falla_reportada || 'Sin detalles'}");
    content = content.replace(/\+badgeCls\+/g, "$${badgeCls}");
    
    // We can also just replace all literal "+variable+" with "${variable}"
    content = content.replace(/'\+([a-zA-Z0-9_.]+)\+'/g, "'+$1+'"); // restore strings like onclick="irADiagnostico('+rep.codigo_seguimiento+...
    
    fs.writeFileSync(filePath, content, "utf8");
}

fixFile("./admin/dashboard_encargado.html");
fixFile("./admin/dashboard_tecnico.html");
fixFile("./admin/dashboard_ventas.html");

console.log("Dashboards syntax fixed!");
