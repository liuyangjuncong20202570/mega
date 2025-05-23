import Head from 'next/head'

import { AppLayout } from '@/components/Layout/AppLayout'
import { AuthAppProviders } from '@/components/Providers/AuthAppProviders'
import { PageWithLayout } from '@/utils/types'
import IssuePage from './page.tsx'

const OrganizationIssuePage: PageWithLayout<any> = () => {

  return (
    <>
   
      <Head>
        <title>issue</title>
      </Head>

      <IssuePage />
    </>
  )
}

OrganizationIssuePage.getProviders = (page, pageProps) => {
  return (
    <AuthAppProviders {...pageProps}>
      <AppLayout {...pageProps}>{page}</AppLayout>
    </AuthAppProviders>
  )
}

export default OrganizationIssuePage
