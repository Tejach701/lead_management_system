declare module 'better-sqlite3' {
  class Database {
    constructor(filename: string, options?: any);
    prepare(sql: string): any;
    exec(sql: string): Database;
    close(): void;
    [key: string]: any;
  }

  export default Database;
}
