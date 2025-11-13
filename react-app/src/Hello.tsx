import { Typography } from 'antd'

interface HelloProps {
  children: React.ReactNode
  name: string
}

export function Hello({ children, name }: HelloProps) {
  return (
    <>
      <Typography.Title level={2}>Hello {name}!</Typography.Title>
      <Typography.Text>{children}</Typography.Text>
    </>
  )
}
