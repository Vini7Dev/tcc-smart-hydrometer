import React, { useCallback, useState } from 'react'
import Icons from 'react-native-vector-icons/Feather'
import { launchImageLibrary } from 'react-native-image-picker'

import { Container, AvatarImage, UpdateAvatarButton } from './styles'
import { whiteColor } from '../../styles/variables'

interface FormDataPayloadProps {
    type: string
    name: string
    uri?: string
}

interface AvatarUploadProps {
    defaultAvatar?: string
    onSelectAvatar(data: FormDataPayloadProps): void
}

const EmptyAvatarImage = require('../../../assets/avatar-user.png')

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
    defaultAvatar,
    onSelectAvatar,
}) => {
    const [selectedAvatar, setSelectedAvatar] = useState<string>()

    const handleSelectAvatar = useCallback(() => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if(response.didCancel || !response.assets || !response.assets[0]) {
                return
            }

            if(response.errorCode) {
                console.error(`${response.errorCode}: ${response.errorMessage}`)
            }

            setSelectedAvatar(response.assets[0].uri)

            onSelectAvatar({
                type: 'image/jpeg',
                name: `${response.assets[0].id}.jpg`,
                uri: response.assets[0].uri
            })
        })
    }, [])

    return (
        <Container>
            <AvatarImage source={
                selectedAvatar || defaultAvatar
                    ? { uri: selectedAvatar ?? defaultAvatar }
                    : EmptyAvatarImage
            }/>

            <UpdateAvatarButton onPress={handleSelectAvatar}>
                <Icons name="camera" size={16} color={whiteColor} />
            </UpdateAvatarButton>
        </Container>
    )
}
