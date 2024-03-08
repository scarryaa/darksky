export declare class BskyAgentExtended extends BskyAgent {
    bookmark(uri: string, cid: string): Promise<{
        uri: string;
        cid: string;
    }>;
    deleteBookmark(bookmarkUri: string): Promise<void>;
}