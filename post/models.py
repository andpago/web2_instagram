from django.db import models

from comment.models import CommentableMixin
from like.models import LikableMixin


class Post(LikableMixin, CommentableMixin):
    title = models.CharField(max_length=255)
    text = models.TextField()

    def __repr__(self):
        return 'Post<title="{}">'.format(self.title)

    def __str__(self):
        return repr(self)