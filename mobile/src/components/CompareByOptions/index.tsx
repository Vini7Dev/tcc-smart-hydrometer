import React, { useCallback, useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'

import {
    Container,
    CompareOptionsLabel,
    CompareOptionsList,
    CompareOption,
    CompareOptionText,
    FromToContainer,
    FromToInputContainer,
    FromLabel,
    CustomIntervalInputButton,
    CustomIntervalInputButtonText,
} from './styles'
import { format } from 'date-fns'

type CompareBy = 'YESTERDAY' | 'PAST_MONTH' | 'PAST_YEAR' | 'CUSTOM'

interface CompareByOptionsProps {
    onSelectCompareOption(value: CompareBy): void
    onSelectValidCustomInterval: (start: Date, end: Date) => void
}

interface CompareOptionItemProps {
    value: CompareBy
    label: string
    selected: boolean
    handleSelectOption: () => void
}

const CompareOptionItem: React.FC<CompareOptionItemProps> = ({
    value,
    label,
    selected,
    handleSelectOption,
}) => {
    return (
        <CompareOption key={value} selected={selected} onPress={handleSelectOption}>
            <CompareOptionText selected={selected}>{label}</CompareOptionText>
        </CompareOption>
    )
}

export const CompareByOptions: React.FC<CompareByOptionsProps> = ({
    onSelectCompareOption,
    onSelectValidCustomInterval,
}) => {
    const compareOptions = [
        { label: 'Dia', value: 'YESTERDAY' },
        { label: 'Mês', value: 'PAST_MONTH' },
        { label: 'Ano', value: 'PAST_YEAR' },
        { label: 'Customizado', value: 'CUSTOM' },
    ]

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isOpenCalendarStart, setIsOpenCalendarStart] = useState(false)
    const [isOpenCalendarEnd, setIsOpenCalendarEnd] = useState(false)

    const [customStartDate, setCustomStartDate] = useState<Date>(new Date())
    const [customEndDate, setCustomEndDate] = useState<Date>(new Date())

    const handleChangeSelectedOptionIndex = useCallback((index: number) => {
        setSelectedIndex(index)
        onSelectCompareOption(compareOptions[index].value as CompareBy)
    }, [])

    const handleUpdateCustomStartDate = useCallback((_: any, date: Date | undefined) => {
        if(date) {
            setCustomStartDate(date)
        }
    }, [])

    const handleUpdateCustomEndDate = useCallback((_: any, date: Date | undefined) => {
        if(date) {
            setCustomEndDate(date)
        }
    }, [])

    useEffect(() => {
        if (customStartDate >= customEndDate) {
            return
        }

        onSelectValidCustomInterval(customStartDate, customEndDate)
    }, [customStartDate, customEndDate])

    const toggleIsOpenCalendarStart = useCallback(() => {
        setIsOpenCalendarStart(!isOpenCalendarStart)
    }, [isOpenCalendarStart])

    const toggleIsOpenCalendarEnd = useCallback(() => {
        setIsOpenCalendarEnd(!isOpenCalendarEnd)
    }, [isOpenCalendarEnd])

    return (
        <Container>
            <CompareOptionsLabel>Comparar por:</CompareOptionsLabel>

            <CompareOptionsList>
                {
                    compareOptions.map((compareOption, idx) => (
                        <CompareOptionItem
                            key={compareOption.value}
                            value={compareOption.value as CompareBy}
                            label={compareOption.label}
                            selected={selectedIndex === idx}
                            handleSelectOption={() => handleChangeSelectedOptionIndex(idx)}
                        />
                    ))
                }
            </CompareOptionsList>

            {
                selectedIndex === compareOptions.length - 1 && (
                    <FromToContainer>
                        <FromToInputContainer>
                            <FromLabel>De</FromLabel>

                            <CustomIntervalInputButton
                                style={{ width: 100 }}
                                onPress={toggleIsOpenCalendarStart}
                            >
                                <CustomIntervalInputButtonText>
                                    {format(customStartDate, 'dd/MM/yyyy')}
                                </CustomIntervalInputButtonText>
                            </CustomIntervalInputButton>

                            {
                                isOpenCalendarStart && (
                                    <DateTimePicker
                                        mode="date"
                                        display="calendar"
                                        value={customStartDate}
                                        onChange={handleUpdateCustomStartDate}
                                        is24Hour
                                    />
                                )
                            }
                        </FromToInputContainer>

                        <FromToInputContainer>
                            <FromLabel>Até</FromLabel>

                            <CustomIntervalInputButton
                                style={{ width: 100 }}
                                onPress={toggleIsOpenCalendarEnd}
                            >
                                <CustomIntervalInputButtonText>
                                    {format(customEndDate, 'dd/MM/yyyy')}
                                </CustomIntervalInputButtonText>
                            </CustomIntervalInputButton>

                            {
                                isOpenCalendarEnd && (
                                    <DateTimePicker
                                        mode="date"
                                        display="calendar"
                                        value={customEndDate}
                                        onChange={handleUpdateCustomEndDate}
                                        is24Hour
                                    />
                                )
                            }
                        </FromToInputContainer>
                    </FromToContainer>
                )
            }
        </Container>
    )
}
