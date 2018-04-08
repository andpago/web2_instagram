from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Post
        fields = ('author', 'title', 'text', 'image')
