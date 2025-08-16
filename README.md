# AI Ecommerce 2025 - Hệ Thống Check-in

## Mô tả
Hệ thống check-in thông minh cho sự kiện AI Ecommerce 2025 - countdown timer và chuyển đổi form tự động theo thời gian.

## Tính năng chính
- ✅ Countdown timer đến thời gian sự kiện
- ✅ Chuyển đổi tự động từ countdown sang form check-in
- ✅ Logo AI Ecommerce với thiết kế đẹp mắt
- ✅ Form check-in đơn giản với validation
- ✅ Modal thông báo thành công/lỗi
- ✅ Giao diện responsive và hiện đại
- ✅ Background gradient đẹp mắt

## Cách sử dụng

### 1. Mở file
```bash
# Mở file HTML trong trình duyệt
start checkin.html
```

### 2. Countdown Timer
- Hiển thị thời gian còn lại đến sự kiện
- Tự động chuyển sang form check-in khi đến giờ

### 3. Check-in
- Nhập mã check-in vào form
- Nhấn nút "Check-in"
- Nhận thông báo thành công/lỗi

## Cấu trúc file
```
CheckInEvent/
├── checkin.html      # File HTML chính
├── style.css         # File CSS styling
└── README.md         # Hướng dẫn sử dụng
```

## Công nghệ sử dụng
- HTML5
- CSS3 (với animations và gradients)
- JavaScript (ES6+)
- Google Fonts (Roboto)
- Countdown Timer tự động

## Deployment lên Vercel

### Cách deploy:
1. **Push code lên GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy trên Vercel**
- Truy cập [vercel.com](https://vercel.com)
- Import project từ GitHub
- Vercel sẽ tự động detect và deploy

### Cấu hình đã có sẵn:
- ✅ `vercel.json` - Cấu hình routing và headers
- ✅ `.gitignore` - Loại trừ file không cần thiết
- ✅ Responsive design cho mobile
- ✅ Optimized images (cần compress thêm)

## Lưu ý
- Cần kết nối internet để load Google Fonts
- Hệ thống hoạt động hoàn toàn ở client-side
- Dữ liệu không được lưu trữ, chỉ hiển thị tạm thời
- Thời gian sự kiện được set cố định: 17/09/2025
- Đã thay thế alert() bằng notification modal đẹp mắt

## Tùy chỉnh
- Thay đổi thời gian sự kiện trong JavaScript (eventDate)
- Thay đổi màu sắc trong file `style.css`
- Thêm logo thật bằng cách thay thế `logo-placeholder` trong HTML
- Có thể kết nối với backend để validate mã check-in thật

## Tối ưu hóa cho Production
- ✅ Loại bỏ alert() functions
- ✅ Thêm proper error handling
- ✅ Responsive design
- ⚠️ Cần compress images (robot.png 4.8MB quá lớn)
- ⚠️ Có thể thêm lazy loading cho images
