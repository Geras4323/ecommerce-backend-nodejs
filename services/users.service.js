const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async find() {
    const response = await this.pool.query('SELECT * FROM tasks');
    return response.rows;
  }


  async findOne(id) {
    const task = await this.pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    return task.rows;
  }


  async create(data) {
    const { title, completed } = data;
    await this.pool.query('INSERT INTO tasks (title, completed) VALUES ($1, $2)', [title, completed]);

    const created = await this.pool.query('SELECT * FROM tasks ORDER BY id DESC LIMIT 1')
    return created.rows;
  }


  async update(id, changes) {
    const { title, completed } = changes;
    const values = [ id, title, completed ];
    await this.pool.query('UPDATE tasks SET title = $2, completed = $3 WHERE id = $1', values)
    const updated = await this.pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    return updated.rows;
  }


  async updatePartially(id, changes) {
    const cols = Object.keys(changes);
    const content = Object.values(changes);
    const queryTemplate = [];
    const queryData = [];

    cols.forEach((col, index) => {  // crea correspondencia entre arrays
      queryTemplate.push(col + ` = $${index + 1}`)  // ['title = $1', 'completed = $2']
      queryData.push(content[index])                // ['titulo nuevo', booleano]
    })

    await this.pool.query(`UPDATE tasks SET ${queryTemplate.join(", ")} WHERE id = ${id}`, queryData)
    const updated = await this.pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    return updated.rows;
  }


  async delete(id) {
    await this.pool.query('DELETE FROM tasks WHERE id = $1', [id])
    return { id, message: 'Deleted succesfully' }
  }
}

module.exports = UserService;