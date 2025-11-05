import { LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AppFooter } from "@/components/App/AppFooter";
import { AppHeader } from "@/components/App/AppHeader";
import { ConversationsNavbar } from "@/components/Conversations/ConversationsNavbar";
import { useXMTP } from "@/contexts/XMTPContext";
import { useRedirect } from "@/hooks/useRedirect";
import { CenteredLayout } from "@/layouts/CenteredLayout";
import {

  MainLayoutContent,
  MainLayoutNav,
} from "@/layouts/MainLayout";

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { client } = useXMTP();
  const { setRedirectUrl } = useRedirect();
  const [opened, { toggle, close }] = useDisclosure();

  useEffect(() => {
    if (!client) {
      // save redirect path
      if (
        location.pathname !== "/welcome" &&
        location.pathname !== "/disconnect"
      ) {
        setRedirectUrl(`${location.pathname}${location.search}`);
      }
      void navigate("/welcome");
    }
  }, [client]);

  // Close sidebar when route changes
  useEffect(() => {
    close();
  }, [location.pathname]);

  if (!client) {
    return (
      <CenteredLayout fullScreen>
        <LoadingOverlay visible />
      </CenteredLayout>
    );
  }

  return (
    <div className="app-layout">
      {/* Fixed Header */}
      <header className="app-header-fixed">
        <AppHeader client={client} opened={opened} toggle={toggle} />
      </header>

      {/* Layout Wrapper */}
      <div className="">
        <aside className={`app-sidebar ${opened ? "open" : ""}`}>
          <MainLayoutNav opened={opened} toggle={toggle}>
            <ConversationsNavbar />
          </MainLayoutNav>
        </aside>

        {/* Scrollable Main Content */}
        <main className="app-main-scrollable">
          <MainLayoutContent>
            <Outlet />
          </MainLayoutContent>
        </main>
      </div>

      {/* Fixed Footer */}
      <footer className="app-footer-fixed">
        <AppFooter />
      </footer>
    </div>
  );
};
