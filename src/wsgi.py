"""
WSGI config for Anton project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

sys.path.insert(0, '/var/www/u0976945/data/DriveCoffe/src')
sys.path.insert(1, '/var/www/u0976945/data/djangoenv/lib/python3.7/site-packages')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.base')

application = get_wsgi_application()



