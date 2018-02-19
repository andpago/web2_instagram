from django.contrib import admin

from like.models import Like


class LikeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Like, LikeAdmin)