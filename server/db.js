const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
  }
});

// Helper for promise-based queries
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Helper to safely add column if missing
const ensureColumn = async (table, column, type) => {
  try {
    await runQuery(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  } catch (err) {
    // Column already exists or table doesn't exist yet
  }
};

// Initialize Database Schema
const initDb = async () => {
  // 1. Leads Table
  await runQuery(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      company TEXT,
      interested_service TEXT,
      message TEXT NOT NULL,
      source_page TEXT,
      status TEXT DEFAULT 'NEW',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration for legacy leads table if full_name was missing
  await ensureColumn('leads', 'full_name', 'TEXT');
  await ensureColumn('leads', 'company', 'TEXT');
  await ensureColumn('leads', 'interested_service', 'TEXT');
  await ensureColumn('leads', 'source_page', 'TEXT');

  // 2. Project Applications Table
  await runQuery(`
    CREATE TABLE IF NOT EXISTS project_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id TEXT UNIQUE NOT NULL,
      company_name TEXT NOT NULL,
      business_type TEXT NOT NULL,
      industry TEXT NOT NULL,
      company_website TEXT,
      years_in_business TEXT,
      business_description TEXT,
      full_name TEXT NOT NULL,
      designation TEXT,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      alt_phone TEXT,
      whatsapp TEXT,
      preferred_contact_method TEXT,
      office_address TEXT,
      city TEXT,
      state TEXT,
      country TEXT,
      postal_code TEXT,
      has_logo TEXT,
      existing_brand_guidelines TEXT,
      existing_brand_colors TEXT,
      preferred_colors TEXT,
      colors_to_avoid TEXT,
      existing_font TEXT,
      preferred_font TEXT,
      typography_preferences TEXT,
      existing_patterns TEXT,
      reference_websites TEXT,
      project_name TEXT,
      project_type TEXT,
      project_description TEXT,
      existing_website TEXT,
      existing_url TEXT,
      current_problems TEXT,
      required_features TEXT,
      required_pages TEXT,
      integrations TEXT,
      competitors TEXT,
      primary_goal TEXT,
      target_audience TEXT,
      business_objectives TEXT,
      expected_outcome TEXT,
      problems_to_solve TEXT,
      success_criteria TEXT,
      desired_start_date TEXT,
      desired_completion_date TEXT,
      deadline TEXT,
      is_deadline_flexible TEXT,
      reason_for_deadline TEXT,
      budget_range TEXT,
      competitor_websites TEXT,
      inspiration_websites TEXT,
      reference_designs TEXT,
      social_media_links TEXT,
      additional_requirements TEXT,
      special_requirements TEXT,
      technical_requirements TEXT,
      restrictions TEXT,
      additional_notes TEXT,
      quotation_data TEXT,
      status TEXT DEFAULT 'NEW',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 3. Uploaded Files Table
  await runQuery(`
    CREATE TABLE IF NOT EXISTS uploaded_files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_id TEXT UNIQUE NOT NULL,
      application_id TEXT,
      lead_id TEXT,
      field_name TEXT,
      original_name TEXT NOT NULL,
      stored_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      file_path TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 4. Quotations Table
  await runQuery(`
    CREATE TABLE IF NOT EXISTS quotations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quotation_id TEXT UNIQUE NOT NULL,
      application_id TEXT,
      service_id TEXT,
      package_id TEXT,
      duration_label TEXT,
      duration_months INTEGER,
      addons_json TEXT,
      deliverables_json TEXT,
      grand_total REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database tables initialized and migrated successfully.');
};

initDb().catch((err) => {
  console.error('Error initializing database tables:', err);
});

module.exports = {
  db,
  runQuery,
  getQuery,
  allQuery,
};
