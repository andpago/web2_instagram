from django.db import models

from comment.models import CommentableMixin
from like.models import LikableMixin


class Post(LikableMixin, CommentableMixin):
    title = models.TextField()

