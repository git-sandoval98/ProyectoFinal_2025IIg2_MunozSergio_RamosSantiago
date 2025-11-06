import { useAuth } from "./AuthContext";

export default function RoleGuard({ allow = [], children }) {
  const { user } = useAuth();
  if (!user) return null;
  return allow.includes(user.role) ? children : null;
}
