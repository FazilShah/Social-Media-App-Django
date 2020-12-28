from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import json
from .models import User, Post
import datetime
from django.views.decorators.csrf import csrf_exempt



def index(request):
    posts = Post.objects.all()
    return render(request, "network/index.html")


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

    
    
