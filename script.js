let tables = [];
let activeTableId = null;
let menu = {
  "المكرونة": [{ name: "مكرونة صغير", price: 25 }],
  "الكشري": [{ name: "كشري صغير", price: 25 }],
};

// تحميل القائمة
function loadMenu() {
  const savedMenu = localStorage.getItem("menu");
  if (savedMenu) menu = JSON.parse(savedMenu);
  buildMenu();
}

// حفظ القائمة
function saveMenu() {
  localStorage.setItem("menu", JSON.stringify(menu));
}

// إنشاء الترابيزات
function createTables() {
  const numTables = parseInt(document.getElementById("num-tables").value);
  const tablesContainer = document.getElementById("tables");
  tablesContainer.innerHTML = "";
  tables = [];

  for (let i = 1; i <= numTables; i++) {
    const table = { id: i, orders: [] };
    tables.push(table);

    const tableDiv = document.createElement("div");
    tableDiv.innerHTML = `
      <h3>ترابيزة ${i}</h3>
      <div id="orders-${i}"></div>
      <p id="total-${i}">الإجمالي: 0</p>
      <button onclick="endOrder(${i})">إنهاء الأوردر</button>`;
    tableDiv.classList.add("table");
    tableDiv.addEventListener("click", () => openMenu(i));
    tablesContainer.appendChild(tableDiv);
  }
}

// بناء القائمة
function buildMenu() {
  const menuDiv = document.querySelector(".menu");
  menuDiv.innerHTML = "";

  for (const section in menu) {
    const sectionDiv = document.createElement("div");
    sectionDiv.innerHTML = `<h3>${section}</h3>`;
    menu[section].forEach((dish) => {
      const dishButton = document.createElement("button");
      dishButton.textContent = `${dish.name} - ${dish.price}`;
      dishButton.onclick = () => addOrder(dish.name, dish.price);
      sectionDiv.appendChild(dishButton);
    });
    menuDiv.appendChild(sectionDiv);
  }
}

// فتح القائمة
function openMenu(tableId) {
  activeTableId = tableId;
  document.getElementById("menu-popup").style.display = "block";
}

// إغلاق القائمة
function closeMenu() {
  document.getElementById("menu-popup").style.display = "none";
}

// إضافة طلب
function addOrder(name, price) {
  const table = tables.find((t) => t.id === activeTableId);
  table.orders.push({ name, price });
  displayOrders(table);
  closeMenu();
}

// عرض الطلبات
function displayOrders(table) {
  const ordersDiv = document.getElementById(`orders-${table.id}`);
  ordersDiv.innerHTML = "";
  let total = 0;

  table.orders.forEach((order) => {
    total += order.price;
    ordersDiv.innerHTML += `${order.name} - ${order.price}<br>`;
  });

  document.getElementById(`total-${table.id}`).textContent = `الإجمالي: ${total}`;
}

// إنهاء الأوردر
function endOrder(tableId) {
  const table = tables.find((t) => t.id === tableId);
  table.orders = [];
  displayOrders(table);
  alert(`تم إنهاء الأوردر للترابيزة ${tableId}`);
}

// إدارة القائمة
function openAdminPanel() {
  document.getElementById("admin-popup").style.display = "block";
}

function closeAdminPanel() {
  document.getElementById("admin-popup").style.display = "none";
}

// بدء التطبيق
loadMenu();
