from django.http import HttpResponseForbidden
from django.shortcuts import render
from rest_framework import viewsets

from feed.models import Event, EventType
from feed.serializers import EventSerializer

eventTemplates = {
    EventType.USER_POST_CREATED: 'feed/events/post_created.html',
    EventType.USER_POST_EDITED: 'feed/events/post_edited.html',
    EventType.USER_SUBSCRIBED: 'feed/events/user_subscribed.html',
    EventType.USER_UNSUBSCRIBED: 'feed/events/user_unsubscribed.html',
}


def feed(request, start=0, end=10):
    if request.user.is_authenticated:
        context = {'events': {
            event: eventTemplates[event.causeType]
            for event in sorted(Event.objects.filter(author__in=request.user.subscribed_to.all())[start:end], key=lambda event: event.created_at, reverse=True)
        }}
        return render(request, 'feed/feed.html', context=context)
    else:
        return HttpResponseForbidden("not authenticated")


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
