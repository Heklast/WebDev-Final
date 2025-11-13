import { useAuthorDetailsProvider } from '../../providers/useAuthorDetailsProvider'
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Route as authorsRoute } from '../../../routes/authors'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Skeleton, Space, Typography } from 'antd'

interface AuthorDetailsProp {
  id: string
}

export const AuthorDetails = ({ id }: AuthorDetailsProp) => {
  const { author, loadAuthor, isLoading } = useAuthorDetailsProvider(id)

  useEffect(() => {
    loadAuthor()
  }, [id])

 if (isLoading) {
    return <Skeleton active />
  }

  if (!author) {
    return <Typography.Text>Author not found.</Typography.Text>
  }

  return (
    <Space
      direction="vertical"
      style={{
        textAlign: 'left',
        width: '95%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
      }}
    >
      <Link to={authorsRoute.to}>
        <ArrowLeftOutlined /> Back to authors
      </Link>

      {author.pictureUrl ? (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
        >
          <img
            src={author.pictureUrl}
            alt={`${author.firstName} ${author.lastName}`}
            style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
          />
        </div>
      ) : null}

      <Typography.Title level={2} style={{ marginBottom: 0 }}>
        {author.firstName} {author.lastName}
      </Typography.Title>
    </Space>
  )
}