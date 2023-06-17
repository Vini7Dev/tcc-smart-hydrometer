import React, { useCallback, useState } from 'react'

import { NavigationHeader } from '../../components/NavigationHeader'
import {
    ScreenContainer,
    ScreenContent,
    ButtonLabel,
    ButtonMargin,
    HydrometerInfoContainer,
    HydrometerInfoTitle,
    HydrometerInfoInputsContainer,
    HydrometerInfoButtonMargin,
} from './styles'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'


export const GenerateHydrometer: React.FC = () => {
    const [isHydrometerGenerated, setIsHydrometerGenerated] = useState(false)

    return (
        <ScreenContainer>
            <NavigationHeader title="Gerar Hidrômetro" />

            <ScreenContent>
                <ButtonLabel>Gostaria de gerar um novo hydrômetro?</ButtonLabel>

                <ButtonMargin>
                    <Button
                        text="GERAR HIDRÔMETRO"
                        iconName="plus"
                        align="flex-start"
                        style={{ width: '100%' }}
                        onPress={() => setIsHydrometerGenerated(true)}
                    />
                </ButtonMargin>

                <HydrometerInfoContainer isActive={isHydrometerGenerated}>
                    <HydrometerInfoTitle>Novo Hidrômetro</HydrometerInfoTitle>

                    <HydrometerInfoInputsContainer>
                        <Input placeholder="Número Identificador: 123" iconName="user" />

                        <Input placeholder="Senha: ABC" iconName="lock" />
                    </HydrometerInfoInputsContainer>

                    <HydrometerInfoButtonMargin>
                        <Button
                            text="CONFIRMAR"
                            onPress={() => setIsHydrometerGenerated(false)}
                        />
                    </HydrometerInfoButtonMargin>
                </HydrometerInfoContainer>
            </ScreenContent>
        </ScreenContainer>
    )
}
