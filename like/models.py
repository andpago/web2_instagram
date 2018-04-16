from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

User = get_user_model()


class AuthoredMixin(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Like(AuthoredMixin):
    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object = GenericForeignKey(ct_field='content_type', fk_field='object_id')

    def __repr__(self):
        return 'Like<object="{}", id="{}">'.format(repr(self.object), self.id)

    def __str__(self):
        return repr(self)


class LikableMixin(models.Model):

    likes = GenericRelation(Like)
    likes_count = models.PositiveIntegerField(default=0)

    def setLike(self, value, author):
        if value not in (True, False):
            return False

        try:
            like = Like.objects.get(object_id=self.id,
                                    content_type=ContentType.objects.get_for_model(type(self)),
                                    author=author)
            if value is False:
                like.delete()
                return True
            else:
                return False
        except Like.DoesNotExist:
            if value is False:
                return False
            else:
                like = Like(object=self, author=author)
                like.save()
                return True

    def toggleLike(self, author):
        likes_count = self.likes_count

        try:
            like = Like.objects.get(object_id=self.id,
                                    content_type=ContentType.objects.get_for_model(type(self)),
                                    author=author)
            like.delete()
            likes_count -= 1
            does_like = False
        except Like.DoesNotExist:
            like = Like(object=self, author=author)
            like.save()
            likes_count += 1
            does_like = True

        return likes_count, does_like

    class Meta:
        abstract = True
