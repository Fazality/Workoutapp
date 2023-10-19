import Database from 'better-sqlite3';
const db = new Database('./db1.sqlite');

export const create = (table: string, data: any) => {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    return db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`).run(...values).changes;
}


export const read = (table: string) => {
    return db.prepare(`SELECT * FROM ${table}`).all();
};


export const readById =(table: string, id: number) => {
    return db.prepare(`SELECT * FROM ${table} WHERE ID = ?`).get(id);
}


export const deleteById = (table: string, id: number) => {
  return db.prepare(`DELETE FROM ${table} WHERE ID = ?`).run(id).changes;
};


export const updateById = (table: string, id: number, data: any) => {
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(',');
    const values = [...Object.values(data), id];
    return db.prepare(`UPDATE ${table} SET ${setClause} WHERE  = ?`).run(...values).changes;
};
