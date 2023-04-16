import cron from 'node-cron'

import { cronUpdateConsumptionConversions } from './crons/cronUpdateConsumptionConversions'

cron.schedule(
  cronUpdateConsumptionConversions.cronExpression,
  cronUpdateConsumptionConversions.handle,
  cronUpdateConsumptionConversions.options,
)
