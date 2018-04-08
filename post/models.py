from django.contrib.auth import get_user_model
from django.db import models

from comment.models import CommentableMixin
from like.models import LikableMixin


User = get_user_model()


class Post(LikableMixin, CommentableMixin):
    caption = models.TextField()
    image = models.ImageField(null=False, upload_to='static/media', default='static/media/boromir_bw.jpg')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_created=True)

    def __repr__(self):
        return 'Post<caption="{}">'.format(self.caption)

    def __str__(self):
        return repr(self)
