from django.db import models
from wagtail.models import Page
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.snippets.models import register_snippet
from wagtail.fields import StreamField
from core.models import MainHero
from core.blocks import (
    # Basic Content Blocks
    HeadingBlock,
    ContentBlock,
    LeadBlock,
    QuoteBlock,
    
    # Media Blocks
    ResponsiveImageBlock,
    FullwidthImageBlock,
    VideoBlock,
    ImageGalleryBlock,
    
    # Layout Blocks
    TwoColumnBlock,
    ContentWithImageBlock,
    ContentWithVariableWidthBlock,
    AccordionBlock,
    
    # Card & Grid Blocks
    CardGridBlock,
    
    # CTA & Button Blocks
    CTAButtonBlock,
    ButtonBlock,
    MultipleButtonsBlock,
    
    # Specialized Blocks
    EssenceSectionBlock,
    GsapTextVideoBlock,
    
    # Utility Blocks
    SpaceBlock,
    DividerBlock,
)


class HomePage(Page):
    hero_section = models.ForeignKey(
        MainHero,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Select hero section for the homepage"
    )
    
    body_content = StreamField([
        ('heading', HeadingBlock()),
        ('content', ContentBlock()),
        ('lead', LeadBlock()),
        ('quote', QuoteBlock()),
        
        ('image', ResponsiveImageBlock()),
        ('fullwidth_image', FullwidthImageBlock()),
        ('video', VideoBlock()),
        ('image_gallery', ImageGalleryBlock()),
        
        ('two_column', TwoColumnBlock()),
        ('content_with_image', ContentWithImageBlock()),
        ('content_variable_width', ContentWithVariableWidthBlock()),
        ('accordion', AccordionBlock()),
        
        ('card_grid', CardGridBlock()),
        
        ('cta_button', CTAButtonBlock()),
        ('button', ButtonBlock()),
        ('multiple_buttons', MultipleButtonsBlock()),
        
        ('essence_section', EssenceSectionBlock()),
        ('gsap_text_video', GsapTextVideoBlock()),
        
        ('space', SpaceBlock()),
        ('divider', DividerBlock()),
    ], null=True, blank=True, use_json_field=True, help_text="Page content sections - build your entire home page with these blocks")

    content_panels = Page.content_panels + [
        FieldPanel('hero_section'),
        FieldPanel('body_content'),
    ]

    api_fields = [
        APIField('hero_section'),
        APIField('hero_section_data'),
        APIField('body_content_data'),
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
                    'url': hero.get_hero_video_url()
                } if hero.get_hero_video_url() else None,
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
                'slider_type': hero.slider_type,
                'active_slider': hero.active_slider.get_api_representation() if hero.active_slider else None,
                'news_slider': hero.news_slider.get_api_representation() if hero.news_slider else None,
                'blog_slider': hero.blog_slider.get_api_representation() if hero.blog_slider else None,
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
                'slider_type': 'none',
                'active_slider': None,
                'news_slider': None,
                'blog_slider': None,
            }

    @property
    def body_content_data(self):
        """Return body content data in the format expected by React frontend"""
        if not self.body_content:
            return []
            
        content_blocks = []
        for block in self.body_content:
            block_type = block.block_type
            block_value = block.value
            
            if block_type == 'essence_section':
                block_data = {
                    'id': block.id,
                    'type': 'essence_section',
                    'value': {
                        'title': block_value.get('title', ''),
                        'description': block_value.get('description', ''),
                        'cta_text': block_value.get('cta_text', ''),
                        'cta_href': block_value['cta_link'].url() if block_value.get('cta_link') and block_value['cta_link'].is_url() else '#',
                        'image': {
                            'src': f"http://127.0.0.1:8000{block_value['image'].file.url}" if block_value.get('image') else '',
                            'alt': block_value['image'].title if block_value.get('image') else '',
                        } if block_value.get('image') else None,
                    }
                }
                
            elif block_type == 'gsap_text_video':
                block_data = {
                    'id': block.id,
                    'type': 'gsap_text_video',
                    'value': {
                        'left_text': block_value.get('left_text', 'Latest'),
                        'right_text': block_value.get('right_text', 'Project'),
                        'video_src': f"http://127.0.0.1:8000{block_value.get('video_url', '')}" if block_value.get('video_url', '').startswith('/') else block_value.get('video_url', ''),
                        'background_color': block_value.get('background_color', 'var(--light-bg)'),
                        'bottom_left_text': block_value.get('bottom_left_text', 'CREATIVE'),
                        'bottom_right_text': block_value.get('bottom_right_text', 'DIGITAL'),
                    }
                }
                
            elif block_type == 'content_with_image':
                block_data = {
                    'id': block.id,
                    'type': 'content_with_image',
                    'value': {
                        'image': {
                            'url': block_value['image'].file.url if block_value.get('image') else '',
                            'alt': block_value['image'].title if block_value.get('image') else '',
                        } if block_value.get('image') else None,
                        'alignment': block_value.get('alignment', 'left'),
                        'content': self._serialize_content_stream(block_value.get('content', [])),
                        'background': block_value.get('background', ''),
                        'top_padding': block_value.get('top_padding', ''),
                        'bottom_padding': block_value.get('bottom_padding', ''),
                        'css_class': block_value.get('css_class', ''),
                    }
                }
                
            elif block_type == 'cta_button':
                block_data = {
                    'id': block.id,
                    'type': 'cta_button',
                    'value': {
                        'title': block_value.get('title', ''),
                        'text': block_value.get('text', ''),
                        'button': {
                            'text': block_value.get('button', {}).get('text', ''),
                            'href': block_value.get('button', {}).get('href', {}).url() if block_value.get('button', {}).get('href') else '#',
                            'theme': block_value.get('button', {}).get('theme', 'btn-primary'),
                        },
                        'background': block_value.get('background', 'bg-accent'),
                    }
                }
                
            elif block_type == 'card_grid':
                block_data = {
                    'id': block.id,
                    'type': 'card_grid',
                    'value': {
                        'title': block_value.get('title', ''),
                        'cards': [
                            {
                                'title': card.get('title', ''),
                                'text': card.get('text', ''),
                                'image': {
                                    'url': card['image'].file.url if card.get('image') else '',
                                    'alt': card['image'].title if card.get('image') else '',
                                } if card.get('image') else None,
                                'link': card['link'].url() if card.get('link') and card['link'].is_url() else '#',
                            }
                            for card in block_value.get('cards', [])
                        ],
                        'columns': block_value.get('columns', '3'),
                        'top_padding': block_value.get('top_padding', ''),
                        'bottom_padding': block_value.get('bottom_padding', ''),
                    }
                }
                
            elif block_type == 'heading':
                block_data = {
                    'id': block.id,
                    'type': 'heading',
                    'value': {
                        'heading': str(block_value.get('heading', '')),
                        'alignment': block_value.get('alignment', 'left'),
                        'css_class': block_value.get('css_class', ''),
                    }
                }
                
            elif block_type == 'content':
                block_data = {
                    'id': block.id,
                    'type': 'content',
                    'value': {
                        'content': str(block_value.get('content', '')),
                        'list_style': block_value.get('list_style', 'default'),
                        'css_class': block_value.get('css_class', ''),
                    }
                }
                
            elif block_type == 'lead':
                block_data = {
                    'id': block.id,
                    'type': 'lead',
                    'value': {
                        'content': str(block_value.get('content', '')),
                        'alignment': block_value.get('alignment', 'left'),
                        'css_class': block_value.get('css_class', ''),
                    }
                }
                
            elif block_type == 'quote':
                block_data = {
                    'id': block.id,
                    'type': 'quote',
                    'value': {
                        'quote': str(block_value.get('quote', '')),
                        'author': block_value.get('author', ''),
                        'position': block_value.get('position', ''),
                    }
                }
                
            elif block_type == 'image':
                block_data = {
                    'id': block.id,
                    'type': 'image',
                    'value': {
                        'image': {
                            'url': block_value['image'].file.url if block_value.get('image') else '',
                            'alt': block_value.get('alt_text', '') or (block_value['image'].title if block_value.get('image') else ''),
                        } if block_value.get('image') else None,
                        'caption': block_value.get('caption', ''),
                        'attribution': block_value.get('attribution', ''),
                    }
                }
                
            elif block_type == 'fullwidth_image':
                block_data = {
                    'id': block.id,
                    'type': 'fullwidth_image',
                    'value': {
                        'image': {
                            'url': block_value['image'].file.url if block_value.get('image') else '',
                            'alt': block_value.get('alt_text', '') or (block_value['image'].title if block_value.get('image') else ''),
                        } if block_value.get('image') else None,
                        'caption': block_value.get('caption', ''),
                    }
                }
                
            elif block_type == 'video':
                block_data = {
                    'id': block.id,
                    'type': 'video',
                    'value': {
                        'video_url': block_value.get('video_url', ''),
                        'poster_image': {
                            'url': block_value['poster_image'].file.url if block_value.get('poster_image') else '',
                            'alt': block_value['poster_image'].title if block_value.get('poster_image') else '',
                        } if block_value.get('poster_image') else None,
                        'is_autoplay': block_value.get('is_autoplay', False),
                        'caption': block_value.get('caption', ''),
                        'video_type': block_value.video_type() if hasattr(block_value, 'video_type') else 'unknown',
                    }
                }
                
            elif block_type == 'image_gallery':
                block_data = {
                    'id': block.id,
                    'type': 'image_gallery',
                    'value': {
                        'title': block_value.get('title', ''),
                        'images': [
                            {
                                'url': img['image'].file.url if img.get('image') else '',
                                'alt': img.get('image', {}).title if img.get('image') else '',
                                'caption': img.get('caption', ''),
                            }
                            for img in block_value.get('images', [])
                        ],
                        'layout': block_value.get('layout', 'slider'),
                    }
                }
                
            elif block_type == 'two_column':
                block_data = {
                    'id': block.id,
                    'type': 'two_column',
                    'value': {
                        'top_padding': block_value.get('top_padding', ''),
                        'bottom_padding': block_value.get('bottom_padding', ''),
                        'background': block_value.get('background', ''),
                        'left_column': {
                            'width': block_value.get('left_column_width', 'col-lg-6'),
                            'offset': block_value.get('left_column_offset', ''),
                            'content': self._serialize_content_stream(block_value.get('left_column', [])),
                        },
                        'right_column': {
                            'width': block_value.get('right_column_width', 'col-lg-6'),
                            'offset': block_value.get('right_column_offset', ''),
                            'content': self._serialize_content_stream(block_value.get('right_column', [])),
                        },
                        'css_class': block_value.get('css_class', ''),
                    }
                }
                
            elif block_type == 'content_variable_width':
                block_data = {
                    'id': block.id,
                    'type': 'content_variable_width',
                    'value': {
                        'top_padding': block_value.get('top_padding', ''),
                        'bottom_padding': block_value.get('bottom_padding', ''),
                        'column_width': block_value.get('column_width', 'col-lg-12'),
                        'column_offset': block_value.get('column_offset', ''),
                        'background': block_value.get('background', ''),
                        'content': self._serialize_content_stream(block_value.get('content_blocks', [])),
                        'css_class': block_value.get('css_class', ''),
                    }
                }
                
            elif block_type == 'accordion':
                block_data = {
                    'id': block.id,
                    'type': 'accordion',
                    'value': {
                        'items': [
                            {
                                'title': item.get('title', ''),
                                'content': self._serialize_content_stream(item.get('content', [])),
                            }
                            for item in block_value.get('items', [])
                        ],
                    }
                }
                
            elif block_type == 'button':
                block_data = {
                    'id': block.id,
                    'type': 'button',
                    'value': {
                        'text': block_value.get('text', ''),
                        'href': block_value.get('href', {}).url() if block_value.get('href') and block_value.get('href').is_url() else '#',
                        'theme': block_value.get('theme', 'btn-primary'),
                        'size': block_value.get('size', 'btn-md'),
                    }
                }
                
            elif block_type == 'multiple_buttons':
                block_data = {
                    'id': block.id,
                    'type': 'multiple_buttons',
                    'value': {
                        'buttons': [
                            {
                                'text': btn.get('text', ''),
                                'href': btn.get('href', {}).url() if btn.get('href') and btn.get('href').is_url() else '#',
                                'theme': btn.get('theme', 'btn-primary'),
                                'size': btn.get('size', 'btn-md'),
                            }
                            for btn in block_value.get('buttons', [])
                        ],
                        'alignment': block_value.get('alignment', 'left'),
                    }
                }
                
            elif block_type == 'space':
                block_data = {
                    'id': block.id,
                    'type': 'space',
                    'value': {
                        'height': block_value.get('height', 50),
                    }
                }
                
            elif block_type == 'divider':
                block_data = {
                    'id': block.id,
                    'type': 'divider',
                    'value': {
                        'style': block_value.get('style', 'solid'),
                    }
                }
            
            else:
                # Handle unknown block types
                block_data = {
                    'id': block.id,
                    'type': block_type,
                    'value': block_value,
                }
            
            content_blocks.append(block_data)
        
        return content_blocks
    
    def _serialize_content_stream(self, content_stream):
        """Serialize nested content stream blocks"""
        serialized_content = []
        for content_block in content_stream:
            content_type = content_block.block_type
            content_value = content_block.value
            
            if content_type == 'heading':
                serialized_content.append({
                    'type': 'heading',
                    'value': {
                        'heading': str(content_value.get('heading', '')),
                        'alignment': content_value.get('alignment', 'left'),
                        'css_class': content_value.get('css_class', ''),
                    }
                })
            elif content_type == 'content':
                serialized_content.append({
                    'type': 'content',
                    'value': {
                        'content': str(content_value.get('content', '')),
                        'list_style': content_value.get('list_style', 'default'),
                        'css_class': content_value.get('css_class', ''),
                    }
                })
            elif content_type == 'lead':
                serialized_content.append({
                    'type': 'lead',
                    'value': {
                        'content': str(content_value.get('content', '')),
                        'alignment': content_value.get('alignment', 'left'),
                        'css_class': content_value.get('css_class', ''),
                    }
                })
            elif content_type == 'quote':
                serialized_content.append({
                    'type': 'quote',
                    'value': {
                        'quote': str(content_value.get('quote', '')),
                        'author': content_value.get('author', ''),
                        'position': content_value.get('position', ''),
                    }
                })
            elif content_type == 'button':
                serialized_content.append({
                    'type': 'button',
                    'value': {
                        'text': content_value.get('text', ''),
                        'href': content_value.get('href', {}).url() if content_value.get('href') and content_value.get('href').is_url() else '#',
                        'theme': content_value.get('theme', 'btn-primary'),
                        'size': content_value.get('size', 'btn-md'),
                    }
                })
            elif content_type == 'multiple_buttons':
                serialized_content.append({
                    'type': 'multiple_buttons',
                    'value': {
                        'buttons': [
                            {
                                'text': btn.get('text', ''),
                                'href': btn.get('href', {}).url() if btn.get('href') and btn.get('href').is_url() else '#',
                                'theme': btn.get('theme', 'btn-primary'),
                                'size': btn.get('size', 'btn-md'),
                            }
                            for btn in content_value.get('buttons', [])
                        ],
                        'alignment': content_value.get('alignment', 'left'),
                    }
                })
            elif content_type == 'image':
                serialized_content.append({
                    'type': 'image',
                    'value': {
                        'image': {
                            'url': content_value['image'].file.url if content_value.get('image') else '',
                            'alt': content_value.get('alt_text', '') or (content_value['image'].title if content_value.get('image') else ''),
                        } if content_value.get('image') else None,
                        'caption': content_value.get('caption', ''),
                        'attribution': content_value.get('attribution', ''),
                    }
                })
            elif content_type == 'video':
                serialized_content.append({
                    'type': 'video',
                    'value': {
                        'video_url': content_value.get('video_url', ''),
                        'poster_image': {
                            'url': content_value['poster_image'].file.url if content_value.get('poster_image') else '',
                            'alt': content_value['poster_image'].title if content_value.get('poster_image') else '',
                        } if content_value.get('poster_image') else None,
                        'is_autoplay': content_value.get('is_autoplay', False),
                        'caption': content_value.get('caption', ''),
                        'video_type': content_value.video_type() if hasattr(content_value, 'video_type') else 'unknown',
                    }
                })
            elif content_type == 'space':
                serialized_content.append({
                    'type': 'space',
                    'value': {
                        'height': content_value.get('height', 50),
                    }
                })
            elif content_type == 'divider':
                serialized_content.append({
                    'type': 'divider',
                    'value': {
                        'style': content_value.get('style', 'solid'),
                    }
                })
        
        return serialized_content

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        
        # Add hero data to context for traditional rendering
        context['hero_data'] = self.hero_section_data
        
        return context
