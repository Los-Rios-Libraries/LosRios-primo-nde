export interface FaqItem {
  question: string
  url: string
}

export interface FaqResponse {
  data: FaqItem[]
}
