from django.db.models import F
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from comment.models import Comment


@receiver(post_save, sender=Comment)
def save_comment(instance: Comment, created=False, **kwargs):
    if created:
        instance.object.__class__.objects.filter(pk=instance.object_id).update(comments_count=F('comments_count') + 1)


@receiver(post_delete, sender=Comment)
def delete_comment(instance: Comment, **kwargs):
    if instance.object is not None:  # for cascade deletion
        instance.object.__class__.objects.filter(pk=instance.object_id).update(comments_count=F('comments_count') - 1)