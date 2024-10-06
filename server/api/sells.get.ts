import { promises as fs } from 'fs';
import { join } from 'path';

export default defineEventHandler(async () => {
  const filePath = join(process.cwd(), 'server/data/satislar.json');

  // Load current sales from satislar.json
  let salesData = [];
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    salesData = JSON.parse(fileData);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // satislar.json doesn't exist, return an empty array
      return [];
    } else {
      throw error; // Propagate other errors
    }
  }

  return salesData;
});
