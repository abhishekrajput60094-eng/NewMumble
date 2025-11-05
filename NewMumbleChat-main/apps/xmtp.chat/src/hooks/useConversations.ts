// import type {
//   Conversation,
//   DecodedMessage,
//   Identifier,
//   SafeCreateGroupOptions,
// } from "@xmtp/browser-sdk";
// import { useState } from "react";
// import { useClient, type ContentTypes } from "@/contexts/XMTPContext";
// import { dateToNs } from "@/helpers/date";
// import {
//   useActions,
//   useConversations as useConversationsState,
//   useLastCreatedAt,
// } from "@/stores/inbox/hooks";

// export const useConversations = () => {
//   const client = useClient();
//   const { addConversations, addConversation, addMessage, setLastSyncedAt } =
//     useActions();
//   const conversations = useConversationsState();
//   const lastCreatedAt = useLastCreatedAt();
//   const [loading, setLoading] = useState(false);
//   const [syncing, setSyncing] = useState(false);

//   const sync = async (fromNetwork: boolean = false) => {
//     if (fromNetwork) {
//       setSyncing(true);

//       try {
//         await client.conversations.sync();
//       } finally {
//         setSyncing(false);
//       }
//     }

//     setLoading(true);

//     try {
//       const convos = await client.conversations.list({
//         createdAfterNs: lastCreatedAt,
//       });
//       await addConversations(convos);
//       setLastSyncedAt(dateToNs(new Date()));
//       return convos;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const syncAll = async () => {
//     setSyncing(true);

//     try {
//       await client.conversations.syncAll();
//     } finally {
//       setSyncing(false);
//     }
//   };

//   const getConversationById = async (conversationId: string) => {
//     setLoading(true);

//     try {
//       const conversation =
//         await client.conversations.getConversationById(conversationId);
//       return conversation;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDmByInboxId = async (inboxId: string) => {
//     setLoading(true);

//     try {
//       const dm = await client.conversations.getDmByInboxId(inboxId);
//       return dm;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getMessageById = async (messageId: string) => {
//     setLoading(true);

//     try {
//       const message = await client.conversations.getMessageById(messageId);
//       return message;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const newGroup = async (
//     inboxIds: string[],
//     options?: SafeCreateGroupOptions,
//   ) => {
//     setLoading(true);

//     try {
//       const conversation = await client.conversations.newGroup(
//         inboxIds,
//         options,
//       );
//       void addConversation(conversation);
//       return conversation;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const newGroupWithIdentifiers = async (
//     identifiers: Identifier[],
//     options?: SafeCreateGroupOptions,
//   ) => {
//     setLoading(true);

//     try {
//       const conversation = await client.conversations.newGroupWithIdentifiers(
//         identifiers,
//         options,
//       );
//       void addConversation(conversation);
//       return conversation;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const newDm = async (inboxId: string) => {
//     setLoading(true);

//     try {
//       const conversation = await client.conversations.newDm(inboxId);
//       void addConversation(conversation);
//       return conversation;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const newDmWithIdentifier = async (identifier: Identifier) => {
//     setLoading(true);

//     try {
//       const conversation =
//         await client.conversations.newDmWithIdentifier(identifier);
//       void addConversation(conversation);
//       return conversation;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stream = async () => {
//     const onValue = (conversation: Conversation<ContentTypes>) => {
//       const shouldAdd =
//         conversation.metadata?.conversationType === "dm" ||
//         conversation.metadata?.conversationType === "group";
//       if (shouldAdd) {
//         void addConversation(conversation);
//       }
//     };

//     const stream = await client.conversations.stream({
//       onValue,
//     });

//     return () => {
//       void stream.end();
//     };
//   };

//   const streamAllMessages = async () => {
//     const onValue = (message: DecodedMessage<ContentTypes>) => {
//       void addMessage(message.conversationId, message);
//     };

//     const stream = await client.conversations.streamAllMessages({
//       onValue,
//     });

//     return () => {
//       void stream.end();
//     };
//   };

//   return {
//     conversations,
//     getConversationById,
//     getDmByInboxId,
//     getMessageById,
//     loading,
//     newDm,
//     newDmWithIdentifier,
//     newGroup,
//     newGroupWithIdentifiers,
//     stream,
//     streamAllMessages,
//     sync,
//     syncAll,
//     syncing,
//   };
// };


import type {
  Conversation,
  DecodedMessage,
  Identifier,
  SafeCreateGroupOptions,
} from "@xmtp/browser-sdk";
import { useState } from "react";
import { useClient, type ContentTypes } from "@/contexts/XMTPContext";
import { dateToNs } from "@/helpers/date";
import {
  useActions,
  useConversations as useConversationsState,
  useLastCreatedAt,
} from "@/stores/inbox/hooks";

export const useConversations = () => {
  const client = useClient();
  const { addConversations, addConversation, addMessage, setLastSyncedAt } =
    useActions();
  const conversations = useConversationsState();
  const lastCreatedAt = useLastCreatedAt();

  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // ✅ Safe Sync for XMTP v3
  const sync = async () => {
    if (!client) {
      console.warn("XMTP client not ready, skipping sync");
      return [];
    }

    setLoading(true);
    try {
      const convos = await client.conversations.list({
        createdAfterNs: lastCreatedAt,
      });
      await addConversations(convos);
      setLastSyncedAt(dateToNs(new Date()));
      return convos;
    } catch (err) {
      console.error("Error syncing conversations:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // ✅ Removed syncAll – replaced with same behavior
  const syncAll = async () => {
    if (!client) return [];
    setSyncing(true);
    try {
      const convos = await client.conversations.list();
      await addConversations(convos);
      setLastSyncedAt(dateToNs(new Date()));
      return convos;
    } catch (err) {
      console.error("Error syncing all conversations:", err);
      return [];
    } finally {
      setSyncing(false);
    }
  };

  const getConversationById = async (conversationId: string) => {
    if (!client) return null;
    setLoading(true);
    try {
      return await client.conversations.getConversationById(conversationId);
    } finally {
      setLoading(false);
    }
  };

  const getDmByInboxId = async (inboxId: string) => {
    if (!client) return null;
    setLoading(true);
    try {
      return await client.conversations.getDmByInboxId(inboxId);
    } finally {
      setLoading(false);
    }
  };

  const getMessageById = async (messageId: string) => {
    if (!client) return null;
    setLoading(true);
    try {
      return await client.conversations.getMessageById(messageId);
    } finally {
      setLoading(false);
    }
  };

  const newGroup = async (
    inboxIds: string[],
    options?: SafeCreateGroupOptions
  ) => {
    if (!client) return null;
    setLoading(true);
    try {
      const conversation = await client.conversations.newGroup(inboxIds, options);
      void addConversation(conversation);
      return conversation;
    } finally {
      setLoading(false);
    }
  };

  const newGroupWithIdentifiers = async (
    identifiers: Identifier[],
    options?: SafeCreateGroupOptions
  ) => {
    if (!client) return null;
    setLoading(true);
    try {
      const conversation = await client.conversations.newGroupWithIdentifiers(
        identifiers,
        options
      );
      void addConversation(conversation);
      return conversation;
    } finally {
      setLoading(false);
    }
  };

  const newDm = async (inboxId: string) => {
    if (!client) return null;
    setLoading(true);
    try {
      const conversation = await client.conversations.newDm(inboxId);
      void addConversation(conversation);
      return conversation;
    } finally {
      setLoading(false);
    }
  };

  const newDmWithIdentifier = async (identifier: Identifier) => {
    if (!client) return null;
    setLoading(true);
    try {
      const conversation = await client.conversations.newDmWithIdentifier(identifier);
      void addConversation(conversation);
      return conversation;
    } finally {
      setLoading(false);
    }
  };

  const stream = async () => {
    if (!client) return () => {};
    const onValue = (conversation: Conversation<ContentTypes>) => {
      const shouldAdd =
        conversation.metadata?.conversationType === "dm" ||
        conversation.metadata?.conversationType === "group";
      if (shouldAdd) {
        void addConversation(conversation);
      }
    };
    const stream = await client.conversations.stream({ onValue });
    return () => void stream.end();
  };

  const streamAllMessages = async () => {
    if (!client) return () => {};
    const onValue = (message: DecodedMessage<ContentTypes>) => {
      void addMessage(message.conversationId, message);
    };
    const stream = await client.conversations.streamAllMessages({ onValue });
    return () => void stream.end();
  };

  return {
    conversations,
    getConversationById,
    getDmByInboxId,
    getMessageById,
    loading,
    newDm,
    newDmWithIdentifier,
    newGroup,
    newGroupWithIdentifiers,
    stream,
    streamAllMessages,
    sync,
    syncAll,
    syncing,
  };
};
