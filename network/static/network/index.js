document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#post-post').addEventListener('submit', post);
    get_posts();
    document.querySelectorAll('#like').forEach(button => {
        button.addEventListener('click', () => {
            fetch(`/like/${this.dataset.id}`, {
                method:'POST',
                body: JSON.stringify({
                    "id": this.dataset.id
                })
            })
        })
    })
  
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
                document.querySelector('#posts2-view').append(div);
                

            })

            document.querySelector('#page-view').innerHTML = document.querySelector('#posts2-view').innerHTML;
            document.querySelector('#posts2-view').innerHTML = ""
        })
    }
    })

    
    
});


function layout(post){
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
            const button = document.createElement('input');
            button.value = 'Like';
            button.className = "btn btn-primary";
            button.type = 'submit'
            button.dataset.id = `${post.id}`;
            button.id = 'like';
            div.append(button);
            const liky = document.createElement('p');
            liky.innerHTML = `Likes: ${post.likes}`;
            div.append(liky);
            
            return div;

}

function get_posts(){
    document.querySelector('#posts-view').style.display = 'none';
            document.querySelector('#posts2-view').style.display = 'none';

    fetch(`posts`)
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            div = layout(post);
            document.querySelector('#posts-view').append(div);
        });
        document.querySelector('#page-view').innerHTML = document.querySelector('#posts-view').innerHTML;
        
    });
}

function like(id){
  

    fetch(`/like/${id}`, {
        method:"POST",
        body: JSON.stringify({
            'id': id,
        })


    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
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




