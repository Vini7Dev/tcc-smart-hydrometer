import React from 'react'
import Icons from 'react-native-vector-icons/Feather'

import { Container, AvatarImage, UpdateAvatarButton } from './styles'
import { whiteColor } from '../../styles/variables'

const EmptyAvatarImage = require('../../../assets/avatar-user.png')

export const AvatarUpload: React.FC = () => {
    return (
        <Container>
            <AvatarImage source={EmptyAvatarImage} />

            <UpdateAvatarButton>
                <Icons name="camera" size={16} color={whiteColor} />
            </UpdateAvatarButton>
        </Container>
    )
}
