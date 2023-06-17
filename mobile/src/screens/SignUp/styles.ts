import { styled } from 'styled-components/native'

import { blackColor, grayColor, secondaryColor } from '../../styles/variables'

export const ScreenContainer = styled.View`
    flex: 1;
    padding: 80px 16px;
    align-items: center;
`

export const Title = styled.Text`
    margin-bottom: 15px;
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
    color: ${grayColor};
    opacity: 0.8;
`

export const Subtitle = styled.Text`
    margin-bottom: 40px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: ${grayColor};
    opacity: 0.6;
`

export const ButtonMargin = styled.View`
    margin-top: 40px;
`

export const SignInContainer = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 40px;
`

export const SignInLink = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${blackColor};
`

export const SignInLinkHighlight = styled.Text`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: ${secondaryColor};
`
