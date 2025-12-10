from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.images.api.v2.views import ImagesAPIViewSet
from wagtail.documents.api.v2.views import DocumentsAPIViewSet
from core.views import submit_basic_form, submit_payment_form, confirm_payment
from payments.views import basic_submissions_view, payment_submissions_view

# Create API router
api_router = WagtailAPIRouter('wagtailapi')
api_router.register_endpoint('images', ImagesAPIViewSet)
api_router.register_endpoint('documents', DocumentsAPIViewSet)

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("admin/payments/basic/", basic_submissions_view, name="payments_basic_submissions"),
    path("admin/payments/payment/", payment_submissions_view, name="payments_payment_submissions"),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("api/v2/", api_router.urls),
    path("api/submit-basic-form/", submit_basic_form, name="submit_basic_form"),
    path("api/submit-payment-form/", submit_payment_form, name="submit_payment_form"),
    path("api/confirm-payment/", confirm_payment, name="confirm_payment"),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include('wagtail.urls')),
    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include('wagtail.urls')),
]
