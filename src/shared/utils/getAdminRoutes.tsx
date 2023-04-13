import { DASHBOARD_ROUTE, MANAGEMENT_ROUTE, STATISTICS_ROUTE } from '@features/admin/routes'

const adminRoutes: Array<string | undefined> = [DASHBOARD_ROUTE.path, MANAGEMENT_ROUTE.path, STATISTICS_ROUTE.path]
export const getIsAdminRoute = (route: string) => adminRoutes.includes(route)
