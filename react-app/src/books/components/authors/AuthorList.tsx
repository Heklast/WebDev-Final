import { useEffect } from "react";
import { useBookAuthorsProviders } from "../../providers/useBookAuthorsProviders"
import {AuthorListItem} from "./AuthorListItem"
import { CreateAuthorModal } from "./CreateAuthorModal";

export function AuthorList(){
    const {authors, loadAuthors, createAuthor, deleteAuthor, updateAuthor}= useBookAuthorsProviders();

    useEffect(()=>{
    loadAuthors()},[])

    return(
        <>
        <CreateAuthorModal onCreate={createAuthor} />
        <div style={{ padding: '5rem' }}>
        {authors.map(author=>
            <AuthorListItem
                key={author.id}
                author={author}
                onDelete={deleteAuthor}
                onUpdate={updateAuthor}
                  />
                
)}</div>
        
        </>
    )
}