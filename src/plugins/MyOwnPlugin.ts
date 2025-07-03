import type { IAccessor, ICommand, IContextService } from '@univerjs/core'
import type { IShortcutItem } from '@univerjs/ui'
import { CommandType, EDITOR_ACTIVATED, FOCUSING_COMMON_DRAWINGS, FOCUSING_SHEET, FOCUSING_UNIVER_EDITOR, ICommandService, ILogService, Inject, Injector, IUndoRedoService, IUniverInstanceService, Plugin } from '@univerjs/core'
import { SheetInterceptorService, SheetsSelectionsService } from '@univerjs/sheets'
import { ComponentManager, IMenuManagerService, IShortcutService, KeyCode } from '@univerjs/ui'

// Define method logic for saving command.
const SaveCommand: ICommand = {
  id: 'custom-save-command',
  type: CommandType.COMMAND,
  // Or async handler(accessor) {// The method contents }
  handler: async (accessor: IAccessor) => {
    const univer = window.univerAPI
    const logService = accessor.get(ILogService)
    const commandService = accessor.get(ICommandService)
    const univerInstanceService = accessor.get(IUniverInstanceService)
    const selectionManagerService = accessor.get(SheetsSelectionsService)
    const undoRedoService = accessor.get(IUndoRedoService)
    const sheetInterceptorService = accessor.get(SheetInterceptorService)

    // Get datas of current workbook.
    const workBook = univer.getActiveWorkbook()
    if (!workBook)
      return false
    const workSheet = workBook.getActiveSheet()
    if (!workSheet)
      return false
    const sheetData = workSheet.getDataRange()
    console.log(`保存数据：${sheetData}`)

    /**
    commandService.executeCommand(SaveShortcut.id, {
      type: 'success',
      content: '保存成功',
    });
     */
    return true
  },
}

// Define method logic for Ctrl+S shortcut.
const SaveShortcut: IShortcutItem = {
  id: SaveCommand.id, // Associate with the command for saving operation.
  binding: KeyCode.CTRL | KeyCode.S,
  priority: 9999,
  preconditions: (contextService: IContextService) => {
    console.log('Ctrl+S快捷方式的判断方法执行了！')
    return true
    // (contextService.getContextValue(FOCUSING_SHEET)
    // && contextService.getContextValue(FOCUSING_UNIVER_EDITOR)
    // && contextService.getContextValue(EDITOR_ACTIVATED)
    // && contextService.getContextValue(FOCUSING_COMMON_DRAWINGS)
    // );
  },
}

/**
 * Create a custom shortcut plugin.
 */
export class MyOwnPlugin extends Plugin {
  static override pluginName = 'operate-command-plugin'
  constructor(
    _config: null,
    // inject injector, required
    @Inject(Injector) readonly _injector: Injector,
    // inject menu service, to add toolbar button
    @Inject(IMenuManagerService) private readonly menuManagerService: IMenuManagerService,
    // inject command service, to register command handler
    @Inject(ICommandService) private readonly commandService: ICommandService,
    @IShortcutService private readonly shortcutService: IShortcutService,
    // inject component manager, to register icon component
    @Inject(ComponentManager) private readonly componentManager: ComponentManager,
  ) {
    super()
  };

  /**
   * On this time, The Univer business instance has not been created at this time.
   */
  override onRendered(): void {
    this.disposeWithMe(this.commandService.registerCommand(SaveCommand))
    this.disposeWithMe(this.shortcutService.registerShortcut(SaveShortcut))
  }
}
