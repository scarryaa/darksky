import { AtUri } from "@atproto/api";

export const makeRecordUri = (didOrName: string, collection: string, rkey: string) => {
    const urip = new AtUri('at://host/');
    urip.host = didOrName;
    urip.collection = collection;
    urip.rkey = rkey;
    return urip.toString();
};