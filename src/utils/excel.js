/* eslint-disable */
import XLSX from 'xlsx';
import Moment from 'moment';

// 导出excel
export const exportExcel = (exportData, filename) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(exportData);
  auto_width(ws, exportData);
  XLSX.utils.book_append_sheet(wb, ws, filename);
  XLSX.writeFile(wb, `${filename}${Moment().format('YYYY-MM-DD')}.xlsx`);
};

function auto_width(ws, data) {
  /*set worksheet max width per col*/
  const colWidth = data.map(row => row.map(val => {
    /*if null/undefined*/
    if (!val) {
      return { 'wch': 10 };
    } else {
      return { 'wch': val.toString().replace(/[\u0391-\uFFE5]/g, '**').length };
    }
  }));
  /*start in the first row*/
  let result = colWidth[0];
  for (let i = 1; i < colWidth.length; i += 1) {
    for (let j = 0; j < colWidth[i].length; j += 1) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch'];
      }
    }
  }
  ws['!cols'] = result;
}

// 导入excel
export const readExcel = (data) => {
  const workbook = XLSX.read(data, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const header = get_header_row(worksheet);
  const results = XLSX.utils.sheet_to_json(worksheet);
  return { header, results };
};

// get head from excel file,return array
function get_header_row(sheet) {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet['!ref']);
  let C;
  const R = range.s.r; /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({c: C, r: R})]; /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
    if (cell && cell.t) {
      hdr = XLSX.utils.format_cell(cell);
    }
    headers.push(hdr);
  }
  return headers;
}
