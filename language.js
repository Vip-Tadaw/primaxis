// language.js

// 1. تطبيق اللغة عند تحميل أي صفحة
document.addEventListener('DOMContentLoaded', () => {
    // توحيد مفتاح التخزين مع باقي الصفحات وإيجاد اللغة المحفوظة
    const savedLang = localStorage.getItem('selectedLanguage') || localStorage.getItem('appLang') || 'ar';
    setLanguage(savedLang);
});

// 2. دالة تغيير اللغة وحفظها وتحديث الواجهة
function setLanguage(lang) {
    // حفظ اللغة بالمفتاحين لمنع أي تضارب
    localStorage.setItem('selectedLanguage', lang);
    localStorage.setItem('appLang', lang); 
    
    const htmlNode = document.documentElement; 
    
    if (lang === 'en') {
        htmlNode.setAttribute('dir', 'ltr');
        htmlNode.setAttribute('lang', 'en');
    } else {
        htmlNode.setAttribute('dir', 'rtl');
        htmlNode.setAttribute('lang', 'ar');
    }

    // ترجمة النصوص العادية
    document.querySelectorAll('[data-ar]').forEach(el => { 
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.innerHTML = text;
    });

    // ترجمة النصوص داخل الخانات (Placeholders)
    document.querySelectorAll('[data-placeholder-ar]').forEach(input => {
        const placeholder = input.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) input.setAttribute('placeholder', placeholder);
    });

    // إخفاء قائمة اللغات إن وجدت
    const langMenu = document.getElementById("langMenu");
    if (langMenu) {
        langMenu.classList.remove("show");
    }
}

// 3. دالة إظهار/إخفاء قائمة اللغات
function toggleLangMenu(event) {
    if (event) event.stopPropagation();
    const langMenu = document.getElementById("langMenu");
    if (langMenu) {
        langMenu.classList.toggle("show");
    }
}

// 4. إغلاق القائمة عند النقر خارجها
window.addEventListener('click', (event) => {
    if (!event.target.closest('.lang-btn')) {
        const langMenu = document.getElementById("langMenu");
        if (langMenu) {
            langMenu.classList.remove('show');
        }
    }
});
