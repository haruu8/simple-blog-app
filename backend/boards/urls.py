from django.urls import path, include
from rest_framework import routers
from .views import ArticleViewSet, CommentViewSet, CategoryViewSet, CreateUserView, ListUserView, LoginUserView, ProfileViewSet

router = routers.DefaultRouter()
router.register('article', ArticleViewSet)
router.register('category', CategoryViewSet)
router.register('comment', CommentViewSet)
router.register('profile', ProfileViewSet)

app_name = 'boards'

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create'),
    path('users/', ListUserView.as_view(), name='users'),
    path('loginuser/', LoginUserView.as_view(), name='loginuser'),
    path('', include(router.urls)),
]
