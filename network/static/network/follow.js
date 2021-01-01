document.addEventListener("DOMContentLoaded", ()=>{
    load_followed_posts();
    document.querySelector('#post-post').addEventListener('submit', post);
    document.querySelectorAll('#pagination').forEach(function(a){

        a.onclick = function(){
            document.querySelector('#posts-view').style.display = 'none';
            document.querySelector('#posts2-view').style.display = 'none';
            
            fetch(`posts?page=${a.dataset.page}`)
            .then(response => response.json())
            .then(result => {
                result.forEach(post => {
                console.log(post);
                div = layout(post);
                document.querySelector('#following-posts2').append(div);
                

            })

            document.querySelector('#page-view').innerHTML = document.querySelector('#following-posts2').innerHTML;
            document.querySelector('#following-posts2').innerHTML = ""
        })
    }
    })
});


function layout(post){
    const div = document.createElement('div');
                div.style.borderStyle = 'solid';
                const name = document.createElement('a');
                name.href = `/${post.author}`;
                name.innerHTML = `${post.author}`;
                div.append(name);
                const breaky = document.createElement('br')
                div.append(breaky);
                const heading = document.createElement('a');
                heading.href = `/${post.author}/${post.id}`;
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
                return div;
}

function load_followed_posts(){
    document.querySelector('#following-posts').style.display = 'none';
            document.querySelector('#following-posts2').style.display = 'none';

    
    fetch('/followers')
    .then(response => response.json())
    .then(result => {
        console.log(result);
        (result).forEach(post => {
                div = layout(post);
                document.querySelector('#following-posts').append(div);
            })
            document.querySelector('#page-view').innerHTML = document.querySelector('#following-posts').innerHTML;
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