import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { defaultSiteData, SiteData } from '@/data/defaultSiteData';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'site-content.json');

const GITHUB_RAW_URL =
  'https://raw.githubusercontent.com/baeditor84-pixel/shameem-ahmad/main/src/data/site-content.json';

// Helper to safely read content with GitHub raw fallback for Vercel
async function readContentAsync(): Promise<SiteData> {
  let fileContent: SiteData | null = null;

  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      fileContent = JSON.parse(fileData);
    }
  } catch (error) {
    console.warn('Could not read local site-content.json:', error);
  }

  // If in production/Vercel or if file doesn't exist, try fetching latest from GitHub
  if (!fileContent || process.env.VERCEL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`${GITHUB_RAW_URL}?t=${Date.now()}`, {
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const remoteData = await res.json();
        return {
          ...defaultSiteData,
          ...remoteData,
          hero: { ...defaultSiteData.hero, ...(remoteData.hero || {}) },
          contact: { ...defaultSiteData.contact, ...(remoteData.contact || {}) },
        };
      }
    } catch (gitErr) {
      // Quietly continue if offline or GitHub raw fails
    }
  }

  if (fileContent) {
    return {
      ...defaultSiteData,
      ...fileContent,
      hero: { ...defaultSiteData.hero, ...(fileContent.hero || {}) },
      contact: { ...defaultSiteData.contact, ...(fileContent.contact || {}) },
    };
  }

  // Initialize file with defaults if missing
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultSiteData, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to create default site-content.json:', err);
  }
  return defaultSiteData;
}

// Helper to safely write content
function writeContent(data: SiteData): boolean {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing site-content.json (expected in read-only lambdas):', error);
    return false;
  }
}

export async function GET() {
  const content = await readContentAsync();
  return NextResponse.json({ success: true, data: content });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid data payload' }, { status: 400 });
    }

    const current = await readContentAsync();
    const updated: SiteData = {
      ...current,
      ...body,
      hero: { ...current.hero, ...(body.hero || {}) },
      contact: { ...current.contact, ...(body.contact || {}) },
      inquiries: Array.isArray(body.inquiries) ? body.inquiries : current.inquiries,
    };

    writeContent(updated);

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('API /api/content error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
