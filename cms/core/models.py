from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.images import get_image_model_string
from wagtail.snippets.models import register_snippet
from wagtail.api import APIField
from core.blocks import ButtonBlock, NewsSlideBlock, BlogSlideBlock


@register_snippet
class MainHero(models.Model):
    title = models.CharField(
        max_length=200,
        help_text="Main hero title (e.g., 'CREATE')",
        default="CREATE"
    )
    
    hero_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Hero background image (fallback if no video)"
    )
    
    hero_video = models.FileField(
        upload_to='hero_videos/',
        null=True,
        blank=True,
        help_text="Hero background video (.mp4, .webm)"
    )
    
    hero_video_url = models.URLField(
        null=True,
        blank=True,
        help_text="Hero video URL (alternative to uploaded video file)"
    )
    
    hero_text_static = models.CharField(
        max_length=100,
        default="Something",
        help_text="Static part of subtitle (e.g., 'Something')"
    )
    
    changing_text_words = models.TextField(
        help_text="Comma-separated words for changing text animation (e.g., 'ELEGANT,STUNNING,PREMIUM,CLASSIC')",
        default="ELEGANT,STUNNING,PREMIUM,CLASSIC"
    )
    
    description = models.TextField(
        blank=True,
        help_text="Hero description text (if needed)"
    )
    
    primary_cta_text = models.CharField(
        max_length=50,
        default="Start a Project",
        help_text="Primary CTA button text"
    )
    
    primary_cta_link = models.URLField(
        blank=True,
        default="/projects",
        help_text="Primary CTA button link"
    )
    
    secondary_cta_text = models.CharField(
        max_length=50,
        blank=True,
        help_text="Secondary CTA button text (optional)"
    )
    
    secondary_cta_link = models.URLField(
        blank=True,
        help_text="Secondary CTA button link (optional)"
    )
    
    slider_type = models.CharField(
        max_length=20,
        choices=[
            ('none', 'No Slider'),
            ('news', 'News Slider'),
            ('blog', 'Blog Slider'),
        ],
        default='none',
        help_text="Choose which type of slider to display"
    )
    
    news_slider = models.ForeignKey(
        'core.NewsSlider',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Select news slider (only used if slider type is 'News Slider')"
    )
    
    blog_slider = models.ForeignKey(
        'core.BlogSlider',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Select blog slider (only used if slider type is 'Blog Slider')"
    )

    panels = [
        MultiFieldPanel([
            FieldPanel('title'),
            FieldPanel('hero_text_static'),
            FieldPanel('changing_text_words'),
            FieldPanel('description'),
        ], heading="Hero Content"),
        
        MultiFieldPanel([
            FieldPanel('hero_image'),
            FieldPanel('hero_video'),
            FieldPanel('hero_video_url'),
        ], heading="Hero Media"),
        
        MultiFieldPanel([
            FieldPanel('primary_cta_text'),
            FieldPanel('primary_cta_link'),
            FieldPanel('secondary_cta_text'),
            FieldPanel('secondary_cta_link'),
        ], heading="Call-to-Action Buttons"),
        
        MultiFieldPanel([
            FieldPanel('slider_type'),
            FieldPanel('news_slider'),
            FieldPanel('blog_slider'),
        ], heading="Hero Slider Options"),
    ]

    def __str__(self):
        return f"Hero: {self.title}"

    class Meta:
        verbose_name = "Main Hero Section"
        verbose_name_plural = "Main Hero Sections"

    @property
    def changing_words_list(self):
        """Return changing words as a list"""
        if self.changing_text_words:
            return [word.strip() for word in self.changing_text_words.split(',') if word.strip()]
        return ["ELEGANT", "STUNNING", "PREMIUM", "CLASSIC"]

    @property
    def show_blog_slider(self):
        """Backward compatibility property"""
        return self.slider_type != 'none'

    @property
    def slider_title(self):
        """Backward compatibility property"""
        if self.slider_type == 'news' and self.news_slider:
            return self.news_slider.title
        elif self.slider_type == 'blog' and self.blog_slider:
            return self.blog_slider.title
        return ""

    @property
    def active_slider(self):
        """Get the active slider based on slider_type"""
        if self.slider_type == 'news':
            return self.news_slider
        elif self.slider_type == 'blog':
            return self.blog_slider
        return None

    def get_hero_video_url(self):
        """Return hero video URL if exists (prioritize URL field over file)"""
        if self.hero_video_url:
            return self.hero_video_url
        elif self.hero_video:
            return self.hero_video.url
        return None

    @property
    def hero_image_url(self):
        """Return hero image URL if exists"""
        if self.hero_image:
            return self.hero_image.file.url
        return None

    def get_api_representation(self):
        """API representation for headless frontend"""
        return {
            'id': self.id,
            'title': self.title,
            'hero_image': {
                'url': self.hero_image_url,
                'alt': self.hero_image.title if self.hero_image else '',
            } if self.hero_image else None,
            'hero_video': {
                'url': self.get_hero_video_url()
            } if self.get_hero_video_url() else None,
            'hero_text_static': self.hero_text_static,
            'changing_text_words': self.changing_words_list,
            'description': self.description,
            'primary_cta': {
                'text': self.primary_cta_text,
                'link': self.primary_cta_link,
            },
            'secondary_cta': {
                'text': self.secondary_cta_text,
                'link': self.secondary_cta_link,
            } if self.secondary_cta_text else None,
            'show_blog_slider': self.show_blog_slider,
            'slider_title': self.slider_title,
            'slider_type': self.slider_type,
            'active_slider': self.active_slider.get_api_representation() if self.active_slider else None,
            'news_slider': self.news_slider.get_api_representation() if self.news_slider else None,
            'blog_slider': self.blog_slider.get_api_representation() if self.blog_slider else None,
        }


@register_snippet
class NewsSlider(models.Model):
    title = models.CharField(
        max_length=200,
        default="Latest News",
        help_text="Slider title"
    )
    
    slides = StreamField([
        ('news_slide', NewsSlideBlock()),
    ], blank=True, help_text="Add news slides")
    
    autoplay_delay = models.IntegerField(
        default=4200,
        help_text="Auto-play delay in milliseconds"
    )

    panels = [
        FieldPanel('title'),
        FieldPanel('slides'),
        FieldPanel('autoplay_delay'),
    ]

    def __str__(self):
        return f"News Slider: {self.title}"

    class Meta:
        verbose_name = "News Slider"
        verbose_name_plural = "News Sliders"

    def get_api_representation(self):
        """API representation for headless frontend"""
        return {
            'id': self.id,
            'title': self.title,
            'slides': [
                {
                    'id': i,
                    'title': slide.value.get('title', ''),
                    'excerpt': slide.value.get('excerpt', ''),
                    'author': slide.value.get('author', ''),
                    'link': {
                        'url': slide.value.get('link').url() if slide.value.get('link') and slide.value.get('link').is_url() else '#',
                        'is_external': slide.value.get('link').get('external_link') is not None if slide.value.get('link') else False,
                    } if slide.value.get('link') else None,
                    'date': slide.value.get('date').isoformat() if slide.value.get('date') else None,
                    'category': slide.value.get('category', ''),
                    'featured': slide.value.get('featured', False),
                } for i, slide in enumerate(self.slides)
            ],
            'settings': {
                'autoplay': True,
                'autoplay_delay': self.autoplay_delay,
                'show_navigation': False,
                'show_pagination': True,
            }
        }


@register_snippet
class BlogSlider(models.Model):
    title = models.CharField(
        max_length=200,
        default="Latest Blog Posts",
        help_text="Slider title"
    )
    
    slides = StreamField([
        ('blog_slide', BlogSlideBlock()),
    ], blank=True, help_text="Add blog slides")
    
    autoplay_delay = models.IntegerField(
        default=4200,
        help_text="Auto-play delay in milliseconds"
    )

    panels = [
        FieldPanel('title'),
        FieldPanel('slides'),
        FieldPanel('autoplay_delay'),
    ]

    def __str__(self):
        return f"Blog Slider: {self.title}"

    class Meta:
        verbose_name = "Blog Slider"
        verbose_name_plural = "Blog Sliders"

    def get_api_representation(self):
        """API representation for headless frontend"""
        return {
            'id': self.id,
            'title': self.title,
            'slides': [
                {
                    'id': i,
                    'title': slide.value.get('title', ''),
                    'excerpt': slide.value.get('excerpt', ''),
                    'tags': slide.value.get('tags', ''),
                    'read_time': slide.value.get('read_time', 0),
                    'link': {
                        'url': slide.value.get('link').url() if slide.value.get('link') and slide.value.get('link').is_url() else '#',
                        'is_external': slide.value.get('link').get('external_link') is not None if slide.value.get('link') else False,
                    } if slide.value.get('link') else None,
                    'date': slide.value.get('date').isoformat() if slide.value.get('date') else None,
                    'category': slide.value.get('category', ''),
                    'featured': slide.value.get('featured', False),
                } for i, slide in enumerate(self.slides)
            ],
            'settings': {
                'autoplay': True,
                'autoplay_delay': self.autoplay_delay,
                'show_navigation': False,
                'show_pagination': True,
            }
        }
