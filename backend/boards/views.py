from django.shortcuts import render
from rest_framework import viewsets
from .models import Article, Comment
from .serializers import ArticleSerializer, CommentSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    """
    許したく無いものは 400 bad request を設定する？
    model view set は事前に crud とか用意されているからそこをつぶしに行かなければいけないのか
    """

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PATCH method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)