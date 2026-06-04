import type { ComponentType } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

type PageModule = {
  default: ComponentType;
};

const pageModules = import.meta.glob<PageModule>("./pages/**/*.tsx", {
  eager: true,
});

const routes = Object.entries(pageModules).map(([filePath, module]) => {
  const parts = filePath.split("/");

  const folderName = parts[2];

  const routePath = folderName === "home" ? "/" : `/${folderName}`;

  return {
    path: routePath,
    Component: module.default,
  };
});

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
