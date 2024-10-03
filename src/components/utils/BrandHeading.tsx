import { fontSizing } from '@/styles/style'
import { Heading } from '@chakra-ui/react'

interface BrandHeadingProps {
    text: string
    mb?: string | number
}

function BrandHeading({ text, mb = '1rem' }: BrandHeadingProps) {
    return (
        <Heading fontWeight={'700'} fontSize={fontSizing.big} mb={mb}>
            {text}
        </Heading>
    )
}

export default BrandHeading
