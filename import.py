# -*- coding: utf-8 -*-
import csv,sys,os

project_dir = '/home/illuminati-insider/djangoenv/bin/baldagame/baldagame'

sys.path.append(project_dir)
os.environ['DJANGO_SETTINGS_MODULE'] ='settings'
def unicode_csv_reader(utf8_data, dialect=csv.excel, **kwargs):
    csv_reader = csv.reader(utf8_data, dialect=dialect, **kwargs)
    for row in csv_reader:
        yield [unicode(cell, 'utf-8') for cell in row]

import django

django.setup()

from game.models import myDict

data = unicode_csv_reader(open('/home/illuminati-insider/djangoenv/bin/baldagame/game/static/word_rus.csv'))

for row in data:
    my = myDict()
    my.word = row[0].encode('utf8')
    print (row[0].encode('utf8'))
    my.save()
