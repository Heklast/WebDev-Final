import type {AuthorModel, UpdateAuthorModel} from '../../AuthorModel'
import {useState} from 'react'
import { Link } from '@tanstack/react-router'


export interface AuthorListItemParams{
    author:AuthorModel

}

export function AuthorListItem({author}: AuthorListItemParams){
    const [firstName, setFirstName] = useState(author.firstName)

    return(

        <Link
                    to={`/authors/$authorId`}
                    params={{ authorId: author.id }}
                    style={{
                      margin: 'auto 0',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>{author.firstName}</span> -{' '}
                    {author.lastName}
                  </Link>
    )

}