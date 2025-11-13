
export type AuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  pictureUrl?: string;

};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  authorId: string;
  pictureUrl?: string;

};

export type UpdateAuthorModel = Partial<CreateAuthorModel>