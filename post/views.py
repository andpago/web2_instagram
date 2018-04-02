from rest_framework import viewsets, serializers

from post.models import Post
from post.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    author = serializers.ReadOnlyField(source='author.id')
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

