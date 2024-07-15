import { Logger } from "tslog";

const logger: Logger = new Logger({
  dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  displayFunctionName: false,
  displayFilePath: "hidden",
  displayDateTime: true,
  colorizePrettyLogs: true,
  //requestId: ()=> asyncLocalTraceStorage?.getStore()?.['x-request-id']
});

export { logger };
