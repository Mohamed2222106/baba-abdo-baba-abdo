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

// تحميل القائمة من التخزين المحلي أو استخدام القائمة الافتراضية
function loadMenu() {
  const savedMenu = localStorage.getItem("menu");
  if (savedMenu) {
    menu = JSON.parse(savedMenu);
  }
  buildMenu();
}

// حفظ القائمة في التخزين المحلي
function saveMenu() {
  localStorage.setItem("menu", JSON.stringify(menu));
}

// بناء القائمة ديناميكيًا
function buildMenu() {
  const menuDiv = document.querySelector(".menu");
  menuDiv.innerHTML = "";

  for (const sectionName in menu) {
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("section");
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

// فتح نافذة الإدارة
function openAdminPanel() {
  document.getElementById("admin-popup").style.display = "block";
  buildAdminPanel();
}

// إغلاق نافذة الإدارة
function closeAdminPanel() {
  document.getElementById("admin-popup").style.display = "none";
}

// بناء واجهة الإدارة
function buildAdminPanel() {
  const adminSections = document.getElementById("admin-sections");
  adminSections.innerHTML = "";

  for (const sectionName in menu) {
    const sectionDiv = document.createElement("div");
    sectionDiv.innerHTML = `<h3>${sectionName}</h3>`;
    menu[sectionName].forEach((dish, index) => {
      const dishDiv = document.createElement("div");
      dishDiv.innerHTML = `
        ${dish.name} - ${dish.price} 
        <button onclick="editDish('${sectionName}', ${index})">تعديل</button>
        <button onclick="deleteDish('${sectionName}', ${index})">حذف</button>`;
      sectionDiv.appendChild(dishDiv);
    });
    adminSections.appendChild(sectionDiv);
  }

  // تحديث اختيار القسم لإضافة الأطباق
  const sectionSelect = document.getElementById("section-select");
  sectionSelect.innerHTML = "";
  for (const sectionName in menu) {
    const option = document.createElement("option");
    option.value = sectionName;
    option.textContent = sectionName;
    sectionSelect.appendChild(option);
  }
}

// إضافة قسم جديد
function addSection() {
  const sectionName = document.getElementById("new-section-name").value;
  if (sectionName && !menu[sectionName]) {
    menu[sectionName] = [];
    saveMenu();
    buildMenu();
    buildAdminPanel();
    alert("تم إضافة القسم!");
  } else {
    alert("القسم موجود بالفعل أو الاسم غير صالح.");
  }
}

// إضافة طبق جديد
function addDish() {
  const sectionName = document.getElementById("section-select").value;
  const dishName = document.getElementById("new-dish-name").value;
  const dishPrice = parseFloat(document.getElementById("new-dish-price").value);

  if (sectionName && dishName && !isNaN(dishPrice)) {
    menu[sectionName].push({ name: dishName, price: dishPrice });
    saveMenu();
    buildMenu();
    buildAdminPanel();
    alert("تم إضافة الطبق!");
  } else {
    alert("البيانات غير صالحة.");
  }
}

// تعديل طبق
function editDish(sectionName, dishIndex) {
  const newPrice = prompt("أدخل السعر الجديد:");
  if (!isNaN(parseFloat(newPrice))) {
    menu[sectionName][dishIndex].price = parseFloat(newPrice);
    saveMenu();
    buildMenu();
    buildAdminPanel();
    alert("تم تعديل السعر!");
  } else {
    alert("السعر غير صالح.");
  }
}

// حذف طبق
function deleteDish(sectionName, dishIndex) {
  if (confirm("هل أنت متأكد من حذف هذا الطبق؟")) {
    menu[sectionName].splice(dishIndex, 1);
    saveMenu();
    buildMenu();
    buildAdminPanel();
    alert("تم حذف الطبق!");
  }
}

// بدء التحميل
loadMenu();
