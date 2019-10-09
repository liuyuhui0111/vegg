'use strict';

const Controller = require('./base');

const validateRule = {
        name:{type:'string',min:1,max:10},
        age:{type:'number',min:1,max:99},
      }

class UserController extends Controller {
  async querylist() {
    const { ctx } = this;
    const data = await ctx.service.user.querylist();
    this.success(data);
  }

  async getuser() {
    const { ctx } = this;
    const data = await ctx.service.user.getuser(ctx.query.id);
    this.success(data);
  }


  async adduser() {
    const { ctx } = this;
    try{
      ctx.validate(validateRule)
    }catch(err){
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
    const data = await ctx.service.user.adduser(ctx.request.body);
    this.success(data);
  }


  async deluser() {
    const { ctx } = this;
    try{
      ctx.validate({id:'number'})
    }catch(err){
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
    const data = await ctx.service.user.deluser(ctx.query.id);
    this.success(data);
  }


  async updateuser() {
    const { ctx } = this;
    try{
      ctx.validate(validateRule)
    }catch(err){
      ctx.logger.warn(err.errors);
      this.error(err);
      return;
    }
    const data = await ctx.service.user.updateuser(ctx.request.body);
    this.success(data);
  }


}
module.exports = UserController;
