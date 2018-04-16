from django.contrib.contenttypes.models import ContentType
from rest_framework import viewsets, serializers

from post.models import Post
from post.serializers import PostSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

from comment.models import Comment
from comment.serializers import CommentSerializer
from base64 import decodebytes


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

    @action(methods=['post'], detail=True)
    def toggle_like(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            likes_count, does_like = post.toggleLike(author=request.user)
            return Response({
                'likes_count': likes_count,
                'does_like': does_like,
            })
        except:
            return Response({'success': False})

    @action(methods=['post'], detail=False)
    def new(self, request):
        data = request.POST

        image = data.get('image', '')
        text = data.get('text', '')

        with open('/tmp/img.png', 'wb') as O:
            O.write(decodebytes(bytes(image + '========', encoding='utf-8')))
            print(decodebytes(bytes(image[22:] + '========', encoding='ascii')))

        return Response('')
