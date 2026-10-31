import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Support high payload limit for uploaded base64 local images and audio files
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

// Directories for persistent storage and source-code synchronization
const DATA_DIR = path.resolve(__dirname, 'data');
const SRC_CONFIG_DIR = path.resolve(__dirname, 'src/config');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(SRC_CONFIG_DIR)) {
  fs.mkdirSync(SRC_CONFIG_DIR, { recursive: true });
}

const CONFIG_DATA_PATH = path.join(DATA_DIR, 'wedding-config.json');
const CONFIG_SRC_PATH = path.join(SRC_CONFIG_DIR, 'wedding-config.json');
const WISHES_DATA_PATH = path.join(DATA_DIR, 'wedding-wishes.json');
const WISHES_SRC_PATH = path.join(SRC_CONFIG_DIR, 'wedding-wishes.json');
const AUTH_DATA_PATH = path.join(DATA_DIR, 'admin-auth.json');

// Read config with fallback hierarchy: data/ -> src/config/
function getSavedConfig(): any {
  try {
    if (fs.existsSync(CONFIG_DATA_PATH)) {
      const data = fs.readFileSync(CONFIG_DATA_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading data config:', err);
  }

  try {
    if (fs.existsSync(CONFIG_SRC_PATH)) {
      const data = fs.readFileSync(CONFIG_SRC_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading src config:', err);
  }

  return null;
}

// Write config to BOTH data/ and src/config/ so it is permanently part of the entire codebase
function saveConfigEverywhere(config: any): void {
  const jsonString = JSON.stringify(config, null, 2);
  try {
    fs.writeFileSync(CONFIG_DATA_PATH, jsonString, 'utf-8');
  } catch (err) {
    console.error('Failed to write data config:', err);
  }

  try {
    fs.writeFileSync(CONFIG_SRC_PATH, jsonString, 'utf-8');
  } catch (err) {
    console.error('Failed to write src config:', err);
  }
}

// Read and save guest wishes
function getSavedWishes(): any[] {
  try {
    if (fs.existsSync(WISHES_DATA_PATH)) {
      return JSON.parse(fs.readFileSync(WISHES_DATA_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading data wishes:', err);
  }

  try {
    if (fs.existsSync(WISHES_SRC_PATH)) {
      return JSON.parse(fs.readFileSync(WISHES_SRC_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading src wishes:', err);
  }

  return [];
}

function saveWishesEverywhere(wishes: any[]): void {
  const jsonString = JSON.stringify(wishes, null, 2);
  try {
    fs.writeFileSync(WISHES_DATA_PATH, jsonString, 'utf-8');
  } catch (err) {
    console.error('Failed to write data wishes:', err);
  }

  try {
    fs.writeFileSync(WISHES_SRC_PATH, jsonString, 'utf-8');
  } catch (err) {
    console.error('Failed to write src wishes:', err);
  }
}

// Read and save admin credentials
function getAdminAuth(): { username: string; passwordHash: string } {
  try {
    if (fs.existsSync(AUTH_DATA_PATH)) {
      return JSON.parse(fs.readFileSync(AUTH_DATA_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading admin auth:', err);
  }
  return { username: 'admin', passwordHash: 'wedding2026' };
}

function saveAdminAuth(auth: { username: string; passwordHash: string }): void {
  try {
    fs.writeFileSync(AUTH_DATA_PATH, JSON.stringify(auth, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving admin auth:', err);
  }
}

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. Get Wedding Configuration
app.get('/api/config', (_req, res) => {
  const config = getSavedConfig();
  res.json({
    success: true,
    config,
    source: config ? 'server_persisted' : 'none',
  });
});

// 2. Save Wedding Configuration across entire codebase
app.post('/api/config', (req, res) => {
  try {
    const newConfig = req.body;
    if (!newConfig || typeof newConfig !== 'object') {
      res.status(400).json({ success: false, error: 'Data konfigurasi tidak valid' });
      return;
    }

    saveConfigEverywhere(newConfig);

    res.json({
      success: true,
      message: 'Perubahan berhasil disimpan ke server dan seluruh berkas kode sumber!',
      config: newConfig,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error in POST /api/config:', err);
    res.status(500).json({ success: false, error: err.message || 'Gagal menyimpan konfigurasi' });
  }
});

// 3. Reset Configuration to Source Default
app.post('/api/config/reset', (_req, res) => {
  try {
    let defaultConfig = null;
    if (fs.existsSync(CONFIG_SRC_PATH)) {
      defaultConfig = JSON.parse(fs.readFileSync(CONFIG_SRC_PATH, 'utf-8'));
    }
    if (fs.existsSync(CONFIG_DATA_PATH)) {
      fs.unlinkSync(CONFIG_DATA_PATH);
    }
    res.json({
      success: true,
      message: 'Konfigurasi telah direset ke bawaan kode sumber.',
      config: defaultConfig,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Get Guest Wishes (RSVP Live Feed)
app.get('/api/wishes', (_req, res) => {
  const wishes = getSavedWishes();
  res.json({ success: true, wishes });
});

// 5. Post New Guest Wish
app.post('/api/wishes', (req, res) => {
  try {
    const wish = req.body;
    if (!wish || !wish.name || !wish.message) {
      res.status(400).json({ success: false, error: 'Nama dan pesan ucapan wajib diisi.' });
      return;
    }

    const currentWishes = getSavedWishes();
    const newWish = {
      id: wish.id || `wish-${Date.now()}`,
      name: String(wish.name).trim(),
      relationship: wish.relationship || 'Sahabat',
      attendance: wish.attendance || 'hadir',
      message: String(wish.message).trim(),
      createdAt: wish.createdAt || 'Baru saja',
    };

    const updated = [newWish, ...currentWishes];
    saveWishesEverywhere(updated);

    res.json({ success: true, wish: newWish, wishes: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Admin Authentication Endpoints
app.get('/api/admin/auth', (_req, res) => {
  const auth = getAdminAuth();
  res.json({ success: true, username: auth.username });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const current = getAdminAuth();
  if (
    username &&
    password &&
    username.trim() === current.username.trim() &&
    password === current.passwordHash
  ) {
    res.json({ success: true, message: 'Login berhasil' });
  } else {
    res.status(401).json({ success: false, error: 'Username atau password salah' });
  }
});

app.post('/api/admin/credentials', (req, res) => {
  const { newUsername, newPassword } = req.body;
  if (!newUsername || !newPassword) {
    res.status(400).json({ success: false, error: 'Username dan password baru wajib diisi' });
    return;
  }
  saveAdminAuth({ username: newUsername.trim(), passwordHash: newPassword });
  res.json({ success: true, message: 'Kredensial admin berhasil diperbarui secara permanen' });
});

// 7. Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// ==========================================
// VITE OR STATIC FILE SERVING
// ==========================================
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wedding App server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
