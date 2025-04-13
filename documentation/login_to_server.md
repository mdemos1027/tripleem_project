
# PostgreSQL Server Access & Inspection Guide

### 1. 🔐 Connect to the server (from PowerShell)
```bash
ssh -i "C:\Users\MinasDemosthenous\Downloads\tripleem_key.pem" ubuntu@3.70.250.149
```

### 2. 👤 Switch to the PostgreSQL system user
```bash
sudo -i -u postgres
```

### 3. 🐘 Launch PostgreSQL CLI
```bash
psql
```

### 4. 📦 List all schemas
```sql
\dn
```

### 5. 🗃️ List all databases
```sql
\l
```

### 6. 📋 List all tables in the current schema
```sql
\dt
```

---

## 🎯 To explore the `tripleem_db` schema (inside `postgres` database)

### 7. Connect to the `postgres` database (if not already)
```bash
psql -d postgres
```

### 8. Show all tables in the `tripleem_db` schema
```sql
\dt tripleem_db.*
```

Expected tables:
- `brands`
- `clients`
- `permissions`
- `roles`
- `users`
