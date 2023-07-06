import { container } from 'tsyringe'

import { CreateConsumptionMarkingUseCase } from '@modules/consumptionMarkings/useCases/createConsumptionMarking/CreateConsumptionMarkingUseCase'

export class CreateConsumptionMarkingTopic {
  public async receiveMessage(message: string) {
    const [hydrometer_id, hydrometer_password, consumption] = message.split('|')

    const consumptionNumber = Number(consumption)

    const consumptionAsInt = Math.ceil(consumptionNumber * 100)

    const createConsumptionMarkingUseCase = container.resolve(CreateConsumptionMarkingUseCase)

    await createConsumptionMarkingUseCase.execute({
      hydrometer_id: Number(hydrometer_id),
      hydrometer_password,
      consumption: consumptionAsInt,
    })
  }
}
