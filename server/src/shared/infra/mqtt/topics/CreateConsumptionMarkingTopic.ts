import { container } from 'tsyringe'

import { CreateConsumptionMarkingUseCase } from '@modules/consumptionMarkings/useCases/createConsumptionMarking/CreateConsumptionMarkingUseCase'

export class CreateConsumptionMarkingTopic {
  public async receiveMessage(message: string) {
    const [hydrometer_id, hydrometer_password, consumption] = message.split('|')

    const createConsumptionMarkingUseCase = container.resolve(CreateConsumptionMarkingUseCase)

    await createConsumptionMarkingUseCase.execute({
      consumption: Number(consumption),
      hydrometer_id: Number(hydrometer_id),
      hydrometer_password,
    })
  }
}
