import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import routes from "@/routes/routes";
import AuthWrapper from "@/components/AuthWrapper";
import PrefetchWrapper from "@/components/PrefetchWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                  <PrefetchWrapper translationKeys={route.translations}>
                    <route.renderer />
                  </PrefetchWrapper>
                </AuthWrapper>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
