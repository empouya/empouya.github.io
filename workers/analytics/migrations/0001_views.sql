-- Aggregate counts only; no per-visitor records or identifiers.
CREATE TABLE IF NOT EXISTS page_views (
    day TEXT NOT NULL,
    path TEXT NOT NULL,
    views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0),
    PRIMARY KEY (day, path)
) WITHOUT ROWID;
