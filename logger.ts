import { Logger, TLogLevelName } from 'tslog'

const logger: Logger = new Logger({
  dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  displayFunctionName: false,
  displayFilePath: 'hidden',
  displayDateTime: true,
  colorizePrettyLogs: true,
  minLevel: process.env.LOGLEVEL?.toLowerCase() as TLogLevelName,

  //requestId: ()=> asyncLocalTraceStorage?.getStore()?.['x-request-id']
})

export { logger }
