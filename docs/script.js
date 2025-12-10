const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const answerMessage = document.getElementById("answerMessage");

// میزان نزدیکی موس/انگشت که دکمه "No" فرار کند
const TRIGGER_DISTANCE = 90;

// مقدار جابه‌جایی فعلی دکمه
let offsetX = 0;
let offsetY = 0;

function dodgeButton(clientX, clientY) {
  const rect = noBtn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dist = Math.hypot(clientX - centerX, clientY - centerY);

  // اگر هنوز خیلی دوریم، لازم نیست فرار کنه
  if (dist > TRIGGER_DISTANCE) return;

  // جهت فرار: برعکس سمت موس حرکت کنه
  let moveX = (centerX - clientX);
  let moveY = (centerY - clientY);

  // نرمال‌سازی برای این‌که خیلی دیوانه‌وار نپره
  const length = Math.hypot(moveX, moveY) || 1;
  moveX = (moveX / length) * 60;  // هر بار حدوداً ۶۰px
  moveY = (moveY / length) * 40;

  offsetX += moveX;
  offsetY += moveY;

  // محدود کردن جابه‌جایی که خیلی از کارت خارج نشه
  const MAX_OFFSET = 160;
  offsetX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetX));
  offsetY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetY));

  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

// گوش دادن به حرکت ماوس / انگشت
document.addEventListener("pointermove", (e) => {
  // روی گوشی هم pointerType میشه "touch"
  dodgeButton(e.clientX, e.clientY);
});

// اگر کسی مستقیم روی خود دکمه No ضربه بزند / کلیک کند
noBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault(); // نذار کلیک ثبت بشه
  dodgeButton(e.clientX, e.clientY);
});

// کلیک روی Yes
yesBtn.addEventListener("click", () => {
  answerMessage.textContent = "You just made me the happiest person today 💚";
});

// اگر یه‌جوری با کیبورد Enter تونست No رو فعال کنه
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  answerMessage.textContent = "No is not really an option :)";
});
