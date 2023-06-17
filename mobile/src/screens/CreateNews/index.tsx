import React, { useState } from 'react'

import {
    ScreenContainer,
    ButtonMargin,
    ScreenContent,
    AddImageButtonMargin,
    ImagesPreviewContainer,
    ImagePreviewItem,
    ImagePreview,
    ImagePreviewRemoveButton,
} from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { NavigationHeader } from '../../components/NavigationHeader'
import { whiteColor } from '../../styles/variables'

const MockBannerImage = require('../../../assets/mockImages/news_banner.png')
const MockBanner2Image = require('../../../assets/mockImages/news_banner2.png')

export const CreateNews: React.FC = () => {
    const [title, setTitle] = useState('Título da notícia')
    const [body, setBody] = useState('Corpo da notícia')

    return (
        <ScreenContainer>
            <NavigationHeader title="Cadastrar Notícia" />

            <ScreenContent>
                <Input
                    placeholder="Título da notícia"
                    onChangeText={title => setTitle(title)}
                    defaultValue={title}
                />

                <Input
                    placeholder="Corpo da notícia"
                    onChangeText={body => setBody(body)}
                    defaultValue={body}
                    numberOfLines={10}
                    multiline
                />

                <AddImageButtonMargin>
                    <Button
                        text="ADICIONAR IMAGEM"
                        iconName="plus"
                        buttonStyle="secondary"
                        style={{ width: '100%' }}
                    />
                </AddImageButtonMargin>

                <ImagesPreviewContainer>
                    <ImagePreviewItem>
                        <ImagePreview source={MockBanner2Image} />

                        <ImagePreviewRemoveButton name="trash-2" size={16} color={whiteColor} />
                    </ImagePreviewItem>

                    <ImagePreviewItem>
                        <ImagePreview source={MockBannerImage} />

                        <ImagePreviewRemoveButton name="trash-2" size={16} color={whiteColor} />
                    </ImagePreviewItem>
                </ImagesPreviewContainer>

                <ButtonMargin>
                    <Button text="PUBLICAR" />
                </ButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
