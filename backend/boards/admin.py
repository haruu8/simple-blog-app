from django.contrib import admin
from .models import Category, Article, Comment, Profile, CustomUser


admin.site.register(Category)
admin.site.register(Profile)
admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(CustomUser)
