const xlsx = require('xlsx');
const fs = require('fs');

// Đọc file Excel
const workbook = xlsx.readFile('Bang Tra PT.xlsx');

// Chọn sheet đầu tiên
const sheetName = workbook.SheetNames[6];
console.log(sheetName)
const worksheet = workbook.Sheets[sheetName];

// Chuyển đổi sheet thành mảng JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);
console.log(jsonData)