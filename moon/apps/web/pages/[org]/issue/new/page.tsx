'use client'

import { useState } from 'react'
import { Button, Flex, Input, Space } from 'antd/lib'
import { useRouter } from 'next/router'

import RichEditor from '@/components/MrView/rich-editor/RichEditor'
import { useSubmitNewIssue } from '@/hooks/issues/useSubmitNewIssue'

export default function MRDetailPage() {
  const [editorState, setEditorState] = useState('')
  const [title, setTitle] = useState('')
  const [loadings, setLoadings] = useState<boolean[]>([])
  const router = useRouter()
  const { mutateAsync: submitNewIssueAsync } = useSubmitNewIssue()

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

  async function submit(description: string) {
    set_to_loading(3)
    const { data, err_message, req_result } = await submitNewIssueAsync({ title, description })
    if (req_result && data) {
      setEditorState('')
      cancel_loading(3)
      router.push(`/${router.query.org}/issue`)
    }
  }

  return (
    <>
      <div className='container p-10'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <h1>
            Add a title
            <Input
              aria-label='title'
              name='title'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </h1>
        </Space>
        <Space direction='vertical' style={{ width: '100%' }}>
          <h1>Add a description</h1>
          <RichEditor setEditorState={setEditorState} />
          <Flex justify={'flex-end'}>
            <Button loading={loadings[3]} onClick={() => submit(editorState)}>
              Submit New Issue
            </Button>
          </Flex>
        </Space>
      </div>
    </>
  )
}
