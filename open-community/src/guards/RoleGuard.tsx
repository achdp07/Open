import { Navigate, Outlet } from 'react-router-dom';

type Role = 'member' | 'instructor' | 'moderator' | 'admin';

interface RoleGuardProps {
  allowedRoles: Role[];
  currentRole: Role | null;
  redirectTo?: string;
}

export default function RoleGuard({
  allowedRoles,
  currentRole,
  redirectTo = '/join',
}: RoleGuardProps) {
  // Not logged in
  if (!currentRole) {
    return <Navigate to="/join" replace />;
  }

  // Logged in but wrong role
  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Authorized
  return <Outlet />;
}