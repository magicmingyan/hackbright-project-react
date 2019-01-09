from jinja2 import StrictUndefined
from flask import Flask, render_template, jsonify, request, session, make_response
from flask_cors import CORS, cross_origin
from flask_debugtoolbar import DebugToolbarExtension
from model import connect_to_db, db, User, Reading_event, Article
import requests
import os
import time
import datetime
import calendar
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps



template_dir = os.path.abspath('../frontend/public')
app = Flask(__name__, template_folder=template_dir)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
# cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})
app.secret_key = "ursusmaritimus"


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
            # print(current_user)
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

#---------------------------------------------------------------------#

@app.route('/')
def index():
    """Show homepage."""

    return render_template("index.html")

@app.route('/geo.json')
# @token_required
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


@app.route('/login', methods = ['POST'])
@cross_origin()
def login():
    # if request.method == 'POST':

    data = request.get_json(silent=True)
    print(data)
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = User.query.filter_by(email=email).first()

    if not email:
        return "no user"

    if check_password_hash(user.password, password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        print(token)
        session["user_id"] = user.user_id
        return jsonify({'token' : token.decode('UTF-8')})

    return "password incorrect"


        # data = request.get_json(silent=True)

        # email = data.get('email')
        # password = data.get('password')

        # user = User.query.filter_by(email=email).first()

        # if not user:
        #     return "no user"
        
        # if user.password != password:
        #     return "password incorrect"


        # session["user_id"] = user.user_id
        # session.modified = True
        # print("hello")
        # print(session.get('user_id', None))
        # return "logged in"


@app.route('/signup', methods = ['POST'])
@cross_origin()
def signup():
    data = request.get_json()
    print("data", data)
    user_name = data.get('user_name')
    email = data.get('email')
    password = data.get('password')
    hashed_password = generate_password_hash(password, method='sha256')

    new_user = User(public_id=str(uuid.uuid4()), user_name=user_name, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.public_id
    print(session.get('user_id', None))

    # return jsonify({'message' : 'New user created!'})
    return "signed up"


@app.route('/read_articles', methods = ['POST'])
@cross_origin()
@token_required
def track_reading(current_user):
    data = request.data.decode('utf-8')
    # read_articles = data.get('read_articles')

    if not Reading_event.query.filter_by(timestamp=calendar.timegm(time.gmtime()), user_id=current_user.user_id, article_id=data).first():
        new_reading_event = Reading_event(timestamp=calendar.timegm(time.gmtime()), user_id=current_user.user_id, article_id=data)
    db.session.add(new_reading_event)
    db.session.commit()
    return "tracked"

@app.after_request
def after(response):
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

#---------------------------------------------------------------------#



if __name__ == "__main__":
    app.debug = True
    # CORS(app, resources={r"/*": {"origins": "*"}})
    # cors = CORS(app, resources={r"/*": { r"supports_credentials":True, r"origins": r"http://localhost:3000" }})
    connect_to_db(app)
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")
