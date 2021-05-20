from django.db import models


class Category(models.Model):
    item = models.CharField(max_length=100)

    def __str__(self):
        return self.item


class Article(models.Model):
    STATUS = (
        ('1', 'Not started'),
        ('2', 'On going'),
        ('3', 'Done'),
    )
    title = models.CharField(max_length=255)
    body_text = models.CharField(max_length=255)
    status = models.CharField(max_length=40, choices=STATUS, default='1')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    article = models.ForeignKey(
        Article,
        related_name='article',
        on_delete=models.CASCADE
    )
    body_text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body_text
