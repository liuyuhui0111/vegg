'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async querylist() {
    // 查询用户列表
    /**  可以配置数据库查询条件
      where: {
        status: 'draft',
        author: ['author1', 'author2']
    },
    columns: ['author', 'title'],
    orders: [
        ['created_at', 'desc'],
        ['id', 'desc']
    ],
    limit: 10,
    offset: 0
    */
    const result = await this.app.mysql.select('user', {
      orders: [
        [ 'id', 'desc' ],
      ],
    });
    return result;
  }

  async getuser(id) {
    // 获取一条数据
    const result = await this.app.mysql.get('user', { id });

    return result;
  }

  async adduser(user) {
    // 新增用户  name age
    const result = await this.app.mysql.insert('user', user);

    return result.affectedRows === 1; // 判断插入成功
    
  }

  async deluser(id) {
    // 删除用户
    console.log('===============', id);
    const result = await this.app.mysql.delete('user', { id });

    return result.affectedRows === 1;
  }

  async updateuser(user) {
    // 修改用户
    const result = await this.app.mysql.update('user', user, {
      where: {
        id: user.id, // 配置where条件  不配置默认id字段
      },
    });
    return result.affectedRows === 1;
  }

}
module.exports = UserService;
