"""instagram URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, re_path, path
from rest_framework import routers

from comment.views import CommentViewSet
from core.views import UserViewSet
from feed.views import feed
from like.views import LikeViewSet
from post.views import PostViewSet
from core.views import index

router = routers.DefaultRouter()
router.register(r'comments', CommentViewSet)
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'likes', LikeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('feed', feed),
    path('api', include(router.urls)),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('', index, name='index_page'),
    re_path('^.*/?$', index),
]
