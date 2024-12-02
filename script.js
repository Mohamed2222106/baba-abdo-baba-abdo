let tables = [];
let activeTableId = null;

// القائمة الافتراضية
let menu = {
  "المكرونة": [
    { name: "مكرونة صغير", price: 25 },
    { name: "مكرونة وسط", price: 30 },
  ],
  "الكشري": [
    { name: "كشري صغير", price: 25 },
    { name: "كشري وسط", price: 30 },
  ],
};

// تحميل القائمة من التخزين المحلي أو القائمة الافتراضية
function loadMenu() {
  const savedMenu = localStorage.getItem("menu");
  if (savedMenu) {
    menu = JSON.parse(savedMenu);
  }
  buildMenu();
}

// حفظ القائمة إلى التخزين المحلي
function saveMenu() {
  localStorage.setItem("menu", JSON.stringify(menu));
}

// إنشاء الترابيزات
function createTables() {
  const numTables = parseInt(document.getElementById("num-tables").value, 10);
  const tablesContainer = document.getElementById("tables");
  tablesContainer.innerHTML = "";
  tables = [];

  for (let i = 1; i <= numTables; i++) {
    const table = { id: i, orders: [] };
    tables.push(table);

    const tableDiv = document.createElement("div");
    tableDiv.classList.add("table");
    tableDiv.innerHTML = `<h3>ترابيزة ${i}</h3>
            <div id="orders-${i}"></div>
            <p id="total-${i}">الإجمالي: 0</p>
            <button onclick="endOrder(${i})">إنهاء الأوردر</button>`;
    tableDiv.addEventListener("click", () => openMenu(i));
    tablesContainer.appendChild(tableDiv);
  }
}

// بناء القائمة
function buildMenu() {
  const menuDiv = document.querySelector(".menu");
  menuDiv.innerHTML = "";

  for (const sectionName in menu) {
    const sectionDiv = document.createElement("div");
    sectionDiv.innerHTML = `<h3>${sectionName}</h3>`;
    menu[sectionName].forEach((dish) => {
      const dishButton = document.createElement("button");
      dishButton.textContent = `${dish.name} - ${dish.price}`;
      dishButton.onclick = () => addOrderToActiveTable(dish.name, dish.price);
      sectionDiv.appendChild(dishButton);
    });
    menuDiv.appendChild(sectionDiv);
  }
}

// فتح نافذة القائمة
function openMenu(tableId) {
  activeTableId = tableId;
  document.getElementById("menu-popup").style.display = "block";
}

// إضافة طلب إلى الترابيزة
function addOrderToActiveTable(name, price) {
  const table = tables.find((t) => t.id === activeTableId);
  table.orders.push({ name, price });
  displayOrders(table);
  document.getElementById("menu-popup").style.display = "none";
}

// عرض الطلبات
function displayOrders(table) {
  const ordersDiv = document.getElementById(`orders-${table.id}`);
  ordersDiv.innerHTML = "";
  let total = 0;

  table.orders.forEach((order, index) => {
    total += order.price;
    ordersDiv.innerHTML += `${order.name} - ${order.price} <button onclick="removeOrder(${table.id}, ${index})">حذف</button><br>`;
  });

  document.getElementById(`total-${table.id}`).textContent = `الإجمالي: ${total}`;
}

// حذف طلب
function removeOrder(tableId, index) {
  const table = tables.find((t) => t.id === tableId);
  table.orders.splice(index, 1);
  displayOrders(table);
}

// إنهاء الأوردر
function endOrder(tableId) {
  const table = tables.find((t) => t.id === tableId);
  table.orders = [];
  displayOrders(table);
  alert(`تم إنهاء الأوردر للترابيزة ${tableId}`);
}

// إدارة الأقسام
function openAdminPanel() {
  document.getElementById("admin-popup").style.display = "block";
  buildAdminPanel();
}

function closeAdminPanel() {
  document.getElementById("admin-popup").style.display = "none";
}

function buildAdminPanel() {
  const adminSections = document.getElementById("admin-sections");
  adminSections.innerHTML = "";

  for (const sectionName in menu) {
    const sectionDiv = document.createElement("div");
    sectionDiv.innerHTML = `<h3>${sectionName}</h3
