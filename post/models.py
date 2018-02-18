from django.db import models

from like.models import LikableMixin


class Post(LikableMixin):
    title = models.TextField()

