import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import { NavigationHeader } from '../../components/NavigationHeader'
import {
    ScreenContainer,
    ScreenContent,
    SearchInputContainer,
    ResultCountText,
    SearchResultContainer,
    NewsItemContainer,
    NewsBanner,
    NewsTitleContainer,
    NewsTitle,
    NewsDescription,
    DeleteNewsIcon,
    CreateNewsButtonMargin,
} from './styles'
import { Input } from '../../components/Input'
import { backgroundColor, errorColor } from '../../styles/variables'
import { Button } from '../../components/Button'

interface NewsItemProps {
    title: string
    description: string
    banner: string
    handleGoToCreateNews: () => void
}

const MockBannerImage = require('../../../assets/mockImages/news_banner.png')

const mockNews = [
    {
        id: '1',
        title: 'Título 1',
        description: 'Breve descrição Breve descrição Breve descrição',
        banner: MockBannerImage as string,
    },
    {
        id: '2',
        title: 'Título 2',
        description: 'Breve descrição Breve descrição Breve descrição',
        banner: MockBannerImage as string,
    },
]

const NewsItem: React.FC<NewsItemProps> = ({
    title,
    description,
    banner,
    handleGoToCreateNews,
}) => {
    return (
        <NewsItemContainer onPress={handleGoToCreateNews}>
            <>
                <NewsTitleContainer>
                    <NewsTitle>{title}</NewsTitle>

                    <NewsDescription>{description}</NewsDescription>
                </NewsTitleContainer>

                <NewsBanner source={banner as any} />

                <DeleteNewsIcon name="trash-2" size={16} color={errorColor} />
            </>
        </NewsItemContainer>
    )
}

export const NewsList: React.FC = () => {
    const navigation = useNavigation()

    const handleGoToCreateNews = useCallback(() => {
        navigation.navigate('ViewNews' as never)
    }, [navigation])

    return (
        <ScreenContainer>
            <NavigationHeader />

            <ScreenContent>
                <SearchInputContainer>
                    <Input
                        placeholder="Pesquise uma notícia..."
                        iconName="search"
                        backgroundColor={backgroundColor}
                    />

                    <ResultCountText>{mockNews.length} resultados encontrados</ResultCountText>
                </SearchInputContainer>

                <SearchResultContainer
                    data={mockNews}
                    renderItem={({ item }: any) => (
                        <NewsItem
                            key={item.email}
                            title={item.title}
                            description={item.description}
                            banner={item.banner}
                            handleGoToCreateNews={handleGoToCreateNews}
                        />
                    )}
                    keyExtractor={(item: any) => item.id}
                />

                <CreateNewsButtonMargin>
                    <Button
                        text="CADASTRAR NOTÍCIA"
                        iconName="file-text"
                        style={{ width: '100%' }}
                        onPress={handleGoToCreateNews}
                    />
                </CreateNewsButtonMargin>
            </ScreenContent>
        </ScreenContainer>
    )
}
