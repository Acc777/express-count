<template> 
   <div>
       <input class="btn date" type="month" :value="date" @change="inpDate($event.target.value)"/>
       <h1>{{ table[id].name }}</h1>
       <div class="container">
           <table>
               <tr>
                   <td class="controll"></td>
                   <td class="controll"></td>
                   <td class="controll"></td>
                   <td class="controll add" v-for="(col, ind) in table[id].body[0]" :key="'add_'+ind">
                       <i @click="changeTableComponents(id, 'add', 'col', ind)" class="material-icons">add</i>
                   </td>
               </tr>
               <tr>
                   <td class="controll"></td>
                   <td class="controll"></td>
                   <td class="controll"></td>
                   <td class="controll delete" v-for="(col, ind) in table[id].body[0]" :key="'del_'+ind">
                       <i @click="changeTableComponents(id, 'delete', 'col', ind)" class="material-icons">delete</i>
                   </td>
               </tr>
               <tr>
                   <td class="controll"></td>
                   <td class="controll"></td>
                   <td class="controll"></td>
                   <td class="controll" style="min-width: 30px; color: #b2bec3;" v-for="(col, ind) in table[id].body[0]" :key="'num_'+ind">
                       {{ ind + 1 }}
                   </td>
               </tr>
               <template v-for="(row, ind) in table[id].body">
               <tr :key="ind">
                   <td class="controll add" :key="'add_'+ind+'_2'">
                       <i @click="changeTableComponents(id, 'add', 'row', ind)" class="material-icons">add</i>
                   </td>
                   <td class="controll delete" :key="'del_'+ind+'_2'">
                       <i @click="changeTableComponents(id, 'delete', 'row', ind)" class="material-icons">delete</i>
                   </td>
                   <td class="controll" style="min-width: 30px; color: #b2bec3;" :key="'num_'+ind+'_2'">
                       {{ ind + 1 }}
                   </td>
                   <template
                   v-for="(col, ind2) in row" 
                   >
                   <template v-if="col.val !== null && col.val !== false">
                   <td
                   :key="ind+'_'+ind2"
                   :rowspan="col.row === undefined ? 1 : col.row "
                   :colspan="col.col === undefined ? 1 : col.col"
                   >
                   <input 
                   @dblclick="connectCels($event.target, id, ind, ind2)" 
                   @focus="disableFormula($event.target, col.val, ind, ind2)" 
                   @blur="anableFormula($event.target, col.val)" 
                   @input="inpTable($event.target, $event.target.value, date, id, ind, ind2)"
                   v-autowidth="{maxWidth: '960px', minWidth: '100%', comfortZone: 0}" 
                   :value="activeCell == ind+'_'+ind2 ? col.val : sf(col.val, tables, id, date, ind, ind2)"/>
                   </td>
                   </template>
                   </template>
               </tr>
               </template>
           </table>
       </div>
   </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
     tables: Object,
     table: Array,
     date: String,
     id: Number
  },
   data() {
    return {
      sf: window.setFormula,
      celSwitcher: false,
      activeCell: "null",
      point1: 0,
      point2: 0
    }
  },
  methods: {
      inpDate (val){
          this.$emit('dateChanged', val)
      },
      inpTable (tar, val, date, tid, ind, ind2){
           this.$emit('inputTable', val, date, tid, ind, ind2)
      },
      changeTableComponents (tid, type, line, ind){
            this.$emit('changeTableComponents', tid, type, line, ind)
      },
      disableFormula (el, val, ind, ind2){
            el.value = val
            el.style.background = "#81ecec"
            el.style.cursor = "text"
            console.log(el.value)
            this.activeCell = ind+'_'+ind2
      },
      anableFormula (el, val) {
            el.value = this.sf(val)
            el.style.background = ""
             el.style.cursor = ""
            console.log(el.value)
            this.activeCell = "null"
      },
      connectCels(el, tid, p1, p2) {
          if(this.celSwitcher === true){
              // seckond
              var td = this.$el.getElementsByTagName("input")
              for(var i = 0; i<=td.length-1; i++){
                  td[i].style.background = ""
              }
              this.$emit('connectCels', tid, p1, p2, this.point1, this.point2)
              this.celSwitcher = false
          }else {
              // first
              this.point1 = p1;
              this.point2 = p2;
              el.style.background = "#ffeaa7"
              this.celSwitcher = true
          }
      }

  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
*{
    font-family: 'Roboto', sans-serif;
}
body{
    background: #ffffff;
}
.container{
    overflow-y: auto;
    box-sizing: border-box;
    margin-bottom: 10px;
}
table{
    border-collapse: collapse;
    margin: 10px auto;
    font-weight: 500;
    color: #2d3436;
}
td, th{
    border: 1px solid #b2bec3;
    overflow: hidden;
    height: 30px;
    background: #f5f6fa;
}
.btn{
    font-size: 15px;
    font-weight: 500;
    margin: 0 0 10px 0;
    padding: 7px 15px;
    border: none;
    outline: none;
    background: #00cec9;
    border-radius: 3px;
    box-shadow: 0px 1px 3px #0005;
    color: #fff;
}
.date{
    background: #ff7675;
}
tr input, th input{
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
    border: none;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
    min-height: 100%;
    cursor: cell;
    background: transparent;
}
.delete{
    color: #ff7675;
}
.delete *{
    cursor: pointer;
}
.add{
    color: #55efc4;
    cursor: pointer;
}
.controll{
    border: none;
    background: transparent;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #dfe6e9; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #b2bec3; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #636e72; 
}
</style>