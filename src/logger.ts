import { Logger } from 'tslog'
import { asyncLocalStorage, LOG_LEVEL } from './constants'

const logger: Logger = new Logger({
  dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  displayFunctionName: false,
  displayFilePath: 'hidden',
  displayDateTime: true,
  colorizePrettyLogs: true,
  minLevel: LOG_LEVEL,

  requestId: () => asyncLocalStorage?.getStore()?.['x-request-id'],
})

export { logger }
