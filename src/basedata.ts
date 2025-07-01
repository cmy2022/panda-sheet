import type { IDataValidationRule, IWorkbookData } from '@univerjs/core'
import { DataValidationErrorStyle, DataValidationOperator, DataValidationType } from '@univerjs/core'
import { LocaleType } from '@univerjs/presets'
import { DATA_VALIDATION_PLUGIN_NAME } from '@univerjs/sheets-data-validation'

/**
 * Below is cells`s data validators.
 */
const dataValidation: IDataValidationRule[] = [
  {
    uid: 'validator-1',
    type: DataValidationType.DECIMAL,
    ranges: [{
      startRow: 2,
      endRow: 5,
      startColumn: 0,
      endColumn: 3,
    }],
    operator: DataValidationOperator.GREATER_THAN,
    formula1: '111',
    errorStyle: DataValidationErrorStyle.STOP,
  },
  {
    uid: 'validator-2',
    type: DataValidationType.CHECKBOX,
    ranges: [{
      startRow: 4,
      endRow: 5,
      startColumn: 0,
      endColumn: 2,
    }],
    formula1: 'TRUE',
    formula2: 'FALSE',
  },
  {
    uid: 'validator-3',
    type: DataValidationType.LIST,
    ranges: [{
      startRow: 6,
      endRow: 7,
      startColumn: 0,
      endColumn: 2,
    }],
    formula1: '1,2,3',
    renderMode: 1,
  },
]

/**
 * Below is the initial data for cells in the Sheet1.
 */
export const DEFAULT_WORKBOOK_DATA_DEMO: IWorkbookData = {
  id: 'Sheet1',
  locale: LocaleType.ZH_CN,
  name: 'Panda Sheet',
  appVersion: 'panda-0.8.1',
  sheetOrder: ['Sheet1'],
  styles: {
    1: {
      vt: 2,
      ht: 2,
      bl: 1,
      bg: {
        rgb: 'rgb(255,226,102)',
      },
      pd: {
        l: 5,
      },
      bd: {
        t: {
          s: 1,
          cl: {
            rgb: 'rgb(217,217,217)',
          },
        },
        l: {
          s: 1,
          cl: {
            rgb: 'rgb(217,217,217)',
          },
        },
        r: {
          s: 1,
          cl: {
            rgb: 'rgb(217,217,217)',
          },
        },
        b: {
          s: 1,
          cl: {
            rgb: 'rgb(217,217,217)',
          },
        },
      },
    },
  },
  sheets: {
    Sheet1: {
      name: 'Sheet1',
      id: 'Sheet1',
      tabColor: '',
      hidden: 0,
      rowCount: 1000,
      columnCount: 93,
      cellData: {
        0: {
          0: {
            s: '1',
            v: 'Panda1',
          },
          1: {
            s: '1',
            v: 'Panda2',
          },
          2: {
            s: '1',
            v: 'Panda3',
          },
        },
      },
      mergeData: [

      ],
      rowData: {

      },
      scrollTop: 0,
      scrollLeft: 0,
      showGridlines: 1,
      // gridlinesColor: 'rgb(9, 30, 250)',
      rowHeader: {
        width: 46,
        hidden: 0,
      },
      columnHeader: {
        height: 20,
        hidden: 0,
      },
    },
  },
  resources: [
    {
      name: DATA_VALIDATION_PLUGIN_NAME,
      data: JSON.stringify({
        Sheet1: dataValidation,
      }),
    },
  ],
}
