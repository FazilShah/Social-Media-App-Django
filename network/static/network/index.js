document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#post-post').addEventListener('submit', post);
    get_posts();
});

function get_post(post_id){
    document.querySelector('#posts-view').style.display = 'none';
    document.querySelector('#post-detail').style.display = 'block';
    document.querySelector('#user-view').style.display = 'none';
    document.querySelector('#user-posts-view').style.display = 'none';
    fetch(`/post/${post_id}`)
    .then(response => response.json())
    .then(post => {
        const div = document.createElement('div');
        div.style.borderStyle = 'solid';
        const heading = document.createElement('h4');
        heading.innerHTML = `${post.author}`;
        div.append(heading);
        const conenty = document.createElement('p');
        conenty.innerHTML = `${post.content}`;
        div.append(conenty);
        const datey = document.createElement('p');
        datey.innerHTML = `${post.date}`;
        div.append(datey);
        const liky = document.createElement('p');
        liky.innerHTML = `Likes: ${post.likes}`
        div.append(liky);
        document.querySelector('#post-detail').innerHTML = div.innerHTML;
    })
}


function get_posts(){

    document.querySelector('#posts-view').style.display = 'block';
    document.querySelector('#post-detail').style.display = 'none';
    document.querySelector('#user-view').style.display = 'none';
    document.querySelector('#user-posts-view').style.display = 'none';
    fetch('/posts')
    .then(response => response.json())
    .then(posts => {

        posts.forEach(post => {
            
            const div = document.createElement('div');
            div.style.borderStyle = 'solid';
            const heading = document.createElement('h4');
            heading.innerHTML = `${post.author}`;
            div.append(heading);
            heading.addEventListener('click', () => get_user(post.author));
            const contenty =document.createElement('p');
            contenty.innerHTML = `${post.content}`;
            div.append(contenty);
            const datey = document.createElement('p');
            datey.innerHTML = `${post.date}`;
            div.append(datey);
            const liky = document.createElement('p');
            liky.innerHTML = `Likes: ${post.likes}`;
            div.append(liky);
            

            

            document.querySelector('#posts-view').append(div);
            contenty.addEventListener('click', () => get_post(`${post.id}`));

        });
        
    });

    

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

function get_user(username){
    document.querySelector('#posts-view').style.display = 'none';
    document.querySelector('#post-detail').style.display = 'none';
    document.querySelector('#user-view').style.display = 'block';
    document.querySelector('#user-posts-view').style.display = 'none';
    fetch(`user/${username}`)
    .then(response => response.json())
    .then(user => {
        console.log(user);
        const div = document.createElement('div');
        const heading = document.createElement('h1');
        heading.innerHTML = `${user.username}`;
        div.append(heading);
        const followers = document.createElement('h5');
        followers.innerHTML = `Followers: ${user.followers}`;
        div.append(followers);
        const following = document.createElement('h5');
        following.innerHTML = `Following: ${user.following}`;
        div.append(following);
        
        document.querySelector('#user-view').append(div);
        load_user_posts(user.posts);
        
    })

    
}

function load_user_posts(posts){
    document.querySelector('#posts-view').style.display = 'none';
    document.querySelector('#post-detail').style.display = 'block';
    document.querySelector('#user-view').style.display = 'block';
    document.querySelector('#user-posts-view').style.display = 'block';
    posts.forEach(post => {
        const div = document.createElement('div');
        div.style.borderStyle = 'solid';
        const heading = document.createElement('h5');
        heading.innerHTML = `${post.content}`;
        div.append(heading);
        const dat = document.createElement('p');
        dat.innerHTML = `${post.date}`;
        div.append(dat);
        const lik = document.createElement('p');
        lik.innerHTML = `Likes: ${post.likes}`;
        div.append(lik)
        document.querySelector('#user-posts-view').append(div);
    })
}


