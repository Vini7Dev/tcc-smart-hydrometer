import styled from 'styled-components/native'
import { blackColor, secondaryColor, whiteColor } from '../../styles/variables'

interface CompareOptionProps {
    selected: boolean
}

interface CompareOptionTextProps {
    selected: boolean
}

export const Container = styled.View`
    width: 100%;
    height: 200px;
`

export const CompareOptionsLabel = styled.Text`
    height: 19px;
    margin-bottom: 8px;
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${blackColor};
`

export const CompareOptionsList = styled.View`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
`

export const CompareOption = styled.TouchableHighlight<CompareOptionProps>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin-right: 8px;
    padding: 12px 16px;
    background-color: ${props => props.selected ? secondaryColor : whiteColor};
`

export const CompareOptionText = styled.Text<CompareOptionTextProps>`
    height: 18px;
    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: ${props => props.selected ? whiteColor : secondaryColor};
`

export const FromToContainer = styled.View`
    flex-direction: row;
    gap: 50px;
    margin-top: 16px;
`

export const FromToInputContainer = styled.View`
    width: 100px;
`

export const FromLabel = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${blackColor};
`
