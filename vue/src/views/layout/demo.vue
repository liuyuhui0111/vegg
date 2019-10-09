<template>
  <div class="demo">
    <br>
    <br>
    <el-button @click="add()" type="primary">新增</el-button>
    <br>
    <br>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="age"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row,1)" type="primary" size="small">删除</el-button>
          <el-button @click="handleClick(scope.row,2)" type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :inline="boolTrue" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="年龄">
          <el-input v-model.number="form.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getdemolist, deluser, adduser, updateuser,
} from '@/api/apis';

export default {
  name: 'demo',
  data() {
    return {
      name: 'demo',
      tableData: [],
      type: 'add', // 弹窗类型  新增add 修改 edit
      form: {
        age: '',
        name: '',
      },
      dialogFormVisible: false,
      boolTrue: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.tableData = [];
      getdemolist({}).then((res) => {
        this.tableData = res.data.data;
      });
    },
    add() {
      // 新增
      this.type = 'add';
      this.form = {
        age: '',
        name: '',
      };
      this.dialogFormVisible = true;
    },

    handleClick(row, type) {
      console.log(row);

      if (type === 1) {
        console.log('删除');
        deluser({ cid: row.id }).then(() => {
          this.init();
        });
      } else if (type === 2) {
        this.type = 'edit';
        this.form = { ...row };
        this.dialogFormVisible = true;
      }
    },

    sub() {
      if (this.type === 'add') {
        // 新增
        adduser(this.form).then(() => {
          this.init();
          this.dialogFormVisible = false;
        });
      } else {
        // 修改
        updateuser(this.form).then(() => {
          this.init();
          this.dialogFormVisible = false;
        });
      }
    },
  },
};
</script>
<style scoped>

</style>
