// 'use client'

import React, { useEffect, useState } from 'react'
import { CloseCircleOutlined, CommentOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Space, Tabs, TabsProps, Timeline } from 'antd'
import { useRouter } from 'next/navigation'

import RichEditor from '@/components/MrView/rich-editor/RichEditor'
import { useGetIssueDetail } from '@/hooks/issues/useGetIssueDetail'

interface IssueDetail {
  status: string
  conversations: Conversation[]
  title: string
}
interface Conversation {
  id: number
  user_id: number
  conv_type: string
  comment: string
  created_at: number
}

// type Params = Promise<{ id: string }>

export default function IssueDetailPage({ id }: { id: string }) {
  //   const { id } = React.use(params)

  const [editorState, setEditorState] = useState('')
  const [login, setLogin] = useState(false)
  const [info, setInfo] = useState<IssueDetail>({
    status: '',
    conversations: [],
    title: ''
  })
  const { data: issueDetailObj } = useGetIssueDetail(id)

  useEffect(() => {
    if (!(issueDetailObj?.req_result && issueDetailObj.data)) {
      return
    }
    setInfo({
      title: issueDetailObj.data.title,
      status: issueDetailObj.data.status,
      conversations: issueDetailObj.data.conversations
    })
  }, [issueDetailObj])

  const [loadings, setLoadings] = useState<boolean[]>([])
  const router = useRouter()

  // const fetchDetail = useCallback(async () => {
  //   const detail = await fetch(`/api/issue/${id}/detail`)
  //   const detail_json = await detail.json()

  //   setInfo(detail_json.data.data)
  // }, [id])

  // const checkLogin = async () => {
  //   const res = await fetch(`/api/auth`)

  //   setLogin(res.ok)
  // }

  // useEffect(() => {
  //   checkLogin()
  //   fetchDetail()
  // }, [id, fetchDetail])

  const set_to_loading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]

      newLoadings[index] = true
      return newLoadings
    })
  }

  const cancel_loading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]

      newLoadings[index] = false
      return newLoadings
    })
  }

  async function close_issue() {
    set_to_loading(3)
    const res = await fetch(`/api/issue/${id}/close`, {
      method: 'POST'
    })

    if (res) {
      router.push('/issue')
    }
  }

  async function reopen_issue() {
    set_to_loading(3)
    const res = await fetch(`/api/issue/${id}/reopen`, {
      method: 'POST'
    })

    if (res) {
      router.push('/issue')
    }
  }

  async function save_comment(comment) {
    set_to_loading(3)
    const res = await fetch(`/api/issue/${id}/comment`, {
      method: 'POST',
      body: comment
    })

    if (res) {
      setEditorState('')
      // fetchDetail()
      cancel_loading(3)
    }
  }

  const conv_items = info?.conversations.map((conv) => {
    let icon
    let children

    switch (conv.conv_type) {
      case 'Comment':
        icon = <CommentOutlined />
        children = <MRComment conv={conv} fetchDetail={() => console.log('fetch detail')} />
        break
      case 'Closed':
        icon = <CloseCircleOutlined />
        children = conv.comment
    }

    const element = {
      dot: icon,
      children: children
    }

    return element
  })

  const tab_items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Conversation',
      children: (
        <Space direction='vertical' style={{ width: '100%' }}>
          <Timeline items={conv_items} />
          {info && info.status === 'open' && (
            <>
              <h1>Add a comment</h1>
              <RichEditor setEditorState={setEditorState} />
              <Flex gap='small' justify={'flex-end'}>
                <Button loading={loadings[3]} disabled={!login} onClick={() => close_issue()}>
                  Close issue
                </Button>
                <Button
                  loading={loadings[3]}
                  disabled={editorState === '' || !login}
                  onClick={() => save_comment(editorState)}
                >
                  Comment
                </Button>
              </Flex>
            </>
          )}
          {info && info.status === 'closed' && (
            <Flex gap='small' justify={'flex-end'}>
              <Button loading={loadings[3]} disabled={!login} onClick={() => reopen_issue()}>
                Reopen issue
              </Button>
            </Flex>
          )}
        </Space>
      )
    }
  ]

  return (
    <Card title={info.title + ' #' + id}>
      <Tabs defaultActiveKey='1' items={tab_items} />
    </Card>
  )
}
