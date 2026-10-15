import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const validExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);
    const images: { path: string; name: string; folder: string }[] = [];

    // Helper to recursively collect files
    const scanDir = (dir: string, basePublicPath: string) => {
      if (!fs.existsSync(dir)) return;

      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath, `${basePublicPath}/${entry.name}`);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (validExtensions.has(ext)) {
            // Encode URI components so spaces work reliably in Next/Image and <img> tags
            const webPath = `${basePublicPath}/${encodeURIComponent(entry.name)}`;
            images.push({
              path: webPath,
              name: entry.name,
              folder: basePublicPath.replace(/^\//, ''),
            });
          }
        }
      }
    };

    // Scan public/images
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    scanDir(imagesDir, '/images');

    // Scan public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    scanDir(uploadsDir, '/uploads');

    // Sort newest/uploads first, then alphabetical
    images.sort((a, b) => {
      if (a.folder.startsWith('uploads') && !b.folder.startsWith('uploads')) return -1;
      if (!a.folder.startsWith('uploads') && b.folder.startsWith('uploads')) return 1;
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error fetching image list:', error);
    return NextResponse.json({ success: false, images: [] }, { status: 500 });
  }
}
