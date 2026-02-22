// ─────────────────────────────────────────────────────────────────────────────
// Base Repository Interface
// All database access must go through this interface. Swap implementations
// (IndexedDB → PostgreSQL, etc.) by providing a different concrete class.
// ─────────────────────────────────────────────────────────────────────────────

export type QueryFilter<T> = Partial<T>;

export interface Repository<T extends { id: string }> {
  /** Return all records */
  getAll(): Promise<T[]>;

  /** Find a single record by primary key */
  getById(id: string): Promise<T | undefined>;

  /** Persist a new record (id must be set by caller) */
  create(item: T): Promise<T>;

  /** Overwrite an existing record */
  update(id: string, item: Partial<T>): Promise<T>;

  /** Delete a record by primary key */
  delete(id: string): Promise<void>;

  /**
   * Simple equality filter — returns all records where every key in `filter`
   * matches the record's value.  Implementations may extend this with richer
   * predicate support.
   */
  query(filter: QueryFilter<T>): Promise<T[]>;
}
