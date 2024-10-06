import { promises as fs } from 'fs';
import { join } from 'path';

export default defineEventHandler(async () => {
  const filePath = join(process.cwd(), 'static/data/araclar.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
});
