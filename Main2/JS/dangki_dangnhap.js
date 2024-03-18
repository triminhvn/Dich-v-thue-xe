//Form Đăng Kí
const submit_button = document.querySelector(".button");
submit_button.onclick = (e) => {
    e.preventDefault();
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})"); //password
    const cpass = document.getElementById("cpass").value;
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //mail

    let existingData = JSON.parse(localStorage.getItem("userData")) || [];
    let isExistingUser = false;
    for (let i = 0; i < existingData.length; i++) {
        if (existingData[i].email === email) {
            isExistingUser = true;
            break;
        }
    }
    if (isExistingUser) {
        Swal.fire(
            'Opps..!',
            'Tài khoản gmail đã tồn tại!',
            'error'
        );
    }

    else if (fname == "" || lname == "" || email == "" || pass == "" || cpass == "") {
        Swal.fire(
            'Opps..!',
            'Vui lòng điền đầy đủ giá trị',
            'error'
        );
    }
    else {
        if (pass.length >= 6 && pass.length <= 20) {
            if (pass !== cpass) {
                Swal.fire(
                    'Opps..!',
                    'Mật khẩu không khớp!',
                    'error'
                );
            }
            else if (strongRegex.test(pass) == false) {
                Swal.fire(
                    'Opps..!',
                    'Mật khẩu phải bao gồm ký tự in hoa, thường, ký tự đặc biệt và số!',
                    'error'
                );
            }
            else if (!filter.test(email)) {
                Swal.fire(
                    'Opps..!',
                    'Vui lòng nhập đúng định dạng mail!',
                    'error'
                );
            }
            else {

                let existingData = JSON.parse(localStorage.getItem("userData")) || [];
                let newUser = {
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    password: pass,
                    cpassword: cpass
                };
                existingData.push(newUser);
                localStorage.setItem("userData", JSON.stringify(existingData));
                Swal.fire(
                    'Good job!',
                    'Đăng kí thành công!',
                    'success'
                );
                setTimeout(() => {
                    location.href = 'dangnhap.html';
                }, 1000)
            }
        }
        else {
            Swal.fire(
                'Opps..!',
                'Nhập mật khẩu có ít nhất 6 kí tự',
                'error'
            );
        }
    }
}

//Form Đăng Nhập:
const login = document.querySelector('.login');
login.onclick = (e) => {
    e.preventDefault();
    const emailAddress = document.getElementById("emailAddress").value;
    const passWord = document.getElementById("passWord").value;
    let existingData = JSON.parse(localStorage.getItem("userData")) || [];
    let currentUser = existingData.find(user => user.email == emailAddress && user.password == passWord);
    if (emailAddress == "" || passWord == "") {
        Swal.fire(
            'Opps..!',
            'Vui lòng điền đầy đủ giá trị!',
            'error'
        );
    }
    else {
        if (currentUser) {
            Swal.fire(
                'Good job!',
                'Đăng nhập thành công!',
                'success'
            );
            setTimeout(() => {
                location.href = './index.html';
            }, 1000)
        } else {
            Swal.fire(
                'Opps..!',
                'Sai tên đăng nhập hoặc mật khẩu!',
                'error'
            );
        }
    };
};