import React, { useCallback } from 'react'
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

interface AdminItemProps {
    name: string
    email: string
    avatar: string
    handleGoToCreateAdmin: () => void
}

const EmptyAvatarImage = require("../../../assets/avatar-user.png")

const mockUsers = [
    {
        id: '1',
        name: 'Example 1',
        email: 'example2@mail.com',
        avatar: EmptyAvatarImage as string,
    },
    {
        id: '2',
        name: 'Example 2',
        email: 'example1@mail.com',
        avatar: EmptyAvatarImage as string,
    },
]

const AdminItem: React.FC<AdminItemProps> = ({
    name,
    email,
    avatar,
    handleGoToCreateAdmin,
}) => {
    return (
        <AdminItemContainer onPress={handleGoToCreateAdmin}>
            <>
                <AdminAvatar source={avatar as any} />

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

    const handleGoToCreateAdmin = useCallback(() => {
        navigation.navigate('SignUpAdmin' as never)
    }, [navigation])

    return (
        <ScreenContainer>
            <NavigationHeader />

            <ScreenContent>
                <SearchInputContainer>
                    <Input
                        placeholder="Pesquise um administrador..."
                        iconName="search"
                        backgroundColor={backgroundColor}
                    />

                    <ResultCountText>5 resultados encontrados</ResultCountText>
                </SearchInputContainer>

                <SearchResultContainer
                    data={mockUsers}
                    renderItem={({ item }: any) => (
                        <AdminItem
                            key={item.email}
                            name={item.name}
                            email={item.email}
                            avatar={item.avatar}
                            handleGoToCreateAdmin={handleGoToCreateAdmin}
                        />
                    )}
                />

                <CreateAdminButtonMargin>
                    <Button
                        text="CADASTRAR ADM"
                        iconName="user-plus"
                        style={{ width: '100%' }}
                        onPress={handleGoToCreateAdmin}
                    />
                </CreateAdminButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
