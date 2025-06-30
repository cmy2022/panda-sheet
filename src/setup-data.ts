import type { FUniver } from '@univerjs/presets'
import axios from 'axios'

// Set the base address for interface request.
// axios.defaults.baseURL = 'https://localhost:8980'
// Or use another settings like below:
// const axiosApi = axios.create({baseURL: 'https://localhost:8980',});

export function setupDataExamples(univerAPI: FUniver) {
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

export function setupData(univerAPI: FUniver) {
  // 1、数据显示

  // 2、数据控件（日期、下拉框等）

  // 3、文件上传下载接口

  // 4、表格编辑-数据保存

  // 5、数值处理函数

  // 6、BI图表

}

async function getDataByFetch(params: JSON) {
  const response = await fetch('/kpi/datas', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const result = await response.json()
  console.log(result)
  return result
}

async function postDataByFetch(data: JSON) {
  const response = await fetch('/requestURI/methodName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to send data')
  }
  const result = await response.json()
  console.log('Server response:', result)
}

async function getDataByAxios(params: JSON) {
  const response = await axios.get('/api/your-get-endpoint', { params })
  console.log('GET response:', response.data)
  return response.data
}

async function sendDataByAxios(data: JSON) {
  const response = await axios.post('/api/your-post-endpoint', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('POST response:', response.data)
  return response.data
}
