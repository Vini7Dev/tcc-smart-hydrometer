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

export const CompareByOptions: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleChangeSelectedOptionIndex = useCallback((index: number) => {
        setSelectedIndex(index)
    }, [])

    const compareOptions = [
        { label: 'Dia', value: 'day' },
        { label: 'Semana', value: 'week' },
        { label: 'Mês', value: 'month' },
        { label: 'Ano', value: 'year' },
        { label: 'Customizado', value: 'custom' },
    ]

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
