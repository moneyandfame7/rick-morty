export interface PageInformation {
  page: number
  take: number
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface Pagination {
  readonly page: number

  readonly pageSize: number
}
