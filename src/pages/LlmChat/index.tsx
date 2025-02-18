import React, { useEffect, useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar, ConversationHeader, InfoButton, TypingIndicator, VideoCallButton, VoiceCallButton, Sidebar } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { CloseIcon, Container } from './styled';
import Link from '../../components/Link';

const filesMock:any = [
  {
    key: 1,
    name: 'file1.pdf',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  },
  {
    key: 2,
    name: 'file2.pdf',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'
  },
  {
    key: 3,
    name: 'file3.pdf',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum'
  },  
]

const messagesMock:any = [
  {
    key: 1,
    message: 'Hello, there!'
    + '\nI can help answer your questions about attachments (files that have been attached to Updates and Impact Assessments).'
    + '\nIf you would like me to answer questions based on other Update and Impact Assessment information (such as an update description, or the Phase of an Impact Assessment), please select the "All other Update and Impact Assessment information" tab above.'
    + '\nSo, what can I help you with?',
    direction: 'incoming',
    position: 'single'
  },
]

const historyMock:any = []

const LlmChat: React.FC = () => {
  const [openRightSideBar, setOpenRightSideBar]: any = useState(false);
  const [chatMessages, setChatMessages]: any = useState(messagesMock);
  const [history, setHistory]: any = useState(historyMock);
  function handleSend(value: string) {
    const chatMessagesTemp = [...chatMessages];
    chatMessagesTemp.push({
      key: chatMessages.length + 1,
      message: value,
      direction: 'outgoing',
      position: 'single'
    });
    chatMessagesTemp.push({
      key: chatMessages.length + 2,
      message: (Math.random() + 1).toString(36).substring(7),
      direction: 'incoming',
      position: 'single',
      sources: filesMock
    });
    setChatMessages(chatMessagesTemp);
  }
  
  useEffect(() => {
    console.log(chatMessages)
  }, [chatMessages]);

  function handleNewChat() {
    const newHistory = buildHistory();
    if (newHistory.length > 0)
    {
      setHistory(newHistory);
      setChatMessages(messagesMock);
    }
  }

  function buildHistory() {
    if (chatMessages.length > 1)
    {
      const historyTemp = [...history];
      historyTemp.push({
        key: lastKey() + 1,
        title: chatMessages[chatMessages.length-1].message.slice(0, 10),
        messages: chatMessages
      })
      return historyTemp;
    }
    return [];
  }
  function lastKey() {
    if (history.length > 0)
    {
      const historyKeySorted = history.sort((a, b) => b.key - a.key);
      return historyKeySorted[0].key;
    }
    return 0;
  }

  function handleClickHistory(item: any) {
    const newHistory = buildHistory();
    console.log(item.key)
    console.log(newHistory)
    setChatMessages(messagesMock);
    const historyTemp = [...newHistory].filter(x=> x.key !== item.key);
    console.log(historyTemp)
    setHistory(historyTemp);
    setChatMessages(item.messages);
  }

  return (
    <Container>
      <MainContainer>
        <Sidebar
          position="left"
          style={ {
              maxWidth: '150px',
              height: '500px'
            } }
        >
          <>
            <p>History:</p>
            {history.map( (h: any) => 
              <div key={h.key}>
                <Link 
                  fakeLink 
                  onClick={() => {handleClickHistory(h)}}>{h.title}
                </Link>
              </div> )}
          </>
        </Sidebar>
        <ChatContainer style={ {  height: '500px', border: 'bold'} }>
          <ConversationHeader style={ {paddingBottom:'0px' }}>
            <ConversationHeader.Content>
              <div style={{ display:'flex', justifyContent: 'end'}}>
                <button type='button' style={{maxWidth:'60px'}} onClick={handleNewChat}>New Chat</button>
              </div>
            </ConversationHeader.Content>
          </ConversationHeader>
          <MessageList scrollBehavior='smooth'>
            {chatMessages.map( (m,i) => 
            <Message key={m.key} model={m}>
              {m.sources? 
                <Message.CustomContent>
                  {m.message}
                  <br/>
                  <Link 
                    fakeLink 
                    onClick={() => {setOpenRightSideBar(true)}}>View Sources
                  </Link>
                </Message.CustomContent>
              : null}
            </Message> )}
          </MessageList>
          <MessageInput placeholder='Type message here' attachButton={false} onSend={handleSend}/>
        </ChatContainer>
        {openRightSideBar? 
          <Sidebar
            position="right"
            style={ {
                maxWidth: '350px',
                height: '500px'
              } }
          >
            <>
              <div style={{ display:'flex', justifyContent: 'end'}}>
                <CloseIcon size='25' onClick={() => setOpenRightSideBar(false)} />
              </div>
              {filesMock.map( (f: any) => 
                <div key={f.key} style={{borderBottom:'groove'}}>
                  <p><b>Text: </b>{f.text}</p>
                  <Link fakeLink>{f.name}</Link>
                  <br/>
                </div>
              )}
            </>
          </Sidebar>
        : null}
      </MainContainer>
    </Container>
  );
};

export default LlmChat;
