from django.contrib.contenttypes.models import ContentType
from django.db.models import Count, Q, Sum, Case, When, BooleanField
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
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

    def get_queryset(self):
        queryset = super(PostViewSet, self).get_queryset()
        queryset = queryset.annotate(does_like=Case(When(likes__author=self.request.user, then=True), default=False, output_field=BooleanField()))
        return queryset

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
    @csrf_exempt
    def new(self, request):
        data = request.POST

        print(data)
        print(request.FILES)

        image = request.FILES[0]
        # text = data.get('text', '')
        #
        with open('/tmp/img.png', 'wb') as O:
            O.write(decodebytes(bytes(image + '========', encoding='utf-8')))
            print(decodebytes(bytes(image[22:] + '========', encoding='ascii')))

        # image = data.get('image', '')
        # text = data.get('text', '')
        #
        # with open('/tmp/img.png', 'wb') as O:
        #     O.write(decodebytes(bytes(image + '========', encoding='utf-8')))
        #     print(decodebytes(bytes(image[22:] + '========', encoding='ascii')))

        return Response()

@csrf_exempt
def new_post(request):
    data = request.POST

    print(data)
    print(request.FILES)

    image = request.FILES[0]
    # text = data.get('text', '')
    #
    with open('/tmp/img.png', 'wb') as O:
        O.write(decodebytes(bytes(image + '========', encoding='utf-8')))
        print(decodebytes(bytes(image[22:] + '========', encoding='ascii')))

    return HttpResponse('ok')
