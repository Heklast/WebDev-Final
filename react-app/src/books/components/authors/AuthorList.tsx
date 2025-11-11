import { useEffect } from "react";
import { useBookAuthorsProviders } from "../../providers/useBookAuthorsProviders"
import {AuthorListItem} from "./AuthorListItem"
import { CreateAuthorModal } from "./CreateAuthorModal";
import { Skeleton } from 'antd'

export function AuthorList(){
    const {authors, loading, loadAuthors, createAuthor, deleteAuthor, updateAuthor}= useBookAuthorsProviders();

    useEffect(()=>{
    loadAuthors()},[])

    return(
        <>
        <CreateAuthorModal onCreate={createAuthor} />
        <div style={{ padding: '5rem' }}>
        {loading ? (<Skeleton active />
        ) : (
        authors.map(author=>
            <AuthorListItem
                key={author.id}
                author={author}
                onDelete={deleteAuthor}
                onUpdate={updateAuthor}
                  />
                
))}</div>
        
        </>
    )
}