import { MANAGEMENT_ROUTE, STATISTICS_ROUTE } from 'features/admin/routes'

const adminRoutes: Array<string | undefined> = ['/dashboard', MANAGEMENT_ROUTE.path, STATISTICS_ROUTE.path]
export const getIsAdminRoute = (route: string) => adminRoutes.includes(route)
