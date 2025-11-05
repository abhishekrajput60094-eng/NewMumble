import { Button, Divider, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router";

export const SelectConversation = () => {
  const navigate = useNavigate();

  return (
    <div
      title="No conversation selected"
      style={{
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "Inter, sans-serif",
        // marginTop: "70px",
        height: "80vh",
      }}
    >
      <Stack
        gap="lg"
        align="center"
        py="xl"
        style={{
          color: "#000",
        }}
      >
        <Text style={{ color: "#000", fontSize: "1rem", textAlign: "center" }}>
          Select a conversation in the left sidebar to display its messages.
        </Text>

        <Divider
          label="or"
          w="80%"
          styles={{
            root: { borderColor: "#000" },
            label: {
              fontSize: "var(--mantine-font-size-md)",
              color: "#000",
              backgroundColor: "#fff",
            },
          }}
        />

        <Stack gap="xs" align="center">
          <Button
            size="xs"
            variant="default"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              border: "1px solid #000",
              borderRadius: "6px",
              fontWeight: 600,
              textTransform: "none",
            }}
            onClick={() => {
              void navigate("/conversations/new-group");
            }}
          >
            Create a new group
          </Button>

          <Button
            size="xs"
            variant="default"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              border: "1px solid #000",
              borderRadius: "6px",
              fontWeight: 600,
              textTransform: "none",
            }}
            onClick={() => {
              void navigate("/conversations/new-dm");
            }}
          >
            Create a new direct message
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};
