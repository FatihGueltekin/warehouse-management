import { d as defineEventHandler } from '../../runtime.mjs';
import { promises } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const cars_get = defineEventHandler(async () => {
  const filePath = join(process.cwd(), "server/data/araclar.json");
  const data = await promises.readFile(filePath, "utf-8");
  return JSON.parse(data);
});

export { cars_get as default };
//# sourceMappingURL=cars.get.mjs.map
