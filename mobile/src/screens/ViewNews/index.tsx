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
import { whiteColor } from '../../styles/variables'

const MockAvatarImage = require('../../../assets/mockImages/avatar.png')
const MockBannerImage = require('../../../assets/mockImages/news_banner.png')
const MockBanner2Image = require('../../../assets/mockImages/news_banner2.png')

const mockNewsData = {
    id: '1',
    title: 'Título da notícia',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor at augue nec semper. Cras non volutpat metus. Duis elit tortor, pulvinar ut purus ac, lacinia dapibus orci. Nunc in sagittis nibh. Phasellus iaculis nibh nec porta faucibus. Donec vel velit et massa blandit pellentesque. In sit amet lectus pretium, pharetra lectus eu, luctus lacus. Fusce lacinia accumsan nibh, at viverra risus suscipit et. Maecenas vitae libero ac purus congue elementum eget eget est.',
    banners: [MockBanner2Image, MockBannerImage] as string[],
    publishedDate: new Date(),
    author: {
        name: 'Jhon Doe',
        avatar: MockAvatarImage as string,
    },
}

const { width } = Dimensions.get('window')

export const ViewNews: React.FC = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

    const handleNextBanner = useCallback(() => {
        if (currentBannerIndex < mockNewsData.banners.length - 1) {
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
            <NavigationHeader title={mockNewsData.title} />

            <BannersContainer>
                <BannersList
                    horizontal
                    data={[mockNewsData.banners[currentBannerIndex]]}
                    renderItem={({ item }) => (
                        <BannerItem source={item as any} style={{ width }} />
                    )}
                    keyExtractor={(_, idx) => idx.toString()}
                />

                <BannerPrevArrow
                    name="chevron-left"
                    size={24}
                    color={whiteColor}
                    onPress={handlePreviousBanner}
                />

                <BannerNextArrow
                    name="chevron-right"
                    size={24}
                    color={whiteColor}
                    onPress={handleNextBanner}
                />

                <NewsTitle>{mockNewsData.title}</NewsTitle>
            </BannersContainer>

            <ScreenContent>
                <NewsBody>
                    {mockNewsData.body}
                </NewsBody>

                <AuthorContainer>
                    <AuthorNameContainer>
                        <AuthorName>{mockNewsData.author.name}</AuthorName>

                        <PublishedDate>
                            {handleFormatPublishDate(mockNewsData.publishedDate)}
                        </PublishedDate>
                    </AuthorNameContainer>

                    <AuthorAvatar source={mockNewsData.author.avatar as any} />
                </AuthorContainer>
            </ScreenContent>
        </ScreenContainer>
    )
}
