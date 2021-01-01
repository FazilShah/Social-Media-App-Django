
document.addEventListener('DOMContentLoaded', () => {
    username = window.location.href.split("/")[3];
    get_user(username);
    document.querySelector('#post-post').addEventListener('submit', post);
})
function get_user(username){
    
    
    
    fetch(`/user/${username}`)
    .then(response => response.json())
    .then(user => {
        console.log(user);
        const div = document.createElement('div');
        const heading = document.createElement('h1');
        heading.innerHTML = `${user.username}`;
        div.append(heading);
        const followers = document.createElement('h5');
        followers.innerHTML = `Followers: ${user.followingCount}`;
        div.append(followers);
        const following = document.createElement('h5');
        following.innerHTML = `Following: ${user.followerCount}`;
        div.append(following);
        
        document.querySelector('#userview').append(div);
        

        if(user.check === true){
            document.querySelector('#follow').style.display = 'none';
        }
        else {
            document.querySelector('#follow').style.display = 'block';
            if(user.check_follow === true){
                document.querySelector('#follow').innerHTML = 'Unfollow';
                document.querySelector('#follow').addEventListener('click', () => follow(user.id, 'unfollow'));
            }
            else{
                document.querySelector('#follow').innerHTML = 'Follow';
                document.querySelector('#follow').addEventListener('click', () => follow(user.id, 'follow'));
            }
            
        }
        
        load_user_posts(user,user.posts);
        
    })

    
}

function follow(username, follow){
    fetch(`user/${username}/${follow}`, {
        method:'POST',
        body: JSON.stringify({
            "to follow": username,
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
    })
    .catch((error) => console.log(error));

    if(follow === 'follow'){
        document.querySelector('#follow').innerHTML = 'Unfollow';
    }
    else{
        document.querySelector('#follow').innerHTML = 'Follow';
    }

    
}

function load_user_posts(user,posts){

    console.log(posts)
    
    
    posts.forEach(post => {
        const div = document.createElement('div');
        div.style.borderStyle = 'solid';
        const heading = document.createElement('a');
        heading.innerHTML = `${post.content}`;
        heading.href = `/${user.username}/${post.id}`;
        div.append(heading);
        const dat = document.createElement('p');
        dat.innerHTML = `${post.date}`;
        div.append(dat);
        const lik = document.createElement('p');
        lik.innerHTML = `Likes: ${post.likes}`;
        div.append(lik);
        document.querySelector('#userposts').append(div);
    })
}


function post(event){

    event.preventDefault();

    const body = document.querySelector('#content').value;
    fetch("/post", {
        method:"POST",
        body: JSON.stringify({
            content:body,

        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
    })
    .catch((error) => console.log(error));

    document.querySelector("#content").value = "";
   


}

