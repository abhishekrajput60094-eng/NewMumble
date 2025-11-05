import React from "react";
import "./MainLayout.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className="main-layout">{children}</div>;
};

export const MainLayoutHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <header className="main-header">{children}</header>;
};

export const MainLayoutNav: React.FC<{
  opened: boolean;
  toggle: () => void;
  children: React.ReactNode;
}> = ({ opened, toggle, children }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`overlay ${opened ? "overlay-visible" : ""}`}
        onClick={toggle}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${opened ? "sidebar-open" : ""}`}>
        <button className="sidebar-close" onClick={toggle}>
          ✕
        </button>
        <nav className="sidebar-nav">{children}</nav>
      </aside>
    </>
  );
};

export const MainLayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="main-content">{children}</main>;
};

export const MainLayoutFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <footer className="main-footer">{children}</footer>;
};
