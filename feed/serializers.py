from rest_framework import serializers

from core.serializers import UserSerializer
from feed.models import Event, User
from post.models import Post
from post.serializers import PostSerializer


class EventRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, User):
            return UserSerializer(value).data
        elif isinstance(value, Post):
            return PostSerializer(value, context={'request': None}).data
        else:
            return 'unknown'


class EventSerializer(serializers.HyperlinkedModelSerializer):
    cause = EventRelatedField(read_only=True)
    author = UserSerializer()

    class Meta:
        model = Event
        fields = ('object_id', 'cause', 'author', 'created_at', 'causeType')

