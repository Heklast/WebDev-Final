import { useEffect } from "react";
import { useBookAuthorsProviders } from "../../providers/useBookAuthorsProviders"
import {AuthorListItem} from "./AuthorListItem"

export function AuthorList(){
    const {authors, loadAuthors}= useBookAuthorsProviders();

    useEffect(()=>{
    loadAuthors()},[])

    return(
        <>
        {authors.map(author=>
            <AuthorListItem
                key={author.id}
                author={author}
                  />
                
)}
        
        </>
    )
}