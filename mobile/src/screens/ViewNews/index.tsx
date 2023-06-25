import React, { useCallback, useState } from 'react'
import { Dimensions } from 'react-native'
import { format } from 'date-fns'

import { NavigationHeader } from '../../components/NavigationHeader'
import {
    ScreenContainer,
    ScreenContent,
    BannersContainer,
    BannersList,
    BannerItem,
    BannerPrevArrow,
    BannerNextArrow,
    NewsTitle,
    NewsBody,
    AuthorContainer,
    AuthorNameContainer,
    AuthorName,
    PublishedDate,
    AuthorAvatar,
} from './styles'
import { transparent, whiteColor } from '../../styles/variables'
import { useRoute } from '@react-navigation/native'
import { API_FILES_URL } from '../../utils/constants'

interface RouteParams {
    id: string
    title: string
    text: string
    news_images: Array<{ image_file: string }>
    author: {
        id: string
        name: string
        avatar_file: string
    }
    updated_at: string
}

const { width } = Dimensions.get('window')

export const ViewNews: React.FC = () => {
    const route = useRoute()
    const routeParams = route.params as RouteParams

    const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

    const handleNextBanner = useCallback(() => {
        if (currentBannerIndex < routeParams.news_images.length - 1) {
            setCurrentBannerIndex(currentBannerIndex + 1)
        }
    }, [currentBannerIndex])

    const handlePreviousBanner = useCallback(() => {
        if (currentBannerIndex > 0) {
            setCurrentBannerIndex(currentBannerIndex - 1)
        }
    }, [currentBannerIndex])

    const handleFormatPublishDate = useCallback((date: Date) => {
        return format(date, 'dd/MM/yyyy HH:mm')
    }, [])

    return (
        <ScreenContainer>
            <NavigationHeader title={routeParams.title} />

            <BannersContainer>
                <BannersList
                    horizontal
                    data={[routeParams.news_images[currentBannerIndex]]}
                    renderItem={({ item }: any) => (
                        <BannerItem
                            source={{ uri: API_FILES_URL(item.image_file) }}
                            style={{ width }}
                        />
                    )}
                    keyExtractor={(_, idx) => idx.toString()}
                />

                <BannerPrevArrow
                    name="chevron-left"
                    size={24}
                    color={currentBannerIndex === 0 ? transparent : whiteColor}
                    onPress={handlePreviousBanner}
                />

                <BannerNextArrow
                    name="chevron-right"
                    size={24}
                    color={
                        currentBannerIndex >= routeParams.news_images.length - 1
                            ? transparent
                            : whiteColor
                    }
                    onPress={handleNextBanner}
                />

                <NewsTitle>{routeParams.title}</NewsTitle>
            </BannersContainer>

            <ScreenContent>
                <NewsBody>
                    {routeParams.text}
                </NewsBody>

                <AuthorContainer>
                    <AuthorNameContainer>
                        <AuthorName>{routeParams.author.name}</AuthorName>

                        <PublishedDate>
                            {handleFormatPublishDate(new Date(routeParams.updated_at))}
                        </PublishedDate>
                    </AuthorNameContainer>

                    <AuthorAvatar
                        source={{ uri: API_FILES_URL(routeParams.author.avatar_file) }}
                    />
                </AuthorContainer>
            </ScreenContent>
        </ScreenContainer>
    )
}
