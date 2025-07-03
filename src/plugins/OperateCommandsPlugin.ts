import type { ICommand } from '@univerjs/core'
import type { FUniver } from '@univerjs/presets'
import { CommandType, ICommandService, ILogService, Inject, Injector, Plugin } from '@univerjs/core'
import { ComponentManager, IMenuManagerService } from '@univerjs/ui'

export class OperateCommandsPlugin extends Plugin {
  static override pluginName = 'operate-command-plugin'
  constructor(
    _config: null,
        // inject injector, required
        @Inject(Injector) readonly _injector: Injector,
        // inject menu service, to add toolbar button
        @Inject(IMenuManagerService) private readonly menuManagerService: IMenuManagerService,
        // inject command service, to register command handler
        @Inject(ICommandService) private readonly commandService: ICommandService,
        // inject component manager, to register icon component
        @Inject(ComponentManager) private readonly componentManager: ComponentManager,
  ) {
    super()
  };
}

// Define method logic for saving command.
const saveCommand: ICommand = {
  id: 'custom-save-command',
  type: CommandType.OPERATION,
  // Or async handler(accessor) {// the method contents}
  handler: async (accessor) => {
    const univer = window.univerAPI
    const logService = accessor.get(ILogService)
    const commandService = accessor.get(ICommandService)

    // Get datas of current workbook.
    const workBook = univer.getActiveWorkbook()
    if (!workBook)
      return false
    const workSheet = workBook.getActiveSheet()
    if (!workSheet)
      return false
    const sheetData = workSheet.getDataRange()
    console.log(`保存数据：${sheetData}`)

    commandService.executeCommand('operation-toast.show', {
      type: 'success',
      content: '保存成功',
    })
    return true
  },
}
