from django.db.models.signals import post_save
from django.dispatch import receiver

from feed.models import Event, EventType
from post.models import Post


@receiver(post_save, sender=Post)
def on_save(instance: Post, created=False, **kwargs):
    cause_type = EventType.USER_POST_CREATED if created else EventType.USER_POST_EDITED
    e = Event(cause=instance, author=instance.author, causeType=cause_type)
    e.save()
