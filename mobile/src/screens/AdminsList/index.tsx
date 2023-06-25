import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert } from 'react-native'

import { NavigationHeader } from '../../components/NavigationHeader'
import {
    ScreenContainer,
    ScreenContent,
    SearchInputContainer,
    ResultCountText,
    SearchResultContainer,
    AdminItemContainer,
    AdminAvatar,
    AdminNameContainer,
    AdminName,
    AdminEmail,
    DeleteAdminIcon,
    CreateAdminButtonMargin,
} from './styles'
import { Input } from '../../components/Input'
import { backgroundColor, errorColor } from '../../styles/variables'
import { Button } from '../../components/Button'
import { api } from '../../services/api'
import { API_FILES_URL } from '../../utils/constants'

interface RouteParams {
    reloadList?: boolean
}

interface AdminItemProps {
    name: string
    email: string
    avatar: string
    handleDeleteAdmin: () => void
    handleGoToCreateAdmin: () => void
}

interface AdminProps {
    id: string
    name: string
    email: string
    avatar_file: string
}

const EmptyAvatarImage = require('../../../assets/avatar-user.png')

const AdminItem: React.FC<AdminItemProps> = ({
    name,
    email,
    avatar,
    handleDeleteAdmin,
    handleGoToCreateAdmin,
}) => {
    return (
        <AdminItemContainer>
            <>
                <AdminAvatar source={avatar ? { uri: avatar } : EmptyAvatarImage} />

                <AdminNameContainer onPress={handleGoToCreateAdmin}>
                    <>
                        <AdminName>{name}</AdminName>

                        <AdminEmail>{email}</AdminEmail>
                    </>
                </AdminNameContainer>

                <DeleteAdminIcon
                    name="trash-2"
                    size={16}
                    color={errorColor}
                    onPress={handleDeleteAdmin}
                />
            </>
        </AdminItemContainer>
    )
}

export const AdminsList: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params as RouteParams

    const [adminList, setAdminList] = useState<AdminProps[]>([])

    const handleGetAdminsList = async () => {
        const {
            data: adminListResponse
        } = await api.get<AdminProps[]>('/admins')

        setAdminList(adminListResponse)
    }

    useEffect(() => {
        handleGetAdminsList()
    }, [routeParams?.reloadList])

    const handleGoToCreateAdmin = useCallback((adminData?: AdminProps) => {
        navigation.navigate('SignUpAdmin' as never, { ...adminData } as never)
    }, [navigation])

    const handleDeleteAdmin = useCallback((adminId: string) => {
        const deleteAdminCallback = async (id: string) => {
            try {
                await api.delete(`/admins/${id}`)

                await handleGetAdminsList()
            } catch(err) {
                console.error(err)
            }
        }

        Alert.alert(
            'Deseja apagar o usuário?',
            'Esta ação não pode ser desfeita!',
            [
                {
                    text: 'Sim',
                    onPress: () => deleteAdminCallback(adminId),
                },
                { text: 'Não' },
            ],
        )
    }, [handleGetAdminsList])

    return (
        <ScreenContainer>
            <NavigationHeader title="Usuários Administradores" />

            <ScreenContent>
                <SearchInputContainer>
                    <Input
                        placeholder="Pesquise um administrador..."
                        iconName="search"
                        backgroundColor={backgroundColor}
                    />

                    <ResultCountText>{adminList.length} resultados encontrados</ResultCountText>
                </SearchInputContainer>

                <SearchResultContainer
                    data={adminList}
                    renderItem={({ item }: any) => (
                        <AdminItem
                            key={item.email}
                            name={item.name}
                            email={item.email}
                            avatar={API_FILES_URL(item.avatar_file ?? '')}
                            handleDeleteAdmin={() => handleDeleteAdmin(item.id)}
                            handleGoToCreateAdmin={() => handleGoToCreateAdmin({
                                id: item.id,
                                name: item.name,
                                email: item.email,
                                avatar_file: item.avatar_file,
                            })}
                        />
                    )}
                    keyExtractor={(item: any) => item.id}
                />

                <CreateAdminButtonMargin>
                    <Button
                        text="CADASTRAR ADM"
                        iconName="user-plus"
                        style={{ width: '100%' }}
                        onPress={() => handleGoToCreateAdmin()}
                    />
                </CreateAdminButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
