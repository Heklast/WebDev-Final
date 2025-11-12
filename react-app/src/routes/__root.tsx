import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '../Layout'

// Clients routes
import { clientsRoute } from './clients'
import { clientDetailsRoute } from './clients.$clientId'

// Import your original index route (default page)
import { Route as IndexRoute } from './index'

const RootLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
)

export const rootRoute = createRootRoute({ component: RootLayout })

export const routeTree = rootRoute._addFileChildren({
  IndexRoute,           // ✅ Default page
  clientsRoute,
  clientDetailsRoute,
})
