# 🖼 Схема работы Node.js Event Loop

```
+-----------------------------------------------------+
|                     Call Stack                      |
|  (синхронный код выполняется здесь)                |
+-----------------------------------------------------+
                |
                v
+-----------------------------------------------------+
|                     Event Loop                      |
|    1. Microtask Queue (Promises, process.nextTick) |
|    2. Timers Queue (setTimeout, setInterval)       |
|    3. I/O Callbacks (fs, net, DB)                 |
|    4. setImmediate Queue                            |
+-----------------------------------------------------+
                |
                v
+-----------------------------------------------------+
|                Thread Pool (libuv)                 |
|  - fs, crypto, DNS, zlib                           |
|  - многопоточно (default 4 threads)               |
+-----------------------------------------------------+
```

---

# 🔹 Пояснение блоков

### 1️⃣ Call Stack

* Все **синхронные функции** выполняются здесь.
* Пока стек занят, Event Loop **не может обработать асинхронные задачи**.

---

### 2️⃣ Event Loop

* Главный цикл Node.js, который **проверяет очереди и запускает callback’и**.
* **Microtasks (Promises, process.nextTick)** → выполняются **перед следующими tick’ами Event Loop**.
* **Timers (setTimeout/setInterval)** → выполняются после истечения таймера.
* **I/O callbacks** → после завершения асинхронной операции в Thread Pool.
* **setImmediate** → выполняется в фазе Check после I/O.

---

### 3️⃣ Thread Pool (libuv)

* Node.js самодостаточен для неблокирующих I/O, но **CPU-heavy операции** идут в Thread Pool.
* По умолчанию **4 потока**, можно увеличить через `UV_THREADPOOL_SIZE`.
* Примеры:

  * `fs.readFile`
  * `crypto.pbkdf2`
  * `zlib.compress`

> Worker Threads — отдельные JS-потоки, которые могут выполнять CPU-heavy задачи, не блокируя Event Loop.

---

# 🔹 Порядок выполнения задач (tick)

```js
console.log('sync');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));

setImmediate(() => console.log('immediate'));
```

**Вывод:**

```
sync
promise
immediate
timeout
```

* Promises → microtasks queue
* setImmediate → следующая фаза Event Loop
* setTimeout → timers queue

---

# 🔹 Worker Threads

### Зачем нужны

* Выполняем тяжелые вычисления без блокировки Event Loop

### Пример

```js
const { Worker } = require('worker_threads');

const worker = new Worker(`
  const { parentPort } = require('worker_threads');
  let sum = 0;
  for (let i = 0; i < 1e9; i++) sum += i;
  parentPort.postMessage(sum);
`, { eval: true });

worker.on('message', msg => console.log('Result:', msg));
```

* Main thread остаётся responsive → Node.js продолжает обслуживать запросы

---

# 🔹 Параллельные I/O через async/await + Promise.all

```js
async function fetchData() {
  const [users, orders] = await Promise.all([
    fetch('http://service/users').then(r => r.json()),
    fetch('http://service/orders').then(r => r.json())
  ]);
  console.log(users, orders);
}
```

* Несколько асинхронных операций выполняются **одновременно**
* Event Loop обрабатывает результат, когда каждый промис завершится

---

# 🔹 Потенциальные проблемы в продакшене

| Проблема                         | Симптом             | Решение                               |
| -------------------------------- | ------------------- | ------------------------------------- |
| Блокировка Event Loop            | сервер не отвечает  | Worker Threads / offload CPU tasks    |
| Долгие I/O без concurrency limit | latency растёт      | Promise.all с лимитом / p-limit       |
| Unhandled Promise                | ошибки падают       | try/catch / .catch()                  |
| Overload на Thread Pool          | slow fs / crypto    | увеличить UV_THREADPOOL_SIZE          |
| Таймеры и microtasks             | неожиданный порядок | понимать microtask vs macrotask queue |

---

# 🎯 Ключевые принципы для собеса

1. Node.js **асинхронен по умолчанию**, Event Loop управляет I/O.
2. **CPU-heavy задачи нужно выносить в Worker Threads**.
3. **Microtasks (Promise) выполняются раньше timers и setImmediate**.
4. Для высоконагруженных приложений — контролируем **parallelism и backpressure**.
5. **Event Loop lag** → главный индикатор проблем в Node.js сервисе.