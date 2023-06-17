import React from 'react'

import { Container, LogoImage, AppName } from './styles'

const AppLogoImage = require('../../../assets/logo.png')

export const AppLogo: React.FC = () => {
    return (
        <Container>
            <LogoImage source={AppLogoImage} />

            <AppName>Inteliágua</AppName>
        </Container>
    )
}
