import { Role, privilegedRoles } from '@features/authorization/constant'

export const hasPermission = (role: Role) => privilegedRoles.includes(role)
