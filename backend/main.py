
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from database import get_connection

app = FastAPI(title="WellPath AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8443"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CheckIn(BaseModel):
    mood: str = Field(min_length=1, max_length=50)
    note: str = Field(default="", max_length=500)
    consent: bool = False

class JournalEntry(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    content: str = Field(min_length=1, max_length=5000)

@app.get("/")
def home():
    return {"message": "WellPath AI backend is running!"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/check-ins")
def get_check_ins():
    connection = get_connection()
    records = connection.execute(
        "SELECT * FROM check_ins ORDER BY id DESC"
    ).fetchall()
    connection.close()
    return [dict(record) for record in records]
@app.post("/check-ins")
def add_check_in(check_in: CheckIn):

    if not check_in.consent:
        raise HTTPException(
            status_code=403,
            detail="Consent is required to save this check-in."
        )

    connection = get_connection()

    cursor = connection.execute(
        "INSERT INTO check_ins (mood, note) VALUES (?, ?)",
        (check_in.mood, check_in.note)
    )

    connection.commit()

    record = connection.execute(
        "SELECT * FROM check_ins WHERE id = ?",
        (cursor.lastrowid,)
    ).fetchone()

    connection.close()
    return dict(record)
@app.get("/journal")
def get_journal_entries():
    connection = get_connection()

    records = connection.execute(
        "SELECT * FROM journal_entries ORDER BY id DESC"
    ).fetchall()

    connection.close()
    return [dict(record) for record in records]

@app.post("/journal")
def add_journal_entry(entry: JournalEntry):
    connection = get_connection()

    cursor = connection.execute(
        "INSERT INTO journal_entries (title, content) VALUES (?, ?)",
        (entry.title, entry.content)
    )

    connection.commit()

    record = connection.execute(
        "SELECT * FROM journal_entries WHERE id = ?",
        (cursor.lastrowid,)
    ).fetchone()

    connection.close()
    return dict(record)
@app.put("/journal/{entry_id}")
def update_journal_entry(entry_id: int, entry: JournalEntry):
    connection = get_connection()

    cursor = connection.execute(
        "UPDATE journal_entries SET title = ?, content = ? WHERE id = ?",
        (entry.title, entry.content, entry_id)
    )

    connection.commit()

    if cursor.rowcount == 0:
        connection.close()
        raise HTTPException(status_code=404, detail="Journal entry not found")

    record = connection.execute(
        "SELECT * FROM journal_entries WHERE id = ?",
        (entry_id,)
    ).fetchone()

    connection.close()
    return dict(record)


@app.delete("/journal/{entry_id}")
def delete_journal_entry(entry_id: int):
    connection = get_connection()

    cursor = connection.execute(
        "DELETE FROM journal_entries WHERE id = ?",
        (entry_id,)
    )

    connection.commit()
    connection.close()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Journal entry not found")

    return {"message": "Journal entry deleted successfully"}