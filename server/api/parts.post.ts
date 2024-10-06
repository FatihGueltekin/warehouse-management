import { promises as fs } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Read the request body
  const filePath = join(process.cwd(), 'server/data/ürünler.json');
  
  // Write the updated data to the file
  await fs.writeFile(filePath, JSON.stringify(body, null, 2));
  return { success: true };
});
