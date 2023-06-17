import styled, { css } from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'

import { primaryColor, secondaryColor, whiteColor } from '../../styles/variables'

interface ContainerProps {
    isShowNavigation: boolean
}

export const Container = styled.View<ContainerProps>`
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 73px;
    padding: 32px 25px 20px;
    background: ${primaryColor};

    ${(props) => props.isShowNavigation && css`margin-bottom: 1000px;`}
`

export const NavigationIcon = styled(Icons)``

export const ScreenTitle = styled.Text`
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: ${whiteColor};
`

export const NavContainer = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    width: 10000px;
    height: 10000px;
`

export const NavWrapper = styled.View``

export const NavHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 72px;
    background-color: ${primaryColor};
`

export const NavCloseButton = styled(Icons)`
    margin: 0 48px 0 16px;
    padding: 4px;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: ${secondaryColor};
`

export const NavTitle = styled.Text`
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    color: ${whiteColor};
`

export const NavListArea = styled.View`
    width: 100%;
    height: 100%;
    padding-top: 74px;
    background-color: ${whiteColor};
`

export const NavItem = styled.TouchableHighlight`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 16px 20px;
    background-color: ${whiteColor};
    border: 1px solid ${primaryColor};
`

export const NavItemIcon = styled(Icons)`
    margin-right: 28px;
`

export const NavItemText = styled.Text`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;

    color: ${primaryColor};
    background: ${whiteColor};
`

export const DisconnectButtonMargin = styled.View`
    margin-top: 20px;
    width: 100%;
    background-color: ${primaryColor};
`
