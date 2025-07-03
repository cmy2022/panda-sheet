import type { FUniver } from '@univerjs/presets'
import type { FRange } from '@univerjs/sheets/facade'
import axios from 'axios'

// Set the base address for interface request.
// axios.defaults.baseURL = 'https://localhost:8980'
// Or use another settings like below:
// const axiosApi = axios.create({baseURL: 'https://localhost:8980',});

export function setupDataExamples(univerAPI: FUniver) {
  const activeWorkbook = univerAPI.getActiveWorkbook()
  if (!activeWorkbook)
    throw new Error('activeWorkbook is not defined')
    // 1、Set One Cell Data.
  const value = '' // Get data from backend
  const activeSheet = activeWorkbook.getActiveSheet()
  if (!activeSheet)
    throw new Error('activeSheet is not defined')
  const range = activeSheet.getRange(0, 0)
  if (!range)
    throw new Error('range is not defined')
  range.setValue(value)
  // 2、Set Multiple Cells Data.
  const values = [
    ['1', '2', '3'],
    ['4', '5', '6'],
  ] // Get datas from backend.
  const ranges = activeSheet.getRange(0, 0, values.length, values[0].length)
  if (!ranges)
    throw new Error('range is not defined')
  ranges.setValues(values)
  // 3、Get Multiple Cells Data.
  const range2 = activeSheet.getRange(0, 0, 2, 3)
  console.log(range2.getValues())
  const data: (string | undefined)[][] = []
  range2.forEach((row, col, cell) => {
    data[row] = data[row] || []
    data[row][col] = cell.v?.toString()
  })
  console.log(JSON.stringify(data, null, 2))
  // 4、Get One Cell Data.
  const range4 = activeSheet.getRange(1, 1, 2, 2)
  console.log(JSON.stringify(range4.getCellData(), null, 2))
  // 5、Get Workbook Data.
  const workbookData = activeWorkbook.save()
  console.log(JSON.stringify(workbookData, null, 2))
  // 6、Get Sheet Data.
  const sheet1 = Object.values(workbookData.sheets).find((sheet) => {
    return sheet.name === 'Sheet1'
  })
  if (!sheet1)
    throw new Error('sheet1 is not defined')
  console.log(JSON.stringify(sheet1, null, 2))
  // 7、Create a new Sheet.
  const sheet2 = activeWorkbook.create('Sheet2', 100, 15)
  if (!sheet2)
    throw new Error('sheet2 is not defined')
  // 8、Set Background Color of Multiple Cells.
  const range3 = activeSheet.getRange(0, 0, 2, 3)
  if (!range3)
    throw new Error('range5 is not defined')
  range3.setBackgroundColor('red')

  // n、cancel workbook edit.
  activeWorkbook.setEditable(false)
}

/**
 * Assign values to cell fields.
 * @param univerAPI
 */
export async function setupData(univerAPI: FUniver) {
  // Get parameters from URL.
  const params = new URLSearchParams(window.location.search)
  const nowYear = params.get('year')
  // Get datas from backend.
  const results = await getDataByAxios({ nowYear })
  const resultMaps = new Map<string, Map<string, string>>()
  for (let i = 0; i < results.length; i++) {
    const result = results.get(i)
    const kpiKey = `${result.get('FUN_CENTER')}_${result.get('KPI_DESC')}_${result.get('WEIGHT')}_${result.get('CHECK_UNIT')}_${result.get('CHECK_DEPT')}_${result.get('CHECK_YEAR')}_${result.get('CYCLE')}_${result.get('MIN_TARGET_VALUE')}_${result.get('ASS_TARGET_VALUE')}_${result.get('CHA_TARGET_VALUE')}`
    const tempValue = resultMaps.get(kpiKey)
    const valueMap = !tempValue ? new Map<string, string>() : tempValue
    valueMap.set(result.get('CHECK_MONTH'), `${result.get('ACTUAL_VALUE')}_${result.get('LAST_VALUE')}_${result.get('SCORE')}`)
    resultMaps.set(kpiKey, valueMap)
  }
  const activeWorkbook = univerAPI.getActiveWorkbook()
  if (!activeWorkbook)
    throw new Error('activeWorkbook is not defined')
  const activeSheet = activeWorkbook.getActiveSheet()
  if (!activeSheet)
    throw new Error('activeSheet is not defined')
  const values = []
  resultMaps.forEach((value, key, map) => {
    const keys = key.split('_')
    const tempResult = [keys[0], keys[1], keys[2], keys[3], keys[4], keys[5], keys[6], keys[7], keys[8], keys[9], '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    value.forEach((value2, key2, map2) => {
      const month = Number.parseInt(key2.split('-')[1])
      const tempValues2 = value2.split('_')
      tempResult[7 * month + 3] = tempValues2[0]
      tempResult[7 * month + 4] = tempValues2[1]
      tempResult[7 * month + 5] = tempValues2[2]
    })
    values.push(tempResult)
  })
  const ranges = activeSheet.getRange(2, 0, values.length, values[0]?.length)
  if (!ranges)
    throw new Error('ranges is not defined')
  ranges.setValues(values)
  // Set the property value of cells`s Editable in selected ranges.
  const myRanges: FRange[] = []
  const range0 = activeSheet.getRange(2, 0, values.length, 10)
  myRanges.push(range0)
  for (let i = 1; i <= 12; i++) {
    const rangeN = activeSheet.getRange(2, 7 * i + 3, values.length, 3)
    myRanges.push(rangeN)
  }
  const permission = activeWorkbook.getPermission()
  const unitId = activeWorkbook.getId()
  const sheetId = activeSheet.getSheetId()
  const response = await permission.addRangeBaseProtection(unitId, sheetId, myRanges)
  if (!response)
    throw new Error('response is not defined')
  const { permissionId, ruleId } = response
  permission.setRangeProtectionPermissionPoint(unitId, sheetId, permissionId, permission.permissionPointsDefinition.RangeProtectionPermissionEditPoint, false)

  // 4、数值处理函数

  // 5、BI图表
}

// Get Datas from database througn backend.
async function getDataByAxios(params: object) {
  const response = await axios.get('/kpi/datas', { params })
  console.log('GET response:', response.data)
  return response.data
}

// Save Sheet Data to database thourgh backend.
async function sendDataByAxios(data: object) {
  const response = await axios.post('/api/your-post-endpoint', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('POST response:', response.data)
  return response.data
}

async function getDataByFetch(params: object) {
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

async function postDataByFetch(data: object) {
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
