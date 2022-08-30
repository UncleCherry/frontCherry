<template>
  <div>
    <el-row>
      <el-col :span="40">
        <el-input v-model="workspaceSearch" placeholder="请输入课程名" style="width:100%">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>

    <el-table class="el-table"
      :data="tableData.filter(data => !workspaceSearch || data.name.toLowerCase().includes(workspaceSearch.toLowerCase()))"
      max-height="100%" highlight-current-row stripe :row-key="getRowKeys" :expand-row-keys="expands"
      @expand-change="expand">
      <el-table-column prop="id" label="课程号" width="150px" sortable>
      </el-table-column>
      <el-table-column prop="name" label="课程名" width="300px">
      </el-table-column>
      <el-table-column prop="credit" label="学分" width="100px" sortable>
      </el-table-column>
      <el-table-column prop="time" label="上课时间" width="200px">
      </el-table-column>
      <el-table-column prop="isRequired" label="必修/选修" width="100px">
      </el-table-column>
      <el-table-column prop="meetingId" label="会议号" width="100px">
      </el-table-column>
      <el-table-column prop="meetingId" label="操作" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditMeetingIdDialog(scope)" circle>
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeMeetingIdDialog(scope)" circle>
          </el-button>
        </template>
      </el-table-column>

      <el-row type="expand">
        <el-col :span="40">
          <el-input v-model="workspaceSearch" placeholder="请输入课程名" style="width:100%">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>

      <!--录播table-->
      <el-table-column label="录播" type="expand" width="50px">
        <template slot-scope="scope">
          <el-table :data="recordData">
            <el-table-column prop="RecordId" label="录播号" width="100px" sortable>
            </el-table-column>
            <el-table-column prop="CourseId" label="课程号" width="100px">
            </el-table-column>
            <el-table-column prop="Time" label="录播时间" width="160px" sortable>
            </el-table-column>
            <el-table-column prop="Url" label="录播地址" width="600px">
            </el-table-column>
            <el-table-column prop="meetingId" label="操作" width="139px" align="middle">
              <template slot="header" slot-scope="scope">
                <el-button type="primary" size="mini" @click="addUrlDialog()">添加</el-button>
              </template>
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showAltUrlDialog(scope.row)" circle>
                </el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUrlDialog(scope)" circle>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

    </el-table>

    <!--编辑会议号的对话框-->
    <el-dialog title="编辑会议号" :visible.sync="editMeetingIdDialogVisible" width="50%" @close="editMeetingIdDialogClosed">
      <el-form ref="editMeetingIdFormRef" :model="editMeetingIdForm" :rules="editMeetingIdFormRules" label-width="70px">
        <el-form-item label="课程号">
          <el-input v-model="editMeetingIdForm.courseId" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input v-model="editMeetingIdForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="会议号" prop="meetingId">
          <el-input v-model="editMeetingIdForm.meetingId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMeetingIdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMeetingId">确 定</el-button>
      </span>
    </el-dialog>

    <!--添加录播的对话框-->
    <el-dialog title="添加录播" :visible.sync="addUrlDialogVisible" width="50%" @close="addUrlDialogClosed">
      <el-form ref="addUrlFormRef" :model="addUrlForm" :rules="addUrlFormRules" label-width="100px">
        <el-form-item label="课程号">
          <el-input v-model="addUrlForm.courseId" disabled></el-input>
        </el-form-item>
        <el-form-item label="录播号" prop="recordId">
          <el-input v-model="addUrlForm.recordId"></el-input>
        </el-form-item>
        <el-form-item label="录播地址" prop="Url">
          <el-input v-model="addUrlForm.Url"></el-input>
        </el-form-item>
        <el-form-item label="" prop="recordTime" align="left">
          <div class="block">
            <span class="demonstration">录播时间</span>
            <el-date-picker style="width:250px" v-model="recordTime" type="datetime" placeholder="选择日期时间"
              value-format="MM/dd/yyyy HH:mm:ss">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUrlDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUrl">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改录播地址的对话框-->
    <el-dialog title="修改录播地址" :visible.sync="altUrlDialogVisible" width="50%" @close="altUrlDialogClosed">
      <el-form ref="altUrlFormRef" :model="altUrlForm" :rules="altUrlFormRules" label-width="100px">
        <el-form-item label="录播号">
          <el-input v-model="altUrlForm.recordId" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程号">
          <el-input v-model="altUrlForm.courseId" disabled></el-input>
        </el-form-item>
        <el-form-item label="录播时间" prop="recordTime">
          <el-input v-model="altUrlForm.recordTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="录播地址" prop="Url">
          <el-input v-model="altUrlForm.Url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="altUrlDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="altUrl">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getAllCourse, getCourseInfo, altMeetingid } from '@/api/course'
  import { getRecordInfo, addRecordInfo, altUrlInfo, deleteUrl } from '@/api/record'
  import axios from 'axios'
  export default {
    inject: ['reload'],
    methods: {
      mounted() {
        //获取当前日期
        let that = this;
        this.timer = setInterval(function () {
          that.date = new Date().toLocaleString();
        });
      },
      beforeDestroy: function () {
        if (this.timer) {
          clearInterval(this.timer);
        }
      },
      //当前日期格式化
      dateFormat() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ?
          '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds
      },

      //编辑会议号对话框
      showEditMeetingIdDialog(scope) {
        var param = {
          courseid: scope.row.id
        }
        this.editMeetingIdForm.row = scope.$index;
        getCourseInfo(param).then(response => {
          this.editMeetingIdDialogVisible = true
          this.editMeetingIdForm.courseId = response.data.course.CourseId;
          this.editMeetingIdForm.name = response.data.course.CourseName;
          this.editMeetingIdForm.meetingId = response.data.course.MeetingId;
          if (this.editMeetingIdForm.meetingId == 0)
            this.editMeetingIdForm.meetingId = null
        }).catch((error) => {
          this.$message({
            message: '课程查询失败',
            type: 'warning'
          });
        });
      },

      //监听添加用户对话框的关闭事件
      editMeetingIdDialogClosed() {
        this.$refs.editMeetingIdFormRef.resetFields()
      },

      //点击按钮，编辑会议号
      editMeetingId() {
        this.$refs.editMeetingIdFormRef.validate(async valid => {
          if (!valid)
            return
          //可以发起编辑会议号的网络请求
          var params = {
            CourseId: this.editMeetingIdForm.courseId,
            MeetingId: this.editMeetingIdForm.meetingId
          }
          console.log(params)
          altMeetingid(params).then(response => {
            this.$message({
              message: '修改会议号成功',
              type: 'success'
            });
          }).catch((error) => {
            this.$message({
              message: '修改会议号失败',
              type: 'warning'
            });
          })

          //隐藏编辑会议号的对话框
          this.editMeetingDialogVisible = false
          //重新获取列表
          var that = this;
          setTimeout(function () { that.reload() }, 500)
        })
      },
      expand(row, expandedRows) {
        this.currentId = row.id
        var that = this;
        if (expandedRows.length) {
          that.expands = [];
          if (row) {
            that.expands.push(row.id); // 每次push进去的是每行的ID
          }
        } else {
          that.expands = []; // 默认不展开
        }

        var param = {
          courseid: row.id
        }

        getRecordInfo(param).then(response => {
          this.recordData = response.data.RecordsList
          for (var i = 0; i < this.recordData.length; ++i) {
            this.recordData[i].CourseId = row.id
          }

        }).catch((error) => {
          this.$message({
            message: '录播查询失败',
            type: 'warning'
          });
        })
      },

      // 每行的唯一key值 用其id表示
      getRowKeys(row) {
        return row.id;
      },
      async removeMeetingIdDialog(scope) {
        const confirmResult = await this.$confirm('此操作将永久删除该会议号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        //如果确认删除，则返回值为字符串confirm
        //如果取消删除，则返回值为字符串cancle
        if (confirmResult != 'confirm') {
          return this.$message.info("已取消删除")
        }
        var params = {
          CourseId: scope.row.id,
          MeetingId: 0
        }
        console.log(params)
        altMeetingid(params).then(response => {
          this.$message({
            message: '删除会议号成功',
            type: 'success'
          });
        }).catch((error) => {
          this.$message({
            message: '删除会议号失败',
            type: 'warning'
          });
        })
        var that = this;
        setTimeout(function () { that.reload() }, 500);
      },
      //添加录播对话框
      addUrlDialog() {
        this.addUrlDialogVisible = true
        this.addUrlForm.courseId = this.currentId
        //默认为当前时间并格式化
        this.recordTime = this.dateFormat()
      },

      //监听添加录播对话框的关闭事件
      addUrlDialogClosed() {
        this.$refs.addUrlFormRef.resetFields()
      },

      //点击按钮，添加录播地址
      addUrl() {
        this.$refs.addUrlFormRef.validate(async valid => {

          if (!valid)
            return
          this.addUrlForm.time = this.recordTime
          var params = {
            Recordid: this.addUrlForm.recordId,
            Courseid: this.addUrlForm.courseId,
            Time: this.recordTime,
            Url: this.addUrlForm.Url
          }
          console.log(params)
          addRecordInfo(params).then(response => {
            this.$message({
              message: '添加录播成功',
              type: 'success'
            });
          }).catch((error) => {
            this.$message({
              message: '添加录播失败',
              type: 'warning'
            });
          })

          //隐藏编辑会议号的对话框
          this.addUrlDialogVisible = false

          //重新获取列表
          var that = this;
          setTimeout(function () { that.reload() }, 500);

        })
      },

      showAltUrlDialog(row) {
        this.altUrlDialogVisible = true
        var param = {
          courseid: row.CourseId
        }

        this.altUrlForm.recordId = row.RecordId,
        this.altUrlForm.courseId = row.CourseId,
        this.altUrlForm.recordTime = row.Time
        this.altUrlForm.Url = row.Url
      },
      //监听修改录播地址的关闭事件
      altUrlDialogClosed() {
        this.$refs.altUrlFormRef.resetFields()
      },
      //点击按钮，修改录播地址
      altUrl() {
        this.$refs.altUrlFormRef.validate(async valid => {

          if (!valid)
            return
          var param = {
            RecordId: this.altUrlForm.recordId,
            Url: this.altUrlForm.Url
          }
          altUrlInfo(param).then(response => {
            this.$message({
              message: '修改录播地址成功',
              type: 'success'
            });
          }).catch((error) => {
            this.$message({
              message: '修改录播地址失败',
              type: 'warning'
            });
          })

          //隐藏编辑会议号的对话框
          this.altUrlDialogVisible = false
          //重新获取列表
          var that = this;
          setTimeout(function () { that.reload() }, 500);
        })
      },

      async removeUrlDialog(scope) {
        const confirmResult = await this.$confirm('此操作将永久删除该录播地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        //如果确认删除，则返回值为字符串confirm
        //如果取消删除，则返回值为字符串cancle
        if (confirmResult != 'confirm') {
          return this.$message.info("已取消删除")
        }
        var param = {
          RecordId: scope.row.RecordId,
        }
        console.log(param)
        deleteUrl(param).then(response => {
          this.$message({
            message: '删除录播成功',
            type: 'success'
          });
        }).catch((error) => {
          this.$message({
            message: '删除录播失败',
            type: 'warning'
          });
        })

        console.log("已确认删除")
        var that = this;
        setTimeout(function () { that.reload() }, 500);
      },
    },
    data() {
      //检查会议号是否合法
      var checkMeetingId = (rule, value, cb) => {
        const regMeetingId = /^\d{9}$/
        if (regMeetingId.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的会议号，长度为9位的数字'))
      }

      //检查录播号是否合法
      var checkRecordId = (rule, value, cb) => {
        const regRecordId = /^\d{1,20}$/
        if (regRecordId.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的录播号，长度为1-20位的数字'))
      }

      //检查录播地址是否合法
      var checkUrl = (rule, value, cb) => {
        const regUrl = /^http[s]?:\/\/.{1,100}$/
        //^(?i)^http(s)?://.{1,217}$/
        if (regUrl.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的录播地址,长度＜100'))
      }
      return {
        //当前courseId
        currentId: '',
        // 展开行,数组形式
        expands: [],
        //搜索框
        workspaceSearch: '',
        //外层表单数据
        tableData: [],


        //修改会议号
        editMeetingIdDialogVisible: false,
        editMeetingIdForm: {
          row: '',
          meetingId: '',
          name: '',
        },
        editMeetingIdFormRules: {
          meetingId: [
            {
              required: true, message: '请输入会议号', trigger: 'blur'
            },
            { validator: checkMeetingId, trigger: 'blur' }
          ]
        },

        //添加录播
        recordData: [],
        addUrlDialogVisible: false,
        addUrlForm: {
          recordId: '',
          courseId: '',
          time: '',
          Url: ''
        },
        addUrlFormRules: {
          recordId: [
            {
              required: true, message: '请输入录播号', trigger: 'blur'
            },
            { validator: checkRecordId, trigger: 'blur' }
          ],
          Url: [
            {
              required: true, message: '请输入录播地址', trigger: 'blur'
            },
            { validator: checkUrl, trigger: 'blur' }
          ],
        },
        recordTime: new Date(),

        //修改录播地址
        altUrlDialogVisible: false,
        altUrlForm: {
          recordId: '',
          courseId: '',
          recordTime: '',
          Url: ''
        },
        altUrlFormRules: {
          Url: [
            {
              required: true, message: '请输入录播地址', trigger: 'blur'
            },
            { validator: checkUrl, trigger: 'blur' }
          ],
        },

      }
    },
    props: ['listMsg'],
    watch: {
      listMsg: {
        handler(val) {
          for (var i = 0; i < this.listMsg.length; ++i) {
            var temp = this.listMsg[i];
            var inctrm = this.listMsg[i].split(" - "); //id - name - credit - time - isRequired - meetingId
            this.tableData.push({
              id: parseInt(inctrm[0]),
              name: inctrm[1],
              credit: parseInt(inctrm[2]),
              time: inctrm[3],
              isRequired: inctrm[4],
              meetingId: inctrm[5]
            });
          }
        },
        immediate: true,
      }
    }
  }
</script>

<!--去表格下边框-->
<style lang="scss" scoped>
  el-table__row>td {
    border: none;
  }

  .el-table::before {
    height: 0px;
  }
</style>