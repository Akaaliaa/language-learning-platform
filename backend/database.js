const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS vocabulary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id INTEGER,
      word TEXT,
      meaning TEXT
    )
  `);

  db.get("SELECT COUNT(*) as count FROM lessons", (err, row) => {
    if (err) {
      console.log(err.message);
      return;
    }

    if (row.count === 0) {
      db.run(`
        INSERT INTO lessons (title, description)
        VALUES
        ('German A1', 'Beginner German vocabulary'),
        ('German A2', 'Elementary German vocabulary')
      `);

      db.run(`
        INSERT INTO vocabulary (lesson_id, word, meaning)
        VALUES
        (1, 'Hallo', 'Hello'),
        (1, 'Tschüss', 'Goodbye'),
        (1, 'Danke', 'Thank you'),
        (1, 'Bitte', 'Please'),
        (1, 'Ja', 'Yes'),
        (1, 'Nein', 'No'),
        (1, 'Haus', 'House'),
        (1, 'Auto', 'Car'),
        (1, 'Buch', 'Book'),
        (1, 'Freund', 'Friend'),
        (1, 'Wasser', 'Water'),
        (1, 'Essen', 'Food'),
        (1, 'Schule', 'School'),
        (1, 'Lehrer', 'Teacher'),
        (1, 'Katze', 'Cat'),
        (1, 'Hund', 'Dog'),
        (1, 'Liebe', 'Love'),
        (1, 'Familie', 'Family'),
        (1, 'Arbeit', 'Work'),
        (1, 'Morgen', 'Morning'),
        (1, 'Abend', 'Evening'),
        (1, 'Nacht', 'Night'),
        (1, 'Tag', 'Day'),
        (1, 'Woche', 'Week'),
        (1, 'Monat', 'Month'),
        (1, 'Jahr', 'Year'),
        (1, 'Name', 'Name'),
        (1, 'Straße', 'Street'),
        (1, 'Tür', 'Door'),
        (1, 'Fenster', 'Window'),
        (1, 'Zimmer', 'Room'),
        (1, 'Tisch', 'Table'),
        (1, 'Stuhl', 'Chair'),
        (1, 'Bett', 'Bed'),
        (1, 'Kaffee', 'Coffee'),
        (1, 'Tee', 'Tea'),
        (1, 'Milch', 'Milk'),
        (1, 'Brot', 'Bread'),
        (1, 'Apfel', 'Apple'),
        (1, 'Mutter', 'Mother'),
        (1, 'Vater', 'Father'),
        (1, 'Kind', 'Child'),
        (1, 'Mann', 'Man'),
        (1, 'Frau', 'Woman'),
        (1, 'Geld', 'Money'),
        (1, 'Uhr', 'Clock'),
        (1, 'Kleid', 'Dress'),
        (1, 'Schuh', 'Shoe'),
        (1, 'Handy', 'Mobile phone'),
        (1, 'Stadt', 'City'),

        (2, 'Flughafen', 'Airport'),
        (2, 'Kühlschrank', 'Refrigerator'),
        (2, 'Krankenhaus', 'Hospital'),
        (2, 'Einladung', 'Invitation'),
        (2, 'Entscheidung', 'Decision'),
        (2, 'Vergangenheit', 'Past'),
        (2, 'Zukunft', 'Future'),
        (2, 'Möglichkeit', 'Possibility'),
        (2, 'Erfahrung', 'Experience'),
        (2, 'Beruf', 'Profession'),
        (2, 'Nachricht', 'Message'),
        (2, 'Rechnung', 'Invoice'),
        (2, 'Kündigung', 'Resignation'),
        (2, 'Besprechung', 'Meeting'),
        (2, 'Terminkalender', 'Calendar'),
        (2, 'Vertrag', 'Contract'),
        (2, 'Umgebung', 'Environment'),
        (2, 'Verantwortung', 'Responsibility'),
        (2, 'Bewerbung', 'Application'),
        (2, 'Führerschein', 'Driving license'),
        (2, 'Wohnung', 'Apartment'),
        (2, 'Miete', 'Rent'),
        (2, 'Reise', 'Trip'),
        (2, 'Unterkunft', 'Accommodation'),
        (2, 'Fahrkarte', 'Ticket'),
        (2, 'Haltestelle', 'Stop'),
        (2, 'Verspätung', 'Delay'),
        (2, 'Gesundheit', 'Health'),
        (2, 'Krankheit', 'Illness'),
        (2, 'Termin', 'Appointment'),
        (2, 'Apotheke', 'Pharmacy'),
        (2, 'Unfall', 'Accident'),
        (2, 'Erklärung', 'Explanation'),
        (2, 'Meinung', 'Opinion'),
        (2, 'Vorschlag', 'Suggestion'),
        (2, 'Prüfung', 'Exam'),
        (2, 'Ergebnis', 'Result'),
        (2, 'Aufgabe', 'Task'),
        (2, 'Unterricht', 'Lesson'),
        (2, 'Einkauf', 'Shopping'),
        (2, 'Quittung', 'Receipt'),
        (2, 'Rabatt', 'Discount'),
        (2, 'Konto', 'Account'),
        (2, 'Überweisung', 'Bank transfer'),
        (2, 'Arbeitsplatz', 'Workplace'),
        (2, 'Lebenslauf', 'CV'),
        (2, 'Vorstellungsgespräch', 'Job interview'),
        (2, 'Zusammenarbeit', 'Cooperation'),
        (2, 'Entwicklung', 'Development'),
        (2, 'Mitarbeiter', 'Employee')
      `);

      console.log("Default lessons and vocabulary inserted.");
    }
  });
});

module.exports = db;