<template>
  <div>

    <el-table
        :data="listData"
        :span-method="objectSpanMethod"
        class="tableArea"
        border
        style="width: 100%; border: solid 1px"
        :header-cell-style="{borderColor:'black'}"
        :cell-style='cellStyle'>
        <el-table-column
          prop="type"
          label="节次"
          align="center"/>
        <el-table-column
          prop="Mon"
          label="周一"
          align="center"
          width="175"/>
        <el-table-column
          prop="Tue"
          label="周二"
          align="center"
          width="175"
          />
        <el-table-column
          prop="Wed"
          label="周三"
          align="center"
          width="175"
          />
        <el-table-column
          prop="Thur"
          label="周四"
          align="center"
          width="175"
          />
        <el-table-column
          prop="Fri"
          label="周五"
          align="center"
          width="175"
          />
        <el-table-column
          prop="Sat"
          label="周六"
          align="center"
          width="175"
          />
         <el-table-column
          prop="Sun"
          label="周日"
          align="center"
          width="175"
          />

      </el-table>
  </div>
</template>
<script>
export default {
  name: 'myNeedDeal',
  data() {
    return {
      rowList: [],
      spanArr1: [],
      spanArr2: [],
      spanArr3: [],
      spanArr4: [],
      spanArr5: [],
      spanArr6: [],
      spanArr7: [],
      position1: 0,
      position2: 0,
      position3: 0,
      position4: 0,
      position5: 0,
      position6: 0,
      position7: 0,
      listData: [],
      cellColor:'#9C959B',
    }
  },
  props:['classMsg','msgAppend'],
  methods: {
  	initData(){
  		this.listData = [
  			{
        	id:1,
          type:"第一节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:2,
          type:"第二节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:3,
          type:"第三节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:4,
          type:"第四节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:5,
          type:"第五节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:6,
          type:"第六节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:7,
          type:"第七节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:8,
          type:"第八节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:9,
          type:"第九节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:10,
          type:"第十节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:11,
          type:"第十一节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },
        {
        	id:12,
          type:"第十二节课",
          Mon:"",
          Tue:"",
          Wed:"",
          Thur:"",
          Fri:"",
          Sat:"",
          Sun:""
        },

  		];
      for(var i=0;i<this.classMsg.length;++i)
      {
        var nct = this.classMsg[i].split(" - "); //课程名 - 学分 - 时间
        var times=nct[2].split("/");
        for(var j=0;j<times.length;++j)
        {            
          var section=times[j].split("-")
          var start,end;
          if(section.length==2)
          {
            start = parseInt(section[0].substring(1).substring(1));
            end = parseInt(section[1]);
          }
          else
            start=end=parseInt(section[0]);
          for(var k=start;k<=end;++k)
          {
            console.log(k)             
            if(times[j][1]==="一")
            {
              this.listData[k-1].Mon=nct[0];
            }
            else if(times[j][1]==="二")
            {
              this.listData[k-1].Tue=nct[0];
            }
            else if(times[j][1]==="三")
            {
              this.listData[k-1].Wed=nct[0];
            }
            else if(times[j][1]==="四")
            {
              this.listData[k-1].Thur=nct[0];
            }
            else if(times[j][1]==="五")
            {
              this.listData[k-1].Fri=nct[0];
            }
            else if(times[j][1]==="六")
            {
              this.listData[k-1].Sat=nct[0];
            }
            else if(times[j][1]==="日")
            {
              this.listData[k-1].Sun=nct[0];
            }
          }
        }
      };
      this.clear();
		  this.rowspan();
  	},
    clear(){
      this.spanArr1=[];
      this.spanArr2=[];
      this.spanArr3=[];
      this.spanArr4=[];
      this.spanArr5=[];
      this.spanArr6=[];
      this.spanArr7=[];
    },
  	rowspan() {
  		this.listData.forEach((item,index) => {
	    	if( index === 0){
	    		this.spanArr1.push(1);
	    		this.position1 = 0;
                this.spanArr2.push(1);
	    		this.position2 = 0;
                this.spanArr3.push(1);
	    		this.position3 = 0;
                this.spanArr4.push(1);
	    		this.position4 = 0;
                this.spanArr5.push(1);
	    		this.position5 = 0;
                this.spanArr6.push(1);
	    		this.position6 = 0;
                this.spanArr7.push(1);
	    		this.position7 = 0;
	    	}else{
	    		if(this.listData[index].Mon === this.listData[index-1].Mon && this.listData[index].Mon!=""){
	    			this.spanArr1[this.position1] += 1;
	    			this.spanArr1.push(0);
	    		}else{
	    			this.spanArr1.push(1);
	    			this.position1 = index;
	    		}
                if(this.listData[index].Tue === this.listData[index-1].Tue && this.listData[index].Tue!=""){
	    			this.spanArr2[this.position2] += 1;
	    			this.spanArr2.push(0);
	    		}else{
	    			this.spanArr2.push(1);
	    			this.position2 = index;
	    		}
                if(this.listData[index].Wed === this.listData[index-1].Wed && this.listData[index].Wed!=""){
	    			this.spanArr3[this.position3] += 1;
	    			this.spanArr3.push(0);
	    		}else{
	    			this.spanArr3.push(1);
	    			this.position3 = index;
	    		}
                if(this.listData[index].Thur === this.listData[index-1].Thur && this.listData[index].Thur!=""){
	    			this.spanArr4[this.position4] += 1;
	    			this.spanArr4.push(0);
	    		}else{
	    			this.spanArr4.push(1);
	    			this.position4 = index;
	    		}
                if(this.listData[index].Fri === this.listData[index-1].Fri && this.listData[index].Fri!=""){
	    			this.spanArr5[this.position5] += 1;
	    			this.spanArr5.push(0);
	    		}else{
	    			this.spanArr5.push(1);
	    			this.position5 = index;
	    		}
                if(this.listData[index].Sat === this.listData[index-1].Sat && this.listData[index].Sat!=""){
	    			this.spanArr6[this.position6] += 1;
	    			this.spanArr6.push(0);
	    		}else{
	    			this.spanArr6.push(1);
	    			this.position6 = index;
	    		}
                if(this.listData[index].Sun === this.listData[index-1].Sun && this.listData[index].Sun!=""){
	    			this.spanArr7[this.position7] += 1;
	    			this.spanArr7.push(0);
	    		}else{
	    			this.spanArr7.push(1);
	    			this.position7 = index;
	    		}
	    	}
	    })
  	},
    cellStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex === 1&& row.Mon!=''){
           return 'background:'+this.cellColor+";border-color:black!important;"
      }
      if(columnIndex === 2&& row.Tue!=''){
           return 'background:'+this.cellColor+";border-color:black!important;"
      }
      if(columnIndex === 3&& row.Wed!=''){
           return 'background:'+this.cellColor+";border-color:black!important;"
      }
      if(columnIndex === 4&& row.Thur!=''){
           return 'background:'+this.cellColor+";border-color:black!important;"
      }
      if(columnIndex === 5&& row.Fri!=''){
           return 'background:'+this.cellColor+";border-color:black!important;"
      }
      if(columnIndex === 6&& row.Sat!=''){
           return 'background:'+this.cellColor+";border-color:black!important;"
      }
      if(columnIndex === 7&& row.Sun!=''){
           return 'background:'+this.cellColor+";border-color:black!important;"
      }
      return "border-color:black!important;"
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
    	if(columnIndex === 1){
    		const _row1 = this.spanArr1[rowIndex];
    		const _col1 = _row1 >0 ? 1 : 0;
    		return {
    			rowspan: _row1,
    			colspan: _col1
    		}
    	}
        if(columnIndex === 2){

    		const _row2 = this.spanArr2[rowIndex];
    		const _col2 = _row2>0 ? 1 : 0;
    		return {
    			rowspan: _row2,
    			colspan: _col2
    		}
    	}        
        if(columnIndex === 3){
    		const _row3 = this.spanArr3[rowIndex];
    		const _col3 = _row3>0 ? 1 : 0;
    		return {
    			rowspan: _row3,
    			colspan: _col3
    		}
    	}
        if(columnIndex === 4){
    		const _row4 = this.spanArr4[rowIndex];
    		const _col4 = _row4>0 ? 1 : 0;
    		return {
    			rowspan: _row4,
    			colspan: _col4
    		}
    	}
        if(columnIndex === 5){
    		const _row5 = this.spanArr5[rowIndex];
    		const _col5 = _row5>0 ? 1 : 0;
    		return {
    			rowspan: _row5,
    			colspan: _col5
    		}
    	}
        if(columnIndex === 6){
    		const _row6 = this.spanArr6[rowIndex];
    		const _col6 = _row6>0 ? 1 : 0;
    		return {
    			rowspan: _row6,
    			colspan: _col6
    		}
    	}
        if(columnIndex === 7){
    		const _row7 = this.spanArr7[rowIndex];
    		const _col7 = _row7>0 ? 1 : 0;
    		return {
    			rowspan: _row7,
    			colspan: _col7
    		}
    	}
    },

  },

  mounted() {
    this.initData();
  },

  watch:{
    msgAppend:{
      handler(val) {
        this.initData();
        for(var i=0;i<this.msgAppend.length;++i)
        {
          var nct = this.msgAppend[i].split(" - "); //课程名 - 学分 - 时间
          var times=nct[2].split("/");
          for(var j=0;j<times.length;++j)
          {            
            var section=times[j].split("-")
            var start,end;
            if(section.length==2)
            {
              start = parseInt(section[0].substring(1).substring(1));
              end = parseInt(section[1]);
            }
            else
              start=end=parseInt(section[0]);
            for(var k=start;k<=end;++k)
            {             
              if(times[j][1]==="一")
              {
                this.listData[k-1].Mon=nct[0];
              }
              else if(times[j][1]==="二")
              {
                this.listData[k-1].Tue=nct[0];
              }
              else if(times[j][1]==="三")
              {
                this.listData[k-1].Wed=nct[0];
              }
              else if(times[j][1]==="四")
              {
                this.listData[k-1].Thur=nct[0];
              }
              else if(times[j][1]==="五")
              {
                this.listData[k-1].Fri=nct[0];
              }
              else if(times[j][1]==="六")
              {
                this.listData[k-1].Sat=nct[0];
              }
              else if(times[j][1]==="日")
              {
                this.listData[k-1].Sun=nct[0];
              }
            }
          }
        }
        this.clear();
        this.rowspan();
      },
      immediate: true,
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select {
  margin-right: 15px;
}
.el-input {
  margin-right: 15px;
  width: 200px;
}
.tableArea {
  margin-top: 20px;
  box-shadow: 0 0 8px 0 #aaa;
}
i[class^="el-icon"] {
  margin-right: 5px;
  font-size: 16px;
  cursor: pointer;
}
.modify_table{
	td{
		padding: 10px ;
	}
}
.item_title{
	text-align: right;	
}
</style>
 
