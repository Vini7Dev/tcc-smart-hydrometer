import { styled } from 'styled-components/native'
import Icons from 'react-native-vector-icons/Feather'

import { errorColor, lightGray2 } from '../../styles/variables'

export const ScreenContainer = styled.View`
    flex: 1;
`

export const ScreenContent = styled.View`
    flex: 1;
    padding: 45px 16px;
    align-items: center;
`

export const AddImageButtonMargin = styled.View`
    width: 100%;
    margin: 8px 0 32px;
    padding: 0 50px;
`

export const ImagesPreviewContainer = styled.View`
    flex-direction: row;
    gap: 20px;
    width: 100%;
    margin: 0 20px;
    padding: 16px 20px;
    border: 2px solid ${lightGray2};
    border-radius: 3px;
`

export const ImagePreviewItem = styled.View`
    position: relative;
`

export const ImagePreview = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 3px;
`

export const ImagePreviewRemoveButton = styled(Icons)`
    position: absolute;
    top: -6px;
    right: -6px;
    padding: 6px;
    border-radius: 20px;
    background-color: ${errorColor};
`

export const ButtonMargin = styled.View`
    margin-top: 40px;
`
