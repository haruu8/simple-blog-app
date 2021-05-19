# Generated by Django 3.2 on 2021-05-19 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0003_alter_comment_article'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='status',
            field=models.CharField(choices=[('1', 'Not started'), ('2', 'On going'), ('3', 'Done')], default='1', max_length=40),
        ),
    ]
