import router from 'next/router'

import { SidebarLink } from './SidebarLink'
import { useScope } from '@/contexts/scope'
import { ChatBubblePlusIcon } from '@gitmono/ui/Icons'

export function SidebarIssue() {
  const { scope } = useScope()
  
  return (
   <>
     <SidebarLink
        id='Issue'
        label='Issue'
        href={`/${scope}/issue`}
        active={router.pathname === '/[org]/issue'}
        leadingAccessory={<ChatBubblePlusIcon />}
      />
   </>
  )
}
