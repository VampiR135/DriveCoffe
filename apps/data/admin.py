from django.contrib import admin

from apps.data.models import FeedbackModel, ResponseVacancyModel


@admin.register(FeedbackModel)
class FeedbackAdmin(admin.ModelAdmin):
    pass


@admin.register(ResponseVacancyModel)
class ResponseVacancyAdmin(admin.ModelAdmin):
    pass
