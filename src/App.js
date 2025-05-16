import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import CaseList from './pages/CaseList'; // 你可以先创建一个简单页面
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* 受保护的路由 */}
      <Route
        path="/cases"
        element={
          <ProtectedRoute>
            <CaseList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
