import { Flex, Spinner } from '@chakra-ui/react'

function CircleSpinner() {
    return (
        <Flex justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'}>
            <Spinner size={'sm'} color={'circle.font'} />
        </Flex>
    )
}

export default CircleSpinner
