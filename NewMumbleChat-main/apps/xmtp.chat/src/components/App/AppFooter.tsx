import { Anchor, Flex, Group, Text } from "@mantine/core";
import classes from "./AppFooter.module.css";

export const AppFooter: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap="md"
      wrap="wrap"
      className={classes.footer}
    >
      <Group gap="xs" className={classes.group}>
        <Text className={classes.text}>
          Built with
        </Text>

        <Anchor
          href="https://xmtp.org"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.anchor}
        >
          XMTP
        </Anchor>
      </Group>

      <Text className={classes.copyright}>
        © 2025 MumbleChat – Secure Messaging
      </Text>
    </Flex>
  );
};