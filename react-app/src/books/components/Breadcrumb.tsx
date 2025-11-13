import { Breadcrumb as AntBreadcrumb } from 'antd';
import { Link } from '@tanstack/react-router';

export type BreadcrumbItem = {
  title: string;
  path?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <AntBreadcrumb
      style={{ margin: '16px 0' }}
      items={items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return {
          title: item.path && !isLast ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            item.title
          ),
        };
      })}
    />
  );
}