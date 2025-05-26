import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO:获取初始化组织 admin_headers，假设初始化的组织叫mega
  // getByOrgSlug //获取组织
  /* 
  export type Organization = {
  id: string
  avatar_url: string
  avatar_urls: AvatarUrls
  created_at: string
  onboarded_at: string | null
  name: string
  slug: string
  invitation_url: string
  paid: boolean
  plan_name: string
  show_upgrade_banner: boolean
  trial_expired: boolean
  trial_active: boolean
  trial_days_remaining: number | null
  viewer_can_post: boolean
  viewer_can_create_digest: boolean
  viewer_can_create_project: boolean
  viewer_can_see_new_project_button: boolean
  viewer_can_see_projects_index: boolean
  viewer_can_see_people_index: boolean
  viewer_can_create_tag: boolean
  viewer_can_create_note: boolean
  viewer_can_create_custom_reaction: boolean
  viewer_can_create_invitation: boolean
  viewer_can_manage_integrations: boolean
  viewer_is_admin: boolean
  viewer_member_id: string | null
  viewer_can_leave: boolean
  settings: OrganizationSettings
  billing_email?: string | null
  email_domain?: string | null
  features?: (
    | 'slack_auto_publish'
    | 'sidebar_dms'
    | 'my_work'
    | 'max_w_chat'
    | 'archive_notifications'
    | 'relative_time'
    | 'firehose'
    | 'grouped_notifications'
    | 'comfy_compact_layout'
    | 'message_email_notifications'
    | 'integration_dms'
    | 'chat_channels'
    | 'channel_split_view'
    | 'no_emoji_accessories'
    | 'export'
    | 'api_endpoint_list_members'
    | 'api_endpoint_list_posts'
    | 'multi_org_apps'
    | 'smart_digests'
    | 'sync_members'
    | 'true_up_annual_subscriptions'
  )[]
  limits?: {
    file_size_bytes: number | null
  }
  member_count?: number
  channel_name: string
  presence_channel_name: string
}
  */
  // 创建组织：postOrganizations
}
