import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import publicRoutes from "./routes/route"; 
import { useEffect } from "react";
import DefaultLayout from "./components/layouts/client/DefaultLayout";

function App() {
  useEffect(() => {
    document.title = "Personal Blog!";
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.layout !== undefined ? route.layout : DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  Layout === null ? (
                    <Page />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
