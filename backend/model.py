from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

##############################################################################
# Model definitions

class User(db.Model):
    """User of the web app."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_name = db.Column(db.String(64), nullable=True)
    email = db.Column(db.String(64), nullable=True)
    password = db.Column(db.String(64), nullable=True)


    def __repr__(self):
        """Provide helpful representatio when printed."""

        return "<User user_id={} email={}>".format(self.user_id, self.email)


class Article(db.Model):
    """Articles available to the users"""

    __tablename__ = "articles"

    article_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    article_title = db.Column(db.String(64), nullable=True)
    news_source = db.Column(db.String(64), nullable=True)
    geo_id = db.Column(db.Integer, db.ForeignKey('geos.geo_id'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'), nullable=True)
    num_reads = db.Column(db.Integer, nullable=True)

    geo = db.relationship('Geo')
    category = db.relationship('Category')

    def __repr__(self):
        """Provide helpful representatio when printed."""

        return "<Article article_id={} article_title={}>".format(self.article_id, self.article_title)

class Geo(db.Model):
    """Geos of interest to place the pin"""

    __tablename__ = "geos"

    geo_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    lat = db.Column(db.Float, autoincrement=True, nullable=True)
    longt = db.Column(db.Float, autoincrement=True, nullable=True)
    town_name = db.Column(db.String(64), nullable=True)
    country_name = db.Column(db.String(64), nullable=True)
    num_reads = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        """Provide helpful representatio when printed."""

        return "<Geo geo_id={} town_name={}>".format(self.geo_id, self.town_name)


class Category(db.Model):
    """Categories of the articles"""

    __tablename__ = "categories"

    category_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    category_name = db.Column(db.String(64), nullable=True)

    def __repr__(self):
        """Provide helpful representatio when printed."""

        return "<Category category_id={} category_name={}>".format(self.category_id, self.category_name)


class Reading_event(db.Model):
    """Reading time of article by user"""

    __tablename__ = "reading_event"

    timestamp = db.Column(db.TIMESTAMP, nullable=True,primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True, nullable=True)
    article_id = db.Column(db.String(64), db.ForeignKey('articles.article_id'), nullable=True, primary_key=True)

    def __repr__(self):
        """Provide helpful representatio when printed."""

        return "<Reading_event timestamp={} user_id={}>".format(self.timestamp, self.user_id)


class Reading_progress(db.Model):
    """Daily rading progress of user"""

    __tablename__ = "reading_progress"

    date = db.Column(db.Date, nullable=True, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.user_id'), nullable=True, primary_key=True)
    available_articles = db.Column(db.Integer, nullable=True, primary_key=True)
    read_articles = db.Column(db.Integer, nullable=True, primary_key=True)


    def __repr__(self):
        """Provide helpful representatio when printed."""

        return "<Reading_progress date={} user_id={}>".format(self.date, self.user_id)



##############################################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PostgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///readings'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":

    from server import app
    connect_to_db(app)
    db.create_all()
    print("Connected to DB.")