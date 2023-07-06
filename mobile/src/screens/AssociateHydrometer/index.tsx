import React, { useCallback, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
    ScreenContainer,
    ButtonMargin,
    ScreenContent,
    InputInSameRowContainer,
    SmallInputContainter,
    LargestInputContainer,
} from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { NavigationHeader } from '../../components/NavigationHeader'
import { api } from '../../services/api'
import { Select } from '../../components/Select'
import { consumptionCategories } from '../../utils/constants'
import { CheckBox } from '../../components/CheckBox'

type FormsAction = 'ASSOCIATE' | 'UPDATE'

interface RouteParams {
    formsAction: FormsAction
    hydrometerData?: HydrometerProps
}

interface HydrometerProps {
    id: string
    name: string
    consumption_category: string
    share_consumption: boolean
    address?: {
        id: string
        postal_code: string
        street: string
        number?: string
        neighborhood: string
        city: string
        state: string
    }
}

export const AssociateHydrometer: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params as RouteParams

    const [isLoadingSubmitForm, setIsLoadingSubmitForm] = useState(false)
    const [identifier, setIdenfitier] = useState('Identificador')
    const [password, setPassword] = useState('Senha')
    const [title, setTitle] = useState(
        routeParams?.hydrometerData?.name ?? 'Título do hidrômetro'
    )
    const [postalCode, setPostalCode] = useState(
        routeParams?.hydrometerData?.address?.postal_code ?? 'CEP'
    )
    const [number, setNumber] = useState(
        routeParams?.hydrometerData?.address?.number ?? 'Número'
    )
    const [street, setStreet] = useState(
        routeParams?.hydrometerData?.address?.street ?? 'Endereço'
    )
    const [neighborhood, setNeighborhood] = useState(
        routeParams?.hydrometerData?.address?.neighborhood ?? 'Bairro'
    )
    const [state, setState] = useState(
        routeParams?.hydrometerData?.address?.state ?? 'Estado'
    )
    const [city, setCity] = useState(
        routeParams?.hydrometerData?.address?.city ?? 'Cidade'
    )
    const [consumptionCategory, setConsumptionCategory] = useState(
        routeParams?.hydrometerData?.consumption_category
    )
    const [shareConsumption, setShareConsumption] = useState(
        routeParams?.hydrometerData?.share_consumption ?? false
    )

    const toggleShareConsumption = useCallback(() => {
        setShareConsumption(!shareConsumption)
    }, [shareConsumption])

    const handleGoBackToHydrometersList = useCallback(() => {
        navigation.reset({
            index: 1,
            routes: [
                { name: 'Home' as never },
                { name: 'PersonalHydrometersList' as never, params: { reloadList: true } },
            ]
        })
    }, [navigation])

    const handleAssociateHydrometer = useCallback(async () => {
        try {
            if (isLoadingSubmitForm) {
                return
            }

            setIsLoadingSubmitForm(true)

            await api.post(`/user-hydrometers/${identifier}`, { password })

            setIsLoadingSubmitForm(false)

            navigation.reset({
                index: 2,
                routes: [
                    { name: 'Home' as never },
                    { name: 'PersonalHydrometersList' as never, params: { reloadList: true } },
                    { name: 'AssociateHydrometer' as never, params: { formsAction: 'UPDATE' } },
                ]
            })
        } catch(err) {
            setIsLoadingSubmitForm(false)

            console.error(err)
        }
    }, [identifier, password, isLoadingSubmitForm])

    const handleUpdateHydrometer = useCallback(async () => {
        try {
            if (isLoadingSubmitForm) {
                return
            }

            setIsLoadingSubmitForm(true)

            await api.patch(`/user-hydrometers/${routeParams?.hydrometerData?.id}`, {
                name: title,
                consumption_category: consumptionCategory,
                share_consumption: shareConsumption,
                address: {
                  postal_code: postalCode,
                  street,
                  number,
                  neighborhood,
                  city,
                  state,
                }
            })

            setIsLoadingSubmitForm(false)

            handleGoBackToHydrometersList()
        } catch(err) {
            setIsLoadingSubmitForm(false)

            console.error(err)
        }
    }, [
        title,
        consumptionCategory,
        shareConsumption,
        postalCode,
        street,
        number,
        neighborhood,
        city,
        state,
        isLoadingSubmitForm
    ])

    return (
        <ScreenContainer>
            <NavigationHeader title={
                routeParams?.formsAction === 'ASSOCIATE'
                    ? 'Associar Hidrômetro'
                    : 'Atualizar Hidrômetro'
            } />

            <ScreenContent>
                {
                    routeParams?.formsAction === 'ASSOCIATE' ? (
                        <>
                            <Input
                                iconName="user"
                                placeholder="Identificador"
                                onChangeText={identifier => setIdenfitier(identifier)}
                                defaultValue={identifier}
                            />

                            <Input
                                iconName="lock"
                                placeholder="Senha"
                                keyboardType="visible-password"
                                onChangeText={password => setPassword(password)}
                                defaultValue={password}
                            />
                        </>
                    ) : (
                        <>
                            <Select
                                placeholder="Categoria de consumo"
                                options={consumptionCategories}
                                defaultValue={consumptionCategory}
                                onSelect={setConsumptionCategory}
                            />

                            <Input
                                iconName="edit-3"
                                placeholder="Título do hidrômetro"
                                onChangeText={title => setTitle(title)}
                                defaultValue={title}
                            />

                            <InputInSameRowContainer>
                                <LargestInputContainer>
                                    <Input
                                        placeholder="CEP"
                                        style={{ width: '100%' }}
                                        onChangeText={postalCode => setPostalCode(postalCode)}
                                        defaultValue={postalCode}
                                    />
                                </LargestInputContainer>

                                <SmallInputContainter>
                                    <Input
                                        placeholder="Número"
                                        style={{ width: '100%' }}
                                        onChangeText={number => setNumber(number)}
                                        defaultValue={number}
                                    />
                                </SmallInputContainter>
                            </InputInSameRowContainer>

                            <Input
                                placeholder="Endereço"
                                onChangeText={street => setStreet(street)}
                                defaultValue={street}
                            />

                            <Input
                                placeholder="Bairro"
                                onChangeText={neighborhood => setNeighborhood(neighborhood)}
                                defaultValue={neighborhood}
                            />

                            <InputInSameRowContainer>
                                <SmallInputContainter>
                                    <Input
                                        placeholder="Estado"
                                        style={{ width: '100%' }}
                                        onChangeText={state => setState(state)}
                                        defaultValue={state}
                                    />
                                </SmallInputContainter>

                                <LargestInputContainer>
                                    <Input
                                        placeholder="Cidade"
                                        style={{ width: '100%' }}
                                        onChangeText={city => setCity(city)}
                                        defaultValue={city}
                                    />
                                </LargestInputContainer>
                            </InputInSameRowContainer>

                            <CheckBox
                                placeholder="Compartilhar anônimamente o consumo?"
                                value={shareConsumption}
                                onPress={toggleShareConsumption}
                            />
                        </>
                    )
                }

                <ButtonMargin>
                    <Button
                        iconName={routeParams?.formsAction === 'UPDATE' ? 'send' : 'link'}
                        text={
                            isLoadingSubmitForm
                                ? 'PROCESSANDO...'
                                : routeParams?.formsAction === 'UPDATE'
                                    ? 'ATUALIZAR'
                                    : 'ASSOCIAR HIDRÔMETRO'
                        }
                        style={{ width: '100%' }}
                        onPress={
                            routeParams?.formsAction === 'UPDATE'
                                ? handleUpdateHydrometer
                                : handleAssociateHydrometer
                        }
                    />
                </ButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
