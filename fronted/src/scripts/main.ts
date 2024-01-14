import { getPosts, formatePost } from "./getPosts.ts";
import { Post } from "./interfaces.ts";
import { sendVote } from "./sendVote.ts";
import { amIconnected } from "./amIconnected.ts";

async function loadPosts(placeId: string, max: number) {  
    const postsPlace = document.getElementById(placeId);

    if (!postsPlace) {
        throw new Error("Posts place Id is null");
    }

    const postsData = await getPosts(max);

    let postDiv: HTMLDivElement;

    postsData.forEach((post: Post) => {
        postDiv = formatePost(post);
        postsPlace.appendChild(postDiv);
    });
}

export async function vote(postId: number, voteType: number) {
    const responseData = await sendVote(postId, voteType);
    
    const voteCounter = document.getElementById(`post_${postId}`)?.querySelector(`#votes_count_${voteType}`);
    
    if (voteCounter) {
        voteCounter.textContent = responseData.votes_count;
    }
}

async function main()
{
    loadPosts("postsPlace", 30);

    const isConnected = await amIconnected();
    
    if(isConnected) {
        const loggedButtons: HTMLElement|null = document.getElementById("loggedButtons");

        if (loggedButtons != null)
        {
            loggedButtons.style.display = "block";
        }
    } else {
        const guestButtons: HTMLElement|null = document.getElementById("guestButtons");

        if (guestButtons != null)
        {
            guestButtons.style.display = "block";
        }

    }
}


main();