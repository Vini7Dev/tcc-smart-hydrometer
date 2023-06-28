import React, { useCallback, useState } from 'react'

import {
    Container,
    CompareOptionsLabel,
    CompareOptionsList,
    CompareOption,
    CompareOptionText,
    FromToContainer,
    FromToInputContainer,
    FromLabel,
} from './styles'
import { Input } from '../Input'

interface CompareByOptionsProps {
    onSelectCompareOption(value: string): void
}

interface CompareOptionItemProps {
    value: string
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
}) => {
    const compareOptions = [
        { label: 'Dia', value: 'YESTERDAY' },
        { label: 'Semana', value: 'PAST_WEEK' },
        { label: 'Mês', value: 'PAST_MONTH' },
        { label: 'Ano', value: 'PAST_YEAR' },
        { label: 'Customizado', value: 'CUSTOM' },
    ]

    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleChangeSelectedOptionIndex = useCallback((index: number) => {
        setSelectedIndex(index)
        onSelectCompareOption(compareOptions[index].value)
    }, [])

    return (
        <Container>
            <CompareOptionsLabel>Comparar por:</CompareOptionsLabel>

            <CompareOptionsList>
                {
                    compareOptions.map((compareOption, idx) => (
                        <CompareOptionItem
                            key={compareOption.value}
                            value={compareOption.value}
                            label={compareOption.label}
                            selected={selectedIndex === idx}
                            handleSelectOption={() => handleChangeSelectedOptionIndex(idx)}
                        />
                    ))
                }
            </CompareOptionsList>

            {
                selectedIndex === 4 && (
                    <FromToContainer>
                        <FromToInputContainer>
                            <FromLabel>De</FromLabel>

                            <Input
                                placeholder="00/00/0000"
                                style={{ width: 100 }}
                            />
                        </FromToInputContainer>

                        <FromToInputContainer>
                            <FromLabel>Até</FromLabel>

                            <Input
                                placeholder="00/00/0000"
                                style={{ width: 100 }}
                            />
                        </FromToInputContainer>
                    </FromToContainer>
                )
            }
        </Container>
    )
}
