// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

/**
 * 高阶组件，用于保护需要登录权限的页面。
 * 如果 localStorage 中没有合法用户信息，自动跳转到登录页。
 */
export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user || !user.uuid) {
    // 未登录则重定向到登录页
    return <Navigate to="/" replace />;
  }

  // 登录状态正常，渲染原始页面
  return children;
}
