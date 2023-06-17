import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'
import { blackColor, whiteColor } from '../../styles/variables'

export const ScreenContainer = styled.View`
    flex: 1;
`

export const ScreenContent = styled.View`
    flex: 1;
    padding: 0 16px 16px;
    align-items: center;
`

export const BannersContainer = styled.View`
    position: relative;
`

export const BannersList = styled.FlatList``

export const BannerItem = styled.Image`
    height: 170px;
`

export const BannerPrevArrow = styled(Icons)`
    position: absolute;
    left: 4px;
    top: 73px;
`

export const BannerNextArrow = styled(Icons)`
    position: absolute;
    right: 4px;
    top: 73px;
`

export const NewsTitle = styled.Text`
    margin: -35px 0 39px;
    padding: 0 16px;
    text-align: center;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: ${whiteColor};
`

export const NewsBody = styled.Text`
    margin-bottom: 40px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: ${blackColor};
`

export const AuthorContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

export const AuthorNameContainer = styled.View``

export const AuthorName = styled.Text`
    margin-bottom: 4px;
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: ${blackColor};
`

export const PublishedDate = styled.Text`
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: ${blackColor};
`

export const AuthorAvatar = styled.Image`
    width: 53px;
    height: 53px;
    border-radius: 53px;
`

