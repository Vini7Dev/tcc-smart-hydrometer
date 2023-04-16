
import { container } from 'tsyringe'

import { StartJobUpdateConsumptionConversionsService } from '../services/StartJobUpdateConsumptionConversionsService'

const MIDNIGHT_CRON = '0 0 0 * * *'
const SAO_PAULO_TIMEZONE = 'America/Sao_Paulo'

export const cronUpdateConsumptionConversions = {
  cronExpression: MIDNIGHT_CRON,
  options: {
    timezone: SAO_PAULO_TIMEZONE,
  },
  handle: async () => {
    const startJobUpdateConsumptionConversionsService = container.resolve(StartJobUpdateConsumptionConversionsService)

    await startJobUpdateConsumptionConversionsService.execute()
  },
}
