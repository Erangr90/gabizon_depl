export type TPostFilter = {
  creatorId: string
  time: string
  sort: 'asc' | 'desc' | 'watched'
}


export type NewPost = {
  title: string
  date: string
  desc: string
  link: string
  creatorId?: number
  communityId?: number
}
