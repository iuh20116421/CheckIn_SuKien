// Example configuration file
// Copy this file to config.js and fill in your actual values
// DO NOT commit config.js to version control

const config = {
    // Google Sheets API Configuration
    GOOGLE_SHEETS: {
        API_KEY: 'YOUR_GOOGLE_SHEETS_API_KEY_HERE',
        SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',
        RANGE: 'SheetName!A2:AZ67'
    },
    
    // Event Configuration
    EVENT: {
        DATE: '2025-09-17T07:30:00+07:00', // ISO 8601 format
        TITLE: 'AI E-COMMERCE REVOLUTION',
        LOCATION: 'Trống Đồng Palace',
        ADDRESS: '489 Hoàng Quốc Việt, p.Nghĩa Đô, Hà Nội'
    },
    
    // Application Settings
    APP: {
        DEBUG: false,
        AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
        NOTIFICATION_DURATION: 5000   // 5 seconds
    }
};

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    // For browser usage
    window.config = config;
}
