import { save } from './db'

export interface Entity {
  id: string
}

/**
 * Generic repository so every collection gets the same CRUD surface.
 * Extend this for each new entity and implement `collection()`.
 */
export abstract class BaseRepository<T extends Entity> {
  protected abstract collection(): T[]

  all(): T[] {
    return [...this.collection()]
  }

  find(id: string): T | undefined {
    return this.collection().find((item) => item.id === id)
  }

  findBy<K extends keyof T>(key: K, value: T[K]): T | undefined {
    return this.collection().find((item) => item[key] === value)
  }

  where(predicate: (item: T) => boolean): T[] {
    return this.collection().filter(predicate)
  }

  insert(item: T): T {
    this.collection().push(item)
    save()
    return item
  }

  update(id: string, changes: Partial<T>): T | undefined {
    const item = this.find(id)
    if (!item) return undefined
    Object.assign(item, changes)
    save()
    return item
  }

  delete(id: string): boolean {
    const items = this.collection()
    const index = items.findIndex((item) => item.id === id)
    if (index === -1) return false
    items.splice(index, 1)
    save()
    return true
  }

  count(): number {
    return this.collection().length
  }
}
