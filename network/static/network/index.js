document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#post-post').addEventListener('submit', post);
    get_posts();


    
    
});


function get_posts(){

    
    fetch('/posts')
    .then(response => response.json())
    .then(posts => {

        posts.forEach(post => {
            
            const div = document.createElement('div');
            div.style.borderStyle = 'solid';
            const heading = document.createElement('a');
            heading.innerHTML = `${post.author}`;
            heading.href = `/${post.author}`
            div.append(heading);
            //heading.addEventListener('click', () => get_user(post.author));
            const breaky = document.createElement('br');
            div.append(breaky);

            const contenty =document.createElement('a');
            contenty.innerHTML = `${post.content}`;
            contenty.href=`/${post.author}/${post.id}`;
            div.append(contenty);
            const datey = document.createElement('p');
            datey.innerHTML = `${post.date}`;
            div.append(datey);
            const liky = document.createElement('p');
            liky.innerHTML = `Likes: ${post.likes}`;
            div.append(liky);
            

            

            document.querySelector('#posts-view').append(div);
          

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



