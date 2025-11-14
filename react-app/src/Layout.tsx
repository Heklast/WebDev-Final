import { Link, useMatchRoute } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books'
import { Route as authorsRoute } from './routes/authors'
import { Space, type MenuProps } from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  InfoOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import Menu from 'antd/es/menu/menu'
import { Route as clientsRoute } from './routes/clients'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const matchRoute = useMatchRoute()

  const isBooks = !!matchRoute({ to: '/books', fuzzy: true })
  const isAuthors = !!matchRoute({ to: '/authors', fuzzy: true })
  const isClients = !!matchRoute({ to: '/clients', fuzzy: true })
  const isAbout = !!matchRoute({ to: '/about', fuzzy: true })
  const isHome = !!matchRoute({ to: '/', fuzzy: false })

  let selectedKey: string = 'home'
  if (isBooks) {
    selectedKey = 'books'
  } else if (isAuthors) {
    selectedKey = 'authors'
  } else if (isClients) {
    selectedKey = 'clients'
  } else if (isAbout) {
    selectedKey = 'about'
  } else if (isHome) {
    selectedKey = 'home'
  }

  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={authorsRoute.to}>Authors</Link>,
      key: 'authors',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={clientsRoute.to}>Clients</Link>,
      key: 'clients',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoOutlined />,
    },
  ]

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        style={{
          textAlign: 'left',
          width: '100%',
          backgroundColor: '#1d4ed8',
          color: 'white',
        }}
      >
        <h2 style={{ marginTop: '0', padding: '0.75rem 1rem' }}>
          Babel&apos;s Library
        </h2>
        <Menu mode="horizontal" items={items} selectedKeys={[selectedKey]} />
      </div>
      <div
        style={{
          width: '100%',
          overflowY: 'scroll',
          backgroundColor: '#f3f4f6',
          padding: '1rem 0',
        }}
      >
        {children}
      </div>
    </Space>
  )
}
