from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation, GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from like.models import LikableMixin

User = get_user_model()


class Comment(LikableMixin):

    author = models.ForeignKey(User, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object = GenericForeignKey(ct_field='content_type', fk_field='object_id')
    text = models.TextField(null=False)

    def __repr__(self):
        return 'Comment<object="{}", id="{}", text="{}...">'.format(repr(self.object), self.id, self.text[:10])

    def __str__(self):
        return repr(self)


class CommentableMixin(models.Model):

    comments = GenericRelation(Comment)
    comments_count = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
