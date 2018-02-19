from django.db.models import F
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from like.models import Like


@receiver(post_save, sender=Like)
def save_like(instance: Like, created=False, **kwargs):
    if created:
        instance.object.__class__.objects.filter(pk=instance.object_id).update(likes_count=F('likes_count') + 1)


@receiver(post_delete, sender=Like)
def delete_like(instance: Like, **kwargs):
    instance.object.__class__.objects.filter(pk=instance.object_id).update(likes_count=F('likes_count') - 1)