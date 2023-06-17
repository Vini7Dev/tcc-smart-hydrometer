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
    NewsActionButtonsContainer,
    EditNewsIcon,
} from './styles'
import { Input } from '../../components/Input'
import { backgroundColor, errorColor, secondaryColor } from '../../styles/variables'
import { Button } from '../../components/Button'

interface NewsItemProps {
    title: string
    description: string
    banner: string
    handleGoToViewNews: () => void
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
    handleGoToViewNews,
}) => {
    return (
        <NewsItemContainer onPress={handleGoToViewNews}>
            <>
                <NewsTitleContainer>
                    <NewsTitle>{title}</NewsTitle>

                    <NewsDescription>{description}</NewsDescription>
                </NewsTitleContainer>

                <NewsBanner source={banner as any} />

                <NewsActionButtonsContainer>
                    <DeleteNewsIcon name="trash-2" size={16} color={errorColor} />

                    <EditNewsIcon name="edit-3" size={16} color={secondaryColor} />
                </NewsActionButtonsContainer>
            </>
        </NewsItemContainer>
    )
}

export const NewsList: React.FC = () => {
    const navigation = useNavigation()

    const handleGoToCreateNews = useCallback(() => {
        navigation.navigate('CreateNews' as never)
    }, [navigation])

    const handleGoToViewNews = useCallback(() => {
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
                            handleGoToViewNews={handleGoToViewNews}
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
