// Vercel serverless function để proxy Google Sheets API
// File: api/sheets.js

export default async function handler(req, res) {
  // Chỉ cho phép GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Lấy API key từ environment variable (bảo mật)
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const RANGE = process.env.GOOGLE_SHEETS_RANGE || 'LadiPage!A2:AZ67';

    // Kiểm tra environment variables
    if (!API_KEY || !SPREADSHEET_ID) {
      console.error('Missing environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'API key or Spreadsheet ID not configured'
      });
    }

    // Gọi Google Sheets API
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả về dữ liệu (không bao gồm API key)
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
