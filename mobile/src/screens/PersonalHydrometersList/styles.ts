import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'
import { blackColor, lightGray3, whiteColor } from '../../styles/variables'

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

export const HydrometerItemContainer = styled.TouchableHighlight`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
    padding: 12px 16px;
    background-color: ${whiteColor};
`

export const HydrometerNameContainer = styled.View`
    margin-bottom: auto;
`

export const HydrometerName = styled.Text`
    margin-bottom: 4px;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: ${blackColor};
`

export const HydrometerAddress = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: ${lightGray3};
    max-width: 250px;
`

export const HydrometerItemActionsContainer = styled.View`
    flex-direction: row;
    gap: 12px;
`

export const DisassociateHydrometerIcon = styled(Icons)`
    margin-bottom: auto;
`

export const EditHydrometerIcon = styled(Icons)`
    margin-bottom: auto;
`

export const AssociateHydrometerButtonMargin = styled.View`
    width: 100%;
`
