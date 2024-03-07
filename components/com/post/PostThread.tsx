import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Post from "./Post";
import PostDetail from "./PostDetail";
import { agent } from "../../../services/api";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

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

    useEffect(() => {
        const getParentPosts = async () => {
            // verify post has record
            if (AppBskyFeedPost.isRecord(post.record) && AppBskyFeedPost.validateRecord(post.record).success) {
                try {
                    const thread = await agent.getPostThread({ uri: post.uri });
                    console.log("Thread data:", thread);
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
            {currentPost && <PostDetail post={currentPost} />}
            {childPosts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </View>
    );
};

export default PostThread;
