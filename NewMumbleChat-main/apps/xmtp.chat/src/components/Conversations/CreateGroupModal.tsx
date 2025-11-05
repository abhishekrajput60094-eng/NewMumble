// import React, { useCallback, useMemo, useState } from "react";
// import { GroupPermissionsOptions } from "@xmtp/browser-sdk";
// import { useNavigate } from "react-router";
// import type { PendingMember } from "@/components/Conversation/AddMembers";
// import { Metadata } from "@/components/Conversation/Metadata";
// import { Members } from "@/components/Conversation/Members";
// import { Permissions, defaultPolicySet } from "@/components/Conversation/Permissions";
// import { Modal } from "@/components/Modal";
// import { useConversations } from "@/hooks/useConversations";
// import { useCollapsedMediaQuery } from "@/hooks/useCollapsedMediaQuery";
// import { useActions } from "@/stores/inbox/hooks";
// import { isValidEthereumAddress, isValidInboxId } from "@/helpers/strings";
// import type { PolicySet } from "@/types";

// const permissionsPolicyValue = (policy: GroupPermissionsOptions) => {
//   switch (policy) {
//     case GroupPermissionsOptions.Default:
//       return "Default";
//     case GroupPermissionsOptions.AdminOnly:
//       return "Admin only";
//     case GroupPermissionsOptions.CustomPolicy:
//       return "Custom policy";
//     default:
//       return "Default";
//   }
// };

// export const CreateGroupModal: React.FC = () => {
//   const { newGroup } = useConversations();
//   const { addConversation } = useActions();
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrlSquare, setImageUrlSquare] = useState("");
//   const [addedMembers, setAddedMembers] = useState<PendingMember[]>([]);
//   const [permissionsPolicy, setPermissionsPolicy] = useState<GroupPermissionsOptions>(
//     GroupPermissionsOptions.Default
//   );
//   const [policySet, setPolicySet] = useState<PolicySet>(defaultPolicySet);
//   const navigate = useNavigate();
//   const fullScreen = useCollapsedMediaQuery();
//   const contentHeight = fullScreen ? "auto" : "520px";

//   const handleClose = useCallback(() => {
//     void navigate(-1);
//   }, [navigate]);

//   const handleCreate = async () => {
//     setLoading(true);
//     try {
//       const addedMemberInboxIds = addedMembers
//         .filter((member) => isValidInboxId(member.inboxId))
//         .map((member) => member.inboxId);

//       const conversation = await newGroup(addedMemberInboxIds, {
//         name,
//         description,
//         imageUrlSquare,
//         permissions: permissionsPolicy,
//         customPermissionPolicySet:
//           permissionsPolicy === GroupPermissionsOptions.CustomPolicy
//             ? policySet
//             : undefined,
//       });

//       const addedMemberAddresses = addedMembers
//         .filter((member) => isValidEthereumAddress(member.address))
//         .map((member) => member.address);

//       if (addedMemberAddresses.length > 0) {
//         await conversation.addMembersByIdentifiers(
//           addedMemberAddresses.map((address) => ({
//             identifier: address.toLowerCase(),
//             identifierKind: "Ethereum",
//           }))
//         );
//       }

//       await addConversation(conversation);
//       void navigate(`/conversations/${conversation.id}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const footer = useMemo(() => {
//     return (
//       <div
//         style={{
//           padding: "20px",
//           background: "#f3f3f3",
//           borderTop: "1px solid #ccc",
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: "10px",
//         }}
//       >
//         <button
//           onClick={handleClose}
//           style={{
//             background: "#e74c3c",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             padding: "10px 18px",
//             fontWeight: 600,
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
//           onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//         >
//           Cancel
//         </button>

//         <button
//           disabled={loading || name.trim().length < 3}
//           onClick={() => void handleCreate()}
//           style={{
//             background: name.trim().length < 3 ? "#9be79b" : "#27ae60",
//             border: "none",
//             borderRadius: "8px",
//             padding: "10px 20px",
//             color: "white",
//             fontWeight: 600,
//             cursor: loading ? "wait" : "pointer",
//             opacity: loading ? 0.7 : 1,
//             transition: "all 0.3s ease",
//           }}
//           onMouseEnter={(e) => {
//             if (!loading && name.trim().length >= 3)
//               (e.currentTarget.style.transform = "translateY(-2px)");
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "translateY(0px)";
//           }}
//         >
//           {loading ? "Creating..." : "Create Group"}
//         </button>
//       </div>
//     );
//   }, [handleClose, handleCreate, loading, name]);

//   return (
//     <Modal
//       closeOnClickOutside={false}
//       closeOnEscape={false}
//       withCloseButton={false}
//       opened
//       centered
//       onClose={handleClose}
//       size="92%"
//       zIndex={9999}
//       padding={0}
//       styles={{
//         content: {
//           background: "#ffffff",
//           color: "#000",
//           border: "1px solid #ddd",
//           borderRadius: "12px",
//           overflow: "hidden",
//         },
//       }}
//     >
//       <div
//         style={{
//           maxHeight: contentHeight,
//           overflowY: "auto",
//           padding: "28px",
//           color: "#000",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             background: "#f9f9f9",
//             border: "1px solid #ddd",
//             borderRadius: "12px",
//             padding: "20px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
//             <div
//               style={{
//                 background: "#e0e0e0",
//                 borderRadius: "12px",
//                 padding: "4px",
//               }}
//             >
//               <img
//                 src={imageUrlSquare || ""}
//                 alt="Group Avatar"
//                 style={{
//                   width: "80px",
//                   height: "80px",
//                   borderRadius: "10px",
//                   objectFit: "cover",
//                   border: "2px solid #ccc",
//                 }}
//               />
//             </div>
//             <div>
//               <div
//                 style={{
//                   fontSize: "1.3rem",
//                   fontWeight: 700,
//                   color: "#000",
//                   marginBottom: "6px",
//                 }}
//               >
//                 {name || "New Group"}
//               </div>
//               <div
//                 style={{
//                   color: "#555",
//                   fontSize: "0.9rem",
//                 }}
//               >
//                 {description || "Add a description for your group"}
//               </div>
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: "8px" }}>
//             <div
//               style={{
//                 background: "#27ae60",
//                 borderRadius: "8px",
//                 padding: "6px 12px",
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: "0.85rem",
//               }}
//             >
//               {addedMembers.length} Members
//             </div>
//             <div
//               style={{
//                 background: "#eee",
//                 borderRadius: "8px",
//                 padding: "6px 12px",
//                 color: "#000",
//                 fontWeight: 600,
//                 fontSize: "0.85rem",
//               }}
//             >
//               {permissionsPolicyValue(permissionsPolicy)}
//             </div>
//           </div>
//         </div>

//         {/* Form Sections */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: fullScreen
//               ? "1fr"
//               : "repeat(auto-fit, minmax(320px, 1fr))",
//             gap: "16px",
//           }}
//         >
//           {/* Group Details */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               padding: "16px",
//             }}
//           >
//             <h3 style={{ color: "#111", fontWeight: 700, marginBottom: "8px" }}>
//               Group Details
//             </h3>
//             <Metadata
//               onNameChange={setName}
//               onDescriptionChange={setDescription}
//               onImageUrlChange={setImageUrlSquare}
//             />
//           </div>

//           {/* Members */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               padding: "16px",
//             }}
//           >
//             <h3 style={{ color: "#111", fontWeight: 700, marginBottom: "8px" }}>
//               Members ({addedMembers.length})
//             </h3>
//             <Members
//               addedMembers={addedMembers}
//               onMembersAdded={setAddedMembers}
//               existingMembers={[]}
//               removedMembers={[]}
//             />
//           </div>

//           {/* Permissions */}
//           <div
//             style={{
//               background: "#fafafa",
//               border: "1px solid #ddd",
//               borderRadius: "10px",
//               padding: "16px",
//             }}
//           >
//             <h3 style={{ color: "#111", fontWeight: 700, marginBottom: "8px" }}>
//               Permissions
//             </h3>
//             <Permissions
//               onPermissionsPolicyChange={setPermissionsPolicy}
//               onPolicySetChange={setPolicySet}
//             />
//           </div>
//         </div>
//       </div>
//       {footer}
//     </Modal>
//   );
// };




import React, { useCallback, useMemo, useState } from "react";
import { GroupPermissionsOptions } from "@xmtp/browser-sdk";
import { useNavigate } from "react-router";
import type { PendingMember } from "@/components/Conversation/AddMembers";
import { Metadata } from "@/components/Conversation/Metadata";
import { Members } from "@/components/Conversation/Members";
import { Permissions, defaultPolicySet } from "@/components/Conversation/Permissions";
import { Modal } from "@/components/Modal";
import { useConversations } from "@/hooks/useConversations";
import { useCollapsedMediaQuery } from "@/hooks/useCollapsedMediaQuery";
import { useActions } from "@/stores/inbox/hooks";
import { isValidEthereumAddress, isValidInboxId } from "@/helpers/strings";
import type { PolicySet } from "@/types";

const permissionsPolicyValue = (policy: GroupPermissionsOptions) => {
  switch (policy) {
    case GroupPermissionsOptions.Default:
      return "Default";
    case GroupPermissionsOptions.AdminOnly:
      return "Admin only";
    case GroupPermissionsOptions.CustomPolicy:
      return "Custom policy";
    default:
      return "Default";
  }
};

export const CreateGroupModal: React.FC = () => {
  const { newGroup } = useConversations();
  const { addConversation } = useActions();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrlSquare, setImageUrlSquare] = useState("");
  const [addedMembers, setAddedMembers] = useState<PendingMember[]>([]);
  const [permissionsPolicy, setPermissionsPolicy] = useState<GroupPermissionsOptions>(
    GroupPermissionsOptions.Default
  );
  const [policySet, setPolicySet] = useState<PolicySet>(defaultPolicySet);
  const navigate = useNavigate();
  const fullScreen = useCollapsedMediaQuery();
  const contentHeight = fullScreen ? "auto" : "520px";

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
          }))
        );
      }

      await addConversation(conversation);
      void navigate(`/conversations/${conversation.id}`);
    } finally {
      setLoading(false);
    }
  };

  const footer = useMemo(() => (
    <div
      style={{
        padding: "16px",
        background: "#f3f3f3",
        borderTop: "1px solid #ccc",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={handleClose}
        style={{
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "0.3s",
          flex: "1 1 auto",
          maxWidth: "150px",
        }}
      >
        Cancel
      </button>

      <button
        disabled={loading || name.trim().length < 3}
        onClick={() => void handleCreate()}
        style={{
          background: name.trim().length < 3 ? "#9be79b" : "#27ae60",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          color: "white",
          fontWeight: 600,
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.7 : 1,
          flex: "1 1 auto",
          maxWidth: "180px",
        }}
      >
        {loading ? "Creating..." : "Create Group"}
      </button>
    </div>
  ), [handleClose, handleCreate, loading, name]);

  return (
    <Modal
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      opened
      centered
      onClose={handleClose}
      size="95%"
      zIndex={9999}
      padding={0}
      styles={{
        content: {
          background: "#fff",
          color: "#000",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
          width: "100%",
          maxWidth: "1100px",
        },
      }}
    >
      <div
        style={{
          maxHeight: contentHeight,
          overflowY: "auto",
          padding: "20px",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: "1 1 300px" }}>
            <img
              src={imageUrlSquare || ""}
              alt="Group Avatar"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "10px",
                objectFit: "cover",
                border: "2px solid #ccc",
              }}
            />
            <div style={{ flex: "1" }}>
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                {name || "New Group"}
              </div>
              <div
                style={{
                  color: "#555",
                  fontSize: "0.9rem",
                  wordBreak: "break-word",
                }}
              >
                {description || "Add a description for your group"}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                background: "#27ae60",
                borderRadius: "8px",
                padding: "6px 12px",
                color: "white",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              {addedMembers.length} Members
            </div>
            <div
              style={{
                background: "#eee",
                borderRadius: "8px",
                padding: "6px 12px",
                color: "#000",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              {permissionsPolicyValue(permissionsPolicy)}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
          }}
        >
          <div style={{
            background: "#fafafa",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "16px",
          }}>
            <h3 style={{ color: "#111", fontWeight: 700, marginBottom: "8px" }}>
              Group Details
            </h3>
            <Metadata
              onNameChange={setName}
              onDescriptionChange={setDescription}
              onImageUrlChange={setImageUrlSquare}
            />
          </div>

          <div style={{
            background: "#fafafa",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "16px",
          }}>
            <h3 style={{ color: "#111", fontWeight: 700, marginBottom: "8px" }}>
              Members ({addedMembers.length})
            </h3>
            <Members
              addedMembers={addedMembers}
              onMembersAdded={setAddedMembers}
              existingMembers={[]}
              removedMembers={[]}
            />
          </div>

          <div style={{
            background: "#fafafa",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "16px",
          }}>
            <h3 style={{ color: "#111", fontWeight: 700, marginBottom: "8px" }}>
              Permissions
            </h3>
            <Permissions
              onPermissionsPolicyChange={setPermissionsPolicy}
              onPolicySetChange={setPolicySet}
            />
          </div>
        </div>
      </div>

      {footer}
    </Modal>
  );
};
