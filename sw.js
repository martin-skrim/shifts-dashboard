// sw.js
const API = 'https://script.google.com/macros/s/AKfycbyFUAo8Nl4wJFItNbbDICQtmt_XC6vVOecWphF714S_I4deQcCRMnhY-_ALyjuW2Kq1/exec';
let prevState = {};

async function poll() {
  try {
    const r    = await fetch(API + '?_=' + Date.now());
    const json = await r.json();
    const emps = json.employees || json;

    emps.forEach(emp => {
      const was = prevState[emp.name];
      if (was === false && emp.onBreak) {
        self.registration.showNotification('☕ Перерыв', {
          body: emp.name + ' ушёл на перерыв',
          icon: '/icon-192.png'
        });
      }
      if (was === true && !emp.onBreak) {
        self.registration.showNotification('✅ Вернулся', {
          body: emp.name + ' вернулся с перерыва',
          icon: '/icon-192.png'
        });
      }
      prevState[emp.name] = emp.onBreak;
    });
  } catch(e) {}
}

// Запускаем поллинг каждые 20 секунд
self.addEventListener('activate', () => {
  setInterval(poll, 20000);
  poll();
});
