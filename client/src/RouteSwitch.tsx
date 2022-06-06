import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./routes/LandingPage";
import { OpenRoute } from "./components/UserRouting";
import { useAuthentication } from "./hooks/useAuthentication";
import { Home } from "./routes/Home";
import { GlobalContext } from "./hooks/useGlobalContext";
import { useFetchPosts } from "./hooks/useFetchPosts";
import { Navbar } from "./components/Navbar";
import { LoadingUx } from "./components/LoadingUx";

export const RouteSwitch = () => {
  const [user, setUser, token, setToken] = useAuthentication();
  const [cryptos, setCryptos] = useFetchPosts();
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  const togglePageLoading = () => setPageLoading((prevState) => !prevState);

  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{
          user,
          setUser,
          cryptos,
          setCryptos,
          token,
          setToken,
          togglePageLoading,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route
            path="login"
            element={
              // Only users who are not yet authenticated can visit this page.
              <OpenRoute token={token}>
                <LandingPage />
              </OpenRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        {pageLoading ? <LoadingUx /> : null}
      </GlobalContext.Provider>
    </BrowserRouter>
  );
};
