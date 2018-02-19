from django.contrib import admin

from post.models import Post


class PostAdmin(admin.ModelAdmin):
    exclude = ('likes', 'comments', 'likes_count', 'comments_count')


admin.site.register(Post, PostAdmin)