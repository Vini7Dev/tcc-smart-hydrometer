import React, { useCallback, useState } from 'react'

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
import { useNavigation, useRoute } from '@react-navigation/native'
import { launchImageLibrary } from 'react-native-image-picker'
import { api } from '../../services/api'
import { MULTPART_FORM_DATA_HEADERS } from '../../utils/constants'

interface RouteParams {
    id: string
    title: string
    text: string
    news_images: Array<{ image_file: string }>
}

interface FormDataPayloadProps {
    type: string
    name: string
    uri?: string
}

export const CreateNews: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const routeParams = route.params as RouteParams

    const [isLoadingCreateNews, setIsLoadingCreateNews] = useState(false)
    const [title, setTitle] = useState(routeParams.title ?? 'Título da notícia')
    const [body, setBody] = useState(routeParams.text ?? 'Corpo da notícia')
    const [newsImages, setNewsImages] = useState<FormDataPayloadProps[]>([])

    const handleSelectNewsImages = useCallback(() => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if(response.didCancel || !response.assets || !response.assets[0]) {
                return
            }

            if(response.errorCode) {
                console.error(`${response.errorCode}: ${response.errorMessage}`)
            }

            const filesPayload = response.assets.map(asset => ({
                type: 'image/jpeg',
                name: `${asset.id}.jpg`,
                uri: asset.uri
            }))

            setNewsImages([...newsImages, ...filesPayload])
        })
    }, [newsImages])

    const handleRemoveNewsImage = useCallback((imageIndex: number) => {
        const updatedNewsImagesArray = newsImages

        updatedNewsImagesArray.splice(imageIndex, 1)

        setNewsImages([...updatedNewsImagesArray])
    }, [newsImages])

    const handleGoBackToNewsList = useCallback(() => {
        navigation.reset({
            index: 1,
            routes: [
                { name: 'Home' as never },
                { name: 'NewsList' as never, params: { reloadList: true } },
            ]
        })
    }, [navigation])

    const handleCreateNews = useCallback(async () => {
        try {
            if (isLoadingCreateNews || newsImages.length < 1) {
                return
            }

            setIsLoadingCreateNews(true)

            const formData = new FormData()

            formData.append('title', title)
            formData.append('text', body)

            for (const newsImage of newsImages) {
                formData.append('image_file', newsImage)
            }

            if (routeParams.id) {
                await api.patch(
                    `/news/${routeParams.id}`,
                    formData,
                    MULTPART_FORM_DATA_HEADERS,
                )
            } else {
                await api.post(
                    '/news',
                    formData,
                    MULTPART_FORM_DATA_HEADERS,
                )
            }

            setIsLoadingCreateNews(false)

            handleGoBackToNewsList()
        } catch(err) {
            console.error(err)
        }
    }, [isLoadingCreateNews, title, body, newsImages, handleGoBackToNewsList])

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
                        onPress={handleSelectNewsImages}
                    />
                </AddImageButtonMargin>

                <ImagesPreviewContainer>
                    {
                        newsImages.map((newsImage, idx) => (
                            <ImagePreviewItem>
                                <ImagePreview source={{ uri: newsImage.uri }} />

                                <ImagePreviewRemoveButton
                                    name="trash-2"
                                    size={16}
                                    color={whiteColor}
                                    onPress={() => handleRemoveNewsImage(idx)}
                                />
                            </ImagePreviewItem>
                        ))
                    }
                </ImagesPreviewContainer>

                <ButtonMargin>
                    <Button
                        text={isLoadingCreateNews ? 'PUBLICANDO' : 'PUBLICAR' }
                        onPress={handleCreateNews}
                    />
                </ButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
