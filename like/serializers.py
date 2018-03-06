from rest_framework import serializers

from like.models import Like


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = ('author', 'object_id', 'content_type_id')
