"""Load bear data into database."""

from model import Article, Geo, connect_to_db, db
from server import app
import os
from flask import Flask, render_template, jsonify, request, session
import requests

#---------------------------------------------------------------------#
def get_NYT_articles():

    parameters = {"api-key": os.environ["nytimes_api"], 
                    "section": "World",
                    "time-period": "1"
                    }

    article_request_string = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/{}/{}.json".format(parameters["section"],parameters["time-period"])
    geo_request_string = "https://api.nytimes.com/svc/semantic/v2/geocodes/query.json"

    article_response = requests.get(article_request_string, params=parameters)
    article_response_dict = article_response.json()
    articles = article_response_dict['results']

    filtered_articles = [article for article in articles if len(article["geo_facet"])>0]

    for article in filtered_articles:
        geo_facet = article["geo_facet"][0]
        geo_facet = geo_facet.split('(')[0].title()  

        geo_parameters = {"api-key": os.environ["nytimes_api"], 
                            "name": geo_facet}

        geo_response = requests.get(geo_request_string, params=geo_parameters)
        geo_response_dict = geo_response.json()
        print(geo_response_dict)

        if ('results' in geo_response_dict
                and len(geo_response_dict['results'])>0 
                and not Geo.query.filter_by(geo_facet=geo_response_dict['results'][0]['name']).first()):

            new_geo = Geo(geo_facet=geo_response_dict['results'][0]['name'],
                            lat=geo_response_dict['results'][0]['latitude'],
                            longt=geo_response_dict['results'][0]['longitude'],
                            country_name=geo_response_dict['results'][0]['country_name'])
            db.session.add(new_geo)

            if not Article.query.filter_by(article_id=article['id']).first():
                new_article = Article(article_id=article['id'],
                                        article_title=article['title'],
                                        news_source="nytimes",
                                        abstract=article['abstract'],
                                        geo_facet=geo_response_dict['results'][0]['name'],
                                        lat=geo_response_dict['results'][0]['latitude'],
                                        longt=geo_response_dict['results'][0]['longitude'],
                                        category=article['section'],
                                        url=article['url'])
                db.session.add(new_article)

    db.session.commit()


#---------------------------------------------------------------------#

if __name__ == '__main__':
    connect_to_db(app)
    db.create_all()

    get_NYT_articles()
