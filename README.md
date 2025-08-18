# 🎯 Check-In Event System

Hệ thống check-in sự kiện với Google Sheets integration và Vercel Functions.

## 🚀 Setup Vercel Functions

### Bước 1: Deploy lên Vercel

1. **Vào Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "New Project"**
3. **Import Git Repository** → Chọn repository của bạn
4. **Cấu hình Project**:
   - Framework Preset: **Other**
   - Root Directory: `./` (để trống)
   - Build Command: Để trống
   - Output Directory: Để trống
   - Install Command: Để trống
5. **Click "Deploy"**

### Bước 2: Thêm Environment Variables

1. **Vào Project Settings** → **Environment Variables**
2. **Thêm 3 biến**:

```
Name: GOOGLE_SHEETS_API_KEY
Value: AIzaSyDW-UUUQc4AFLpO3kMk_lB_RkSF_sHZyo4
Environment: Production, Preview, Development
```

```
Name: GOOGLE_SHEETS_SPREADSHEET_ID
Value: 1onh0l-7hZ2JQDr9c4rnkC6QHXALYnvRJGdMOs2Wb8w4
Environment: Production, Preview, Development
```

```
Name: GOOGLE_SHEETS_RANGE
Value: LadiPage!A2:AZ67
Environment: Production, Preview, Development
```

3. **Click "Save"** và **Redeploy**

### Bước 3: Test

1. **Test API**: `https://your-project.vercel.app/api/sheets`
2. **Test website**: `https://your-project.vercel.app`

## 📁 Project Structure

```
CheckInEvent/
├── checkin.html          # Main website
├── style.css            # Styles
├── api/
│   └── sheets.js        # Vercel serverless function
├── vercel.json          # Vercel configuration
├── .gitignore           # Git ignore rules
└── README.md           # This file
```

## 🔧 Files Configuration

### `api/sheets.js`
Vercel serverless function để proxy Google Sheets API calls.

### `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/api/sheets",
      "destination": "/api/sheets.js"
    }
  ],
  "functions": {
    "api/sheets.js": {
      "maxDuration": 10
    }
  }
}
```

### `checkin.html`
Website chính với proxy API integration.

## ✅ Checklist

- [ ] Deploy lên Vercel
- [ ] Thêm Environment Variables
- [ ] Test API endpoint
- [ ] Test website functionality
- [ ] Verify check-in process
- [ ] Verify customer details display

## 🎯 Features

- ✅ **Secure API Key**: Bảo vệ trong environment variables
- ✅ **Proxy API**: Vercel Functions xử lý requests
- ✅ **Customer Details**: Hiển thị thông tin khách hàng sau check-in
- ✅ **Responsive Design**: Tương thích mobile/desktop
- ✅ **Real-time Updates**: Tự động refresh dữ liệu

## 🔗 Important URLs

- **Website**: `https://your-project.vercel.app`
- **API Endpoint**: `https://your-project.vercel.app/api/sheets`
- **Vercel Dashboard**: `https://vercel.com/dashboard`

## 🛠️ Troubleshooting

### Lỗi 500: "Server configuration error"
- Kiểm tra Environment Variables đã được set chưa
- Redeploy project sau khi thêm environment variables

### Lỗi 403: "Google Sheets API error"
- Kiểm tra API key có hợp lệ không
- Đảm bảo Google Sheets API đã được enable

### Lỗi CORS
- Vercel Functions đã xử lý CORS tự động
- Kiểm tra URL API có đúng không
