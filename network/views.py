from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import json
from .models import User, Post, Followers
import datetime
from django.views.decorators.csrf import csrf_exempt




def index(request):
    posts = Post.objects.all()
    current_user = User.objects.filter(username = request.user).first()
    return render(request, "network/index.html",{'usery':current_user})

def display_user(request, username):
    return render(request, 'network/userview.html')

def load_post(request, username, post_id):
    return render(request, 'network/postview.html')

def follow_view(request):
    return render(request, 'network/followlist.html')


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def get_posts(request):
    posts = Post.objects.all()
    return JsonResponse([post.serialize() for post in posts], safe=False)

@csrf_exempt
def create_post(request):

    #check if it is a post request

    if request.method!= 'POST':
        return JsonResponse({"error": "POST action required"}, status = 400)
    
    #check the submitted form data

    data = json.loads(request.body)
    content = data.get("content")
    #check if it is empty content
    
    if content == "":
        return JsonResponse({"error":"you need to say something"}, status=400)
    
    submitter = request.user

    new_content = Post(
        content=content,
        
        author= submitter
    )

    new_content.save()

    return JsonResponse({"message": "Post Successfully added!"}, status=201)


def postview(request, post_id):
    post1 = Post.objects.get(pk=post_id)
    if request.method == 'GET':
        return JsonResponse(post1.serialize())


def userview(request, username):
    user = User.objects.get(username=username)
    requesting_user = request.user
    data = user.serialize()
    if(user == requesting_user):
        check = True
    else:
        check = False
    data['check'] = check
    if request.method == 'GET':
        return JsonResponse(data)
        
    


@csrf_exempt
def follow(request, user_id, fol):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = data.get('to follow')
        Followers.objects.create(user_id = User.objects.get(pk=user_id), following_user_id = User.objects.get(pk=request.user.id))
        return JsonResponse({"message":"followed!"}, status=201)
    
    else:
        return JsonResponse({"error":"error"})


def followed_posts(request):
    data = User.objects.get(pk=request.user.id)
    followers = data.followers1.all()
    users = [User.objects.get(username=follower) for follower in followers]
    return JsonResponse([user.serialize() for user in users], safe=False)
    


    
