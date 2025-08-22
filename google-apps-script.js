/**
 * Google Apps Script cho Check-in Event
 * Copy code này vào Google Apps Script Editor của Google Sheet
 * Link: https://docs.google.com/spreadsheets/d/1RrlqM1a4_ypIXUZ_Buyzk27OUzd0LJ3jmLzs26dhGYg/edit?gid=0#gid=0
 */

function doPost(e) {
  try {
    // Parse JSON data from POST request
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Generate STT (sequential number) - account for header row
    const lastRow = sheet.getLastRow();
    // If there's only header row (row 1) or empty sheet, start STT from 1
    // Otherwise, STT = current row number (excluding header)
    const stt = lastRow <= 1 ? 1 : lastRow;
    
    // Format timestamp in Vietnam timezone
    const timestamp = new Date(data.timestamp || new Date());
    const vietnamTime = Utilities.formatDate(timestamp, 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    
    // Extract data from userInfo array or direct fields
    let fullName, email, phoneNumber, ticketType;
    
    if (data.userInfo && Array.isArray(data.userInfo)) {
      // Extract from userInfo array structure
      fullName = data.userInfo[2] || data.userInfo[26] || ''; // Tên khách hàng hoặc Tên người thanh toán
      email = data.userInfo[3] || ''; // Email
      phoneNumber = data.userInfo[4] || data.userInfo[27] || ''; // Số điện thoại hoặc Billing Phone
      ticketType = data.userInfo[21] || ''; // Tên sản phẩm (Lineitem name)
    } else {
      // Direct field mapping
      fullName = data.fullName || data.name || '';
      email = data.email || '';
      phoneNumber = data.phoneNumber || data.phone || '';
      ticketType = data.ticketType || data.ticket || '';
    }
    
    // Prepare data row: STT, Thời gian Check-in, Họ tên, Email, Số điện thoại, Hạng vé
    const newRow = [
      stt,
      vietnamTime,
      fullName,
      email,
      phoneNumber,
      ticketType
    ];
    
    // Append new row to the sheet
    sheet.appendRow(newRow);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Dữ liệu check-in đã được lưu thành công',
        rowNumber: sheet.getLastRow(),
        stt: stt,
        checkinTime: vietnamTime,
        userData: {
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          ticketType: ticketType
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Có lỗi xảy ra: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const params = e.parameter;
    
    // Check if this is a JSONP request (has callback)
    if (params.callback) {
      
      // Check if this is a test request
      if (params.test === 'true') {
        return createJSONPResponse({
          success: true,
          message: 'Google Apps Script check-in event đang hoạt động',
          timestamp: new Date().toISOString()
        }, params.callback);
      }
      
      // Process form data from GET parameters (JSONP)
      if (params.fullName && params.phoneNumber) {
        const result = processFormData(params);
        return createJSONPResponse(result, params.callback);
      }
      
      // Process userInfo array from JSONP
      if (params.userInfo) {
        try {
          const userInfo = JSON.parse(params.userInfo);
          const result = processUserInfoData(userInfo, params);
          return createJSONPResponse(result, params.callback);
        } catch (error) {
          return createJSONPResponse({
            success: false,
            message: 'Lỗi xử lý userInfo: ' + error.toString()
          }, params.callback);
        }
      }
      
      // Default JSONP response
      return createJSONPResponse({
        success: true,
        message: 'Google Apps Script check-in event đang hoạt động',
        timestamp: new Date().toISOString()
      }, params.callback);
    }
    
    // Regular GET request (no callback)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Google Apps Script check-in event đang hoạt động',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doGet:', error);
    if (e.parameter.callback) {
      return createJSONPResponse({
        success: false,
        message: 'Có lỗi xảy ra: ' + error.toString()
      }, e.parameter.callback);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Có lỗi xảy ra: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function processFormData(data) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Generate STT (sequential number) - account for header row
    const lastRow = sheet.getLastRow();
    // If there's only header row (row 1) or empty sheet, start STT from 1
    // Otherwise, STT = current row number (excluding header)
    const stt = lastRow <= 1 ? 1 : lastRow;
    
    // Format timestamp in Vietnam timezone
    const timestamp = new Date(data.timestamp || new Date());
    const vietnamTime = Utilities.formatDate(timestamp, 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    
    // Extract data from userInfo array or direct fields
    let fullName, email, phoneNumber, ticketType;
    
    if (data.userInfo && Array.isArray(data.userInfo)) {
      // Extract from userInfo array structure
      fullName = data.userInfo[2] || data.userInfo[26] || ''; // Tên khách hàng hoặc Tên người thanh toán
      email = data.userInfo[3] || ''; // Email
      phoneNumber = data.userInfo[4] || data.userInfo[27] || ''; // Số điện thoại hoặc Billing Phone
      ticketType = data.userInfo[21] || ''; // Tên sản phẩm (Lineitem name)
    } else {
      // Direct field mapping
      fullName = data.fullName || data.name || '';
      email = data.email || '';
      phoneNumber = data.phoneNumber || data.phone || '';
      ticketType = data.ticketType || data.ticket || '';
    }
    
    // Prepare data row: STT, Thời gian Check-in, Họ tên, Email, Số điện thoại, Hạng vé
    const newRow = [
      stt,
      vietnamTime,
      fullName,
      email,
      phoneNumber,
      ticketType
    ];
    
    // Append new row to the sheet
    sheet.appendRow(newRow);
    
    return {
      success: true,
      message: 'Dữ liệu check-in đã được lưu thành công',
      rowNumber: sheet.getLastRow(),
      stt: stt,
      checkinTime: vietnamTime,
      userData: {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        ticketType: ticketType
      }
    };
    
  } catch (error) {
    console.error('Error processing form data:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra: ' + error.toString()
    };
  }
}

function processUserInfoData(userInfo, params) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Generate STT (sequential number) - account for header row
    const lastRow = sheet.getLastRow();
    // If there's only header row (row 1) or empty sheet, start STT from 1
    // Otherwise, STT = current row number (excluding header)
    const stt = lastRow <= 1 ? 1 : lastRow;
    
    // Format timestamp in Vietnam timezone
    const timestamp = new Date(params.timestamp || new Date());
    const vietnamTime = Utilities.formatDate(timestamp, 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    
    // Extract data from userInfo array
    const fullName = userInfo[2] || userInfo[26] || ''; // Tên khách hàng hoặc Tên người thanh toán
    const email = userInfo[3] || ''; // Email
    const phoneNumber = userInfo[4] || userInfo[27] || ''; // Số điện thoại hoặc Billing Phone
    const ticketType = userInfo[21] || ''; // Tên sản phẩm (Lineitem name)
    
    // Prepare data row: STT, Thời gian Check-in, Họ tên, Email, Số điện thoại, Hạng vé
    const newRow = [
      stt,
      vietnamTime,
      fullName,
      email,
      phoneNumber,
      ticketType
    ];
    
    // Append new row to the sheet
    sheet.appendRow(newRow);
    
    return {
      success: true,
      message: 'Dữ liệu check-in đã được lưu thành công',
      rowNumber: sheet.getLastRow(),
      stt: stt,
      checkinTime: vietnamTime,
      userData: {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        ticketType: ticketType
      }
    };
    
  } catch (error) {
    console.error('Error processing userInfo data:', error);
    return {
      success: false,
      message: 'Có lỗi xảy ra: ' + error.toString()
    };
  }
}

function createJSONPResponse(data, callback) {
  if (!callback) {
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const jsonpResponse = callback + '(' + JSON.stringify(data) + ');';
  return ContentService
    .createTextOutput(jsonpResponse)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// Function to get total check-ins count
function getCheckinCount() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    // Subtract 1 for header row, minimum 0
    const count = Math.max(0, lastRow - 1);
    
    return {
      success: true,
      totalCheckins: count,
      lastRow: lastRow
    };
  } catch (error) {
    return {
      success: false,
      message: 'Có lỗi xảy ra khi đếm số lượng check-in: ' + error.toString()
    };
  }
}

// Function to check if user already checked in (by email or phone)
function checkDuplicateCheckin(email, phone) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowEmail = row[3]; // Email column (D)
      const rowPhone = row[4]; // Phone column (E)
      
      if ((email && rowEmail && rowEmail.toLowerCase() === email.toLowerCase()) ||
          (phone && rowPhone && rowPhone === phone)) {
        return {
          success: true,
          isDuplicate: true,
          message: 'Người dùng đã check-in trước đó',
          existingData: {
            stt: row[0],
            checkinTime: row[1],
            fullName: row[2],
            email: row[3],
            phone: row[4],
            ticketType: row[5]
          }
        };
      }
    }
    
    return {
      success: true,
      isDuplicate: false,
      message: 'Người dùng chưa check-in'
    };
    
  } catch (error) {
    return {
      success: false,
      message: 'Có lỗi xảy ra khi kiểm tra trùng lặp: ' + error.toString()
    };
  }
}
