import { Logger, TLogLevelName } from 'tslog'
import { asyncLocalStorage } from './constants'

const logger: Logger = new Logger({
  dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  displayFunctionName: false,
  displayFilePath: 'hidden',
  displayDateTime: true,
  colorizePrettyLogs: true,
  minLevel: process.env.LOGLEVEL?.toLowerCase() as TLogLevelName,

  requestId: () => asyncLocalStorage?.getStore()?.['x-request-id'],
})

export { logger }
