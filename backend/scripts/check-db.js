const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
  console.log('Connecting to:', process.env.SUPABASE_URL);

  // We can't query information_schema directly easily with supabase-js
  // unless we have exposed it, but we can try to insert a dummy row with 1 dimension
  // and see the error message, or try to rpc if available.
  
  // Better approach: Test the RPC function if it exists
  try {
      console.log('Testing match_documents RPC...');
      // Try to call with a 768-dim vector (dummy)
      const dummyVector = new Array(768).fill(0.1);
      const { data, error } = await supabase.rpc('match_documents', {
          query_embedding: dummyVector,
          match_count: 1
      });

      if (error) {
          console.error('RPC Error:', error.message);
          if (error.message.includes('does not exist')) {
              console.log('-> CONCLUSION: The function `match_documents` does not exist or has the wrong signature.');
          } else if (error.message.includes('dimensions')) {
               console.log('-> CONCLUSION: The function expects different dimensions than 768.');
          }
      } else {
          console.log('RPC Success! The database accepts 768-dimension vectors.');
      }
  } catch (e) {
      console.error('RPC Exception:', e);
  }

  // Also try to insert a row to see the table error
  try {
      console.log('\nTesting direct insert to `documents` table...');
      const dummyVector = new Array(768).fill(0.1);
      const { error } = await supabase.from('documents').insert({
          url: 'debug-test',
          title: 'debug',
          chunk: 'debug',
          embedding: dummyVector
      });

      if (error) {
          console.error('Insert Error:', error.message);
           if (error.message.includes('expected 1536')) {
              console.log('-> CONCLUSION: Table `documents` is STILL configured for 1536 dimensions (OpenAI).');
              console.log('   Please run `docs/sql/force-migration-gemini.sql` in Supabase SQL Editor.');
          }
      } else {
          console.log('Insert Success! The table accepts 768-dimension vectors.');
          // Clean up
          await supabase.from('documents').delete().eq('url', 'debug-test');
      }
  } catch (e) {
      console.error('Insert Exception:', e);
  }
}

checkSchema();
