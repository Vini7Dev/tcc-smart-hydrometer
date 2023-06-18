import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    ScreenContainer,
    ScreenContent,
    SearchInputContainer,
    ResultCountText,
    SearchResultContainer,
    HydrometerItemContainer,
    HydrometerNameContainer,
    HydrometerName,
    HydrometerAddress,
    DisassociateHydrometerIcon,
    AssociateHydrometerButtonMargin,
    HydrometerItemActionsContainer,
    EditHydrometerIcon,
} from './styles'
import { backgroundColor, errorColor, secondaryColor } from '../../styles/variables'
import { NavigationHeader } from '../../components/NavigationHeader'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

interface HydrometerItemProps {
    name: string
    address: string
    handleGoToCreateHydrometer: () => void
}

const mockUsers = [
    {
        id: '1',
        name: 'Casa 1',
        address: 'Rua Palestra Itália, 777 - Pompéia. Franca-SP',
    },
    {
        id: '2',
        name: 'Casa 2',
        address: 'Rua Palestra Itália, 777 - Pompéia. Franca-SP',
    },
]

const HydrometerItem: React.FC<HydrometerItemProps> = ({
    name,
    address,
    handleGoToCreateHydrometer,
}) => {
    return (
        <HydrometerItemContainer onPress={handleGoToCreateHydrometer}>
            <>
                <HydrometerNameContainer>
                    <HydrometerName>{name}</HydrometerName>

                    <HydrometerAddress>{address}</HydrometerAddress>
                </HydrometerNameContainer>

                <HydrometerItemActionsContainer>
                    <EditHydrometerIcon name="edit-2" size={20} color={secondaryColor} />

                    <DisassociateHydrometerIcon name="delete" size={20} color={errorColor} />
                </HydrometerItemActionsContainer>
            </>
        </HydrometerItemContainer>
    )
}

export const PersonalHydrometersList: React.FC = () => {
    const navigation = useNavigation()

    const handleGoToCreateHydrometer = useCallback(() => {
        navigation.navigate('AssociateHydrometer' as never)
    }, [navigation])

    return (
        <ScreenContainer>
            <NavigationHeader title="Meus Hidrômetros" />

            <ScreenContent>
                <SearchInputContainer>
                    <Input
                        placeholder="Busque por um hidrômetro..."
                        iconName="search"
                        backgroundColor={backgroundColor}
                    />

                    <ResultCountText>{mockUsers.length} resultados encontrados</ResultCountText>
                </SearchInputContainer>

                <SearchResultContainer
                    data={mockUsers}
                    renderItem={({ item }: any) => (
                        <HydrometerItem
                            key={item.id}
                            name={item.name}
                            address={item.address}
                            handleGoToCreateHydrometer={handleGoToCreateHydrometer}
                        />
                    )}
                    keyExtractor={(item: any) => item.id}
                />

                <AssociateHydrometerButtonMargin>
                    <Button
                        text="ASSOCIAR HIDRÔMETRO"
                        iconName="plus-circle"
                        style={{ width: '100%' }}
                        onPress={handleGoToCreateHydrometer}
                    />
                </AssociateHydrometerButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
