import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import routes from "@/routes/routes";
import AuthWrapper from "@/components/AuthWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthWrapper
                isPrivate={route.isPrivate}
                permissions={route.permissions}
              >
                <route.renderer />
              </AuthWrapper>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
