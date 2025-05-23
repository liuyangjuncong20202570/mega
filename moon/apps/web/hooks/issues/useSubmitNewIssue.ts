import { NewIssue } from '@gitmono/types/generated'
import { useMutation } from '@tanstack/react-query'

import { legacyApiClient } from '@/utils/queryClient'

export function useSubmitNewIssue() {
  return useMutation({
    mutationFn: (data: NewIssue) => legacyApiClient.v1.postApiIssueNew().request(data)
  })
}
