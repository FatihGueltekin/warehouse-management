import { promises as fs } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Get the new sales data
  const currentDate = new Date();

  const filePath = join(process.cwd(), 'static/data/satislar.json');
  const archiveFolderPath = join(process.cwd(), 'static/archive');

  // Create archive folder if it doesn't exist
  if (!await fs.stat(archiveFolderPath).catch(() => false)) {
    await fs.mkdir(archiveFolderPath);
  }

  // Load current sales from satislar.json
  let salesData = [];
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    salesData = JSON.parse(fileData);
  } catch (error: any) {
    if (error.code !== 'ENOENT') throw error;
  }

  // Helper function to calculate the difference in months between two dates
  const getMonthDifference = (startDate: any, endDate: any) => {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    return (endYear - startYear) * 12 + (endMonth - startMonth);
  };

  // Convert ISO date string (e.g. "2024-09-20") to JavaScript Date object
  const parseDate = (dateString: any) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date
  };

  // Filter out sales older than 9 months, and archive them
  const salesToArchive: any = [];
  const recentSales = salesData.filter((sale: any) => {
    const saleDate = parseDate(sale.satis_tarihi);
    const monthsDiff = getMonthDifference(saleDate, currentDate);

    if (monthsDiff > 9) {
      // Collect sales between 6-9 months to archive
      salesToArchive.push(sale);
      return false;
    }

    return true; // Keep sales within the last 6 months
  });

  // If there are sales to archive, create an archive file
  if (salesToArchive.length > 0) {
    const archiveFileName = `satislar_archive_${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}.json`;
    const archiveFilePath = join(archiveFolderPath, archiveFileName);

    await fs.writeFile(archiveFilePath, JSON.stringify(salesToArchive, null, 2));
  }

  // Append the new sale to the recent sales
  recentSales.push(body);

  // Write the updated sales (only recent + new sale) back to satislar.json
  await fs.writeFile(filePath, JSON.stringify(recentSales, null, 2));

  return { success: true };
});
