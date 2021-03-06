from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
        


class User(AbstractUser):
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)


    def __str__(self):
        return self.username


    def serialize(self):
        
        return {
            "followers":self.followers,
            "following":self.following,
            "username":self.username,
            "id":self.id,
            "posts":[{
                "content":post.content,
                "date":post.dateposted.strftime("%b %#d %Y, %#I:%M %p"),
                "likes":post.likes,
                "id":post.id
            } for post in Post.objects.filter(author_id=self.id)],

            

            
        }




    
    


class Post(models.Model):
    content = models.TextField(max_length=230)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    dateposted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content[:5]

    @property
    def number_of_comments(self):
        return Comment.objects.filter(related_post = self).count()
    
    def serialize(self):
        return {
            "content":self.content,
            "id":self.id,
            "likes":self.likes,
            "author":self.author.username,
            "date":self.dateposted.strftime("%b %#d %Y, %#I:%M %p")


        }


class Comment(models.Model):
    content = models.TextField(max_length=200)
    dateposted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    related_post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def serialize(self):
        return {
            "content":self.content,
            "date":self.dateposted,
            "author":self.author,
            "post":self.related_post

            }


class Followers(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following1')
    following_user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers1')


    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id','following_user_id'], name="unique followers")
        ]

    
    def __str__(self):
        return self.user_id.username

    

    
   


    




