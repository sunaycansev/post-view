import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import routes from "@/routes/routes";
import AuthWrapper from "@/components/AuthWrapper";
import PrefetchWrapper from "@/components/PrefetchWrapper";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { AUTH_QUERY_KEY } from "./constants";
import { Navbar } from "./components/Navbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) =>
            query.queryKey[0] === AUTH_QUERY_KEY[0] &&
            query.queryKey[1] === AUTH_QUERY_KEY[1],
        },
        hydrateOptions: {},
      }}
    >
      <BrowserRouter>
        <Navbar />
        <div className="pt-24">
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
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
