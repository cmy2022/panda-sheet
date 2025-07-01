import { drawHeaders, setupData } from './setup-data'
import { setupToolbar } from './setup-toolbar'
import { setupUniver } from './setup-univer'
import './style.css'

function main() {
  const univerAPI = setupUniver()
  window.univerAPI = univerAPI
  setupToolbar(univerAPI)
  drawHeaders(univerAPI)
  setupData(univerAPI)
}

main()
