import { useMutation } from '@tanstack/react-query'

interface payload {
  pagination: {
    page: number
    per_page: number
  }
  additional: {
    status: string
  }
}

export function useGetIssueLists() {
  return useMutation({
    mutationFn: ({ pagination: { page, per_page }, additional: { status } }: payload) => {
      console.log('接收的数据：' + page + per_page + status)
      return Promise.resolve({ status: 'OK' })
    },
    onMutate: ({ pagination: { page, per_page }, additional: { status } }: payload) => {
      console.log('乐观更新：' + page + per_page + status)
    }
  })
}

// export function useUpdateCall({ id }: { id: string }) {
//   const { scope } = useScope()
//   const queryNormalizer = useQueryNormalizer()

//   return useMutation({
//     mutationFn: (data: OrganizationsOrgSlugCallsIdPutRequest) =>
//       apiClient.organizations.putCallsById().request(`${scope}`, id, data),
//     onMutate: (data) => {
//       return createNormalizedOptimisticUpdate({
//         queryNormalizer,
//         type: 'call',
//         id,
//         update: { ...data, processing_generated_title: false, is_edited: true }
//       })
//     }
//   })
// }
