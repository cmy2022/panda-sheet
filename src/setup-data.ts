import type { FUniver } from '@univerjs/presets'
import axios from 'axios'

export function setupData(univerAPI: FUniver) {
  const activeWorkbook = univerAPI.getActiveWorkbook()
  if (!activeWorkbook)
    throw new Error('activeWorkbook is not defined')
    // 1、Set One Cell Data
  const value = '' // Get data from backend
  const activeSheet = activeWorkbook.getActiveSheet()
  if (!activeSheet)
    throw new Error('activeSheet is not defined')
  const range = activeSheet.getRange(0, 0)
  if (!range)
    throw new Error('range is not defined')
  range.setValue(value)
  // 2、Set Multiple Cells Data
  const values = [
    ['1', '2', '3'],
    ['4', '5', '6'],
  ] // Get datas from backend
  const ranges = activeSheet.getRange(0, 0, values.length, values[0].length)
  if (!ranges)
    throw new Error('range is not defined')
  ranges.setValues(values)
  // 3、Get Multiple Cells Data
  const range2 = activeSheet.getRange(0, 0, 2, 3)
  console.log(range2.getValues())
  const data: (string | undefined)[][] = []
  range2.forEach((row, col, cell) => {
    data[row] = data[row] || []
    data[row][col] = cell.v?.toString()
  })
  console.log(JSON.stringify(data, null, 2))
  // 4、Get One Cell Data
  const range4 = activeSheet.getRange(1, 1, 2, 2)
  console.log(JSON.stringify(range4.getCellData(), null, 2))
  // 5、Get Workbook Data
  const workbookData = activeWorkbook.save()
  console.log(JSON.stringify(workbookData, null, 2))
  // 6、Get Sheet Data
  const sheet1 = Object.values(workbookData.sheets).find((sheet) => {
    return sheet.name === 'Sheet1'
  })
  if (!sheet1)
    throw new Error('sheet1 is not defined')
  console.log(JSON.stringify(sheet1, null, 2))
  // 7、Create a new Sheet
  const sheet2 = activeWorkbook.create('Sheet2', 100, 15)
  if (!sheet2)
    throw new Error('sheet2 is not defined')
    // 8、Set Background Color of Multiple Cells
  const range3 = activeSheet.getRange(0, 0, 2, 3)
  if (!range3)
    throw new Error('range5 is not defined')
  range3.setBackgroundColor('red')

  // n、cancel workbook edit
  activeWorkbook.setEditable(false)
}
