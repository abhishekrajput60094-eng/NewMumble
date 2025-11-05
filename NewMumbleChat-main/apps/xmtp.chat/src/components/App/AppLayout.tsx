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
  MainLayout,
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
      // save the current path to redirect to it after the client is initialized
      if (
        location.pathname !== "/welcome" &&
        location.pathname !== "/disconnect"
      ) {
        setRedirectUrl(`${location.pathname}${location.search}`);
      }
      void navigate("/welcome");
    }
  }, [client]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    close();
  }, [location.pathname]);

  return !client ? (
    <CenteredLayout fullScreen>
      <LoadingOverlay visible />
    </CenteredLayout>
  ) : (
    <MainLayout>
      <div>
        <AppHeader client={client} opened={opened} toggle={toggle} />
      </div>
      <div>
        <MainLayoutNav opened={opened} toggle={toggle}>
          <ConversationsNavbar />
        </MainLayoutNav>
        <MainLayoutContent>
          <Outlet />
        </MainLayoutContent>
      </div>
      <div>
        <AppFooter />
      </div>
    </MainLayout>
  );
};
