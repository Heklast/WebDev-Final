import { Breadcrumb as AntBreadcrumb } from 'antd'
import { Link } from '@tanstack/react-router'
import { HomeOutlined, RightOutlined } from '@ant-design/icons'

export type BreadcrumbItem = {
  title: string
  path?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div
      style={{
        width: '100%',
        padding: '0 1rem',
        margin: '0 0 1rem',
      }}
    >
      <AntBreadcrumb
        separator={<RightOutlined style={{ fontSize: 10, color: '#9ca3af' }} />}
        items={items.map((item, index) => {
          const isLast = index === items.length - 1
          const isHome =
            item.path === '/' || item.title.toLowerCase() === 'home'

          const content =
            item.path && !isLast ? (
              <Link to={item.path} style={{ color: '#1d4ed8' }}>
                {isHome ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <HomeOutlined style={{ fontSize: 12 }} />
                    <span>{item.title}</span>
                  </span>
                ) : (
                  item.title
                )}
              </Link>
            ) : (
              <span
                style={{
                  color: '#64748b',
                  fontWeight: isLast ? 500 : 400,
                }}
              >
                {item.title}
              </span>
            )

          return { title: content }
        })}
      />
    </div>
  )
}
