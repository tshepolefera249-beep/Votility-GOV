export const roles = {
  USER: 'user',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin'
};

export function canPerformAction(userRole: string, action: string) {
  const permissions: Record<string, string[]> = {
    createElection: [roles.ADMIN, roles.SUPERADMIN],
    deleteElection: [roles.SUPERADMIN],
    viewAnalytics: [roles.ADMIN, roles.SUPERADMIN],
    vote: [roles.USER, roles.ADMIN, roles.SUPERADMIN],
  };
  return permissions[action]?.includes(userRole) ?? false;
}
