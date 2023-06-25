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

export const SearchInputContainer = styled.View`
    padding: 27px 16px;
    background-color: ${whiteColor};
`

export const ResultCountText = styled.Text`
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: ${blackColor};
`

export const SearchResultContainer = styled.FlatList`
    padding: 24px 0;
    width: 100%;
`

export const NewsItemContainer = styled.View`
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120px;
    margin-bottom: 32px;
`

export const NewsTitleContainer = styled.TouchableHighlight`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-start;
`

export const NewsTitle = styled.Text`
    width: 100%;
    margin-bottom: 16px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    text-align: center;
    color: ${blackColor};
`

export const NewsDescription = styled.Text`
    max-height: 50px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: ${blackColor};
`

export const NewsBanner = styled.Image`
    width: 190px;
    height: 120px;
    object-fit: cover;
`

export const NewsActionButtonsContainer = styled.View`
    position: absolute;
    right: 3px;
    top: 3px;
    gap: 8px;
    flex-direction: row;
`

export const DeleteNewsIcon = styled(Icons)`
    margin-bottom: auto;
    margin-right: 10px;
    padding: 6px;
    border-radius: 50px;
    background-color: ${whiteColor};
`

export const EditNewsIcon = styled(Icons)`
    margin-bottom: auto;
    padding: 6px;
    border-radius: 50px;
    background-color: ${whiteColor};
`

export const CreateNewsButtonMargin = styled.View`
    width: 100%;
`
