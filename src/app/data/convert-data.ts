// extraerCoordenadasOCR.ts

import fetch from 'node-fetch';
import { createWorker } from 'tesseract.js';
import { JSDOM } from 'jsdom';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

interface Station {
  name: string;
  location: string;
  state: string;
  link: string;
  region: string;
  id: string;
  latitude?: number | null;
  longitude?: number | null;
}

// Convierte "10°16'47.0\" N" a decimal
function dmsToDecimal(dms: string): number {
  const m = dms.match(/(\d+)°\s*(\d+)'(?:\s*([\d.]+)")?\s*([NSEOW])/i);
  if (!m) throw new Error(`DMS inválido: ${dms}`);
  const deg = parseFloat(m[1]);
  const min = parseFloat(m[2]);
  const sec = m[3] ? parseFloat(m[3]) : 0;
  const dir = m[4].toUpperCase();
  let dec = deg + min/60 + sec/3600;
  if (dir === 'S' || dir === 'O' || dir === 'W') dec = -dec;
  return dec;
}

async function extractLatLonFromImage(imgUrl: string, worker: Tesseract.Worker)
  : Promise<{ latitude: number | null; longitude: number | null }> 
{
  try {
    const imgRes = await fetch(imgUrl);
    if (!imgRes.ok) throw new Error(`HTTP ${imgRes.status}`);
    const arrayBuffer = await imgRes.arrayBuffer();
    const { data: { text } } = await worker.recognize(Buffer.from(arrayBuffer), 'spa');

    // Busca líneas con "Latitud:" y "Longitud:"
    const latMatch = text.match(/Latitud[:\s]*([0-9°'"\.\sNSOEOW]+)/i);
    const lonMatch = text.match(/Longitud[:\s]*([0-9°'"\.\sNSOEOW]+)/i);

    const latitude  = latMatch ? dmsToDecimal(latMatch[1].trim())  : null;
    const longitude = lonMatch ? dmsToDecimal(lonMatch[1].trim()) : null;
    return { latitude, longitude };
  } catch (err) {
    console.error(`OCR fallo en ${imgUrl}:`, err);
    return { latitude: null, longitude: null };
  }
}

async function main() {
  const inputPath  = path.resolve(__dirname, 'estaciones.json');
  const outputPath = path.resolve(__dirname, 'estaciones_con_coordenadas.json');

  // 1) Leer estaciones
  const raw = await readFile(inputPath, 'utf-8');
  const estaciones: Station[] = JSON.parse(raw);

  // 2) Inicializar Tesseract
  const worker = createWorker({
    logger: m => process.stdout.write(`\rOCR: ${Math.round((m.progress||0)*100)}% `)
  });
  await worker.load();
  await worker.loadLanguage('spa');
  await worker.initialize('spa');

  // 3) Para cada estación, extraer img → OCR → lat/lon
  for (const est of estaciones) {
    process.stdout.write(`\nProcesando ${est.id} ... `);

    // fetch página y extraer primer <img>
    try {
      const page = await fetch(est.link);
      const html = await page.text();
      const dom = new JSDOM(html);
      const imgEl = dom.window.document.querySelector('img');
      if (!imgEl) throw new Error('No hay <img>');
      const imgSrc = imgEl.getAttribute('src')!;
      // OCR y parseo
      const { latitude, longitude } = await extractLatLonFromImage(imgSrc, worker);
      est.latitude  = latitude;
      est.longitude = longitude;
      console.log(
        latitude !== null && longitude !== null
          ? `OK (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`
          : `sin datos`
      );
    } catch (err) {
      console.error(`Error en página ${est.link}:`, err.message);
      est.latitude = est.longitude = null;
    }
  }

  await worker.terminate();

  // 4) Guardar JSON enriquecido
  await writeFile(outputPath, JSON.stringify(estaciones, null, 2), 'utf-8');
  console.log(`\n✅ Resultado en: ${outputPath}`);
}

main().catch(err => {
  console.error('Error general:', err);
  process.exit(1);
});
