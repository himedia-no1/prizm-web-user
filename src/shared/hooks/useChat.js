import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useChat = (channelId) => {
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!channelId) return;

        // ✅ 새 채널 접속 시 기존 연결 정리
        if (stompClient) {
            stompClient.deactivate();
            setIsConnected(false);
        }

        // ✅ 백엔드의 WebSocket 엔드포인트
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_WS_URL}`);

        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                login: "admin",
                passcode: "1234",
            },
            reconnectDelay: 5000,
            onConnect: () => {
                setIsConnected(true);
                console.log("✅ Connected to WebSocket");

                // ✅ StompBrokerRelay(RabbitMQ) 기준 /topic 으로 구독
                client.subscribe(`/exchange/amq.topic/chatroom.${channelId}`, (message) => {
                    try {
                        const receivedMessage = JSON.parse(message.body);
                        setMessages((prev) => [...prev, receivedMessage]);
                    } catch (error) {
                        console.error("Failed to parse message body:", error);
                    }
                });
            },
            onDisconnect: () => {
                setIsConnected(false);
                console.log("❌ Disconnected from WebSocket");
            },
            onStompError: (frame) => {
                console.error("Broker reported error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
            },
        });

        client.activate();
        setStompClient(client);

        // ✅ cleanup (컴포넌트 unmount 시 연결 해제)
        return () => {
            if (client) client.deactivate();
        };
    }, [channelId]); // <- ✅ 의존성 배열에 channelId 추가

    const sendMessage = async (messageContent, sender) => {
        if (!messageContent) return;

        const waitUntilConnected = async () => {
            const maxWait = 5000;
            const start = Date.now();
            while (!stompClient?.connected && Date.now() - start < maxWait) {
                await new Promise((r) => setTimeout(r, 100));
            }
        };

        await waitUntilConnected();

        if (stompClient && stompClient.connected) {
            const message = {
                roomId: channelId,
                sender,
                content: messageContent,
            };

            stompClient.publish({
                destination: "/pub/chat.message",
                body: JSON.stringify(message),
            });
        } else {
            console.error("❌ STOMP client not connected after waiting.");
        }
    };

    return { messages, sendMessage, isConnected };
};
