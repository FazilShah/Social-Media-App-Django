document.addEventListener("DOMContentLoaded", ()=>{
    load_followed_posts();
    document.querySelector('#post-post').addEventListener('submit', post);
});

function load_followed_posts(){
    
    fetch('/followers')
    .then(response => response.json())
    .then(result => {
        console.log(result);
        (result).forEach(user => {
            (user.posts).forEach(post => {
                const div = document.createElement('div');
                div.style.borderStyle = 'solid';
                const name = document.createElement('a');
                name.href = `/${user.username}`;
                name.innerHTML = `${user.username}`;
                div.append(name);
                const breaky = document.createElement('br')
                div.append(breaky);
                const heading = document.createElement('a');
                heading.href = `/${user.username}/${post.id}`;
                heading.innerHTML = `${post.content}`;
                div.append(heading);
                const dat = document.createElement('p');
                dat.innerHTML = `${post.date}`;
                div.append(dat);
                const button = document.createElement('button');
                button.innerHTML = 'Like';
                button.className = "btn btn-primary";
                div.append(button);
                const lik = document.createElement('p');
                lik.innerHTML = `Likes: ${post.likes}`;
                div.append(lik);
                document.querySelector('#following-posts').append(div);
            })
        }
    ) })
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