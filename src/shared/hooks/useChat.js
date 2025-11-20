import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useChat = (channelId) => {
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // Initialize messages as empty array to prevent undefined errors
    useEffect(() => {
        setMessages([]);
    }, [channelId]);

    useEffect(() => {
        if (!channelId) return;

        // 새 채널 접속 시 기존 연결 정리
        if (stompClient) {
            stompClient.deactivate();
            setIsConnected(false);
        }

        // WebSocket 엔드포인트
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_PRIZM_SERVICE_CORE_URL}/ws-stomp`);

        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                // 인증 헤더가 필요하면 여기에 추가
            },
            reconnectDelay: 5000,
            onConnect: () => {
                setIsConnected(true);
                console.log("✅ WebSocket 연결 성공");

                // 채널 토픽 구독
                client.subscribe(`/topic/channel/${channelId}`, (message) => {
                    try {
                        const receivedMessage = JSON.parse(message.body);
                        console.log("📨 메시지 수신:", receivedMessage);
                        setMessages((prev) => [...prev, receivedMessage]);
                    } catch (error) {
                        console.error("메시지 파싱 실패:", error);
                    }
                });
            },
            onDisconnect: () => {
                setIsConnected(false);
                console.log("❌ WebSocket 연결 해제");
            },
            onStompError: (frame) => {
                console.error("STOMP 에러:", frame?.headers?.message || frame);
            },
        });

        client.activate();
        setStompClient(client);

        // cleanup (컴포넌트 unmount 시 연결 해제)
        return () => {
            if (client) client.deactivate();
        };
    }, [channelId]);

    const sendMessage = async (messageContent, currentUserProfile) => {
        if (!messageContent || !messageContent.trim()) {
            console.error("메시지 내용이 비어있습니다.");
            return false;
        }

        if (!currentUserProfile || !currentUserProfile.id) {
            console.error("사용자 프로필 정보가 없습니다.");
            return false;
        }

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
                channelId: parseInt(channelId),
                workspaceUserId: currentUserProfile.id,
                contentType: 'TEXT',
                content: messageContent.trim(),
            };

            try {
                stompClient.publish({
                    destination: "/pub/chat.send",
                    body: JSON.stringify(message),
                });
                
                console.log("✅ 메시지 전송 성공:", message);
                return true;
            } catch (error) {
                console.error("❌ 메시지 전송 실패:", error);
                return false;
            }
        } else {
            console.error("❌ STOMP 클라이언트가 연결되지 않았습니다.");
            return false;
        }
    };

    return { messages, sendMessage, isConnected };
};
