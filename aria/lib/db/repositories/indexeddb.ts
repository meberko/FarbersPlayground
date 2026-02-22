"use client";
// ─────────────────────────────────────────────────────────────────────────────
// IndexedDB Repository – Dexie.js implementation of Repository<T>
// Never import this directly from business logic.
// Use the db singleton in lib/db/index.ts instead.
// ─────────────────────────────────────────────────────────────────────────────

import type { Table, UpdateSpec } from "dexie";
import type { Repository, QueryFilter } from "./base";

export class IndexedDBRepository<T extends { id: string }>
  implements Repository<T>
{
  constructor(private table: Table<T, string>) {}

  async getAll(): Promise<T[]> {
    return this.table.toArray();
  }

  async getById(id: string): Promise<T | undefined> {
    return this.table.get(id);
  }

  async create(item: T): Promise<T> {
    await this.table.add(item);
    return item;
  }

  async update(id: string, changes: Partial<T>): Promise<T> {
    await this.table.update(id, changes as UpdateSpec<T>);
    const updated = await this.table.get(id);
    if (!updated) throw new Error(`Record ${id} not found after update`);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.table.delete(id);
  }

  async query(filter: QueryFilter<T>): Promise<T[]> {
    const keys = Object.keys(filter) as (keyof T)[];
    if (keys.length === 0) return this.getAll();

    // Use Dexie's Collection filter for arbitrary equality checks.
    return this.table
      .filter((record) =>
        keys.every((k) => record[k] === (filter as Record<keyof T, unknown>)[k])
      )
      .toArray();
  }
}
