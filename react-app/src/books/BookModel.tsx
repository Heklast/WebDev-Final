export type BookAuthorModel = {
  id: string
  firstName: string
  lastName: string
}
export type BookModel = {
  id: string
  title: string
  yearPublished: number
  pictureUrl?: string
  author: BookAuthorModel
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  pictureUrl?: string
}

export type UpdateBookModel = Partial<CreateBookModel>
