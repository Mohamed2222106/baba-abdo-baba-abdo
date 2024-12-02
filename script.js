let tables = [];
let activeTableId = null;
let currentDish = null;
let selectedExtra = null;
let menuItems = {
  "مكرونة صغير": 25,
  "مكرونة وسط": 30,
  "مكرونة كبير": 35,
  "مكرونة كينج": 45,
  "كشري صغير": 25,
  "كشري وسط": 30,
  "كشري كبير": 35,
  "كشري كينج": 45,
  "طاجن فراخ": 45,
  "طاجن لحمة": 45,
  "كبدة": 20,
  "سجق": 20,
  "مكس": 20,
  "صلصة": 10,
  "تقلية": 10,
  "عدس": 10,
  "مشروب غازي": 15,
  "أرز بلبن": 13,
  "مياه": 5
};

// إنشاء الترابيزات بناءً على عدد الترابيزات المدخل
function createTables() {
  const numTables = parseInt(document.getElementById("num-tables").value, 10);
  const tablesContainer = document.getElementById("tables");
  tablesContainer.innerHTML = "";
  tables = [];

  for (let i = 1; i <= numTables; i++) {
    const table = {
      id: i,
      orders: []
    };
    tables.push(table);

    const tableDiv = document.createElement("div");
    tableDiv.classList.add("table");
    tableDiv.id = `table-${table.id}`;
    tableDiv.innerHTML = `<h3>ترابيزة ${table.id}</h3>
            <div id="orders-${table.id}"></div>
            <p id="total-${table.id}">الإجمالي: 0</p>
            <button onclick="endOrder(${table.id})">إنهاء الأوردر</button>
            <button onclick="openPriceEditor()">تعديل الأسعار</button>`;

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

  if (selectedExtra === "بدون") {
    currentDish.price = currentDish.price;
  } else {
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
  if (
    activeTableId !== null &&
    currentDish !== null &&
    selectedExtra !== null
  ) {
    const table = tables.find((t) => t.id === activeTableId);
    if (table) {
      const orderName =
        selectedExtra === "بدون"
          ? `${currentDish.name} (${pastaType})`
          : `${currentDish.name} + ${selectedExtra} (${pastaType})`;

      const finalPrice = currentDish.price;
      table.orders.push({ name: orderName, price: finalPrice });
      displayOrders(table);
    }
  }
  currentDish = null;
  selectedExtra = null;
  closePastaTypePopup();
}

// إضافة طلب إلى الترابيزة
function addOrderToActiveTable(name, price) {
  if (activeTableId !== null) {
    const table = tables.find((t) => t.id === activeTableId);
    if (table) {
      table.orders.push({ name, price });
      displayOrders(table);
    }
  } else {
    alert("لم يتم اختيار ترابيزة.");
  }
  closeMenu();
}

// عرض الطلبات والإجمالي في الترابيزة
function displayOrders(table) {
  const ordersDiv = document.getElementById("orders-" + table.id);
  ordersDiv.innerHTML = "";
  let total = 0;

  table.orders.forEach((order, index) => {
    total += order.price;
    const orderDiv = document.createElement("div");
    orderDiv.innerHTML = `${order.name} - ${order.price} <button onclick="removeOrder(${table.id}, ${index})">حذف</button>`;
    ordersDiv.appendChild(orderDiv);
  });

  document.getElementById("total-" + table.id).textContent =
    "الإجمالي: " + total;
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
    table.orders = []; // مسح الطلبات
    displayOrders(table); // تحديث العرض
    document.getElementById("total-" + table.id).textContent = "الإجمالي: 0"; // تصفير الإجمالي
    alert(`تم إنهاء الأوردر للترابيزة رقم ${tableId}`);
  }
}

// فتح صفحة تعديل الأسعار
function openPriceEditor() {
  const priceEditor = document.getElementById("price-editor-popup");
  priceEditor.style.display = "block";

  const menuContainer = document.getElementById("price-editor-menu");
  menuContainer.innerHTML = "";

  Object.keys(menuItems).forEach(item => {
    const price = menuItems[item];
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <span>${item} - ${price}</span>
      <input type="number" id="price-${item}" value="${price}" />
      <button onclick="updatePrice('${item}')">تعديل السعر</button>
    `;
    menuContainer.appendChild(itemDiv);
  });
}

// تعديل السعر في القائمة
function updatePrice(item) {
  const newPrice = parseFloat(document.getElementById(`price-${item}`).value);
  if (!isNaN(newPrice) && newPrice >= 0) {
    menuItems[item] = newPrice;
    alert(`تم تعديل سعر ${item} إلى ${newPrice}`);
  } else {
    alert("أدخل سعر صحيح.");
  }
}

// إغلاق صفحة تعديل الأسعار
function closePriceEditor() {
  document.getElementById("price-editor-popup").style.display = "none";
}
