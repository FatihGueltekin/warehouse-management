import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import { promises } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const parts_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filePath = join(process.cwd(), "server/data/\xFCr\xFCnler.json");
  await promises.writeFile(filePath, JSON.stringify(body, null, 2));
  return { success: true };
});

export { parts_post as default };
//# sourceMappingURL=parts.post.mjs.map
