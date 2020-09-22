<template>
  <div class="home">
    <Table :tables="tables" :table="tables[date]" :id="id" :date="date" @connectCels="connectCels" @inputTable="tableDataChanged" @dateChanged="tableDateChanged" @changeTableComponents="changeTableCmp"/>
    <button style="margin-left: 10px;" class="colourful btn" v-for="(table, index) in extables" @click="id = index" :key="index">
      {{ table.name }}
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

import Table from '@/components/Table.vue'

var store = require('store')

export default {
  name: 'Home',
  components: {
    Table
  },
  data() {
    return {
     extables: window.tables,
     date: new Date().getFullYear()+"-"+(new Date().getMonth()+1 <= 9 ? "0"+(new Date().getMonth()+1) : new Date().getMonth()+1),
     tables: store.get("tables") || {},
     id: 0 
    }
  },
  created() {
     if(!store.get("tables")){
       store.set("tables", {
       [this.date]: window.tables
     })
     }
     this.tables = store.get("tables")
     this.updateTables(this.date)
  },
  methods: {
    tableDateChanged (date){
       this.updateTables(date)
       this.date = date
    },
    tableDataChanged (val, date, tid, row, col){
      var tables = JSON.parse(JSON.stringify(store.get("tables")))
      tables[date][tid].body[row][col].val = val
      store.set("tables", tables)
      this.tables = store.get("tables")
    },
    changeTableCmp (tid, type, line, ind){
      var i, tables = JSON.parse(JSON.stringify(store.get("tables")))
      if(type == "delete" && line == "col"){
      
     if(confirm("Вы уверенны что хотите удалить столбец номер "+(ind+1)+"?") == true){

      for(i = 0; i<=tables[this.date][tid].body.length-1; i++){
        if(tables[this.date][tid].body[i][ind].val === false){
          var ni = ind
          while(tables[this.date][tid].body[i][ni].val === false) {
            if(tables[this.date][tid].body[i][ni] === undefined){
              ni--
              break
            }else {
              ni--
            }
          }
          if(tables[this.date][tid].body[i][ni].col){
          tables[this.date][tid].body[i][ni].col = String(Number(tables[this.date][tid].body[i][ni].col)-1)
          }
          if(Number(tables[this.date][tid].body[i][ni].col) < 2){
            delete tables[this.date][tid].body[i][ni].col
          }
         
      
        }else if(tables[this.date][tid].body[i][ind].col !== undefined){
          var isn = Number(tables[this.date][tid].body[i][ind].col)
          if(tables[this.date][tid].body[i][ind].row !== undefined){
            var isnr = Number(tables[this.date][tid].body[i][ind].row)
            for(var f = 0; f <= isnr-1; f++){
              for(var t = 0; t <= isn-1; t++){
                tables[this.date][tid].body[i+f][ind+t].val = ""
                if(tables[this.date][tid].body[i+f][ind+t].col){
                   delete tables[this.date][tid].body[i+f][ind+t].col
                }
                if(tables[this.date][tid].body[i+f][ind+t].row){
                   delete tables[this.date][tid].body[i+f][ind+t].row
                }
              }
            }
          }else {
           
             for(var j = 0; j <= isn-1; j++){
               tables[this.date][tid].body[i][ind+j].val = ""
             }
          }
        }
      }

      
       
          for(i = 0; i<=tables[this.date][tid].body.length-1; i++){
            tables[this.date][tid].body[i].splice(ind, 1)
          }

      }

      }else if(type == "delete" && line == "row"){

     if(confirm("Вы уверенны что хотите удалить строку номер "+(ind+1)+"?") == true){
     
      for(var k = 0; k <= tables[this.date][tid].body[ind].length-1; k++){
        if(tables[this.date][tid].body[ind][k].val === null){
          var ion = ind
          while(tables[this.date][tid].body[ion][k].val === null) {
            if(tables[this.date][tid].body[ion][k] === undefined){
            ion--
            break 
            }else {
              ion--
            }
          }
         
          if(tables[this.date][tid].body[ion][k].row){
            tables[this.date][tid].body[ion][k].row = Number(tables[this.date][tid].body[ion][k].row)-1
          }
          if(Number(tables[this.date][tid].body[ion][k].row) < 2){
            delete tables[this.date][tid].body[ion][k].row
          }

        }else if(tables[this.date][tid].body[ind][k].row !== undefined){
          var indon = Number(tables[this.date][tid].body[ind][k].row)
          if(tables[this.date][tid].body[ind][k].col !== undefined){
            //
            var indonc = Number(tables[this.date][tid].body[ind][k].col)
            for(var tc = 0; tc <= indon-1; tc++){
              for(var h = 0; h <= indonc-1; h++){
                tables[this.date][tid].body[ind + tc][k + h].val = ""
                if(tables[this.date][tid].body[ind + tc][k + h].row){
                  delete tables[this.date][tid].body[ind + tc][k + h].row
                }
                if( tables[this.date][tid].body[ind + tc][k + h].col){
                  delete tables[this.date][tid].body[ind + tc][k + h].col
                }
              }
            }
          }else {
            for(var inr = 0; inr <= indon-1; inr++){
              tables[this.date][tid].body[ind + inr][k].val = ""
            }
          }
        }

       
      }


      
          tables[this.date][tid].body.splice(ind, 1)
       }
     
      }else if(type == "add" && line == "col"){
       
        for(i = 0; i<=tables[this.date][tid].body.length-1; i++){
          if(tables[this.date][tid].body[i][ind].val === false){
             var nia = ind
             while(tables[this.date][tid].body[i][nia].val === false) {
               if(tables[this.date][tid].body[i][nia] === undefined){
               nia--
               break
               }else {
                 nia--
               }
             } 
            if(tables[this.date][tid].body[i][nia].col){
               tables[this.date][tid].body[i][nia].col = String(Number(tables[this.date][tid].body[i][nia].col)+1)
            }
            tables[this.date][tid].body[i].splice(ind+1, 0, {val: false})
          }else if(tables[this.date][tid].body[i][ind].col !== undefined){
            tables[this.date][tid].body[i][ind].col = String(Number(tables[this.date][tid].body[i][ind].col) + 1)
            tables[this.date][tid].body[i].splice(ind+1, 0, {val: false})
          }else if(tables[this.date][tid].body[i][ind].val === null){
            var nit = i
            while(tables[this.date][tid].body[nit][ind].val === null){
              if(tables[this.date][tid].body[nit][ind] === undefined){
                nit--
                break
              }else {
                nit--
              }
            }
            if(tables[this.date][tid].body[nit][ind].val === false){
              tables[this.date][tid].body[i].splice(ind+1, 0, {val: false})
            }else if(tables[this.date][tid].body[nit][ind].col !== undefined){
              tables[this.date][tid].body[i].splice(ind+1, 0, {val: false})
            }else {
              tables[this.date][tid].body[i].splice(ind+1, 0, {val: ""})
            }
    
          }else{
            tables[this.date][tid].body[i].splice(ind+1, 0, {val: ""})
          }
        }
        
      }else if(type == "add" && line == "row"){
       
        var arr = []
        for(var kr = 0; kr <= tables[this.date][tid].body[ind].length-1; kr++){
          if(tables[this.date][tid].body[ind][kr].val === null){
              var ionr = ind
              while(tables[this.date][tid].body[ionr][kr].val === null) {
                if(tables[this.date][tid].body[ionr][kr] === undefined){
                 ionr--
                 break
                }else {
                  ionr--
                }
              }  
             
              if(tables[this.date][tid].body[ionr][kr].row){
                tables[this.date][tid].body[ionr][kr].row = String(Number(tables[this.date][tid].body[ionr][kr].row) + 1)
              }
              
              arr[kr] = {val: null}
          }else if(tables[this.date][tid].body[ind][kr].row !== undefined){
              tables[this.date][tid].body[ind][kr].row = String(Number(tables[this.date][tid].body[ind][kr].row) + 1)
              arr[kr] = {val: null}
          }else if(tables[this.date][tid].body[ind][kr].val === false){
              arr[kr] = {val: false}
          }else if(tables[this.date][tid].body[ind][kr].col !== undefined){
              arr[kr] = {val: "", col: tables[this.date][tid].body[ind][kr].col}
          }else {
              arr[kr] = {val: ""}
          }
        }
        tables[this.date][tid].body.splice(ind+1, 0, arr)

      }
      store.set("tables", tables)
      this.tables = store.get("tables")
    },
    updateTables (date){
        if(typeof store.get("tables")[date] === "undefined"){
          // alert(typeof store.get("tables")[date])
          var tables = store.get("tables")
          var dates = []
          var least;
          var last;
          for(var key in tables){
              dates.push(key)
          }
          dates.push(date)
          dates.sort()
          least = dates[dates.indexOf(date)-1]
          last = dates[dates.indexOf(date)+1]

          if (typeof least !== "undefined"){
            //up
            var pushTables = JSON.parse(JSON.stringify(tables))
            var dateTable = []
            for(var v = 0; v<=tables[least].length-1; v++){

            var table = JSON.parse(JSON.stringify(tables[least][v]))
            var newTable = JSON.parse(JSON.stringify(tables[least][v]))
            newTable.body = [];
          
            for(var i = 0; i<=table.copyFuture.length-1; i++){
            
              if(table.copyFuture[i][0] === "all" && table.copyFuture[i][1] === "all"){
                for(var j = 0; j<=table.body.length-1; j++){
                    for(var k = 0; k<=table.body[j].length-1; k++){
                      table.body[j][k].copy = true
                    }
                }
              }else if(table.copyFuture[i][0] === "all" && table.copyFuture[i][1] !== "all"){
                for(var j3 = 0; j3<=table.body.length-1; j3++){
                    table.body[j3][table.copyFuture[i][1]].copy = true
                }
              }else if(table.copyFuture[i][0] !== "all" && table.copyFuture[i][1] === "all"){
                for(var j2 = 0; j2<=table.body[table.copyFuture[i][0]].length-1; j2++){
                    table.body[table.copyFuture[i][0]][j2].copy = true
                }
              }else if(table.copyFuture[i][0] !== "all" && table.copyFuture[i][1] !== "all"){
                table.body[table.copyFuture[i][0]][table.copyFuture[i][1]].copy = true
              }
            }

            for(var b = 0; b<=table.body.length-1; b++){
              newTable.body[b] = [];
              for(var c = 0; c<=table.body[b].length-1; c++){
                 if(table.body[b][c].copy === true){
                   newTable.body[b][c] = table.body[b][c]
                   delete newTable.body[b][c].copy
                 }else {
                   newTable.body[b][c] = table.body[b][c]
                   delete newTable.body[b][c].copy
                   if(typeof newTable.body[b][c].val === 'string'){
                     newTable.body[b][c].val = ""
                   }
                 }
              }
            }

            dateTable.push(newTable)
        
          }

          pushTables[date] = dateTable

          store.set("tables", pushTables)
          this.tables = store.get("tables")

          }else {
            //down
            
            var pushTables2 = JSON.parse(JSON.stringify(tables))
            var dateTable2 = []
            for(var v23 = 0; v23<=tables[last].length-1; v23++){

            var table2 = JSON.parse(JSON.stringify(tables[last][v23]))
            var newTable2 = JSON.parse(JSON.stringify(tables[last][v23]))
            newTable2.body = [];
          
            for(var i23 = 0; i23<=table2.copyPast.length-1; i23++){
            
              if(table2.copyPast[i23][0] === "all" && table2.copyPast[i23][1] === "all"){
                for(var j23 = 0; j23<=table2.body.length-1; j23++){
                    for(var k23 = 0; k23<=table2.body[j23].length-1; k23++){
                      table2.body[j23][k23].copy = true
                    }
                }
              }else if(table2.copyPast[i23][0] === "all" && table2.copyPast[i23][1] !== "all"){
                for(var j323 = 0; j323<=table2.body.length-1; j323++){
                    table2.body[j323][table2.copyPast[i23][1]].copy = true
                }
              }else if(table2.copyPast[i23][0] !== "all" && table2.copyPast[i23][1] === "all"){
                for(var j223 = 0; j223<=table2.body[table2.copyPast[i23][0]].length-1; j223++){
                    table2.body[table2.copyPast[i23][0]][j223].copy = true
                }
              }else if(table2.copyPast[i23][0] !== "all" && table2.copyPast[i23][1] !== "all"){
                table2.body[table2.copyPast[i23][0]][table2.copyPast[i23][1]].copy = true
              }
            }

            for(var b23 = 0; b23<=table2.body.length-1; b23++){
              newTable2.body[b23] = [];
              for(var c23 = 0; c23<=table2.body[b23].length-1; c23++){
                 if(table2.body[b23][c23].copy === true){
                   newTable2.body[b23][c23] = table2.body[b23][c23]
                   delete newTable2.body[b23][c23].copy
                 }else {
                   newTable2.body[b23][c23] = table2.body[b23][c23]
                   delete newTable2.body[b23][c23].copy
                   newTable2.body[b23][c23].val = ""
                 }
              }
            }

            dateTable2.push(newTable2)
        
          }

          pushTables2[date] = dateTable2

          store.set("tables", pushTables2);
          this.tables = store.get("tables")

          }

        }
    },
    connectCels (tid, p1, p2, p21, p22){

      var tables = JSON.parse(JSON.stringify(store.get("tables")))

      
      var nofrows = tables[this.date][tid].body[p21][p22].row === undefined ? 1 : Number(tables[this.date][tid].body[p21][p22].row)
      var nofcols = tables[this.date][tid].body[p21][p22].col === undefined ? 1 : Number(tables[this.date][tid].body[p21][p22].col)
      
      var nocols2 = tables[this.date][tid].body[p1][p2].col === undefined ? 1 : Number(tables[this.date][tid].body[p1][p2].col)
      var norows2 = tables[this.date][tid].body[p1][p2].row === undefined ? 1 : Number(tables[this.date][tid].body[p1][p2].row)

      var elem = p21 + nofrows
      var elem2 = p22 + nofcols

      var elem3 = p1 + norows2
      var elem4 = p2 + nocols2

     if((p1 == p21 && (elem2 == p2 || p2 == p22-1 || elem4 == p22)) || (p2 == p22 && (elem == p1 || p1 == p21 - 1 || elem3 == p21)) || (p1 == p21 && p2 == p22)){
     
      if(p2 == p22 && p1 == p21){
        if(tables[this.date][tid].body[p21][p22].row !== undefined){
          tables[this.date][tid].body[p21][p22].row = String(Number(tables[this.date][tid].body[p21][p22].row) - 1)
          if(tables[this.date][tid].body[p21][p22].row < 2){
             delete tables[this.date][tid].body[p21][p22].row
          }
          
          var n = 1;
          while(tables[this.date][tid].body[p21+n][p22].val === null){
            if(tables[this.date][tid].body[p21+(n+1)] === undefined){
              n++
              break
            }else {
              n++
            }
          }
         
         tables[this.date][tid].body[p21+(n-1)][p22].val = ""
        for(var s = 0; s<=tables[this.date][tid].body[p21][p22].col-1; s++){
         tables[this.date][tid].body[p21+(n-1)][p22+s].val = ""
         if(tables[this.date][tid].body[p21+(n-1)][p22+s].col){
           delete tables[this.date][tid].body[p21+(n-1)][p22+s].col
         }
         if(tables[this.date][tid].body[p21+(n-1)][p22+s].row){
           delete tables[this.date][tid].body[p21+(n-1)][p22+s].row
         }
        }

        }else if(tables[this.date][tid].body[p21][p22].col !== undefined){
          tables[this.date][tid].body[p21][p22].col = String(Number(tables[this.date][tid].body[p21][p22].col) - 1)
          if(tables[this.date][tid].body[p21][p22].col < 2){
             delete tables[this.date][tid].body[p21][p22].col
          }

          var n23 = 1;
          
            while(tables[this.date][tid].body[p21][Number(p22)+n23].val === false){
              if(tables[this.date][tid].body[p21][Number(p22)+(n23+1)] === undefined){
                n23++
                break
              }else {
                n23++
              }
            }
        
         tables[this.date][tid].body[p21][p22+(n23-1)].val = ""
         if(tables[this.date][tid].body[p21][p22+(n23-1)].col){
           delete tables[this.date][tid].body[p21][p22+(n23-1)].col
         }
        }
      
      }else if(p1 == p21){
        if(tables[this.date][tid].body[p1][p2].row === tables[this.date][tid].body[p21][p22].row){
          if(p22 > p2){
          var n31 = tables[this.date][tid].body[p21][p22].col === undefined ? 1 : Number(tables[this.date][tid].body[p21][p22].col)
          var n32 = tables[this.date][tid].body[p1][p2].col === undefined ? 1 : Number(tables[this.date][tid].body[p1][p2].col)
          tables[this.date][tid].body[p1][p2].col = String(n31 + n32)
          tables[this.date][tid].body[p21][p22].val = false
          if(tables[this.date][tid].body[p21][p22].row){
            delete tables[this.date][tid].body[p21][p22].row
          }
          }else if(p22 < p2){
          var n321 = tables[this.date][tid].body[p21][p22].col === undefined ? 1 : Number(tables[this.date][tid].body[p21][p22].col)
          var n322 = tables[this.date][tid].body[p1][p2].col === undefined ? 1 : Number(tables[this.date][tid].body[p1][p2].col)
          tables[this.date][tid].body[p21][p22].col = String(n321 + n322)
          tables[this.date][tid].body[p1][p2].val = false
          if(tables[this.date][tid].body[p1][p2].row){
            delete tables[this.date][tid].body[p1][p2].row
          }
          }
        }
      }else if(p2 == p22){
        if(tables[this.date][tid].body[p1][p2].col === tables[this.date][tid].body[p21][p22].col){
       
            if(p21 > p1){
             var n1 = tables[this.date][tid].body[p1][p2].row === undefined ? 1 : Number(tables[this.date][tid].body[p1][p2].row)
             var n2 = tables[this.date][tid].body[p21][p22].row === undefined ? 1 : Number(tables[this.date][tid].body[p21][p22].row)
             tables[this.date][tid].body[p1][p2].row = String(n1 + n2)
             tables[this.date][tid].body[p21][p22].val = null
             if(tables[this.date][tid].body[p21][p22].col){
                delete tables[this.date][tid].body[p21][p22].col
             }
            }else if(p21 < p1){
            var n21 = tables[this.date][tid].body[p21][p22].row === undefined ? 1 : Number(tables[this.date][tid].body[p21][p22].row)
            var n22 = tables[this.date][tid].body[p1][p2].row === undefined ? 1 : Number(tables[this.date][tid].body[p1][p2].row)
             tables[this.date][tid].body[p21][p22].row = String(n21 + n22)
             tables[this.date][tid].body[p1][p2].val = null
             if(tables[this.date][tid].body[p1][p2].col){
                delete tables[this.date][tid].body[p1][p2].col
             }
            }
         
        }
      }
     }
      store.set("tables", tables)
      this.tables = store.get("tables")
    }
  }
}
</script>
