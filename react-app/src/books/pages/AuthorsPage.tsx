import { Outlet } from '@tanstack/react-router'
import { AuthorList } from '../components/authors/AuthorList'

export function AuthorsPage() {
  return (
    <>
      <AuthorList></AuthorList>
      <Outlet />
    </>
  )
}
