import styled from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'
import { infoColor, lightGray3, whiteColor } from '../../styles/variables'

export const Container = styled.View`
    width: 100%;
    z-index: 1;
`

export const SelectContainer = styled.TouchableHighlight`
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    margin-bottom: 16px;
    border-radius: 10px;
    background-color: ${infoColor};
`

export const SelectText = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    text-transform: uppercase;
    color: ${whiteColor};
`
export const SelectArrowIcon = styled(Icons)`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`

export const OptionsContainer = styled.View`
    position: absolute;
    width: 100%;
    top: 45px;
    border-radius: 0 0 8px 8px;
    background-color: ${lightGray3};
    z-index: -1;
`

export const OptionButton = styled.TouchableHighlight`
    padding: 10px 28px;
`

export const OptionText = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 16px;
    line-height: 38px;
    text-transform: uppercase;
    color: ${whiteColor};
`

