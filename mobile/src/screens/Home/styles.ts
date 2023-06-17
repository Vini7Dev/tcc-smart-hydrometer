import styled from 'styled-components/native'

import { grayColor, whiteColor } from '../../styles/variables'

export const ScreenContainer = styled.View``

export const ScreenContent = styled.View`
    flex: 1;
    padding: 75px 16px;
    align-items: center;
`

export const UserAvatarContainer = styled.View`
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 40px;
    background-color: ${whiteColor};
`

export const UserAvatar = styled.Image`
    width: 50px;
    height: 50px;
`

export const Title = styled.Text`
    height: 33px;
    margin-bottom: 40px;
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
    color: ${grayColor};
    opacity: 0.8;
`

export const ButtonMargin = styled.View`
    width: 100%;
    height: 60px;
    align-items: center;
    margin-bottom: 24px;
    padding: 0 10px;
`
