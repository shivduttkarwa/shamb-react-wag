from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'
    verbose_name = 'Content Management'

    def ready(self):
        # Import signal handlers or other initialization code here if needed
        pass
