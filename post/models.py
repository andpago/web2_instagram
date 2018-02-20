from django.contrib.auth import get_user_model
from django.db import models

from comment.models import CommentableMixin
from like.models import LikableMixin


User = get_user_model()


class Post(LikableMixin, CommentableMixin):
    title = models.CharField(max_length=255)
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __repr__(self):
        return 'Post<title="{}">'.format(self.title)

    def __str__(self):
        return repr(self)