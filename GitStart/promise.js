function wait(ms)
{
    return new Promise((resolve)=>setTimeout(resolve,ms));
}

function updateLastUserActivityTime()
{
    return wait(1000);
}

function createPost(post)
{
    return wait(2000).then(()=>{
        console.log("Post created:",post);
});
}

function deleteLastPost()
{
    return wait(1000).then(()=>{
        console.log("Last post deleted.");
    });
}

function executeTasks()
{
    const user={name:"Rohan",lastActivityTime:new Date()};
    const post={title:"New Post",body:"This is a new post."};

    createPost(post)
    .then(updateLastUserActivityTime)
    .then(()=>{
        console.log("Last user activity time updated",new Date());
        return deleteLastPost();
    })
    .then(()=>{
        console.log("New set of posts after deletion:",[]);
    })
    .catch((error)=>{
        console.log("Error:",error);
    });
}
executeTasks();