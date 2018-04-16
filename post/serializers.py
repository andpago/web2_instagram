from rest_framework import serializers

from like.models import Like
from post.models import Post


class DoesLikeField(serializers.Field):

    def to_representation(self, obj):
        return Like.objects.filter(object=obj).exists()


class PostSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Post
        fields = ('author', 'caption', 'created_at', 'image', 'likes_count')
