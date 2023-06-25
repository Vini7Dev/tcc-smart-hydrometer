import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert } from 'react-native'

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
} from './styles'
import { backgroundColor, errorColor } from '../../styles/variables'
import { NavigationHeader } from '../../components/NavigationHeader'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { api } from '../../services/api'

type FormsAction = 'ASSOCIATE' | 'UPDATE'

interface RouteParams {
    reloadList?: boolean
}

interface AddressProps {
    id: string
    postal_code: string
    street: string
    number?: string
    neighborhood: string
    city: string
    state: string
}

interface HydrometerProps {
    id: string
    name: string
    consumption_category: string
    share_consumption: boolean
    address?: AddressProps
}

interface HydrometerItemProps {
    name: string
    address: AddressProps
    handleGoToCreateHydrometer: () => void
    handleDisassociateFromUserHydrometer: () => void
}

const HydrometerItem: React.FC<HydrometerItemProps> = ({
    name,
    address,
    handleGoToCreateHydrometer,
    handleDisassociateFromUserHydrometer,
}) => {
    return (
        <HydrometerItemContainer>
            <>
                <HydrometerNameContainer onPress={handleGoToCreateHydrometer}>
                    <>
                        <HydrometerName>
                            {name}
                        </HydrometerName>

                        <HydrometerAddress>
                            {address.street} - {address.number ?? 'S/N'}
                        </HydrometerAddress>
                    </>
                </HydrometerNameContainer>

                <HydrometerItemActionsContainer>
                    <DisassociateHydrometerIcon
                        name="delete"
                        size={20}
                        color={errorColor}
                        onPress={handleDisassociateFromUserHydrometer}
                    />
                </HydrometerItemActionsContainer>
            </>
        </HydrometerItemContainer>
    )
}

export const PersonalHydrometersList: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params as RouteParams

    const [userHydrometerList, setUserHydrometerList] = useState<HydrometerProps[]>([])

    const handleGetUserHydrometerList = async () => {
        const {
            data: userHydrometerListResponse
        } = await api.get<HydrometerProps[]>('/user-hydrometers')

        setUserHydrometerList(userHydrometerListResponse)
    }

    useEffect(() => {
        handleGetUserHydrometerList()
    }, [routeParams?.reloadList])

    const handleGoToCreateHydrometer = useCallback((
        formsAction: FormsAction,
        hydrometerData?: HydrometerProps,
    ) => {
        navigation.navigate('AssociateHydrometer' as never, {
            formsAction,
            hydrometerData,
        } as never)
    }, [navigation])

    const handleDisassociateFromUserHydrometer = useCallback(async (hydrometerId: string) => {
        const desassoiateHydrometerFromUserCallback = async (id: string) => {
            try {
                await api.delete(`/user-hydrometers/${id}`)

                await handleGetUserHydrometerList()
            } catch(err) {
                console.error(err)
            }
        }

        Alert.alert(
            'Deseja desassociar esse hidrômetro de sua conta??',
            'Esta ação não pode ser desfeita!',
            [
                {
                    text: 'Sim',
                    onPress: () => desassoiateHydrometerFromUserCallback(hydrometerId),
                },
                { text: 'Não' },
            ],
        )
    }, [handleGetUserHydrometerList])

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

                    <ResultCountText>{userHydrometerList.length} resultados encontrados</ResultCountText>
                </SearchInputContainer>

                <SearchResultContainer
                    data={userHydrometerList}
                    renderItem={({ item }: any) => (
                        <HydrometerItem
                            key={item.id}
                            name={item.name}
                            address={item.address}
                            handleGoToCreateHydrometer={
                                () => handleGoToCreateHydrometer('UPDATE', {
                                    id: item.id,
                                    address: item.address,
                                    name: item.name,
                                    consumption_category: item.consumption_category,
                                    share_consumption: item.share_consumption,
                                })
                            }
                            handleDisassociateFromUserHydrometer={
                                () => handleDisassociateFromUserHydrometer(item.id)
                            }
                        />
                    )}
                    keyExtractor={(item: any) => item.id}
                />

                <AssociateHydrometerButtonMargin>
                    <Button
                        text="ASSOCIAR HIDRÔMETRO"
                        iconName="plus-circle"
                        style={{ width: '100%' }}
                        onPress={() => handleGoToCreateHydrometer('ASSOCIATE')}
                    />
                </AssociateHydrometerButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
