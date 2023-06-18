import React from 'react'
import { View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

import {
    ScreenContainer,
    ScreenContent,
} from './styles'
import { NavigationHeader } from '../../components/NavigationHeader'
import { CompareByOptions } from '../../components/CompareByOptions'
import { MOCK_CONSUMPTIONS } from './MOCK_CONSUMPTIONS'

const ChartComponent = () => {
    const {
        pastGroup,
        presentGroup,
    } = MOCK_CONSUMPTIONS

    return (
        <View style={{ width: '100%' }}>
            <LineChart
            areaChart
            curved
            data={pastGroup.reverse().map(consumption => ({ value: consumption.consumption })) as any}
            data2={presentGroup.map(consumption => ({ value: consumption.consumption })) as any}
            height={250}
            showVerticalLines
            spacing={44}
            initialSpacing={0}
            color1="skyblue"
            color2="orange"
            textColor1="green"
            hideDataPoints
            dataPointsColor1="blue"
            dataPointsColor2="red"
            startFillColor1="skyblue"
            startFillColor2="orange"
            startOpacity={0.8}
            endOpacity={0.3}
            />
        </View>
    );
};

export const PersonalConsumption: React.FC = () => {
    return (
        <ScreenContainer>
            <NavigationHeader title="Consumo Pessoal" />

            <ScreenContent>
                <CompareByOptions />

                <ChartComponent />
            </ScreenContent>
        </ScreenContainer>
    )
}
