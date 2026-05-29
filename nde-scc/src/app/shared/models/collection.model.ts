export interface CollectionItem {
  col_id: string
  title: string
  desc: string
}

export interface CollectionResponse {
  data: CollectionItem[]
}