# -*- coding: utf-8 -*-
import csv
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt
from django.contrib.staticfiles.templatetags.staticfiles import static


def load_map(request):
    t = get_template('seoul.html')
    html = t.render()
    return HttpResponse(html)


@csrf_exempt
def load_attractions(request):
    geojson = {
        'type': 'FeatureCollection',
        'features': []
    }
    with open(static('data/locations.csv'), 'r') as csv_file:
        reader = csv.reader(csv_file, delimiter=',')
        for row in reader:
            geojson['features'].append({
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [row[0], row[1]],
                },
                'properties': row[2],
            })
    print(type(geojson))
    print(geojson)
    return JsonResponse(geojson)
