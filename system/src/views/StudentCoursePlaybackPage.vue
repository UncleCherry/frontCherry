<template>
  <el-container style="height: 100%; margin-top:0px; margin-left:0px">
    <el-header style=" background-color: #545c64;">
      <span style="color:white;  font-size: 15px;">网课信息</span>
    </el-header>

    <el-main>
        <el-table :data="courseData" border style="width: 100%">
            <el-table-column prop="CourseID" label="课程号" width="150">
            </el-table-column>
            <el-table-column prop="CourseName" label="课程名称" width="300">
            </el-table-column>
            <el-table-column prop="TimeSlot" label="上课时间" width="300">
            </el-table-column>
            <el-table-column prop="MeetingID" label="会议号">
            </el-table-column>
            <el-table-column label="录播" width="80">
                <template slot-scope="scope">
                    <el-button type="primary" plain icon="el-icon-caret-right" circle
                        @click="handleRecord(scope.row.CourseID, scope.row.CourseName)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title=formTitle :visible.sync="formVisible" width="60%">
            <el-table :data="recordData" height="400" border style="width: 100%">
                <el-table-column prop="RecordID" label="录播ID" width="120">
                </el-table-column>
                <el-table-column prop="Time" label="时间" width="180">
                </el-table-column>
                <el-table-column prop="URL" label="回看链接">
                    <template slot-scope="scope">
                        <el-link :href="scope.row.URL" target="_blank" type="primary">{{scope.row.URL}}
                        </el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="hints">TIP：点击链接回看录播。</div>
        </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { getStudentCourse } from '@/api/course'
import { getRecordInfo } from '@/api/record' 
export default {
    name: 'ClassSchedulePage',
    created() {
        getStudentCourse().then(response => {
            this.$message({
                message: '获取课程信息成功',
                type: 'success'
            });
            this.courseMsg = response.data.CoursesList
            this.processData()
        }).catch((error) => {
            this.$message({
                message: '获取课程信息失败',
                type: 'warning'
            });
        })
    },
    data() {
        const generateData = _ => {
            const courseData = [{
                CourseID: '66666677',
                CourseName: 'Photograph Skills',
                TimeSlot: '周三 7-8节',
                MeetingID: 'https://meeting.tencent.com/dm/1Q7M7NgZQmqF',
            }];
            return courseData;
        };
        return {
            courseData: [],
            courseMsg: [],
            recordData: [],
            recordMsg: [],
            year:"2022",
            semester: "第二学期",
            formVisible: false,
            formTitle: ''
        }
    },
    methods: {
        processData() {
            var len = this.courseMsg.length;
            console.log(len);
            if (len)
                for (var i = 0; i < len; i++) {
                    if (this.courseMsg[i].Year == this.year && this.courseMsg[i].Semester == this.semester) {
                        var s = {
                            CourseID: this.courseMsg[i].CourseID,
                            CourseName: this.courseMsg[i].CourseName,
                            TimeSlot: this.courseMsg[i].TimeSlot,
                            MeetingID: this.courseMsg[i].MeetingID
                        }
                        this.courseData.push(s);
                    }
                }

        },
        handleRecord(CourseID, CourseName) { 
            console.log(CourseID, CourseName)
            var param = {
              courseid: CourseID
            }
            this.formVisible = true
            this.formTitle = CourseID + ' ' + CourseName + '的录播记录'
            getRecordInfo(param).then(response => {
                this.$message({
                    message: '获取录播信息成功',
                    type: 'success'
                });
                this.recordMsg = response.data.RecordsList
                this.processRecord()
            }).catch((error) => {
                this.$message({
                    message: '获取录播信息失败',
                    type: 'warning'
                });
            })
        },
        processRecord() {
            var rlen = this.recordMsg.length;
            console.log(rlen);
            if (rlen) {
                for (var i = 0; i < rlen; i++) {
                    var s = {
                        RecordID: this.recordMsg[i].RecordID,
                        Time: this.recordMsg[i].Time,
                        URL: this.recordMsg[i].Url
                    }
                    this.courseData.push(s);
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>