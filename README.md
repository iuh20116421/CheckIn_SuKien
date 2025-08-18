# Check-in Event System

Hệ thống check-in sự kiện với giao diện đẹp và tính năng hiển thị thông tin chi tiết khách hàng.

## Tính năng

- ⏰ Đếm ngược thời gian đến sự kiện
- 📱 Giao diện responsive cho mobile và desktop
- ✅ Check-in bằng số điện thoại
- 📊 Hiển thị thông tin chi tiết khách hàng
- 🔄 Tích hợp Google Sheets API
- 🎨 Giao diện hiện đại với hiệu ứng đẹp mắt

## Cấu trúc dự án

```
CheckInEvent/
├── checkin.html          # File HTML chính
├── style.css             # File CSS styles
├── config.js             # File cấu hình (API keys, settings)
├── .gitignore            # File bỏ qua Git
├── README.md             # File hướng dẫn
├── vercel.json           # Cấu hình deploy Vercel
└── image/                # Thư mục chứa hình ảnh
    ├── logos.png
    ├── AiEcommerce.png
    ├── RobotEcommerce.png
    └── ...
```

## Cài đặt và sử dụng

### 1. Clone dự án
```bash
git clone <repository-url>
cd CheckInEvent
```

### 2. Cấu hình API Keys
Chỉnh sửa file `config.js` với thông tin của bạn:

```javascript
const config = {
    GOOGLE_SHEETS: {
        API_KEY: 'your-google-sheets-api-key',
        SPREADSHEET_ID: 'your-spreadsheet-id',
        RANGE: 'SheetName!A2:AZ67'
    },
    // ... other config
};
```

### 3. Cấu trúc Google Sheets
Google Sheets cần có cấu trúc như sau:
- Cột A: Họ tên
- Cột B: Mã đơn hàng  
- Cột C: Hạng vé
- Cột D: Email
- Cột E: Số điện thoại
- Cột F: Giá vé (chưa VAT)
- Cột G: Giá vé (đã VAT)
- Cột H: Trạng thái

### 4. Chạy dự án
Mở file `checkin.html` trong trình duyệt hoặc sử dụng local server:

```bash
# Sử dụng Python
python -m http.server 8000

# Sử dụng Node.js
npx serve .

# Sử dụng PHP
php -S localhost:8000
```

## Bảo mật

### ⚠️ Quan trọng về bảo mật

1. **File config.js đã được thêm vào .gitignore** để bảo vệ API keys
2. **Không commit file config.js** lên Git repository
3. **Tạo file config.example.js** để làm mẫu cho team

### Tạo file config.example.js
```javascript
const config = {
    GOOGLE_SHEETS: {
        API_KEY: 'YOUR_API_KEY_HERE',
        SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',
        RANGE: 'SheetName!A2:AZ67'
    },
    // ... other config
};
```

## Tính năng mới

### Hiển thị thông tin khách hàng
Sau khi check-in thành công:
- ✅ Hiển thị thông báo thành công
- 📋 Chuyển sang section hiển thị thông tin chi tiết
- 🔄 Nút "Quay lại Check-in" để tiếp tục

### Giao diện thông tin khách hàng
- 🎨 Thiết kế hiện đại với hiệu ứng hover
- 📱 Responsive cho mọi thiết bị
- 🎯 Hiển thị đầy đủ thông tin:
  - Họ tên
  - Số điện thoại
  - Email (có thể click để gửi mail)
  - Hạng vé
  - Mã đơn hàng
  - Giá vé (chưa/đã VAT)
  - Trạng thái thanh toán

## Deploy

### Vercel
Dự án đã có sẵn file `vercel.json` để deploy lên Vercel:

```bash
npm install -g vercel
vercel
```

### GitHub Pages
Có thể deploy lên GitHub Pages bằng cách push code lên repository và enable GitHub Pages.

## Troubleshooting

### Lỗi API Google Sheets
1. Kiểm tra API key có đúng không
2. Kiểm tra Spreadsheet ID
3. Kiểm tra quyền truy cập Google Sheets
4. Kiểm tra CORS nếu chạy local

### Lỗi hiển thị
1. Kiểm tra console browser để xem lỗi JavaScript
2. Kiểm tra cấu trúc dữ liệu Google Sheets
3. Kiểm tra index của các cột trong function `displayCustomerDetails`

## Đóng góp

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Dự án này được phát hành dưới MIT License.
