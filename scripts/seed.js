const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Parse .env.local manually (dependency-free)
const envPath = path.join(__dirname, '..', '.env.local');
let supabaseUrl = 'https://mmvygvnmomektttsnjdc.supabase.co';
let supabaseKey = 'sb_publishable_2mYV-JLucd4I9opDytvHIQ_hY0UTOZR';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.*)/);
  const keyMatch = envContent.match(/(SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET_KEY)\s*=\s*(.*)/);

  if (urlMatch && urlMatch[1].trim()) {
    supabaseUrl = urlMatch[1].trim();
  }
  if (keyMatch && keyMatch[2].trim() && !keyMatch[2].includes('your_service_role_key')) {
    supabaseKey = keyMatch[2].trim();
  }
}

// Fallback to other env names if needed
if (!supabaseUrl) supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
if (!supabaseKey) {
  supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '';
}

// If we still have placeholder or empty values, error out
if (!supabaseUrl || !supabaseKey || supabaseKey.includes('your_service_role_key')) {
  console.error('❌ Error: Please make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set correctly in your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedTable(tableName, jsonFileName) {
  const filePath = path.join(__dirname, '..', 'data', jsonFileName);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Skip: ${jsonFileName} not found.`);
    return;
  }

  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const records = JSON.parse(rawData);

    if (!Array.isArray(records) || records.length === 0) {
      console.log(`ℹ️ ${tableName}: No records to seed.`);
      return;
    }

    console.log(`⏳ Seeding ${records.length} records into "${tableName}"...`);

    // Format keys if necessary (e.g. mapping "order" or "submittedAt" to match database columns)
    const formattedRecords = records.map(record => {
      const formatted = { ...record };
      // Map camelCase to snake_case if necessary for database columns
      if (tableName === 'join_requests') {
        if (record.submittedAt) {
          formatted.submitted_at = record.submittedAt;
          delete formatted.submittedAt;
        }
      }
      return formatted;
    });

    const { error } = await supabase.from(tableName).upsert(formattedRecords);

    if (error) {
      console.error(`❌ Error seeding ${tableName}:`, error.message);
    } else {
      console.log(`✅ Successfully seeded "${tableName}".`);
    }
  } catch (err) {
    console.error(`❌ Failed to seed ${tableName}:`, err);
  }
}

async function run() {
  console.log('🚀 Starting Supabase Seeding...');
  await seedTable('news', 'news.json');
  await seedTable('members', 'members.json');
  await seedTable('structures', 'structures.json');
  await seedTable('faqs', 'faq.json');
  await seedTable('join_requests', 'join-requests.json');
  console.log('🏁 Seeding completed.');
}

run();
