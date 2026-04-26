#!/usr/bin/env node

/**
 * Script de verificación de configuración
 * Verifica que todas las dependencias y configuraciones estén correctas
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del proyecto Casaliz...\n');

let hasErrors = false;

// 1. Verificar .env.local
console.log('1️⃣  Verificando variables de entorno...');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => {
    const regex = new RegExp(`${varName}=(?!your-|\\s*$)`, 'i');
    return !regex.test(envContent);
  });
  
  if (missingVars.length > 0) {
    console.log('   ❌ Faltan variables de entorno o tienen valores placeholder:');
    missingVars.forEach(v => console.log(`      - ${v}`));
    hasErrors = true;
  } else {
    console.log('   ✅ Variables de entorno configuradas correctamente');
  }
} else {
  console.log('   ❌ Archivo .env.local no encontrado');
  hasErrors = true;
}

// 2. Verificar node_modules
console.log('\n2️⃣  Verificando dependencias...');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('   ✅ node_modules instalado');
} else {
  console.log('   ❌ node_modules no encontrado. Ejecuta: npm install');
  hasErrors = true;
}

// 3. Verificar configuración MCP
console.log('\n3️⃣  Verificando configuración MCP...');
const mcpPath = path.join(process.cwd(), '.kiro', 'settings', 'mcp.json');
if (fs.existsSync(mcpPath)) {
  try {
    const mcpConfig = JSON.parse(fs.readFileSync(mcpPath, 'utf-8'));
    if (mcpConfig.mcpServers && mcpConfig.mcpServers.supabase) {
      console.log('   ✅ MCP de Supabase configurado');
    } else {
      console.log('   ⚠️  MCP configurado pero falta servidor de Supabase');
    }
  } catch (e) {
    console.log('   ❌ Error al leer mcp.json:', e.message);
    hasErrors = true;
  }
} else {
  console.log('   ⚠️  Archivo mcp.json no encontrado (opcional para desarrollo)');
}

// 4. Verificar archivos críticos
console.log('\n4️⃣  Verificando archivos del proyecto...');
const criticalFiles = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'tailwind.config.ts',
  'app/page.tsx',
  'lib/supabase.ts'
];

const missingFiles = criticalFiles.filter(file => 
  !fs.existsSync(path.join(process.cwd(), file))
);

if (missingFiles.length > 0) {
  console.log('   ❌ Archivos faltantes:');
  missingFiles.forEach(f => console.log(`      - ${f}`));
  hasErrors = true;
} else {
  console.log('   ✅ Todos los archivos críticos presentes');
}

// Resumen final
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Se encontraron problemas en la configuración');
  console.log('\n📝 Pasos para corregir:');
  console.log('   1. Asegúrate de tener las credenciales de Supabase en .env.local');
  console.log('   2. Ejecuta: npm install');
  console.log('   3. Verifica que puedas acceder a tu proyecto en Supabase');
  process.exit(1);
} else {
  console.log('✅ ¡Todo está configurado correctamente!');
  console.log('\n🚀 Puedes iniciar el proyecto con:');
  console.log('   npm run dev');
  console.log('\n📊 Panel de administración:');
  console.log('   http://localhost:3000/admin');
  process.exit(0);
}
