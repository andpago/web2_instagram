from rest_framework import serializers

from comment.models import Comment
from core.serializers import UserSerializer


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Comment
        fields = ('author', 'text')
