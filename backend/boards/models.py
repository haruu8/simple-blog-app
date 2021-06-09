from django.db import models
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model


user = get_user_model()


class Category(models.Model):
    item = models.CharField(max_length=100)

    def __str__(self):
        return self.item


def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.user_profile.id) + str(".") + str(ext)])


class Profile(models.Model):
    user_profile = models.OneToOneField(
        user, related_name='user_profile',
        on_delete=models.CASCADE
    )
    img = models.ImageField(blank=True, null=True, upload_to=upload_avatar_path)

    def __str__(self):
        return self.user_profile.username



class Article(models.Model):
    STATUS = (
        ('1', 'Not started'),
        ('2', 'On going'),
        ('3', 'Done'),
    )
    user = models.ForeignKey(user, on_delete=models.CASCADE, related_name='author')
    title = models.CharField(max_length=255)
    body_text = models.CharField(max_length=255)
    status = models.CharField(max_length=40, choices=STATUS, default='1')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE, related_name='comment_author')
    article = models.ForeignKey(
        Article,
        related_name='article_obj',
        on_delete=models.CASCADE
    )
    body_text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body_text


class CustomUserManager(UserManager):
    """
    ユーザーマネージャー。
    """
    use_in_migrations = True

    def _create_user(self, username, password, **extra_fields):
        """
        ユーザーを作成する関数

        See Also
        --------
        normalize_email : 大文字・小文字を等しく扱うメソッド
        """
        if not username:
            raise ValueError('The given username must be set')
        username = self.normalize_email(username)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password=None, email=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(username, password, **extra_fields)



class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    AbstractBaseUser を継承したカスタムユーザー。
    """
    class Meta:
        db_table = 't_custom_user'
        verbose_name = 'カスタムユーザー'
        verbose_name_plural = 'カスタムユーザー'

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    email = models.EmailField(null=False, blank=False)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)

    objects = CustomUserManager()

    REQUIRED_FIELDS = ['email']


@receiver(post_save, sender=CustomUser)
def create_profile(sender, **kwargs):
    if kwargs['created']:
        Profile.objects.get_or_create(user=kwargs['instance'])
