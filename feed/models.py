from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

User = get_user_model()


class EventType:

    USER_POST_CREATED = 0
    USER_POST_EDITED = 1
    USER_SUBSCRIBED = 2
    USER_UNSUBSCRIBED = 3


class Event(models.Model):

    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    cause = GenericForeignKey()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    causeType = models.IntegerField()

    def __str__(self):
        typeText = {
            0: 'post created',
            1: 'post edited',
            2: 'user subscribed',
            3: 'user unsubscribed',
        }

        return typeText.get(self.causeType, 'unknown event') + ', author_id={}, cause=(type_id={}, obj_id={})'.format(self.author_id, self.content_type, self.cause.id)