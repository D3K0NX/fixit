# Import flask
from flask import *
import pymysql
import os
from flask_cors import CORS

# create instance/create 

app=Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER']='static/images'

# Create orders table if it doesn't exist
def init_db():
    connection = pymysql.connect(host="mysql-kindimanu.alwaysdata.net", user="kindimanu", password="modcom2026", database="kindimanu_kindisokogarden")
    cursor = connection.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            product_id INT,
            product_name VARCHAR(255),
            product_description TEXT,
            product_cost DECIMAL(10,2),
            quantity INT DEFAULT 1,
            phone VARCHAR(50),
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    connection.commit()
    connection.close()

init_db()

# routing
@app.route("/api/signup", methods=["POST"])
def signup():
    username = request.form["username"]
    password = request.form["password"]
    email = request.form["email"]
    phone = request.form["phone"]

    connection = pymysql.connect(host="mysql-kindimanu.alwaysdata.net", user="kindimanu", password="modcom2026", database="kindimanu_kindisokogarden")
    cursor = connection.cursor()

    sql = "insert into users (username,password,email,phone) values (%s,%s,%s,%s)"
    data = (username,password,email,phone)
    cursor.execute(sql,data)
    connection.commit()

    return jsonify({"message":"Thank you for joining"})


# signin
@app.route("/api/signin", methods = ["POST"])
def signin():
    email = request.form["email"]
    password = request.form["password"]
    connection = pymysql.connect(host="mysql-kindimanu.alwaysdata.net", user="kindimanu", password="modcom2026", database="kindimanu_kindisokogarden")
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    sql = "select * from users where email=%s and password=%s"
    data = (email,password)
    cursor.execute(sql,data)
    count = cursor.rowcount
    if count == 0:
        return jsonify({"message":"Invalid Credentials"})
    
    user = cursor.fetchone()
    
    # Remove password from each user dictionary before sending
    for u in user:
        if 'password' in u:
            del u['password']
    
    return jsonify({"message":"Login Successful","user":user})


# Profile - get and update user profile
@app.route("/api/profile", methods=["GET", "PUT"])
def profile():
    user_id = request.args.get('user_id') or request.form.get('user_id')
    
    if not user_id:
        return jsonify({"message": "User ID required"}), 400

    connection = pymysql.connect(host="mysql-kindimanu.alwaysdata.net", user="kindimanu", password="modcom2026", database="kindimanu_kindisokogarden")
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    if request.method == 'GET':
        sql = "select id, username, email, phone, role from users where id=%s"
        cursor.execute(sql, (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({"message": "User not found"}), 404
        
        return jsonify(user)

    if request.method == 'PUT':
        username = request.form.get("username")
        phone = request.form.get("phone")
        
        sql = "UPDATE users SET username=%s, phone=%s WHERE id=%s"
        cursor.execute(sql, (username, phone, user_id))
        connection.commit()
        
        return jsonify({"message": "Profile updated successfully"})


# Orders - get and create orders
@app.route("/api/orders", methods=["GET", "POST"])
def orders():
    user_id = request.args.get('user_id') or request.form.get('user_id')
    
    if not user_id:
        return jsonify({"message": "User ID required"}), 400

    connection = pymysql.connect(host="mysql-kindimanu.alwaysdata.net", user="kindimanu", password="modcom2026", database="kindimanu_kindisokogarden")
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    if request.method == 'GET':
        sql = "SELECT * FROM orders WHERE user_id=%s ORDER BY created_at DESC"
        cursor.execute(sql, (user_id,))
        orders = cursor.fetchall()
        return jsonify(orders)

    if request.method == 'POST':
        product_id = request.form.get("product_id")
        product_name = request.form.get("product_name")
        product_cost = request.form.get("product_cost")
        quantity = request.form.get("quantity", 1)
        phone = request.form.get("phone")
        status = "pending"
        
        sql = """INSERT INTO orders (user_id, product_id, product_name, product_cost, quantity, phone, status) 
                VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        data = (user_id, product_id, product_name, product_cost, quantity, phone, status)
        cursor.execute(sql, data)
        connection.commit()
        
        return jsonify({"message": "Order placed successfully", "order_id": cursor.lastrowid})


# Product details
@app.route("/api/add_product", methods = ["POST"])
def add_product():
    product_name = request.form["product_name"]
    product_cost = request.form["product_cost"]
    product_description = request.form["product_description"]
    product_photo = request.files["product_photo"]
    filename = product_photo.filename
    photo_path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
    product_photo.save(photo_path)

    connection = pymysql.connect(host="mysql-kindimanu.alwaysdata.net", user="kindimanu", password="modcom2026", database="kindimanu_kindisokogarden")
    cursor = connection.cursor()

    sql = "insert into product_details (product_name,product_description,product_cost,product_photo) values (%s,%s,%s,%s)"
    data = (product_name,product_description,product_cost,filename)
    cursor.execute(sql,data)
    connection.commit()

    return jsonify({"message":"Product details added succefully"})



# get products
@app.route("/api/get_product_details")
def get_product_details():
    connection = pymysql.connect(host="mysql-kindimanu.alwaysdata.net", user="kindimanu", password="modcom2026", database="kindimanu_kindisokogarden")

    cursor = connection.cursor(pymysql.cursors.DictCursor)

    sql = "select * from product_details"

    cursor.execute(sql)

    product_details = cursor.fetchall()

    return jsonify(product_details)



# Mpesa Payment Route 
import requests
import datetime
import base64
from requests.auth import HTTPBasicAuth
 
@app.route('/api/mpesa_payment', methods=['POST'])
def mpesa_payment():
    if request.method == 'POST':
        amount = request.form['amount']
        phone = request.form['phone']
        consumer_key = "LuC9onauC8ru1lrTtN8ll9lbzwGn4gKD7Z7QGG1Dco6xwnDl"
        consumer_secret = "WQeMpyJ0puOAFprB0ltwq2vtMy8LKpWHuERqXDKrU0BeD1yZ6gRFJx9UbcmFUksK"
 
        api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
 
        data = r.json()
        access_token = "Bearer" + ' ' + data['access_token']
 
        timestamp = datetime.datetime.today().strftime('%Y%m%d%H%M%S')
        passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
        business_short_code = "174379"
        data = business_short_code + passkey + timestamp
        encoded = base64.b64encode(data.encode())
        password = encoded.decode('utf-8')
 
        payload = {
            "BusinessShortCode": "174379",
            "Password": "{}".format(password),
            "Timestamp": "{}".format(timestamp),
            "TransactionType": "CustomerPayBillOnline",
            "Amount": "1",
            "PartyA": phone,
            "PartyB": "174379",                                   
            "PhoneNumber": phone,
            "CallBackURL": "https://modcom.co.ke/api/confirmation.php",
            "AccountReference": "account",
            "TransactionDesc": "account"
        }
 
        headers = {
            "Authorization": access_token,
            "Content-Type": "application/json"
        }
 
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
 
        response = requests.post(url, json=payload, headers=headers)
        return jsonify({"message": "Please Complete Payment in Your Phone and we will deliver in minutes"})

# if __name__ == '__main__':
#     app.run(debug=True)