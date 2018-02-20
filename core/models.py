from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    subscribed_to = models.ManyToManyField(to='User', related_name='subscribers')

    def subscribe(self, other):
        if self != other:
            self.subscribed_to.add(other)

    def unsubscribe(self, other):
        self.subscribed_to.remove(other)