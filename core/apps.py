from django.apps import AppConfig


class UserConfig(AppConfig):
    name = 'core'

    def ready(self):
        import core.signals
