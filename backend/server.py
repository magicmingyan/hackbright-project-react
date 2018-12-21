from jinja2 import StrictUndefined
from flask import Flask, render_template, jsonify, request, session
from flask_cors import CORS, cross_origin
from flask_debugtoolbar import DebugToolbarExtension
from model import connect_to_db, db, User
import requests
import os

template_dir = os.path.abspath('../frontend/public')
app = Flask(__name__, template_folder=template_dir)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key = "ursusmaritimus"
app.jinja_env.undefined = StrictUndefined




def get_NYT_articles():

    parameters = {"api-key": os.environ["nytimes_api"], 
                    "section": "World",
                    "time-period": "7"
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

        # print(geo_facet)
        geo_parameters = {"api-key": os.environ["nytimes_api"], 
                    "name": geo_facet
                    }

        geo_response = requests.get(geo_request_string, params=geo_parameters)
        geo_response_dict = geo_response.json()

        if  len(geo_response_dict['results'])>0:
            article["latitude"] = geo_response_dict['results'][0]['latitude']
            article["longitude"] = geo_response_dict['results'][0]['longitude']


    return filtered_articles



#---------------------------------------------------------------------#

@app.route('/')
def index():
    """Show homepage."""

    return render_template("index.html")

@app.route('/geo.json')
def geo_info():
    """JSON information about geo."""

    return jsonify(get_NYT_articles())


@app.route('/login', methods = ['GET', 'POST'])
@cross_origin()
def login():
    if request.method == 'POST':

        data = request.get_json(silent=True)
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user:
            return "no user"
        
        if user.password != password:
            return "password incorrect"

        session["user_id"] = user.user_id
        return "logged in"

@app.route('/signup', methods = ['POST'])
@cross_origin()
def signup():
    data = request.get_json(silent=True)
    user_name = data.get('user_name')
    email = data.get('email')
    password = data.get('password')

    new_user = User(user_name=user_name, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    return "signed up"

#---------------------------------------------------------------------#



if __name__ == "__main__":
    app.debug = True
    CORS(app, resources={r"/*": {"origins": "*"}})
    connect_to_db(app)
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")
