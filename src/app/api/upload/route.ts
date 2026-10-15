import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let buffer: Buffer;
    let originalName = 'uploaded-image.jpg';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file found in upload form data' }, { status: 400 });
      }

      originalName = file.name || 'uploaded-image.jpg';
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
    } else if (contentType.includes('application/json')) {
      const body = await request.json();
      const { base64, filename } = body;

      if (!base64) {
        return NextResponse.json({ success: false, error: 'No base64 image data provided' }, { status: 400 });
      }

      originalName = filename || 'uploaded-image.jpg';
      const cleanBase64 = base64.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');
      buffer = Buffer.from(cleanBase64, 'base64');
    } else {
      // Direct binary stream
      const bytes = await request.arrayBuffer();
      if (!bytes || bytes.byteLength === 0) {
        return NextResponse.json({ success: false, error: 'Empty file payload' }, { status: 400 });
      }
      buffer = Buffer.from(bytes);
    }

    if (!buffer || buffer.length === 0) {
      return NextResponse.json({ success: false, error: 'Uploaded file is empty (0 bytes)' }, { status: 400 });
    }

    // Sanitize filename and create unique name
    const ext = path.extname(originalName) || '.jpg';
    const cleanBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFilename = `${cleanBase}-${Date.now()}${ext.toLowerCase()}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, uniqueFilename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      size: buffer.length,
    });
  } catch (error: any) {
    console.error('File upload error in /api/upload:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Server error while writing uploaded file',
      },
      { status: 500 }
    );
  }
}
