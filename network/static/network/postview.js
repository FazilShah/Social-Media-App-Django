document.addEventListener('DOMContentLoaded', () => {
    id = window.location.href.split("/")[4]
    get_post(id);
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
