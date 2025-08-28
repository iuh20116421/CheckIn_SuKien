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
 * @param {Array} matchingRecords - Array of matching records with same phone number
 * @returns {Promise} - Response from Google Apps Script
 */
function sendCheckinToGoogleSheet(userInfo, userIndex, matchingRecords = []) {
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
      
      // Process ticket type - create detailed ticket type string
      let ticketType = '';
      let totalTicketQuantity = 0;

      if (matchingRecords && matchingRecords.length > 0) {
        // Group tickets by type and calculate quantities
        const ticketMap = {};

        matchingRecords.forEach(record => {
          const ticket = record.ticket.replace(/[0-9]/g, '').trim();
          const quantity = parseInt(record.ticketNumber) || 1;

          if (ticketMap[ticket]) {
            ticketMap[ticket] += quantity;
          } else {
            ticketMap[ticket] = quantity;
          }
          totalTicketQuantity += quantity;
        });

        // Create detailed ticket type string: "A: 3, B: 2, C: 2"
        ticketType = Object.entries(ticketMap)
          .map(([ticket, qty]) => `${ticket}: ${qty}`)
          .join(', ');

        console.log('📊 Chi tiết hạng vé:', ticketType);
        console.log('📊 Tổng số lượng vé:', totalTicketQuantity);
      } else {
        // Fallback: get from current userInfo
        ticketType = (userInfo[25] || userInfo[5] || '').replace(/[0-9]/g, '').trim();
        totalTicketQuantity = parseInt(userInfo[20] || userInfo[6]) || 1;

        console.log('📊 Hạng vé (fallback):', ticketType);
        console.log('📊 Số lượng vé (fallback):', totalTicketQuantity);
      }

      console.log('📋 Matching records:', matchingRecords);

      // Prepare parameters for JSONP
      const params = new URLSearchParams({
        fullName: userInfo[2] || userInfo[26] || '',
        email: userInfo[3] || '',
        phoneNumber: userInfo[4] || userInfo[27] || '',
        ticketType: ticketType,
        ticketQuantity: totalTicketQuantity,
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
  
  window.handleCheckinSuccess = async function(userInfo, userIndex, matchingRecords) {
    try {
      // Call original handler if exists
      if (originalCheckinSuccess) {
        originalCheckinSuccess(userInfo, userIndex, matchingRecords);
      }

      // Send data to Google Sheet
      await sendCheckinToGoogleSheet(userInfo, userIndex, matchingRecords);

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
