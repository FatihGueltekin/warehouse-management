import { d as defineEventHandler } from '../../runtime.mjs';
import { promises } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const sells_get = defineEventHandler(async () => {
  const filePath = join(process.cwd(), "server/data/satislar.json");
  let salesData = [];
  try {
    const fileData = await promises.readFile(filePath, "utf-8");
    salesData = JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      throw error;
    }
  }
  return salesData;
});

export { sells_get as default };
//# sourceMappingURL=sells.get.mjs.map
