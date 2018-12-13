"""Load bear data into database."""

from model import Bear, connect_to_db, db
from server import app

#---------------------------------------------------------------------#

def get_bears():
    """Load bears from dataset into database."""

    for i, row in enumerate(open('data/bear_data.csv')):
        data = row.rstrip().split(",")
        bear_id, gender, birth_yr, cap_yr, cap_lat, cap_long, collared = data

        bear = Bear(bear_id=bear_id,
                    gender=gender,
                    birth_year=birth_yr,
                    cap_year=cap_yr,
                    cap_lat=cap_lat,
                    cap_long=cap_long,
                    collared=collared)

        db.session.add(bear)

        if i % 100 == 0:
            print(i)

    db.session.commit()

#---------------------------------------------------------------------#

if __name__ == '__main__':
    connect_to_db(app)
    db.create_all()

    get_bears()
