import styled from 'styled-components/native'

import {
    blackColor,
    primaryColor,
    secondaryColor
} from '../../styles/variables'

export const ScreenContainer = styled.View`
    flex: 1;
    padding: 75px 16px;
    align-items: center;
`

export const Title = styled.Text`
    margin-bottom: 32px;
    color: ${primaryColor};
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
`

export const ForgotPasswordButton = styled.TouchableOpacity`
    margin-left: auto;
    margin-bottom: 60px;
`

export const ForgotPasswordText = styled.Text`
    width: 100%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: ${secondaryColor};
`

export const CreateAccountContainer = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 70px;
`

export const CreateAccountLink = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${blackColor};
`

export const CreateAccountLinkHighlight = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${secondaryColor};
`
