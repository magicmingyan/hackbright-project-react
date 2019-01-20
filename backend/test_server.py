import server
import unittest
from model import connect_to_db, db, User, Reading_event, Article
from flask import jsonify

class MyAppIntegrationTestCase(unittest.TestCase):
    """Examples of integration tests: testing Flask server."""

    def test_index(self):
        client = server.app.test_client()
        result = client.get('/')
        self.assertIn(b'<script src="http://www.webglearth.com/v2/api.js"></script>', result.data)

    def test_geo_json(self):
        client = server.app.test_client()
        result = client.get('/geo.json')
        self.assertEqual(result.status_code, 200)
        self.assertIn(b'abstract', result.data)
    
    def test_read_event(self):
        client = server.app.test_client()
        result = client.get('/read_event.json', headers={'x-access-token':'fake-token'})
        self.assertEqual(result.status_code, 401)
        self.assertIn(b'Token is invalid', result.data)


    def test_login(self):
        client = server.app.test_client()
        result = client.post('/login', json={"email": "test@gmail.com", "password": "test"})
        self.assertEqual(result.status_code, 200)
        self.assertIn(b'token', result.data)


    def test_signup(self):
        client = server.app.test_client()
        result = client.post('/signup', json={"email": "test@gmail.com", "password": "test"})
        self.assertEqual(result.status_code, 200)
        self.assertIn(b'Email already taken', result.data)


    def test_track_reading(self):
        client = server.app.test_client()
        result = client.get('/read_event.json', headers={'x-access-token':'fake-token'})
        self.assertEqual(result.status_code, 401)
        self.assertIn(b'Token is invalid', result.data)





if __name__ == '__main__':
    connect_to_db(server.app)
    unittest.main()