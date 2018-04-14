from django.contrib.contenttypes.models import ContentType
from rest_framework import viewsets, serializers

from post.models import Post
from post.serializers import PostSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

from comment.models import Comment
from comment.serializers import CommentSerializer


class PostViewSet(viewsets.ModelViewSet):
    author = serializers.ReadOnlyField(source='author.id')
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(methods=['get'], detail=True)
    def comments(self, request, pk):
        ctype = ContentType.objects.get(model="post")
        queryset = Comment.objects.filter(object_id=pk, content_type=ctype)
        serializer = CommentSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
