from django.db import models
from wagtail.models import Page
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.snippets.models import register_snippet
from core.models import MainHero


class HomePage(Page):
    hero_section = models.ForeignKey(
        MainHero,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Select hero section for the homepage"
    )

    content_panels = Page.content_panels + [
        FieldPanel('hero_section'),
    ]

    api_fields = [
        APIField('hero_section'),
        APIField('hero_section_data'),
    ]

    @property
    def hero_section_data(self):
        """Return hero data in the format expected by React frontend"""
        if not self.hero_section:
            return None
            
        hero = self.hero_section
        
        try:
            # Build changing words for the frontend
            changing_words = hero.changing_words_list
            
            return {
                'title': hero.title,
                'hero_text_static': hero.hero_text_static,
                'changing_text_words': changing_words,
                'description': hero.description,
                'hero_image': {
                    'url': hero.hero_image_url,
                    'alt': hero.hero_image.title if hero.hero_image else '',
                } if hero.hero_image else None,
                'hero_video': {
                    'url': hero.hero_video_url
                } if hero.hero_video else None,
                'primary_cta': {
                    'text': hero.primary_cta_text,
                    'link': hero.primary_cta_link,
                },
                'secondary_cta': {
                    'text': hero.secondary_cta_text,
                    'link': hero.secondary_cta_link,
                } if hero.secondary_cta_text else None,
                'show_blog_slider': hero.show_blog_slider,
                'slider_title': hero.slider_title,
            }
        except Exception as e:
            # Return fallback data if there's an error
            return {
                'title': 'CREATE',
                'hero_text_static': 'Something',
                'changing_text_words': ['ELEGANT', 'STUNNING', 'PREMIUM', 'CLASSIC'],
                'description': '',
                'primary_cta': {
                    'text': 'Start a Project',
                    'link': '/projects',
                },
                'show_blog_slider': True,
                'slider_title': 'Latest News',
            }

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        
        # Add hero data to context for traditional rendering
        context['hero_data'] = self.hero_section_data
        
        return context
