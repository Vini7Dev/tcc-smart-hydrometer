import React, { useCallback, useState } from 'react'
import { TouchableHighlightProps } from 'react-native/types'

import { Container, OptionButton, OptionText, OptionsContainer, SelectArrowIcon, SelectContainer, SelectText } from './styles'
import { whiteColor } from '../../styles/variables'

interface OptionProps {
    label: string
    value: string
}

interface ButtonProps extends TouchableHighlightProps {
    placeholder: string
    options: OptionProps[]
    defaultValue?: string
    onSelect: (value?: string) => void
}

export const Select: React.FC<ButtonProps> = ({
    placeholder,
    options,
    defaultValue,
    onSelect,
}) => {
    const [optionsIsOpen, setOptionsIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<OptionProps | undefined>(
        () => options.find(option => option.value === defaultValue)
    )

    const toggleOptionsIsOpen = useCallback(() => {
        setOptionsIsOpen(!optionsIsOpen)
    }, [optionsIsOpen])

    const handleSelectOption = useCallback((option: OptionProps) => {
        if (option.value === selectedOption?.value) {
            setSelectedOption(undefined)
            onSelect(undefined)
        } else {
            setSelectedOption(option)
            onSelect(option.value)
        }

        setOptionsIsOpen(false)
    }, [selectedOption, onSelect])

    return (
        <Container>
            <SelectContainer onPress={toggleOptionsIsOpen}>
                <>
                    <SelectText>
                        {
                            selectedOption
                                ? selectedOption.label
                                : placeholder
                        }
                    </SelectText>

                    <SelectArrowIcon
                        name={ optionsIsOpen ? 'chevron-up' : 'chevron-down' }
                        size={24}
                        color={whiteColor}
                    />
                </>
            </SelectContainer>

            <OptionsContainer>
                {
                    optionsIsOpen && options.map((option, idx) => (
                        <OptionButton
                            key={idx}
                            onPress={() => handleSelectOption(option)}
                        >
                            <OptionText>{option.label}</OptionText>
                        </OptionButton>
                    ))
                }
            </OptionsContainer>
        </Container>
    )
}
