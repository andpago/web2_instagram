from rest_framework import serializers

from core.serializers import UserSerializer
from feed.models import Event, User


class EventRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, User):
            return UserSerializer(value).data
        else:
            return 'unknown'


class EventSerializer(serializers.HyperlinkedModelSerializer):
    cause = EventRelatedField(read_only=True)
    author = UserSerializer()

    class Meta:
        model = Event
        fields = ('object_id', 'cause', 'author', 'created_at', 'causeType')

