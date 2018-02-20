import django
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

subscribed_signal = django.dispatch.Signal(providing_args=["subscribee", "subscriber"])
unsubscribed_signal = django.dispatch.Signal(providing_args=["unsubscribee", "unsubscriber"])


class User(AbstractUser):
    subscribed_to = models.ManyToManyField(to='User', related_name='subscribers')

    def subscribe(self, other):
        if self != other:
            self.subscribed_to.add(other)
            subscribed_signal.send(sender=self.__class__, subscriber=self, subscribee=other)

    def unsubscribe(self, other):
        self.subscribed_to.remove(other)
        unsubscribed_signal.send(sender=self.__class__, unsubscriber=self, unsubscribee=other)