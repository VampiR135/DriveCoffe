# -*- coding:utf-8 -*-
from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import get_template


def send_email_feedback(name, email, text):
    subject = u'Форма обратной связи'
    ctx = {
        'name': name,
        'text': text,
        'email': email
    }
    template = 'email_feedback.html'
    message = get_template(template).render(ctx)
    msg = EmailMessage(subject, message, from_email=settings.EMAIL_HOST_USER, to=[settings.EMAIL_HOST_USER])
    msg.content_subtype = 'html'
    msg.send()


def send_email_response(name, email, phone_number, age, education, salary, experience, found_out):
    subject = u'Ответ на вакансию'
    ctx = {
        'name': name,
        'email': email,
        'phone_number': phone_number,
        'age': age,
        'education': education,
        'salary': salary,
        'experience': experience,
        'found_out': found_out,
    }
    template = 'email_response.html'
    message = get_template(template).render(ctx)
    msg = EmailMessage(subject, message, from_email=settings.EMAIL_HOST_USER, to=[settings.EMAIL_HOST_USER])
    msg.content_subtype = 'html'
    msg.send()
