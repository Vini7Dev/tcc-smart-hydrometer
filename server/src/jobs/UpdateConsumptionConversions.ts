import { JOB_UPDATE_CONSUPTION_CONVERSIONS } from '@utils/constants'
import { IHandleProps } from '@shared/containers/providers/Queue/implementation/BullProvider'

interface IUpdateConsumptionConversionsProps extends IHandleProps {
  data: {}
}

export default {
  key: JOB_UPDATE_CONSUPTION_CONVERSIONS,
  handle: async ({
    providers: {},
    data: {},
  }: IUpdateConsumptionConversionsProps) => {
    //
  }
}
