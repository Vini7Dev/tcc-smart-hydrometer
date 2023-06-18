import React, { useCallback, useState } from 'react'

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
import { useNavigation } from '@react-navigation/native'

export const AssociateHydrometer: React.FC = () => {
    const navigation = useNavigation()

    const [identifier, setIdenfitier] = useState('Identificador')
    const [password, setPassword] = useState('Senha')
    const [title, setTitle] = useState('Título do hidrômetro')
    const [postalCode, setPostalCode] = useState('CEP')
    const [number, setNumber] = useState('Número')
    const [address, setAddress] = useState('Endereço')
    const [neighborhood, setNeighborhood] = useState('Bairro')
    const [state, setState] = useState('Estado')
    const [city, setCity] = useState('Cidade')

    const handleSubmitForm = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    return (
        <ScreenContainer>
            <NavigationHeader title="Associar Hidrômetro" />

            <ScreenContent>
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
                    onChangeText={address => setAddress(address)}
                    defaultValue={address}
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

                <ButtonMargin>
                    <Button
                        iconName="link"
                        text="ASSOCIAR HIDRÔMETRO"
                        style={{ width: '100%' }}
                        onPress={handleSubmitForm}
                    />
                </ButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
