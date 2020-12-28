
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("post", views.create_post, name = 'post'),
    path("post/<int:post_id>", views.postview, name = 'postview'),
    path('posts', views.get_posts, name = 'getposts'),
    path('user/<str:username>', views.userview, name = 'userview'),
]
