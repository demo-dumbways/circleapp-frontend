import { extendTheme } from '@chakra-ui/react'
import { inputAnatomy, switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
const { definePartsStyle: inputStyle, defineMultiStyleConfig: inputConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)
const { definePartsStyle: switchStyle, defineMultiStyleConfig: switchConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = switchStyle({
    container: {},
    thumb: {
        bg: 'circle.font',
    },
    track: {
        bg: 'circle.dark',
        _checked: {
            bg: 'circle.accent',
        },
    },
})

const hollow = inputStyle({
    field: {
        border: '1px solid',
        borderColor: 'circle.dark',
        background: 'transparent',
        borderRadius: 'lg',
        _hover: {
            background: 'none',
            boxShadow: 'none',
            borderColor: 'circle.accent',
        },
        _active: {
            background: 'none',
            boxShadow: 'none',
            borderColor: 'circle.accent',
        },
        _focus: {
            background: 'none',
            boxShadow: 'none',
            borderColor: 'circle.accent',
        },
        _autofill: {
            transition: 'background-color 0s 600000s, color 0s 600000s',
        },
        _placeholder: {
            color: 'circle.dark',
        },
    },
})

const switchTheme = switchConfig({ baseStyle })
const inputTheme = inputConfig({
    variants: { hollow },
})

const circleTheme = extendTheme({
    colors: {
        circle: {
            backdrop: '#171717',
            backdropAccent: '#1c1c1c',
            font: '#dedede',
            dark: '#505050',
            darker: '#1f1f1f',
            red: '#D71913',
            accent: '#8e3e63',
            darkAccent: '#703450',
            error: '#cc0000',
            green: '#006e45',
        },
    },
    styles: {
        global: {
            body: {
                fontFamily: 'Inter',
                color: '#dedede',
                bg: '#171717',
                fontSize: '14.5px',
            },
        },
    },
    components: { Input: inputTheme, Switch: switchTheme },
})

export default circleTheme
