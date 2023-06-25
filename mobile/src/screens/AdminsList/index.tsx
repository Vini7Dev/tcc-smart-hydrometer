import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

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

interface AdminItemProps {
    name: string
    email: string
    avatar: string
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
    handleGoToCreateAdmin,
}) => {
    return (
        <AdminItemContainer onPress={handleGoToCreateAdmin}>
            <>
                <AdminAvatar source={avatar ? { uri: avatar } : EmptyAvatarImage} />

                <AdminNameContainer>
                    <AdminName>{name}</AdminName>

                    <AdminEmail>{email}</AdminEmail>
                </AdminNameContainer>

                <DeleteAdminIcon name="trash-2" size={16} color={errorColor} />
            </>
        </AdminItemContainer>
    )
}

export const AdminsList: React.FC = () => {
    const navigation = useNavigation()

    const [adminList, setAdminList] = useState<AdminProps[]>([])

    const handleGoToCreateAdmin = useCallback((adminData?: AdminProps) => {
        navigation.navigate('SignUpAdmin' as never, { ...adminData } as never)
    }, [navigation])

    useEffect(() => {
        const handleGetAdminsList = async () => {
            const {
                data: adminListResponse
            } = await api.get<AdminProps[]>('/admins')

            setAdminList(adminListResponse)
        }

        handleGetAdminsList()
    }, [])

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
