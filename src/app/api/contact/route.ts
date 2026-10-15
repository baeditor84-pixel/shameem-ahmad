import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { defaultSiteData, InquiryItem, SiteData } from '@/data/defaultSiteData';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'site-content.json');

function saveInquiryToContent(inquiry: InquiryItem) {
  try {
    let content: SiteData = defaultSiteData;
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      content = JSON.parse(fileData);
    }
    if (!Array.isArray(content.inquiries)) {
      content.inquiries = [];
    }
    // Prepend latest inquiry
    content.inquiries.unshift(inquiry);
    fs.writeFileSync(dataFilePath, JSON.stringify(content, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save inquiry to site-content.json:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, country, language, specialty, message, fileName } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save inquiry to Admin Inquiries list
    const newInquiry: InquiryItem = {
      id: `inq-${Date.now()}`,
      name,
      country: country || 'International',
      language: language || 'English',
      specialty: specialty || 'General',
      message,
      fileName: fileName || undefined,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    saveInquiryToContent(newInquiry);

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      // 100% Free Email Delivery via Web3Forms (Delivers directly to your Gmail)
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `🏥 New Patient Inquiry: ${name} (${country})`,
            from_name: 'Shameem Website Inquiry',
            to_email: 'info@shameemcare.com',
            Patient_Name: name,
            Country: country,
            Preferred_Language: language,
            Medical_Specialty: specialty,
            Medical_Message: message,
            Attached_Report_File: fileName || 'No file attached',
          }),
        });

        const data = await res.json();
        if (!data.success) {
          console.error('Web3Forms email delivery error:', data);
        }
      } catch (emailErr) {
        console.error('Email dispatch error:', emailErr);
      }
    } else {
      console.log('Received Patient Inquiry & saved to Admin Panel:', newInquiry);
    }

    // Return success response to client
    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. Shameem Ahmad will contact you shortly.',
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
