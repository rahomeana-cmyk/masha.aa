// مصفوفة تخزين المنتجات في السلة
let cart = [];

// دالة فتح وإغلاق السلة الجانبية
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('active');
}

// دالة إضافة منتج للسلة
function addToCart(name, price) {
    // إضافة العنصر للمصفوفة
    cart.push({
        id: Date.now(), // رقم فريد لكل قطعة
        name: name,
        price: price
    });
    
    updateUI(); // تحديث شكل الصفحة
    
    // إشعار بسيط للمستخدم (يمكن استبداله بـ Toast)
    console.log(`${name} أضيف للسلة`);
}

// دالة حذف منتج من السلة
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateUI();
}

// تحديث واجهة المستخدم (العداد، القائمة، الإجمالي)
function updateUI() {
    const cartList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // مسح القائمة الحالية لإعادة بنائها
    cartList.innerHTML = '';
    let totalSum = 0;

    cart.forEach(item => {
        totalSum += item.price;
        cartList.innerHTML += `
            <div class="cart-item">
                <div>
                    <h6 class="mb-0 fw-bold small">${item.name}</h6>
                    <span class="text-danger small">${item.price} EGP</span>
                </div>
                <button class="btn btn-sm btn-outline-secondary border-0" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });

    // تحديث الأرقام في الهيدر والسلة
    cartCount.innerText = cart.length;
    cartTotal.innerText = totalSum;
}

// دالة فتح مودال الشحن
function openOrderModal() {
    if (cart.length === 0) {
        alert("سلتك فارغة، تسوقي أولاً 🛍️");
        return;
    }
    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    orderModal.show();
}

// الدالة النهائية: إرسال الطلب للواتساب
function submitFinalOrder() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;

    if (!name || !phone || !address) {
        alert("فضلاً، أكملي بيانات الشحن ليصلك الطلب");
        return;
    }

    // تجهيز قائمة المنتجات نصياً للواتساب
    let itemsText = "";
    cart.forEach((item, index) => {
        itemsText += `${index + 1}- ${item.name} (${item.price} EGP)%0A`;
    });

    const total = document.getElementById('cart-total').innerText;
    
    // بناء الرسالة
    let message = `مرحباً، أريد طلب هذه المنتجات:%0A`;
    message += `--------------------------%0A`;
    message += itemsText;
    message += `--------------------------%0A`;
    message += `إجمالي الطلب: ${total} EGP%0A`;
    message += `بيانات الشحن:%0A`;
    message += `الاسم: ${name}%0A`;
    message += `الموبايل: ${phone}%0A`;
    message += `العنوان: ${address}`;

    // رقم الواتساب الخاص بك (ضعي رقمك هنا بدلاً من 2011525800378)
    const whatsappLink = `https://wa.me/011152800378?text=${message}`;
    
    window.open(whatsappLink, '_blank');
}

// دالة طلب تصميم خاص
function sendSpecialOrder() {
    const specName = document.getElementById('spec-name').value;
    const specDetails = document.getElementById('spec-details').value;

    if (!specName || !specDetails) {
        alert("برجاء إدخال اسمك وتفاصيل التصميم");
        return;
    }

    let message = `طلب تصميم خاص جديد 🎨%0A`;
    message += `الاسم: ${specName}%0A`;
    message += `التفاصيل: ${specDetails}`;

    window.open(`https://wa.me/201234567890?text=${message}`, '_blank');
}
