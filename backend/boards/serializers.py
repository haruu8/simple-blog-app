from rest_framework import serializers
from .models import Article, Comment, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','item']


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'body_text', 'status', 'status_name', 'category', 'category_item', 'created_at', 'updated_at']

    status_name = serializers.CharField(source='get_status_display', read_only=True)
    category_item = serializers.ReadOnlyField(source='category.item', read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['article', 'body_text', 'created_at', 'updated_at']
        extra_kwargs = {'article': {'read_only': True}}

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
