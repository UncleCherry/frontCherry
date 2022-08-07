<template>
    <el-container style="height: 100%; margin-top:0px;">
      <el-main style="margin-top:-20px;">
        <div style="border-right: 0; border-bottom: 0; width:100%;">
            <el-transfer
            style="text-align: left; display: inline-block; width:100%;"
            v-model="value"
            filterable
            :left-default-checked="[]"
            :right-default-checked="[]"
            :render-content="renderFunc"
            :titles="['待选', '预选']"
            :button-texts="['取消预选', '预选课程']"
            :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="data">
            <el-button class="transfer-footer" slot="left-footer" size="small">切换选课种类</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">提交选课</el-button>
            </el-transfer>
        </div>
        <ClassTable :msgAppend="selectMsg" :classMsg="existMsg"/>
      </el-main>
    </el-container>
</template>

<script>
import ClassTable from '@/components/ClassTable.vue'
export default {
  name: 'CourseSelect',
  data() {
      //时间格式：周几？-？节，多个时间段用/分开
      const generateData = _ => {
        const data = [{
          key:123456,
          label:'软件工程课程设计 - 2 - 周三10-11节',
        },{
          key:123457,
          label:'软件设计模式 - 2 - 周一10-11节/周四7-8节',
        }];
        // for (let i = 1; i <= 15; i++) {
        //   data.push({
        //     key:123456+i,
        //     label: `课程名称 - 学分 - 上课时间`,
        //     disabled: i % 4 === 0
        //   });
        // }
        return data;
      };
      return {
        data: generateData(),
        value: [],
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        },
        selectMsg:[],
        existMsg:["计算机网络 - 2 - 周一1-2节"]
      };
    },
   methods:{
    handleChange(value, direction, movedKeys) {
      this.selectMsg=[];
      for(var i=0;i<value.length;++i)
      {
        this.selectMsg.push(this.data.find(c => c.key===value[i]).label);
      }
    }
  },    
  components: {
      ClassTable,
  }
}
</script>

<style>
.el-transfer__buttons {
    display: inline-block;
    vertical-align: middle;
    padding: 0 30px;
}
.el-button {
    display:table-cell;
}


.el-transfer-panel {
  width:40%;
}


.el-button--primary:nth-child(1){
  color: #FFF;
    background-color: #ff1e00;
    border-color: #ff1e00;
}
.el-button--primary:nth-child(1):focus, .el-button--primary:nth-child(1):hover{
  color: #FFF;
    background-color: #fb492a;
    border-color: #fb492a;
}
.el-button--primary:nth-child(1):disabled{
  color: #FFF;
    background-color: #ffc3bb;
    border-color: #ffc3bb;
}

</style>