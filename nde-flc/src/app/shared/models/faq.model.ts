export interface FaqItem {
  question: string
  url: string
}

export interface FaqResponse {
  data: FaqItem[]
}

export interface alertResponse {
  question: string
  answer: string
  updated: string
  url: string
}