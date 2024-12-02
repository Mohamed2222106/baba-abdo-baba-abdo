// تعريف المتغيرات
let tables = [];
let activeTableId = null;
let currentDish = null;
let selectedExtra = null;

// إنشاء الترابيزات بناءً على عدد الترابيزات المدخل
function createTables() {
  const numTables = parseInt(document.getElementById("num-tables").value, 10);
  const tablesContainer = document.getElementById("tables");
  tablesContainer.innerHTML = ""; // مسح المحتويات السابقة
  tables = []; // إعادة تعيين قائمة الترابيزات

  // إنشاء الترابيزات ديناميكيًا بناءً على العدد المدخل
  for (let i = 1; i <= numTables; i++) {
    const table = {
      id: i,
      orders: []
    };
    tables.push(table);

    // إنشاء HTML خاص بالترابيزة
    const tableDiv = document.createElement("div");
    tableDiv.classList.add("table");
    tableDiv.id = `table-${table.id}`;
    tableDiv.innerHTML = `
      <h3>ترابيزة ${table.id}</h3>
      <div id="orders-${table.id}"></div>
      <p id="total-${table.id}">الإجمالي: 0</p>
      <button onclick="endOrder(${table.id})">إنهاء الأوردر</button>
    `;

    // إضافة حدث فتح القائمة عند الضغط على الترابيزة
    tableDiv.addEventListener("click", () => openMenu(table.id));
    tablesContainer.appendChild(tableDiv);
  }
}

// فتح نافذة القائمة عند الضغط على ترابيزة
function openMenu(tableId) {
  activeTableId = tableId;
  document.getElementById("menu-popup").style.display = "block";
}

// إغلاق نافذة القائمة
function closeMenu() {
  document.getElementById("menu-popup").style.display = "none";
}

// إضافة طلب جديد إلى الترابيزة النشطة
function addOrderToActiveTable(name, price) {
  if (activeTableId === null) {
    alert("لم يتم اختيار ترابيزة.");
    return;
  }

  const table = tables.find((t) => t.id === activeTableId);
  if (table) {
    table.orders.push({ name, price });
    displayOrders(table);
  }
  closeMenu();
}

// عرض الطلبات والإجمالي في الترابيزة
function displayOrders(table) {
  const ordersDiv = document.getElementById("orders-" + table.id);
  ordersDiv.innerHTML = ""; // مسح الطلبات السابقة
  let total = 0;

  // عرض جميع الطلبات مع إجمالي الأسعار
  table.orders.forEach((order, index) => {
    total += order.price;
    const orderDiv = document.createElement("div");
    orderDiv.innerHTML = `
      ${order.name} - ${order.price} 
      <button onclick="removeOrder(${table.id}, ${index})">حذف</button>
    `;
    ordersDiv.appendChild(orderDiv);
  });

  document.getElementById("total-" + table.id).textContent = "الإجمالي: " + total;
}

// إزالة طلب من الترابيزة
function removeOrder(tableId, orderIndex) {
  const table = tables.find((t) => t.id === tableId);
  if (table) {
    table.orders.splice(orderIndex, 1);
    displayOrders(table);
  }
}

// إنهاء الأوردر ومسح محتويات الترابيزة
function endOrder(tableId) {
  const table = tables.find((t) => t.id === tableId);
  if (table) {
    table.orders = []; // مسح جميع الطلبات
    displayOrders(table); // تحديث عرض الطلبات
    document.getElementById("total-" + table.id).textContent = "الإجمالي: 0"; // تصفير الإجمالي
    alert(`تم إنهاء الأوردر للترابيزة رقم ${tableId}`);
  }
}

// اختيار إضافة (مثل المكرونة أو الكشري) من القائمة
function chooseExtraOption(dishName, price) {
  currentDish = { name: dishName, price: price };
  document.getElementById("menu-popup").style.display = "none";
  document.getElementById("extra-option-popup").style.display = "block";
}

// إغلاق نافذة اختيار الإضافات
function closeExtraOptionPopup() {
  document.getElementById("extra-option-popup").style.display = "none";
}

// اختيار نوع المكرونة بعد تحديد الإضافة
function selectPastaType(extra) {
  selectedExtra = extra;
  document.getElementById("extra-option-popup").style.display = "none";

  // إضافة سعر الإضافة إذا كانت موجودة
  if (selectedExtra !== "بدون") {
    currentDish.price += 20; // إضافة سعر الإضافة
  }

  document.getElementById("pasta-type-popup").style.display = "block";
}

// إغلاق نافذة اختيار نوع المكرونة
function closePastaTypePopup() {
  document.getElementById("pasta-type-popup").style.display = "none";
}

// إضافة طلب مكرونة مع نوعها
function addPastaOrder(pastaType) {
  if (activeTableId === null || currentDish === null || selectedExtra === null) {
    alert("يرجى اختيار الطبق والإضافة بشكل صحيح.");
    return;
  }

  const table = tables.find((t) => t.id === activeTableId);
  if (table) {
    const orderName = selectedExtra === "بدون"
      ? `${currentDish.name} (${pastaType})`
      : `${currentDish.name} + ${selectedExtra} (${pastaType})`;

    const finalPrice = currentDish.price;
    table.orders.push({ name: orderName, price: finalPrice });
    displayOrders(table);
  }

  currentDish = null;
  selectedExtra = null;
  closePastaTypePopup();
}

// إنشاء الترابيزات بناءً على العدد المدخل
function createTables() {
  const numTables = parseInt(document.getElementById("num-tables").value, 10);
  const tablesContainer = document.getElementById("tables");
  tablesContainer.innerHTML = "";
  tables = [];

  // إنشاء الترابيزات ديناميكيًا
  for (let i = 1; i <= numTables; i++) {
    const table = {
      id: i,
      orders: []
    };
    tables.push(table);

    // إنشاء HTML للترابيزة
    const tableDiv = document.createElement("div");
    tableDiv.classList.add("table");
    tableDiv.id = `table-${table.id}`;
    tableDiv.innerHTML = `
      <h3>ترابيزة ${table.id}</h3>
      <div id="orders-${table.id}"></div>
      <p id="total-${table.id}">الإجمالي: 0</p>
      <button onclick="endOrder(${table.id})">إنهاء الأوردر</button>
    `;

    // إضافة حدث عند الضغط على الترابيزة لفتح القائمة
    tableDiv.addEventListener("click", () => openMenu(table.id));
    tablesContainer.appendChild(tableDiv);
  }
}
