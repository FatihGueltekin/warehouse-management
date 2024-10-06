import { d as defineEventHandler } from '../../runtime.mjs';
import { promises } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const parts_get = defineEventHandler(async () => {
  const filePath = join(process.cwd(), "server/data/\xFCr\xFCnler.json");
  const data = await promises.readFile(filePath, "utf-8");
  return JSON.parse(data);
});

export { parts_get as default };
//# sourceMappingURL=parts.get.mjs.map
