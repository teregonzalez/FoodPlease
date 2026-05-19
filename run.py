#!/usr/bin/env python
from flask import Flask
from flask_cors import CORS # <-- Añade esta importación
import os

app = Flask(__name__)
CORS(app) # <-- Activa CORS para permitir conexiones externas

# ... resto de tu código ...

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
