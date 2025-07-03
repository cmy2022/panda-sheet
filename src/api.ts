import type { FUniver } from '@univerjs/presets'
import { ScrollToCellCommand } from '@univerjs/presets/preset-sheets-core'
import axios from 'axios'

export function setupScrollToTop($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'scroll to top'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')

    univerAPI.executeCommand(ScrollToCellCommand.id, {
      range: {
        startColumn: 0,
        startRow: 0,
        endColumn: 0,
        endRow: 0,
      },
    })
  })
}

export function setupScrollToBottom($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'scroll to bottom'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { rowCount } = activeSheet._worksheet.getSnapshot()
    univerAPI.executeCommand(ScrollToCellCommand.id, {
      range: {
        startColumn: 0,
        startRow: rowCount - 1,
        endColumn: 0,
        endRow: rowCount - 1,
      },
    })
  })
}

export function setupUndo($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'undo'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    univerAPI.undo()
  })
}

export function setupRedo($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'redo'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    univerAPI.redo()
  })
}

export function setupSetSelection($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'select A1'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')
    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    activeSheet.setActiveRange(activeSheet.getRange(0, 0))
  })
}

export function setupClearStyles($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'clear A1 styles'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    await activeSheet.setActiveRange(activeSheet.getRange(0, 0))

    univerAPI.executeCommand('sheet.command.clear-selection-format')
  })
}

// Get Datas from database through the backend.
export async function getDataByAxios(params: object) {
  const response = await axios.get('/kpi/datas', { params })
  console.log('GET response:', response.data)
  return response.data
}

// Save Sheet Data to database thourgh the backend.
export async function sendDataByAxios(data: object) {
  const response = await axios.post('/api/your-post-endpoint', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('POST response:', response.data)
  return response.data
}

export async function getDataByFetch(params: object) {
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

export async function postDataByFetch(data: object) {
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
