"use client"

import React, { useEffect, useRef, useState } from 'react'
import SideBaarMessage from '../../components/messageComponent/SideBaarMessage'
import ChatInbox from '../../components/messageComponent/ChatInbox'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { setActiveChat,sendMessage ,clearMessages,addMessage} from '@/app/slices/chatSlice';
import { disconnectSocket ,joinChat} from '@/app/slices/chatThunks';

import {connectSocket,  getSocket} from "@/app/socket/socketService";



export default function MessageContent() {

    let { token } = useSelector((store) => store.userStore);
     let user = useSelector((store) => store.userStore.loginDetails);

   
    const {  activeChat, messages,isConnected,  } = useSelector(
        (store) => store.chat
    );
   
    const dispatch = useDispatch();

    const apiBaseUrl =
        process.env.NEXT_PUBLIC_APIBASEURL;

    const searchParams = useSearchParams();

    const chatId = searchParams.get("chatId");

    const [chatIsOpen, setChatIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const messageEndRef = useRef(null);


    // =========================================
    // Scroll to bottom
    // =========================================

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };


   
    // =========================================
    // 2. Fetch user's conversations
    // =========================================

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchChats = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${apiBaseUrl}web/chat/user`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data.chats;

                setConversation(data);

                /*
                 * If backend returns:
                 *
                 * {
                 *    chats: {...}
                 * }
                 */

                if (data?.chats) {
                    const existingChat =
                        Array.isArray(data)
                            ? data.find(
                                  (chat) =>
                                      chat._id ===
                                      data.chats._id
                              )
                            : null;

                    dispatch(
                        setActiveChat(
                            existingChat || data.chats
                        )
                    );
                }
            } catch (error) {
                console.error(
                    "Error fetching conversations:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [token, dispatch, apiBaseUrl]);


    // =========================================
    // 3. Fetch selected chat messages
    // =========================================

    useEffect(() => {
        if (!chatId || !token) {
            return;
        }

        const fetchMessages = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${apiBaseUrl}web/chat/user/${chatId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;

                // console.log("Chat response:", data);

                // -------------------------------
                // Set messages in Redux
                // -------------------------------

                if (data?.chat?.messages) {
                    dispatch(
                        sendMessage(
                            data.chat.messages
                        )
                    );
                } else {
                    dispatch(sendMessage([]));
                }

                // -------------------------------
                // Set active chat
                // -------------------------------

                if (data?.chat) {
                    dispatch(
                        setActiveChat(data.chat)
                    );
                }

                // -------------------------------
                // Join socket room
                // -------------------------------

                dispatch(joinChat(chatId));
            } catch (error) {
                console.error(
                    "Error fetching chat:",
                    error
                );

                dispatch(sendMessage([]));
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [
        chatId,
        token,
        dispatch,
        apiBaseUrl,
    ]);




    // =========================================
// 4. Listen for incoming socket messages
// =========================================
useEffect(() => {
    if (!apiBaseUrl) return;

    const socket = connectSocket(apiBaseUrl);

    console.log("🔌 SOCKET:", socket);
    console.log("🔌 CONNECTED:", socket?.connected);

    if (!socket) return;

    const handleReceiveMessage = (data) => {
       // console.log("📩 RECEIVED SOCKET MESSAGE:", data);

        if (!data) return;

       // console.log("Current chatId:", chatId);
       // console.log("Received chatId:", data?.chatId);

        if (data?.chatId === chatId) {
            console.log("✅ MESSAGE MATCHED");

            dispatch(addMessage(data));
        }
    };

    socket.on(
        "receiveMessage",
        handleReceiveMessage
    );

    return () => {
        socket.off(
            "receiveMessage",
            handleReceiveMessage
        );
    };

}, [apiBaseUrl, chatId, dispatch]);


    // =========================================
    // 4. Scroll whenever messages change
    // =========================================

    useEffect(() => {
        if (!messages?.length) {
            return;
        }

        const timer = setTimeout(() => {
            scrollToBottom();
        }, 100);

        return () => clearTimeout(timer);
    }, [messages]);


    // =========================================
    // 5. Scroll whenever active chat changes
    // =========================================

    useEffect(() => {
        if (!activeChat) {
            return;
        }

        const timer = setTimeout(() => {
            scrollToBottom();
        }, 100);

        return () => clearTimeout(timer);
    }, [activeChat]);

//console.log(activeChat)
  // =========================================
    // send messages
    // =========================================
    
 let handleSendMessage = async (event)=>{
    event.preventDefault()
    
   // if(!newMessage.trim() || !activeChat ) return

     let tokenToSend = newMessage;
    //setNewMessage('')

    try {
        
        let res = await axios.post(`${apiBaseUrl}web/chat/send`,{
            text : event.target.text.value,
            chatId : chatId
        },
             {
             headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

        if(res.data.newMessage){
            setNewMessage(
                chatId,
                tokenToSend,
                res.data.newMessage._id,
                res.data.newMessage.createdAt)
        }
        scrollToBottom()
    }
    catch (error) {
        console.log('Error Sending Messages',error)
    }
 } 


    // delet a message form chat
    //  let handleChatDelete = async (event,delChatId)=>{
    //     event.stopPropagation()
    //     if(!window.confirm("Are your Sure Your Want To Delete This Conversation?"))
    //         return;
    //     try {
    //        axios.delete(`${apiBaseUrl}web/chat/delete/${delChatId}`,{
    //          headers: {  Authorization: `Bearer ${token}`,  }, }
    //          )  
    //             setConversation((prev)=> prev.filter((c)=> c._id !== delChatId))
    //          if(chatId === delChatId )  setActiveChat(null) 
    //     }
        
    //     catch (error) {
    //         console.log("error deleting chat",error)
    //     }

    //  }


    // get chat partner
   let getChatPartner=(chat) => {
    return user._id === chat.buyer._id ? chat.seller : chat.buyer;
   }



     //delte a chat
 let handlMessageDelete = async (delChatId,messageId)=>{
        event.stopPropagation()
        if(!window.confirm("Are your Sure Your Want To Delete This Message?"))
            return;
        try {
         let res = await  axios.delete(`${apiBaseUrl}web/chat/delete/${delChatId}`,{
             headers: {  Authorization: `Bearer ${token}`,  }, }
             )  
                setConversation((prev)=> prev.filter((c)=> c._id !== delChatId))
             if(chatId === delChatId )  setActiveChat(null) 
        }
        
        catch (error) {
            console.log("error deleting chat",error)
        }

     }





    // =========================================
    // Render
    // =========================================

    return (
        <>
            <section className='h-[90vh] w-full grid lg:grid-cols-[28%_auto] md:grid-cols-[36%_auto] grid-cols-1 '>

                <div className={`h-full overflow-auto scrollbar-hide relative top-0
                    ${chatIsOpen ? 'md:block hidden' : ' block'}
                    `}>
                    <SideBaarMessage conversation={conversation} setActiveChat={setActiveChat}
                        setChatIsOpen={setChatIsOpen} getChatPartner={getChatPartner}
                    />
                </div>
                <div className={`w-full  h-full overflow-auto scrollbar-hide md:relative fixed ${chatIsOpen ? 'block' : 'md:block hidden'} `}>
                    <ChatInbox setChatIsOpen={setChatIsOpen} handleSendMessage={handleSendMessage} />
                </div>

            </section>
        </>
    )
}
