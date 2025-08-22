/**
 * Integration script for check-in event
 * Sends userInfo data to Google Apps Script when check-in is successful
 */

// Google Apps Script URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWHdeyuyH7aV_t1bnZddnMAaveVYkq1FuIjZZcZqM/dev';

/**
 * Send check-in data to Google Apps Script using JSONP
 * @param {Array} userInfo - User information array from the system
 * @param {number} userIndex - Index of the user in usersData array
 * @returns {Promise} - Response from Google Apps Script
 */
function sendCheckinToGoogleSheet(userInfo, userIndex) {
  return new Promise((resolve, reject) => {
    try {
             console.log('🔄 Đang gửi dữ liệu check-in...');
      
      // Create unique callback function name
      const callbackName = 'handleCheckinResponse_' + Date.now();
      
      // Create global callback function
      window[callbackName] = function(data) {
                 console.log('✅ Kết quả từ Google Apps Script:', data);
        
        // Clean up immediately
        delete window[callbackName];
        if (script.parentNode) {
          document.head.removeChild(script);
        }
        
        if (data.success) {
          resolve(data);
        } else {
          const error = new Error(data.message || 'Có lỗi xảy ra');
          reject(error);
        }
      };
      
      // Process ticket type - extract part after "-"
      // Phần chỉ hiện ticket type ngắn ngọn
      let ticketType = userInfo[21] || '';
      if (ticketType && ticketType.includes('-')) {
        ticketType = ticketType.split('-').pop().trim();
      }
      
      // Prepare parameters for JSONP
      const params = new URLSearchParams({
        fullName: userInfo[2] || userInfo[26] || '',
        email: userInfo[3] || '',
        phoneNumber: userInfo[4] || userInfo[27] || '',
        ticketType: ticketType,
        userIndex: userIndex,
        timestamp: new Date().toISOString(),
        callback: callbackName
      });
      
      // Add userInfo as JSON string for Google Apps Script to parse
      params.append('userInfo', JSON.stringify(userInfo));
      
      // Create and append script tag
      const script = document.createElement('script');
      script.src = `${GOOGLE_APPS_SCRIPT_URL}?${params.toString()}`;
             script.onerror = () => {
         delete window[callbackName];
         const error = new Error('Lỗi kết nối đến Google Apps Script');
         reject(error);
       };
      
             document.head.appendChild(script);
       
               // Add timeout to prevent hanging
        setTimeout(() => {
          if (window[callbackName]) {
            delete window[callbackName];
            if (script.parentNode) {
              document.head.removeChild(script);
            }
            const error = new Error('Timeout: Không nhận được phản hồi từ server');
            reject(error);
          }
        }, 10000); // 10 seconds timeout
      
         } catch (error) {
       console.error('❌ Lỗi khi gửi dữ liệu:', error);
       reject(error);
     }
  });
}

// Integration with existing checkin.html
document.addEventListener('DOMContentLoaded', function () {
  // Override or extend the existing check-in success handler
  const originalCheckinSuccess = window.handleCheckinSuccess;
  
  window.handleCheckinSuccess = async function(userInfo, userIndex) {
    try {
      // Call original handler if exists
      if (originalCheckinSuccess) {
        originalCheckinSuccess(userInfo, userIndex);
      }
      
      // Send data to Google Sheet
      await sendCheckinToGoogleSheet(userInfo, userIndex);
      
    } catch (error) {
      console.error('❌ Lỗi trong quá trình check-in:', error);
      // Continue with original flow even if Google Sheet fails
    }
  };
  
  console.log('🚀 Check-in integration loaded successfully!');
});

// Export functions for manual use
window.CheckinIntegration = {
  sendCheckinToGoogleSheet
};
