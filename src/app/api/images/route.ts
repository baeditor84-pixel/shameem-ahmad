import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const validExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);
    const images: { path: string; name: string; folder: string }[] = [];

    // Check public/images
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (validExtensions.has(ext)) {
          images.push({
            path: `/images/${file}`,
            name: file,
            folder: 'images',
          });
        }
      }
    }

    // Check public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (validExtensions.has(ext)) {
          images.push({
            path: `/uploads/${file}`,
            name: file,
            folder: 'uploads',
          });
        }
      }
    }

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error fetching image list:', error);
    return NextResponse.json({ success: false, images: [] }, { status: 500 });
  }
}
