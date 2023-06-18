import React from 'react'

import {
    ScreenContainer,
    ScreenContent,
} from './styles'
import { NavigationHeader } from '../../components/NavigationHeader'
import { CompareByOptions } from '../../components/CompareByOptions'

export const PersonalConsumption: React.FC = () => {
    return (
        <ScreenContainer>
            <NavigationHeader title="Consumo Pessoal" />

            <ScreenContent>
                <CompareByOptions />
            </ScreenContent>
        </ScreenContainer>
    )
}
