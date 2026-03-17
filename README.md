# Prin — Guía de deployment

## Lo que necesitas
- Cuenta en **Supabase** (gratis) → supabase.com
- Cuenta en **Vercel** (gratis) → vercel.com
- API key de **Anthropic** → console.anthropic.com

---

## Paso 1 — Supabase

1. Crea un proyecto nuevo en supabase.com
2. Ve a **SQL Editor** y ejecuta todo el contenido de `supabase-schema.sql`
3. Guarda estos dos valores (los necesitas en el paso 3):
   - Project URL → Settings → API → `URL`
   - Service Role Key → Settings → API → `service_role` (la llave secreta, no la pública)

---

## Paso 2 — Sube el código a GitHub

1. Crea un repositorio nuevo en github.com
2. Sube toda esta carpeta (`prin-production/`)

O desde terminal:
```bash
cd prin-production
git init
git add .
git commit -m "Prin — primera versión"
git remote add origin https://github.com/TU-USUARIO/prin.git
git push -u origin main
```

---

## Paso 3 — Deploy en Vercel

1. Ve a vercel.com → "Add New Project"
2. Importa tu repositorio de GitHub
3. En **Environment Variables**, agrega estas tres:

| Variable | Valor |
|----------|-------|
| `ANTHROPIC_API_KEY` | Tu API key de Anthropic |
| `SUPABASE_URL` | La URL de tu proyecto Supabase |
| `SUPABASE_SERVICE_KEY` | El service_role key de Supabase |

4. Deploy → en 2 minutos tienes una URL tipo `prin-xyz.vercel.app`

---

## Paso 4 — Conecta el frontend

1. Abre `public/index.html`
2. En la línea que dice:
   ```js
   const API_BASE = "https://TU-PROYECTO.vercel.app";
   ```
   Cambia `TU-PROYECTO` por la URL real de tu deploy en Vercel
3. Vuelve a hacer push → Vercel redeploya automáticamente

---

## Paso 5 — Instala en tu teléfono

1. Abre la URL en Safari (iPhone) o Chrome (Android)
2. Safari: botón de compartir → "Agregar a pantalla de inicio"
3. Chrome: menú → "Instalar app"

Prin vive en tu teléfono. 🐾

---

## Costos estimados (uso personal)

- Supabase: gratis (hasta 500MB, más que suficiente)
- Vercel: gratis (hasta 100GB de bandwidth)
- Anthropic: ~$0.01–0.05 por conversación con Sonnet

---

## Estructura del proyecto

```
prin-production/
├── api/
│   ├── chat.js          ← el cerebro: recibe mensaje, llama a Anthropic, guarda memoria
│   ├── profile.js       ← guarda/lee el perfil de Valeria
│   └── memory.js        ← lee/borra la memoria de Prin
├── public/
│   ├── index.html       ← la app completa (PWA)
│   ├── manifest.json    ← para instalar en el teléfono
│   └── icon.svg         ← el ícono de Prin
├── supabase-schema.sql  ← ejecuta esto en Supabase
├── package.json
├── vercel.json
└── README.md
```
