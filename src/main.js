import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueInputAutowidth from 'vue-input-autowidth'
var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

Vue.use(VueInputAutowidth)

Vue.config.productionTip = false




window.setFormula = function (val, tables, id, date, x, y){
   // var regex = /(?<=\[)(.*?)(?=\])/

   var regex2 = /\[(.*?)\]/g
   return val.replace(regex2, str => {
     var result = str.substring(1, str.length-1)

     parser.setFunction('RANGE', function(...a) {
       var array = []
       for (let i = a[0][0]; i < (y + a[0][1]); i++) {
         array.push(tables[date][id].body[x][i].val.replace(regex2, str2 => {
          var result2 = str2.substring(1, str2.length-1)
          return parser.parse(result2).result
         }))
       }
       return array
     })

     parser.setFunction('FIND_N', function(...a) {

        return a[0][0].filter(function isNumber(n) {  return !isNaN(parseFloat(n)) && isFinite(n)})

     })

     parser.setFunction('IF', function(...a) {

      if(a[0][0] === true){
        return a[0][1]
      }else {
        return a[0][2]
      }

   })

     parser.setFunction('COUNT', function(...a) {

      return a[0][0].length

    })

    //  parser.setFunction("", function(...a) {
    //   var array = []
    //   for (let i = a[0][0]; i < (y + a[0][1]); i++) {
    //     array.push(tables[date][id].body[x][i])
    //   }
    //   return array
    // })



     parser.setFunction('DOT', function(...a) {

      var x1 = a[0][0] == "0" || a[0][0] === undefined ? x : a[0][0]-1
      var y1 = a[0][1] == "0" || a[0][1] === undefined ? y : a[0][1]-1
      var s1 = a[0][2] == "0" || a[0][2] === undefined ? 0 : a[0][2]
      var s2 = a[0][3] == "0" || a[0][3] === undefined ? 0 : a[0][3]

      var sfn = x1 + s1

      if(tables[date][id].body[sfn][y1+s2].val === null){
           while(tables[date][id].body[sfn][y1+s2].val === null){
             if(tables[date][id].body[sfn][y1+s2] === undefined){
               sfn--
               break
             }else {
               sfn--
             }
           }
      }

      var sft = y1 + s2

      if(tables[date][id].body[sfn][sft].val === false){
        while(tables[date][id].body[sfn][sft].val === false){
          if(tables[date][id].body[sfn][sft] === undefined){
            sft--
            break
          }else {
            sft--
          }
        }
      }

      return tables[date][id].body[sfn][sft].val


     });

     return parser.parse(result).result
   })
}

window.tables = [
  {
    name: "Табель",
    allowAddCol: true,
    allowAddRow: true,
    alloDelCol: true,
    allowDelRow: true,
    copyFuture: [["all", "all"]],
    copyPast:  [["all", "all"]],
    body: [
      [{val: "№", row: "2"}, {val: "ФИО", row: "2"}, {val: "Должность", row: "2"}, {val: "Кол-во штатных единиц", row: "2"}, {val: "Числа месяца", col: "32"}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: 'Кол-во [IF(DOT(2, 0, 0, 1) = "дни", "дней", "часов")]', row: "2"}, {val: "Что считать? (дни, часы)"}],
      [{val: null}, {val: null}, {val: null}, {val: null}, {val: "1"}, {val: "2"}, {val: "3"}, {val: "4"}, {val: "5"}, {val: "6"}, {val: "7"}, {val: "8"}, {val: "9"}, {val: "10"}, {val: "11"}, {val: "12"}, {val: "13"}, {val: "14"}, {val: "15"}, {val: "16"}, {val: "17"}, {val: "17"}, {val: "18"}, {val: "19"}, {val: "20"}, {val: "21"}, {val: "22"}, {val: "23"}, {val: "24"}, {val: "25"}, {val: "26"}, {val: "27"}, {val: "28"}, {val: "29"}, {val: "30"}, {val: "31"}, {val: null}, {val: "дни"}],
      [{val: "1"}, {val: ""}, {val: ""}, {val: "1.0"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: '[IF(DOT(2, 0, 0, 1) = "дни", COUNT(FIND_N(RANGE(4, 0))) , SUM(FIND_N(RANGE(4, 0)) ))]'}, {val: ""}],
      [{val: "2"}, {val: ""}, {val: ""}, {val: "0.0"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: '[IF(DOT(2, 0, 0, 1) = "дни", COUNT(FIND_N(RANGE(4, 0))) , SUM(FIND_N(RANGE(4, 0)) ))]'}, {val: ""}],
      [{val: "3"}, {val: ""}, {val: ""}, {val: "0.0"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: '[IF(DOT(2, 0, 0, 1) = "дни", COUNT(FIND_N(RANGE(4, 0))) , SUM(FIND_N(RANGE(4, 0)) ))]'}, {val: ""}],
    ]
  },
  {
    name: "Штатное расписание",
    allowAddCol: true,
    allowAddRow: true,
    alloDelCol: true,
    allowDelRow: true,
    copyFuture: [["all", 0], [0, "all"], [1, "all"]],
    copyPast:  [["all", "all"]],
    body: [
      [{val: "Наименование структурного подразделения", row: "2"}, {val: "Список должностей", row: "2"}, {val: "Кол-во штатных единиц", row: "2"}, {val: "Тарифная ставка (оклад)", row: "2"},  {val: "new coloumn 1", row: "2"}],
      [{val: false}, {val: false}, {val: false}, {val: false}, {val: false}],
      [{val: "1-е подразделение"}, {val: ""}, {val: "0.0"}, {val: ""}, {val: "#{[2, 3] + [this.row, this.col-1]}"}],
      [{val: "2-е подразделение"}, {val: ""}, {val: "0.0"}, {val: ""}, {val: "#{[2, 3] + [this.row, this.col-1]}"}],
      [{val: "3-е подразделение"}, {val: ""}, {val: "0.0"}, {val: ""}, {val: "#{[2, 3] + [this.row, this.col-1]}"}],
    ]
  },
  {
    name: "Сотрудники",
    allowAddCol: true,
    allowAddRow: true,
    alloDelCol: true,
    allowDelRow: true,
    copyFuture: [["all", "all"]],
    copyPast:  [["all", "all"]],
    body: [
      [{val: "№", row: "2"}, {val: "ФИО", row: "2"}, {val: "Год рождения", row: "2"}, {val: "Дата приема на работу", row: "2"}, {val: "Надбавки за стаж", col: "3"}, {val: false}, {val: false}, {val: "Подоходный налог взимается в размере:", row: "2"}, {val: "Налоговый вычет", row: "2"}],
      [{val: false}, {val: false}, {val: false}, {val: false}, {val: "Стаж работы"}, {val: "Выслуга лет в (%)"}, {val: "Прочие надбавки в (%)"}],
      [{val: "1"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "2"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "3"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}]
    ]
  },
  {
    name: "Ведомость",
    allowAddCol: true,
    allowAddRow: true,
    alloDelCol: true,
    allowDelRow: true,
    copyFuture: [["all", "all"]],
    copyPast:  [["all", "all"]],
    body: [
      [{val: "Наименование структурного подразделения", row: "2"}, {val: "№", row: "2"}, {val: "ФИО", row: "2"}, {val: "Должность", row: "2"}, {val: "Кол-во штатных единиц", row: "2"}, {val: "ПФР 22%", row: "2"}, {val: "ФФОМС 5,1%", row: "2"}, {val: "ФСС 2,9%", row: "2"}, {val: "ФСС 0,2%", row: "2"}, {val: "Тарифная ставка (оклад)", row: "2"}, {val: "МРОТ", row: "2"}, {val: "Надбавка за стаж", row: "2"}, {val: "Доведение до средней", row: "2"}, {val: "Отпуск (трудовой, учебный, командировка)", row: "2"}, {val: "Замена", row: "2"}, {val: "Премия", row: "2"}, {val: "Больничный (3 дня)", row: "2"}, {val: "Прочие начисления", row: "2"}, {val: "Итого начислено", row: "2"}, {val: "Подоходный налог 13%", row: "2"}, {val: "Профсоюзный налог 1%", row: "2"}, {val: "Прочие удержания", row: "2"}, {val: "Итого удержано", row: "2"}, {val: "Аванс", row: "2"}, {val: "Сумма к выдаче", row: "2"}],
      [{val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}],
      [{val: "Структурное подразделение 1"}, {val: "1"}, {val: ""}, {val: ""}, {val: "1.0"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "Структурное подразделение 2"}, {val: "2"}, {val: ""}, {val: ""}, {val: "0.0"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "Структурное подразделение 3"}, {val: "3"}, {val: ""}, {val: ""}, {val: "0.0"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}]
    ]
  },
  {
    name: "Отпускные",
    allowAddCol: true,
    allowAddRow: true,
    alloDelCol: true,
    allowDelRow: true,
    copyFuture: [["all", "all"]],
    copyPast:  [["all", "all"]],
    body: [
      [{val: "Наименование структурного подразделения", row: "2"}, {val: "№", row: "2"}, {val: "ФИО", row: "2"}, {val: "Сумма дохода за расчетный период", row: "2"}, {val: "Количество отработанных месяцев", row: "2"}, {val: "Количество дней", col: "2"}, {val: false}, {val: false}, {val: "Средний доход в день", row: "2"}, {val: "Кол-во дней отпуска", row: "2"}, {val: "Сумма отпускных", row: "2"}],
      [{val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: "Всего дней"}, {val: "Из них не отработанно"}, {val: false}, {val: false}, {val: false}],
      [{val: "Структурное подразделение 1"}, {val: "1"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "Структурное подразделение 2"}, {val: "2"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "Структурное подразделение 3"}, {val: "3"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}]
    ]
  },
  {
    name: "Доведение до средней",
    allowAddCol: true,
    allowAddRow: true,
    alloDelCol: true,
    allowDelRow: true,
    copyFuture: [["all", "all"]],
    copyPast:  [["all", "all"]],
    body: [
      [{val: "Наименование структурного подразделения", row: "2"}, {val: "№", row: "2"}, {val: "ФИО", row: "2"}, {val: "Сумма начислений без доведения", row: "2"}, {val: "Сумма доведения", row: "2"}],
      [{val: false}, {val: false}, {val: false}, {val: false}, {val: false}],
      [{val: "Структурное подразделение 1"}, {val: "1"}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "Структурное подразделение 2"}, {val: "2"}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "Структурное подразделение 3"}, {val: "3"}, {val: ""}, {val: ""}, {val: ""}]
    ]
  },
  {
    name: "Стандартный налоговый вычет",
    allowAddCol: true,
    allowAddRow: true,
    alloDelCol: true,
    allowDelRow: true,
    copyFuture: [["all", "all"]],
    copyPast:  [["all", "all"]],
    body: [
      [{val: "№", row: "2"}, {val: "Дата рождения ребенка", row: "2"}, {val: "Справка с места учебы", col: "2"}, {val: false}, {val: "Справка об инвалидности", col: "2"}, {val: false}],
      [{val: false}, {val: false}, {val: "Дата начала"}, {val: "Дата конца"}, {val: "Дата начала"}, {val: "Дата конца"}],
      [{val: "1"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "2"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "3"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}]
    ]
  },
  {
    name: "Статистика",
    allowAddCol: true,
    allowAddRow: true,
    alloDelCol: true,
    allowDelRow: true,
    copyFuture: [["all", "all"]],
    copyPast:  [["all", "all"]],
    body: [
      [{val: "Наименование структурного подразделения", row: "2"}, {val: "№", row: "2"}, {val: "ФИО", row: "2"}, {val: "Январь", row: "2"}, {val: "Февраль", row: "2"}, {val: "Март", row: "2"}, {val: "Апрель", row: "2"}, {val: "Май", row: "2"}, {val: "Июнь", row: "2"}, {val: "Июль", row: "2"}, {val: "Август", row: "2"}, {val: "Сентябрь", row: "2"}, {val: "Октябрь", row: "2"}, {val: "Ноябрь", row: "2"}, {val: "Декабрь", row: "2"}, {val: "Итого", row: "2"}],
      [{val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}, {val: false}],
      [{val: "Структурное подразделение 1"}, {val: "1"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "Структурное подразделение 2"}, {val: "2"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
      [{val: "Структурное подразделение 3"}, {val: "3"}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}]
    ]
  }
]

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
