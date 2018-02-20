from django.dispatch import receiver

from comment.models import User
from core.models import subscribed_signal, unsubscribed_signal
from feed.models import Event, EventType


@receiver(subscribed_signal, sender=User)
def on_subscribe(subscriber: User, subscribee: User, **kwargs):
    e = Event(cause=subscribee, author=subscriber, causeType=EventType.USER_SUBSCRIBED)
    e.save()


@receiver(unsubscribed_signal, sender=User)
def on_unsubscribe(unsubscriber: User, unsubscribee: User, **kwargs):
    e = Event(cause=unsubscribee, author=unsubscriber, causeType=EventType.USER_UNSUBSCRIBED)
    e.save()