try:
    import urllib.request as urllib2
except ImportError:
    import urllib2
from bs4 import BeautifulSoup
import re
from model import connect_to_db, db, Article, Geo
from server import app

#---------------------------------------------------------------------#
#https://medium.freecodecamp.org/how-to-scrape-websites-with-python-and-beautifulsoup-5946935d93fe
def get_MVVoices_articles():

    quote_page = 'https://www.mv-voice.com/news/'
    page = urllib2.urlopen(quote_page)
    soup = BeautifulSoup(page, 'html.parser')

    mountainview_news = {}
    article_counter = 0

    for line in soup.findAll('span', attrs={'id': 'slider_blurb'}):
        if "abstract" not in mountainview_news:
            mountainview_news["abstract"] = [line.text]
            article_counter+=1
        else:
            mountainview_news["abstract"].append(line.text)
            article_counter+=1

    all_links = soup.findAll('a', attrs={'href': re.compile("^/news/")})

    # for a in soup.find_all('a', href=True): 
    #     if a.text: 
    #         print(a['href'])

    for tag in all_links:
        for title in tag.findAll('span', attrs={'id': 'slider_headline'}):
            if "url" not in mountainview_news:
                mountainview_news["url"] = [tag['href']]
            else:
                mountainview_news["url"].append(tag['href'])

            if "article_title" not in mountainview_news:
                mountainview_news["article_title"] = [title.text]
            else:
                mountainview_news["article_title"].append(title.text)
    print (mountainview_news)     

    if not Geo.query.filter_by(geo_facet="Mountain View").first():

        new_geo = Geo(geo_facet="Mountain View",
                        lat=37.386052,
                        longt=-122.083851,
                        country_name="United States")

        db.session.add(new_geo)


    for i in range(article_counter):
        new_article = Article(article_title=mountainview_news["article_title"][i],
                                news_source="mountainviewvoice",
                                abstract=mountainview_news['abstract'][i],
                                geo_facet="Mountain View",
                                lat=37.386052,
                                longt=-122.083851,
                                url='https://www.mv-voice.com'+mountainview_news['url'][i])

        db.session.add(new_article)

    db.session.commit()


#---------------------------------------------------------------------#

if __name__ == '__main__':
    connect_to_db(app)
    db.create_all()

    get_MVVoices_articles()


