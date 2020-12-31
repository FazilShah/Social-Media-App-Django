document.addEventListener('DOMContentLoaded', () => {
    id = window.location.href.split("/")[4]
    get_post(id);
    document.querySelector('#post-post').addEventListener('submit', post);
})


function get_post(post_id){
    
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
        document.querySelector('#postdetail').innerHTML = div.innerHTML;
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