<template>
    <el-container style="height: 100%; margin-top:0px; margin-left:0px">
        <el-header style=" background-color: #545c64;">
        <span style="color:white;  font-size: 15px;">考勤信息上传</span>
        </el-header>
      <el-main style="margin-top:-20px">
      <el-row>
        <el-col :span="5"><br></el-col>
        <el-col :span="7">
          <div>
            <el-row><br></el-row>
            <el-row>
              <el-autocomplete
                class="inline-input"
                v-model="courseid"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
                @input="change1($event)"
              >
                <template slot="prepend">课程ID:</template>
              </el-autocomplete></el-row>
              <el-row>
              <el-input placeholder="请输入内容" v-model="number" @input="change2($event)">
                  <template slot="prepend">课次:</template>
              </el-input></el-row>
            </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-row><br></el-row>
            <el-row><br></el-row>
              <el-upload
                class="upload-demo"
                ref="upload"
                action="#"
                accept=".xlsx, .xls"
                :on-remove="handleRemove"
                :on-change="readFile"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadFile" :disabled=d>上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip" style="margin-top: 10px;">请上传腾讯会议参会记录</div>
              </el-upload>
          </div>
        </el-col>
      </el-row>
        <AttendanceTable :AttendanceMsg="message" style="margin-top: 30px"/>
      </el-main>
      </el-container>
</template>

<script>
import AttendanceTable from '@/components/AttendanceTableStudent.vue'
import { getInstructorCourse } from '@/api/course'
import { uploadAttendance } from '@/api/attendance'
export default {
  mounted(){
      let courseMsg=''
      let _this=this
      getInstructorCourse().then(response=>{
        courseMsg=response.data.CoursesList
        _this.courselist=[]
        for(var i=0;i<courseMsg.length;++i)
        {
          _this.courselist[i]={"value":courseMsg[i].CourseId.toString(),"name":courseMsg[i].CourseName}
        }
      }).catch((error)=>{
        this.$message({
          message: '获取授课信息失败',
          type: 'warning'
        });
      })
    },

  data() {
      return{
        courselist:[],
        message:[],
        courseid:'',
        number:'',
        d:true,
        d1:true,
        d2:true,
        fileList:[],
        jsonlist:[],
      }
    },
   methods:{
    change1(event){
        this.$forceUpdate(event)
        for(var i=0;i<this.courselist.length;i++){
          if(this.courselist[i].value==this.courseid){
            this.d1=false
            this.d=this.d1||this.d2
            return
          } 
        }
        this.d1=true
        this.d=this.d1||this.d2
    },
    change2(event){
        this.$forceUpdate(event)
        this.d2=false
        this.d=this.d1||this.d2
          

    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    readFile (file) {
      console.log(file);
      this.fileContent = file.raw
      const fileName = file.name
      const fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
      if (this.fileContent) {
        if (fileType === 'xlsx' || fileType === 'xls') {
          this.importfile(this.fileContent)
        } else {
          this.$message.error('文件类型错误');
        }
      }
    },
    importfile (obj) {
      const reader = new FileReader()
      const _this = this
      reader.readAsArrayBuffer(obj)
      reader.onload = function () {
      const buffer = reader.result
      const bytes = new Uint8Array(buffer)
      const length = bytes.byteLength
      let binary = ''
      for (let i = 0; i < length; i++) {      
        binary += String.fromCharCode(bytes[i])
      }
      const XLSX = require('xlsx')
      const wb = XLSX.read(binary, {type: 'binary'})
      const outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      _this.message=[];
      _this.jsonlist=new Array();
      for(var i=0;i<outdata.length;i++){
        if(outdata[i]['身份']!="普通参会者")
          continue;
        let tmp='';
        let json={};
        tmp+=_this.courseid+ ' - ';
        //后端读课程名
        tmp+="数据库"+' - ';
        tmp+=_this.number+' - ';
        let id_name =  outdata[i]['用户昵称（入会昵称）'].split(" "); 
        tmp+=id_name[1]+' - '+id_name[0]+' - ';
        let start_time=outdata[i]['首次入会时间'].split(" "); 
        let end_time=outdata[i]['最后退会时间'].split(" "); 
        tmp+=start_time[0]+' - '+start_time[1]+' - '+end_time[1]+' - ';
        tmp+='1';
        _this.message[i]=tmp;
        
        //传给后端的数据
        json["CourseId"]=Number(_this.courseid);
        json["StudentId"]=Number(id_name[0]);
        json["IsEffective"]=true
        json["CourseNumber"]=Number(_this.number);
        json["StartTime"]=new Date(outdata[i]['首次入会时间']);
        json["EndTime"]=new Date(outdata[i]['最后退会时间']);
        _this.jsonlist.push(json);
        }
      }
      console.log(_this.jsonlist);
      /*message格式为["1002019 - 数据库 - 1 - 张三 - 200001 - 2.1 - 10:00 - 11.35 - 1",
                      "1002019 - 数据库 - 1 - 张三 - 200001 - 2.3 - 10:00 - 11.35 - 1"];*/
    },  

    uploadFile(){
      let _this=this
      uploadAttendance(_this.jsonlist).then(response=>{
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      }).catch((error)=>{
        this.$message({
          message: '上传失败',
          type: 'warning'
        });
      });
    },

    querySearch(queryString, cb) {
        var strlist = this.courselist;
        var results = queryString ? strlist.filter(this.createFilter(queryString)) : strlist;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    createFilter(queryString) {
      return (strlist) => {
        return (strlist.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
   },

   
  components: {
    AttendanceTable,
  }
}
</script>

<style scoped>
.el-upload{
    margin-top: 30px;
}
.el-input {
  margin-top: 30px;
  size: "medium";
  width:300px
}
.el-autocomplete{
  margin-top: 30px;
  size: "medium";
  width:300px
}
</style>
