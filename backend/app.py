from flask import Flask, request, jsonify
import psycopg2
import random
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


conn = psycopg2.connect(
  database="database",
  user='user',
  password='0000',
  host='host',
  port=0000
)

cursor = conn.cursor()

@app.route('/api/register', methods=['POST'])
def register_patient():
  data = request.get_json()
  
  name = data['name']
  email = data['email']
  phone = data['phone']
  
  patient_id, queue_num = register_patient(name, email, phone)
  
  result = {
    "patientId": patient_id,
    "queueNumber": queue_num
  }
  
  return jsonify(result), 201

def register_patient(name, email, phone):
  cursor.execute("""
    CREATE TABLE patients
    name VARCHAR(255),
    email VARCHAR(255),
    phone INT
  """)

  cursor.execute("""
    INSERT INTO patients (name, email, phone)
    VALUES (%s, %s, %s)
    RETURNING id
  """, (name, email, phone))
  
  patient_id = cursor.fetchone()[0]

  queue_num = random.randint(1, 1000)
  
  cursor.execute("""
    INSERT INTO queues (patient_id, queue_num)
    VALUES (%s, %s)
  """, (patient_id, queue_num))
  
  conn.commit()

  return patient_id, queue_num

@app.route('/api/patients', methods=['GET'])
def get_patients():
  cursor.execute("SELECT * FROM patients")
  patients = cursor.fetchall()
  
  return jsonify(patients)

if __name__ == '__main__':
    app.run(debug=True)
