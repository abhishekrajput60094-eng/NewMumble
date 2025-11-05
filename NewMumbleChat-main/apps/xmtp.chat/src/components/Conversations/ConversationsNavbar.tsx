import React, { useCallback, useEffect, useRef } from "react";
import { ConversationsList } from "@/components/Conversations/ConversationList";
import { ConversationsMenu } from "@/components/Conversations/ConversationsMenu";
import { useConversations } from "@/hooks/useConversations";

export const ConversationsNavbar: React.FC = () => {
  const {
    sync,
    loading,
    syncing,
    conversations,
    stream,
    streamAllMessages,
    syncAll,
  } = useConversations();

  const stopConversationStreamRef = useRef<(() => void) | null>(null);
  const stopAllMessagesStreamRef = useRef<(() => void) | null>(null);

  const startStreams = useCallback(async () => {
    stopConversationStreamRef.current = await stream();
    stopAllMessagesStreamRef.current = await streamAllMessages();
  }, [stream, streamAllMessages]);

  const stopStreams = useCallback(() => {
    stopConversationStreamRef.current?.();
    stopConversationStreamRef.current = null;
    stopAllMessagesStreamRef.current?.();
    stopAllMessagesStreamRef.current = null;
  }, []);

  const handleSync = useCallback(async () => {
    stopStreams();
    await sync();
    await startStreams();
  }, [sync, startStreams, stopStreams]);

  const handleSyncAll = useCallback(async () => {
    stopStreams();
    await syncAll();
    await startStreams();
  }, [syncAll, startStreams, stopStreams]);

  useEffect(() => {
    const loadConversations = async () => {
      await sync(true);
      await startStreams();
    };
    void loadConversations();
  }, []);

  useEffect(() => {
    return () => {
      stopStreams();
    };
  }, []);

  return (
    <aside
      style={{
        width: "300px",
        minWidth: "280px",
        // marginTop: "50px",
        height: "80vh",
        display: "flex",
        // marginLeft:"20px",
        flexDirection: "column",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid #000",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#000",
            }}
          >
            Conversations
          </span>
          <span
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "2px 8px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#000",
              border: "1px solid #000",
            }}
          >
            {conversations.length}
          </span>
        </div>

        <ConversationsMenu
          loading={syncing || loading}
          onSync={() => void handleSync()}
          onSyncAll={() => void handleSyncAll()}
          disabled={syncing}
        />
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        {loading && conversations.length === 0 ? (
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#555",
              fontSize: "0.95rem",
            }}
          >
            Loading conversations...
          </div>
        ) : conversations.length === 0 ? (
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777",
              fontSize: "0.95rem",
            }}
          >
            No conversations found
          </div>
        ) : (
          <ConversationsList conversations={conversations} />
        )}
      </div>
    </aside>
  );
};
