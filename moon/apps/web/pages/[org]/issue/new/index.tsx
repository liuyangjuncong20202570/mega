
import { AppLayout } from '@/components/Layout/AppLayout'
import { AuthAppProviders } from '@/components/Providers/AuthAppProviders'
import { PageWithLayout } from '@/utils/types'
import MRDetailPage from './page.tsx'

const OrganizationIssueNewPage: PageWithLayout<any> = () => {

  return (
    <>
      <MRDetailPage />
    </>
  )
}

OrganizationIssueNewPage.getProviders = (page, pageProps) => {
  return (
    <AuthAppProviders {...pageProps}>
      <AppLayout {...pageProps}>{page}</AppLayout>
    </AuthAppProviders>
  )
}

export default OrganizationIssueNewPage
