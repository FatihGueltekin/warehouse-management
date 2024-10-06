import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import { promises } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const sells_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const currentDate = /* @__PURE__ */ new Date();
  const filePath = join(process.cwd(), "server/data/satislar.json");
  const archiveFolderPath = join(process.cwd(), "server/archive");
  if (!await promises.stat(archiveFolderPath).catch(() => false)) {
    await promises.mkdir(archiveFolderPath);
  }
  let salesData = [];
  try {
    const fileData = await promises.readFile(filePath, "utf-8");
    salesData = JSON.parse(fileData);
  } catch (error) {
    if (error.code !== "ENOENT")
      throw error;
  }
  const getMonthDifference = (startDate, endDate) => {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    return (endYear - startYear) * 12 + (endMonth - startMonth);
  };
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  const salesToArchive = [];
  const recentSales = salesData.filter((sale) => {
    const saleDate = parseDate(sale.satis_tarihi);
    const monthsDiff = getMonthDifference(saleDate, currentDate);
    if (monthsDiff > 9) {
      salesToArchive.push(sale);
      return false;
    }
    return true;
  });
  if (salesToArchive.length > 0) {
    const archiveFileName = `satislar_archive_${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}.json`;
    const archiveFilePath = join(archiveFolderPath, archiveFileName);
    await promises.writeFile(archiveFilePath, JSON.stringify(salesToArchive, null, 2));
  }
  recentSales.push(body);
  await promises.writeFile(filePath, JSON.stringify(recentSales, null, 2));
  return { success: true };
});

export { sells_post as default };
//# sourceMappingURL=sells.post.mjs.map
