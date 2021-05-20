from django.urls import path, include
from rest_framework import routers
from .views import ArticleViewSet, CommentViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register('article', ArticleViewSet)
router.register('category', CategoryViewSet)
router.register('comment', CommentViewSet)

app_name = 'boards'

urlpatterns = [
    path('', include(router.urls)),
]
