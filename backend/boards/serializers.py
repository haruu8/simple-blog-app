from rest_framework import serializers
from .models import Article, Comment


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['title', 'body_text', 'created_at', 'updated_at']

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['article', 'body_text', 'created_at', 'updated_at']
        extra_kwargs = {'article': {'read_only': True}}

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
