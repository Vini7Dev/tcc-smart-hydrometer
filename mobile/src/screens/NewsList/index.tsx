import React, { useCallback, useEffect, useState } from 'react'
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
import { useAuth } from '../../hooks/Auth'
import { ADMIN_ACCOUNT_TYPE, API_FILES_URL } from '../../utils/constants'
import { api } from '../../services/api'

interface NewsItemProps {
    title: string
    description: string
    banner: string
    handleGoToViewNews: () => void
}

interface NewsProps {
    id: string
    title: string
    text: string
    news_images: Array<{ image_file: string }>
    created_at: Date
    updated_at: Date
}

const NewsItem: React.FC<NewsItemProps> = ({
    title,
    description,
    banner,
    handleGoToViewNews,
}) => {
    const { user } = useAuth()

    return (
        <NewsItemContainer onPress={handleGoToViewNews}>
            <>
                <NewsTitleContainer>
                    <NewsTitle>{title}</NewsTitle>

                    <NewsDescription>{description}</NewsDescription>
                </NewsTitleContainer>

                <NewsBanner source={{ uri: banner }} />

                {
                    user.account_type === ADMIN_ACCOUNT_TYPE && (
                        <NewsActionButtonsContainer>
                            <DeleteNewsIcon name="trash-2" size={16} color={errorColor} />

                            <EditNewsIcon name="edit-3" size={16} color={secondaryColor} />
                        </NewsActionButtonsContainer>
                    )
                }
            </>
        </NewsItemContainer>
    )
}

export const NewsList: React.FC = () => {
    const navigation = useNavigation()
    const { user } = useAuth()

    const [newsList, setNewsList] = useState<NewsProps[]>([])

    const handleGoToCreateNews = useCallback(() => {
        navigation.navigate('CreateNews' as never)
    }, [navigation])

    const handleGoToViewNews = useCallback(() => {
        navigation.navigate('ViewNews' as never)
    }, [navigation])

    useEffect(() => {
        const handleGetNewsList = async () => {
            const {
                data: newsListResponse
            } = await api.get<NewsProps[]>('/news')

            setNewsList(newsListResponse)
        }

        handleGetNewsList()
    }, [])

    return (
        <ScreenContainer>
            <NavigationHeader title="Notícias e Dicas" />

            <ScreenContent>
                <SearchInputContainer>
                    <Input
                        placeholder="Pesquise uma notícia..."
                        iconName="search"
                        backgroundColor={backgroundColor}
                    />

                    <ResultCountText>{newsList.length} resultados encontrados</ResultCountText>
                </SearchInputContainer>

                <SearchResultContainer
                    data={newsList}
                    renderItem={({ item }: any) => (
                        <NewsItem
                            key={item.id}
                            title={item.title}
                            description={item.text}
                            banner={API_FILES_URL(item.news_images[0].image_file)}
                            handleGoToViewNews={handleGoToViewNews}
                        />
                    )}
                    keyExtractor={(item: any) => item.id}
                />

                {
                    user.account_type === ADMIN_ACCOUNT_TYPE && (
                        <CreateNewsButtonMargin>
                            <Button
                                text="CADASTRAR NOTÍCIA"
                                iconName="file-text"
                                style={{ width: '100%' }}
                                onPress={handleGoToCreateNews}
                            />
                        </CreateNewsButtonMargin>
                    )
                }
            </ScreenContent>
        </ScreenContainer>
    )
}
