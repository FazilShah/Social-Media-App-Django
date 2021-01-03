
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("post", views.create_post, name = 'post'),

    #API Calls
    path("post/<int:post_id>", views.postview, name = 'postview'),
    path('posts', views.get_posts, name = 'getposts'),
    path('user/<str:username>', views.userview, name = 'userview'),
    path('user/<int:user_id>/<str:fol>', views.follow, name = 'follow'),
    path('followers', views.followed_posts, name='followers'),
    path('<str:username>', views.display_user, name = 'display_user'),
    path('<str:username>/<int:post_id>', views.load_post, name='load_post'),
    path('following/', views.follow_view, name='following'),
    path('like/<int:post_id>', views.likepost, name='like'),
    path('likepost/<int:post_id>', views.likepost,name='like')
    
]
