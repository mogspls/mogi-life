export type * from './auth';

export type ChatUser = {
    id: number;
    name: string;
};

export interface ChatMessage {
    id: number;
    body: string;
    created_at: string;
    user: ChatUser;
};

export type ChatboxProps = {
    user: ChatUser | null;
};