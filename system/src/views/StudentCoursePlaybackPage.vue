<template>
  <el-container style="height: 100%; margin-top:0px; margin-left:0px">
    <el-header style=" background-color: #545c64;">
      <span style="color:white;  font-size: 15px;">网课信息</span>
    </el-header>

    <el-main>
        <!-- <h5>&nbsp</h5>
        <el-row :gutter="20">
            <el-col :span="7">
                <el-input placeholder="搜索" v-model="courseData">
                    <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" plain>刷新</el-button>
            </el-col>
        </el-row> -->

        <el-table :data="courseData" border style="width: 100%">
            <el-table-column prop="CourseID" label="课程号" width="100">
            </el-table-column>
            <el-table-column prop="CourseName" label="课程名称" width="180">
            </el-table-column>
            <el-table-column prop="TimeSlot" label="上课时间" width="180">
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
                <el-table-column prop="Time" label="时间" width="120">
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
// export default {
//     data() {
//       return {
//         courseData: [{
//           CourseID: '10000001',
//           CourseName: 'Computer Science',
//           TimeSlot: '周一1-2节/周五3-4节',
//           MeetingID: '822933071'
//         }, {
//           CourseID: '10000002',
//           CourseName: 'Geo Fencing',
//           TimeSlot: '周一3-4节',
//           MeetingID: '646114514'
//         }, {
//           CourseID: '10000003',
//           CourseName: 'Discrete Math',
//           TimeSlot: '周二3-4节/周四10-11节',
//           MeetingID: '9882222001'
//         }, {
//           CourseID: '10000004',
//           CourseName: 'Data Structure',
//           TimeSlot: '周二1-2节/周四3-4节',
//           MeetingID: '121221893'
//         }, {
//           CourseID: '10000005',
//           CourseName: 'Biology Discovery',
//           TimeSlot: '周一5-6节',
//           MeetingID: '778222121'
//         }, {
//           CourseID: '10000006',
//           CourseName: 'Database Principle',
//           TimeSlot: '周三5-6节/周五5-6节',
//           MeetingID: '218839122'
//         }, {
//           CourseID: '66666687',
//           CourseName: 'Hi-Tech Engineering',
//           TimeSlot: '周一10-12节',
//           MeetingID: '9192201190'
//         }], 
//         recordData: [{
//             RecordID: '2890',
//             Time: '2022/8/17',
//             URL: 'https://meeting.tencent.com/dm/1Q7M7NgZQmqF'
//         }, {
//             RecordID: '2891',
//             Time: '2022/8/20',
//             URL: 'https://zoom.com/404'
//         }, {
//             RecordID: '2892',
//             Time: '2022/8/21',
//             URL: 'https://meeting.qq.com/233'
//         }, {
//             RecordID: '2893',
//             Time: '2022/8/22',
//             URL: 'https://meeting.qq.com/2333'
//         }],
//         formVisible: false,
//         formTitle: ''
//       }
//     },
//     methods: {
//         handleRecord(CourseID, CourseName) { //Need: CourseID then search URLs of recorded courses (API).
//             console.log(CourseID, CourseName)
//             this.formVisible = true
//             this.formTitle = CourseID + ' ' + CourseName + '的录播记录'
//             //this.dialogForm.hobby = row.hobby.split('、')
//         }
//     }
// }
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
            //this.dialogForm.hobby = row.hobby.split('、')
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