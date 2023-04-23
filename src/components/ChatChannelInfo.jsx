import {
  Avatar,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';

function ChatChannelInfo({ user, channel, open, onOpenChange }) {
  const membersView = (data) => {
    if (!data || !data.members) {
      return <></>;
    }

    let view = [];
    const members = channel.membersInfo;
    const allMemberIds = channel.allMemberIds;
    for (let cid in members) {
      const m = members[cid];
      if (allMemberIds && allMemberIds[m.id]) {
        view.push(
          <WrapItem key={m.id}>
            <Tag>
              <Avatar src={m.avatar} /> &nbsp;<span>{m.name}</span>
            </Tag>
          </WrapItem>
        );
      }
    }

    return view;
  };

  return (
    <Modal isOpen={open} onClose={() => onOpenChange(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{channel?.name}</ModalHeader>
        <ModalCloseButton onClick={() => onOpenChange(false)} />
        <ModalBody>
          <Wrap>{membersView(channel)}</Wrap>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ChatChannelInfo;
