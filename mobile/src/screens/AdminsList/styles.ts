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

export const AdminItemContainer = styled.TouchableHighlight`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-bottom: 16px;
    padding: 12px 16px;
    background-color: ${whiteColor};
`

export const AdminAvatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`

export const AdminNameContainer = styled.View`
    flex: 1;
    padding: 0 24px;
`

export const AdminName = styled.Text`
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: ${blackColor};
`

export const AdminEmail = styled.Text`
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${blackColor};
`

export const DeleteAdminIcon = styled(Icons)`
    margin-bottom: auto;
`

export const CreateAdminButtonMargin = styled.View`
    width: 100%;
`
