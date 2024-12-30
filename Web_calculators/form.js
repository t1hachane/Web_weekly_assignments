function chuanHoaTen() {
    let hotenElement = document.getElementById('hoten');
    let hoten = hotenElement.value.trim();

    hoten = hoten.replace(/\s+/g, ' ');

    hoten = hoten.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');

    hotenElement.value = hoten;
}

function chuanHoaNgaySinh() {
    let ngaysinhElement = document.getElementById('ngaysinh');
    let ngaysinh = ngaysinhElement.value.replace(/\D/g, ''); // Loại bỏ tất cả ký tự không phải số

    if (ngaysinh.length >= 2 && ngaysinh.length <= 4) {
        ngaysinh = ngaysinh.substring(0, 2) + '/' + ngaysinh.substring(2);
    } else if (ngaysinh.length > 4) {
        ngaysinh = ngaysinh.substring(0, 2) + '/' + ngaysinh.substring(2, 4) + '/' + ngaysinh.substring(4);
    }
    ngaysinhElement.value = ngaysinh;
}
function chuanHoaEmail() {
    let emailElement = document.getElementById('email');
    let email = emailElement.value.trim();

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        document.getElementById('loi_email').innerText = "Email không đúng định dạng.";
    } else {
        document.getElementById('loi_email').innerText = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input, textarea, select");
  
    inputs.forEach((input, index) => {
      input.addEventListener("keyup", function (event) {
        event = event || window.event;
  
        if (event.keyCode === 13 || event.which === 13) {
          event.preventDefault();
  
          if (input.type === "radio") {
            const radios = document.querySelectorAll(`input[name="${input.name}"]`);
            let currentIndex = Array.from(radios).indexOf(input);
            if (currentIndex !== -1 && currentIndex < radios.length - 1) {
              radios[currentIndex + 1].focus();
            } else {
              const nextInput = inputs[index + 1];
              if (nextInput) {
                nextInput.focus();
              }
            }
          } else {
            if (input.value.trim() !== "") {
              const nextInput = inputs[index + 1];
              if (nextInput) {
                nextInput.focus();
              }
            }
          }
        }
      });
    });
  });
  

function Chapnhan() {
    let isValid = true;

    let hoten = document.getElementById('hoten').value.trim();
    if (hoten === "") {
        document.getElementById('loi_hoten').innerText = "Vui lòng nhập họ tên.";
        isValid = false;
    } else {
        document.getElementById('loi_hoten').innerText = "";
    }

    let ngaysinh = document.getElementById('ngaysinh').value.trim();
    if (ngaysinh === "") {
        document.getElementById('loi_ngaysinh').innerText = "Vui lòng nhập ngày sinh.";
        isValid = false;
    } else {
        document.getElementById('loi_ngaysinh').innerText = "";
    }

    let email = document.getElementById('email').value.trim();
    if (email === "") {
        document.getElementById('loi_email').innerText = "Vui lòng nhập email.";
        isValid = false;
    } else {
        document.getElementById('loi_email').innerText = "";
    }

    let username = document.getElementById('username').value.trim();
    if (username === "") {
        document.getElementById('loi_username').innerText = "Vui lòng nhập tên sử dụng.";
        isValid = false;
    } else {
        document.getElementById('loi_username').innerText = "";
    }

    let pass = document.getElementById('pass').value.trim();
    if (pass === "") {
        document.getElementById('loi_pass').innerText = "Vui lòng nhập mật khẩu.";
        isValid = false;
    } else {
        document.getElementById('loi_pass').innerText = "";
    }

    let repass = document.getElementById('repass').value.trim();
    if (repass === "" || repass !== pass) {
        document.getElementById('loi_repass').innerText = "Mật khẩu không khớp.";
        isValid = false;
    } else {
        document.getElementById('loi_repass').innerText = "";
    }

    if (isValid) {
        document.getElementById('form1').submit();
    }
}

function kiemTraMatKhau() {
    let passElement = document.getElementById('pass');
    let repassElement = document.getElementById('repass');
    
    let pass = passElement.value;
    let repass = repassElement.value;

    if (pass !== repass) {
        document.getElementById('loi_repass').innerText = "Mật khẩu gõ lại không đúng";
    } else {
        document.getElementById('loi_repass').innerText = "";
    }
}
