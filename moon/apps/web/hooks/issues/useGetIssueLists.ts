import { PageParamsStatusParams } from '@gitmono/types/generated'
import { useMutation } from '@tanstack/react-query'

import { legacyApiClient } from '@/utils/queryClient'

export function useGetIssueLists() {
  return useMutation({
    mutationFn: (data: PageParamsStatusParams) => legacyApiClient.v1.postApiIssueList().request(data)
  })
}
