import type { FUniver } from '@univerjs/presets'

import {
  setupClearStyles,
  setupRedo,
  setupScrollToBottom,
  setupScrollToTop,
  setupSetSelection,
  setupUndo,
} from './baseapis/baseapi'

export function setupToolbar(univerAPI: FUniver) {
  const $toolbar = document.getElementById('toolbar')!
  setupScrollToTop($toolbar, univerAPI)
  setupScrollToBottom($toolbar, univerAPI)
  setupUndo($toolbar, univerAPI)
  setupRedo($toolbar, univerAPI)
  setupSetSelection($toolbar, univerAPI)
  setupClearStyles($toolbar, univerAPI)
}
