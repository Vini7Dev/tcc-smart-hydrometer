import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

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
}

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

                    <HydrometerAddress>{address.street} - {address.number ?? 'S/N'}</HydrometerAddress>
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
    const route = useRoute()
    const routeParams = route.params as RouteParams

    const [userHydrometerList, setUserHydrometerList] = useState<HydrometerProps[]>([])

    const handleGetAdminsList = async () => {
        const {
            data: userHydrometerListResponse
        } = await api.get<HydrometerProps[]>('/user-hydrometers')

        setUserHydrometerList(userHydrometerListResponse)
    }

    useEffect(() => {
        handleGetAdminsList()
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
