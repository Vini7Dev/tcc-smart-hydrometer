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
import { api } from '../../services/api'

interface GeneratedHydrometer {
    id: number
    password: string
}

export const GenerateHydrometer: React.FC = () => {
    const [isLoadingGeneration, setIsLoadingGeneration] = useState(false)
    const [isHydrometerGenerated, setIsHydrometerGenerated] = useState(false)
    const [generatedHydrometer, setGeneratedHydrometer] = useState<GeneratedHydrometer>()

    const handleGenerateHydrometer = useCallback(async () => {
        try {
            if (isLoadingGeneration || generatedHydrometer) {
                return
            }

            setIsLoadingGeneration(true)

            const {
                data: generatedHydrometerResponse
            } = await api.post<GeneratedHydrometer>('/hydrometers')

            setGeneratedHydrometer(generatedHydrometerResponse)
            setIsHydrometerGenerated(true)
            setIsLoadingGeneration(false)
        } catch(err) {
            console.error(err)
        }
    }, [generatedHydrometer, isLoadingGeneration])

    const handleConfirmGeneratedHydrometer = useCallback(() => {
        setIsHydrometerGenerated(false)
        setGeneratedHydrometer(undefined)
    }, [])

    return (
        <ScreenContainer>
            <NavigationHeader title="Gerar Hidrômetro" />

            <ScreenContent>
                <ButtonLabel>Gostaria de gerar um novo hydrômetro?</ButtonLabel>

                <ButtonMargin>
                    <Button
                        text={isLoadingGeneration ? 'CARREGANDO...' : 'GERAR HIDRÔMETRO'}
                        iconName="plus"
                        align="flex-start"
                        style={{ width: '100%' }}
                        onPress={handleGenerateHydrometer}
                    />
                </ButtonMargin>

                <HydrometerInfoContainer isActive={isHydrometerGenerated}>
                    <HydrometerInfoTitle>Novo Hidrômetro</HydrometerInfoTitle>

                    <HydrometerInfoInputsContainer>
                        <Input
                            placeholder="Número Identificador: 123"
                            iconName="user"
                            value={generatedHydrometer?.id.toString()}
                        />

                        <Input
                            placeholder="Senha: ABC"
                            iconName="lock"
                            value={generatedHydrometer?.password.toString()}
                        />
                    </HydrometerInfoInputsContainer>

                    <HydrometerInfoButtonMargin>
                        <Button
                            text="CONFIRMAR"
                            onPress={handleConfirmGeneratedHydrometer}
                        />
                    </HydrometerInfoButtonMargin>
                </HydrometerInfoContainer>
            </ScreenContent>
        </ScreenContainer>
    )
}
