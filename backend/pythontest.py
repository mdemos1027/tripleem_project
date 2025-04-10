import psycopg2

# Connection parameters
host = "3.70.250.149"
port = 5432
database = "postgres"
user = "postgres"
password = "TripleEM_2024"

try:
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    print("✅ Connection successful")

    # Optional: run a query
    cur = conn.cursor()
    cur.execute("SELECT version();")
    print("PostgreSQL version:", cur.fetchone()[0])

    cur.close()
    conn.close()

except Exception as e:
    print("❌ Connection failed:", e)
