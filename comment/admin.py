from django.contrib import admin

from comment.models import Comment


class CommentAdmin(admin.ModelAdmin):
    exclude = ('likes', 'likes_count')


admin.site.register(Comment, CommentAdmin)

