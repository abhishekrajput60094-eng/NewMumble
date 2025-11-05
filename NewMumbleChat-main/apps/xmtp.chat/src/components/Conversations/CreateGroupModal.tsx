import {
  Accordion,
  Badge,
  Button,
  Group,
  Stack,
  Text,
  Avatar,
  Grid,
  Paper,
  Divider,
  Tooltip,
} from "@mantine/core";
import { GroupPermissionsOptions } from "@xmtp/browser-sdk";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { PendingMember } from "@/components/Conversation/AddMembers";
import { Members } from "@/components/Conversation/Members";
import { Metadata } from "@/components/Conversation/Metadata";
import {
  defaultPolicySet,
  Permissions,
} from "@/components/Conversation/Permissions";
import { Modal } from "@/components/Modal";
import { isValidEthereumAddress, isValidInboxId } from "@/helpers/strings";
import { useCollapsedMediaQuery } from "@/hooks/useCollapsedMediaQuery";
import { useConversations } from "@/hooks/useConversations";
import { ContentLayout } from "@/layouts/ContentLayout";
import { useActions } from "@/stores/inbox/hooks";
import type { PolicySet } from "@/types";

const permissionsPolicyValue = (policy: GroupPermissionsOptions) => {
  switch (policy) {
    case GroupPermissionsOptions.Default:
      return "Default";
    case GroupPermissionsOptions.AdminOnly:
      return "Admin only";
    case GroupPermissionsOptions.CustomPolicy:
      return "Custom policy";
  }
  return "Default";
};

export const CreateGroupModal: React.FC = () => {
  const { newGroup } = useConversations();
  const { addConversation } = useActions();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrlSquare, setImageUrlSquare] = useState("");
  const [addedMembers, setAddedMembers] = useState<PendingMember[]>([]);
  const [permissionsPolicy, setPermissionsPolicy] =
    useState<GroupPermissionsOptions>(GroupPermissionsOptions.Default);
  const [policySet, setPolicySet] = useState<PolicySet>(defaultPolicySet);
  const navigate = useNavigate();
  const fullScreen = useCollapsedMediaQuery();
  const contentHeight = fullScreen ? "auto" : 500;

  const handleClose = useCallback(() => {
    void navigate(-1);
  }, [navigate]);

  const handleCreate = async () => {
    setLoading(true);

    try {
      const addedMemberInboxIds = addedMembers
        .filter((member) => isValidInboxId(member.inboxId))
        .map((member) => member.inboxId);
      const conversation = await newGroup(addedMemberInboxIds, {
        name,
        description,
        imageUrlSquare,
        permissions: permissionsPolicy,
        customPermissionPolicySet:
          permissionsPolicy === GroupPermissionsOptions.CustomPolicy
            ? policySet
            : undefined,
      });

      const addedMemberAddresses = addedMembers
        .filter((member) => isValidEthereumAddress(member.address))
        .map((member) => member.address);
      if (addedMemberAddresses.length > 0) {
        await conversation.addMembersByIdentifiers(
          addedMemberAddresses.map((address) => ({
            identifier: address.toLowerCase(),
            identifierKind: "Ethereum",
          })),
        );
      }

      // ensure conversation is added to store so navigation works
      await addConversation(conversation);
      void navigate(`/conversations/${conversation.id}`);
    } finally {
      setLoading(false);
    }
  };

  const footer = useMemo(() => {
    return (
      <Group justify="flex-end" flex={1} p="md">
        <Button variant="default" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="filled"
          disabled={loading || name.trim().length < 3}
          loading={loading}
          onClick={() => void handleCreate()}>
          Create
        </Button>
        <Tooltip
          disabled={name.trim().length >= 3}
          label={
            name.trim().length < 3
              ? "Group name must be at least 3 characters"
              : undefined
          }
          position="left">
          <div />
        </Tooltip>
      </Group>
    );
  }, [handleClose, handleCreate, loading, name]);

  return (
    <Modal
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      opened
      centered
      onClose={handleClose}
      size="90%"
      zIndex={9999}
      p="md">
      <ContentLayout
        title="Create group"
        maxHeight={contentHeight}
        footer={footer}
        withScrollAreaPadding={false}>
        <Stack gap="sm" py="md">
          {/* Live preview header */}
          <Paper
            radius="md"
            p="md"
            withBorder
            style={{ backgroundColor: 'var(--mantine-color-dark-6)' }}>
            <Group justify="space-between" align="center">
              <Group align="center" style={{ gap: 12 }}>
                <Avatar src={imageUrlSquare || undefined} size={64} radius="md">
                  {name ? name.charAt(0).toUpperCase() : "G"}
                </Avatar>
                <div>
                  <Text fw={700} size="lg">
                    {name || "New group"}
                  </Text>
                  <Text color="dimmed" size="sm">
                    {description || "Add a description for your group (optional)"}
                  </Text>
                </div>
              </Group>
              <Group style={{ gap: 8 }}>
                <Badge color="gray">{addedMembers.length} members</Badge>
                <Badge color="gray">{permissionsPolicyValue(permissionsPolicy)}</Badge>
              </Group>
            </Group>
          </Paper>

          <Divider />

          {/* Responsive grid for form sections */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 60%' }}>
              <Paper radius="md" p="sm" withBorder>
                <Accordion
                  defaultValue="metadata"
                  variant="separated"
                  px="md"
                  radius="md"
                  styles={{
                    content: { padding: 0 },
                    control: {
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    },
                  }}>
                  <Accordion.Item value="metadata">
                    <Accordion.Control>
                      <Text fw="bold">Metadata</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Metadata
                        onNameChange={setName}
                        onDescriptionChange={setDescription}
                        onImageUrlChange={setImageUrlSquare}
                      />
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Paper>
            </div>

            <div style={{ flex: '1 1 30%' }}>
              <Paper radius="md" p="sm" withBorder>
                <Accordion
                  variant="separated"
                  px="md"
                  radius="md"
                  styles={{
                    content: { padding: 0 },
                    control: {
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    },
                  }}>
                  <Accordion.Item value="members">
                    <Accordion.Control>
                      <Group justify="space-between" align="center" pr="md">
                        <Text fw="bold">Members</Text>
                        <Badge color="gray" size="lg">{addedMembers.length}</Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Members
                        addedMembers={addedMembers}
                        onMembersAdded={setAddedMembers}
                        existingMembers={[]}
                        removedMembers={[]}
                      />
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Paper>
            </div>

            <div style={{ flex: '1 1 10%' }}>
              <Paper radius="md" p="sm" withBorder>
                <Accordion
                  variant="separated"
                  px="md"
                  radius="md"
                  styles={{
                    content: { padding: 0 },
                    control: {
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    },
                  }}>
                  <Accordion.Item value="permissions">
                    <Accordion.Control>
                      <Group justify="space-between" align="center" pr="md">
                        <Text fw="bold">Permissions</Text>
                        <Badge color="gray" size="lg">{permissionsPolicyValue(permissionsPolicy)}</Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Permissions
                        onPermissionsPolicyChange={setPermissionsPolicy}
                        onPolicySetChange={setPolicySet}
                      />
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Paper>
            </div>
          </div>
        </Stack>
      </ContentLayout>
    </Modal>
  );
};
