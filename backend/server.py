from jinja2 import StrictUndefined
from flask import Flask, render_template, jsonify, request, session
from flask_cors import CORS, cross_origin
from flask_debugtoolbar import DebugToolbarExtension
from model import connect_to_db, db, User, Reading_event, Article
import requests
import os
import time
import calendar

template_dir = os.path.abspath('../frontend/public')
app = Flask(__name__, template_folder=template_dir)
# CORS(app)
# CORS(app, resources={r"/*": {"origins": "*"}})
cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})
app.secret_key = "ursusmaritimus"



#---------------------------------------------------------------------#

@app.route('/')
def index():
    """Show homepage."""

    return render_template("index.html")

@app.route('/geo.json')
def geo_info():
    """JSON information about geo."""

    # return jsonify(get_NYT_articles())
    all_articles = {}
    articles = Article.query.all()
    for article in articles:
        all_articles[article.article_id] = {"title":article.article_title, 
                                            "abstract":article.abstract,
                                            "latitude":article.lat,
                                            "longitude":article.longt,
                                            "id":article.article_id}
    # return jsonify(get_NYT_articles())
    return jsonify(all_articles)


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
        session.modified = True
        print("hello")
        print(session.get('user_id', None))
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


@app.route('/read_articles', methods = ['POST'])
@cross_origin()
def track_reading():
    data = request.data.decode('utf-8')
    # read_articles = data.get('read_articles')

    my_var = session.get('user_id', None)
    print(my_var)
    for key in session:
        print(key)


    # new_reading_event = Reading_event(timestamp=calendar.timegm(time.gmtime()), user_id=1, article_id=read_articles)
    # db.session.add(new_reading_event)

    # db.session.commit()
    return "tracked"

@app.after_request
def after(response):
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

#---------------------------------------------------------------------#



if __name__ == "__main__":
    app.debug = True
    cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})
    connect_to_db(app)
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")
