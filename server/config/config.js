// =========================
//         Puerto    
// =========================
process.env.PORT = process.env.PORT || 3000;

// =========================
//   Vencimiento del token    
// =========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =========================
//     SEED del autenticacion 
// =========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =========================
//         Entorno    
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==========================
//         Base de datos    
// ==========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    console.log('Environment: ', process.env.NODE_ENV);
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;