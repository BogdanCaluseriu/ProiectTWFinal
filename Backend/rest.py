from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
import json
import conn_to_db

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()

class Etaj(Resource):
    def get(self, nr_etaj):
        return conn_to_db.getEtaj(nr_etaj)

    def put(self, nr_etaj):
        try:
            sala = json.loads(request.form['data'])
            if sala['sala'] == '0' and sala['tip_sala'] == '0':
                return 0
            return conn_to_db.putNewSala(nr_etaj, sala['sala'], sala['tip_sala'])
        except Exception as e:
            return 0

class Autentificare(Resource):
    def post(self):
        user = json.loads(request.form['data'])
        return conn_to_db.postAutentificare(user['username'], user['password'])

class Stergere(Resource):
    def delete(self, nr_etaj, nume_sala):
        if nume_sala == 'null':
            return 0
        return conn_to_db.delSala(nr_etaj, nume_sala)

api.add_resource(Autentificare, "/")
api.add_resource(Etaj, "/etaj<int:nr_etaj>")
api.add_resource(Stergere, "/etaj<int:nr_etaj>/<string:nume_sala>")

if __name__ == '__main__':
    app.run(debug = False, host='0.0.0.0')
