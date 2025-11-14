export type BookModel = {
  id: string
  title: string
  yearPublished: number
  pictureUrl?: string
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  pictureUrl?: string
}

export type UpdateBookModel = Partial<CreateBookModel>
