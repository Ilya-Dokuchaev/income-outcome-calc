// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'
// Custom JS
//income inputs
const incomeSalary = document.getElementById("income-salary"),
  incomeFreelance = document.getElementById("income-freelance"),
  incomeExtra1 = document.getElementById("income-extra-1"),
  incomeExtra2 = document.getElementById("income-extra-2");
//costs inputs
const costsFlat = document.getElementById("costs-flat"),
  costsHS = document.getElementById("costs-house-services"),
  costsTransport = document.getElementById("costs-transport"),
  costsFood = document.getElementById("costs-food");

//total outcomes
const totalMonthInput = document.getElementById("total-month"),
  totalDayInput = document.getElementById("total-day"),
  totalYearInput = document.getElementById("total-year");

let totalMonth, totalDay, totalYear;

//money-box
const moneyBoxRange = document.getElementById("money-box-range"),
  accumulationInput = document.getElementById("accumulation"),
  spend = document.getElementById("spend");

let accumulation = 0;
let totalPercents = 0;
//перезаписываем при изменении в imputs
const inputs = document.querySelectorAll(".input");
for (let input of inputs) {
  input.addEventListener("input", () => {
    countingAvailable();
    calcPercents();
  });
}

const strToNum = (str) => (str.value ? parseInt(str.value) : 0);
//считаем доступную сумму в месяц
const countingAvailable = () => {
  const totalPerMonth =
    strToNum(incomeSalary) +
    strToNum(incomeFreelance) +
    strToNum(incomeExtra1) +
    strToNum(incomeExtra2);
  const totalCosts =
    strToNum(costsFlat) +
    strToNum(costsHS) +
    strToNum(costsTransport) +
    strToNum(costsFood);

  totalMonth = totalPerMonth - totalCosts;
  totalMonthInput.value = totalMonth;
};
//копилка
moneyBoxRange.addEventListener("input", (e) => {
  const totalPercentEl = document.getElementById("total-percents");
  if (!totalMonth || totalMonth <= 0) {
    totalPercents.value = 0;
    totalPercentEl.innerHTML = totalPercents;
    return;
  }
  totalPercents = e.target.value;
  totalPercentEl.innerHTML = totalPercents;
  calcPercents();
});

const calcPercents = () => {
  accumulation = ((totalMonth * totalPercents) / 100).toFixed();
  accumulationInput.value = accumulation;

  spend.value = totalMonth - accumulation;
  if (!spend.value || spend.value <= 0) {
    totalDay = 0;
    totalDayInput.value = totalDay;
    totalYear = accumulation * 12;
    totalYearInput.value = totalYear;
    return;
  }
  totalDay = (spend.value / 30).toFixed();
  totalDayInput.value = totalDay;

  totalYear = accumulation * 12;
  totalYearInput.value = totalYear;
};
