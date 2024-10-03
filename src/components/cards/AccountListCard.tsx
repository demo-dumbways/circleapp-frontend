import { Flex } from '@chakra-ui/react'
import { UserType } from '@/types/types'

import AccountCard from '@/components/cards/AccountCard'
import EmptyMessage from '@/components/utils/EmptyMessage'

interface AccountListCardProps {
    accounts: UserType[]
}

function AccountListCard({ accounts }: AccountListCardProps) {
    if (accounts.length) {
        return (
            <Flex direction={'column'} gap={'1rem'} padding={'1rem'}>
                {accounts.map((account) => (
                    <AccountCard
                        key={account.id}
                        id={account.id}
                        username={account.username}
                        name={account.name}
                        bio={account.bio}
                        avatar={account.avatar}
                        isFollowed={account.isFollowed}
                    />
                ))}
            </Flex>
        )
    }

    return <EmptyMessage header={'Nothing to see here yet.'} />
}

export default AccountListCard
