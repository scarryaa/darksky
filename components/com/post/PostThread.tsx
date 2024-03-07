import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Post from "./Post";
import PostDetail from "./PostDetail";
import { agent } from "../../../services/api";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import { isNative } from "../../../util/platform";

type PostThreadProps = {
    post: AppBskyFeedDefs.PostView;
};

type OutputSchema = AppBskyFeedDefs.ThreadViewPost | AppBskyFeedDefs.NotFoundPost | AppBskyFeedDefs.BlockedPost | {
    $type: string;
    [k: string]: unknown;
};

const PostThread = ({ post }: PostThreadProps) => {
    const [thread, setThread] = useState<OutputSchema>();
    const [currentPost, setCurrentPost] = useState<AppBskyFeedDefs.PostView | null>(null);
    const [posts, setPosts] = useState<AppBskyFeedDefs.PostView[]>([]);
    const [childPosts, setChildPosts] = useState<AppBskyFeedDefs.PostView[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const currentPostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getParentPosts = async () => {
            // verify post has record
            if (AppBskyFeedPost.isRecord(post.record) && AppBskyFeedPost.validateRecord(post.record).success) {
                try {
                    const thread = await agent.getPostThread({ uri: post.uri });
                    setThread(thread.data.thread);
                } catch (error) {
                    console.error("Error fetching parent posts:", error);
                }
            }
        };

        getParentPosts();
        setCurrentPost(post);
    }, [post]);

    useEffect(() => {
        if (!loading && currentPostRef.current) {
            currentPostRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [loading, currentPost]);

    useEffect(() => {
        if (thread) {
            const collectedPosts: AppBskyFeedDefs.PostView[] = [];

            const collectPosts = (thread: OutputSchema) => {
                if (AppBskyFeedDefs.isThreadViewPost(thread)) {
                    collectedPosts.push(thread.post);
                    if (AppBskyFeedDefs.isThreadViewPost(thread.parent)) {
                        collectPosts(thread.parent);
                    }
                }
            };

            collectPosts(thread);
            setPosts(collectedPosts.reverse());

            // check if thread.replies is an array
            if (Array.isArray(thread.replies)) {
                const replyPosts: AppBskyFeedDefs.PostView[] = [];

                const collectReplies = (replies: OutputSchema[]) => {
                    replies.forEach(reply => {
                        if (AppBskyFeedDefs.isThreadViewPost(reply)) {
                            replyPosts.push(reply.post);
                            if (Array.isArray(reply.replies)) {
                                collectReplies(reply.replies);
                            }
                        }
                    });
                };

                collectReplies(thread.replies);
                setChildPosts(replyPosts);
                setLoading(false);
            }
        }
    }, [thread]);

    // filter out the current post from the collected posts
    const filteredPosts = posts.filter(p => p.uri !== currentPost?.uri);

    return (
        <View>
            {filteredPosts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
            <div ref={currentPostRef}>
                {currentPost && <PostDetail style={{ borderTopWidth: filteredPosts.length > 0 ? 1 : 0 }} post={currentPost} />}
            </div>
            {childPosts.map((post, index) => (
                <Post style={{ borderBottomWidth: (index === childPosts.length - 1 || post.replyCount == 0) ? 1 : 0 }} key={index} post={post} />
            ))}
            {/* @ts-ignore web only */}
            <View style={{ height: isNative ? 600 : '100vh', }}></View>
        </View>
    );
};

export default PostThread;
