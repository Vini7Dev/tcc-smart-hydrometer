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

interface AuthorProps {
    id: string
    name: string
    avatar_file: string
}

interface NewsProps {
    id: string
    title: string
    text: string
    news_images: Array<{ image_file: string }>
    author: AuthorProps
    updated_at: string
}

interface NewsItemProps {
    id: string
    title: string
    text: string
    news_images: Array<{ image_file: string }>
    author: AuthorProps
    updated_at: string
    handleGoToViewNews: (newsData: NewsProps) => void
}

const NewsItem: React.FC<NewsItemProps> = ({
    id,
    title,
    text,
    news_images,
    author,
    updated_at,
    handleGoToViewNews,
}) => {
    const { user } = useAuth()

    return (
        <NewsItemContainer onPress={() => handleGoToViewNews({
            id,
            title,
            text,
            news_images,
            author,
            updated_at,
        })}>
            <>
                <NewsTitleContainer>
                    <NewsTitle>{title}</NewsTitle>

                    <NewsDescription>{text}</NewsDescription>
                </NewsTitleContainer>

                <NewsBanner source={{ uri: API_FILES_URL(news_images[0].image_file) }} />

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

    const handleGoToCreateNews = useCallback((newsData?: NewsProps) => {
        navigation.navigate('CreateNews' as never, { ...newsData } as never)
    }, [navigation])

    const handleGoToViewNews = useCallback((newsData: NewsProps) => {
        navigation.navigate('ViewNews' as never, { ...newsData } as never)
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
                            id={item.id}
                            title={item.title}
                            text={item.text}
                            news_images={item.news_images}
                            author={item.author}
                            updated_at={item.updated_at}
                            handleGoToViewNews={() => {
                                handleGoToViewNews({
                                    id: item.id,
                                    title: item.title,
                                    text: item.text,
                                    news_images: item.news_images,
                                    author: item.author,
                                    updated_at: item.updated_at
                                })
                            }}
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
                                onPress={() => handleGoToCreateNews()}
                            />
                        </CreateNewsButtonMargin>
                    )
                }
            </ScreenContent>
        </ScreenContainer>
    )
}
