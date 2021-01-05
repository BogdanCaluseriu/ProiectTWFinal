import pymysql.cursors

connection = pymysql.connect(host="localhost",
    db="TW",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor,
    port=3306,
    user="root")

def getEtaj(nr_etaj):
    sql = 'SELECT NUME AS sala, TIP as tip_sala FROM SALI WHERE ETAJ=%s'
    connection.ping()
    with connection.cursor() as cursor:
        cursor.execute(sql, (str(nr_etaj),))
        result = cursor.fetchall()
        return result

def postAutentificare(username, password):
    sql = 'SELECT * FROM USERS WHERE user=%s AND pass=%s'
    connection.ping()
    with connection.cursor() as cursor:
        cursor.execute(sql, (username, password))
        result = cursor.fetchone()
        return 0 if result==None else 1

def putNewSala(nr_etaj, sala, tip_sala):
    sql = 'SELECT NUME FROM SALI WHERE NUME=%s AND ETAJ=%s AND TIP=%s'
    connection.ping()
    with connection.cursor() as cursor:
        cursor.execute(sql, (sala, nr_etaj, tip_sala))
        result = cursor.fetchone()
    if result == None:
        sql = 'INSERT INTO SALI VALUES (%s, %s, %s)'
        connection.ping()
        with connection.cursor() as cursor:
            cursor.execute(sql, (sala, nr_etaj, tip_sala))
            connection.commit()
        return 1
    else:
        return 0

def delSala(nr_etaj, nume_sala):
    try:
        sql = 'SELECT NUME FROM SALI WHERE NUME=%s AND ETAJ=%s'
        connection.ping()
        with connection.cursor() as cursor:
            cursor.execute(sql, (nume_sala, nr_etaj))
            result = cursor.fetchone()
            if result == None:
                return 0
        sql = 'DELETE FROM SALI WHERE NUME=%s AND  ETAJ=%s'
        connection.ping()
        with connection.cursor() as cursor:
            cursor.execute(sql, (nume_sala, nr_etaj))
            connection.commit()
        return 1
    except Exception as e:
        return 0

connection.close()
